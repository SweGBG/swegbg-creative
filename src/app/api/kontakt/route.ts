import { Resend } from "resend";
import { NextResponse } from "next/server";
import { autosvar } from "@/lib/autosvar";

// Avsändare måste ligga på verifierad domän (swegbg.com är verifierad i Resend).
const FROM = "SweGBG Trading <kontakt@swegbg.com>";
// Dit du får in förfrågningar.
const TO = "lenn.soder@proton.me";

// Enkel escape så inskickad text inte kan bryta HTML-mailet.
function esc(s: string) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Gör radbrytningar i fritext till <br> för HTML-varianten.
function nl2br(s: string) {
  return esc(s).replace(/\n/g, "<br>");
}

export async function POST(req: Request) {
  // Skapa Resend-klienten HÄR, inte på modulnivå. Annars kraschar hela
  // Vercel-bygget om RESEND_API_KEY saknas när Next samlar in sidor.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Serverkonfiguration saknas" },
      { status: 500 }
    );
  }
  const resend = new Resend(apiKey);

  const { namn, email, foretag, typ, meddelande, webbplats, lang } =
    await req.json();

  // Honeypot: en bot fyllde det dolda fältet. Släng tyst, låtsas ok.
  if (webbplats) {
    return NextResponse.json({ ok: true });
  }

  // Rimliga längdgränser så ingen kan skicka megabyte-långa mejl.
  if (String(namn).length > 120 || String(email).length > 200 || String(meddelande).length > 5000) {
    return NextResponse.json({ error: "För långt" }, { status: 400 });
  }

  if (!namn || !email || !meddelande) {
    return NextResponse.json({ error: "Fält saknas" }, { status: 400 });
  }

  // Enkel e-postkontroll.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Ogiltig e-post" }, { status: 400 });
  }

  const isEn = lang === "en";

  try {
    // 1) Notis till dig — text (fallback) + html (renderas rätt överallt).
    // OBS: Resend kastar inte fel, den returnerar { error }. Måste kollas.
    const notis = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Ny förfrågan från ${namn}${typ ? ` (${typ})` : ""}`,
      text:
        `Namn: ${namn}\n` +
        `E-post: ${email}\n` +
        `Företag: ${foretag || "-"}\n` +
        `Projekt: ${typ || "-"}\n` +
        `Språk: ${isEn ? "EN" : "SV"}\n\n` +
        `${meddelande}`,
      html: `
        <div style="font-family:system-ui,-apple-system,sans-serif;font-size:15px;line-height:1.6;color:#111">
          <p><strong>Namn:</strong> ${esc(namn)}</p>
          <p><strong>E-post:</strong> ${esc(email)}</p>
          <p><strong>Företag:</strong> ${esc(foretag || "-")}</p>
          <p><strong>Projekt:</strong> ${esc(typ || "-")}</p>
          <p><strong>Språk:</strong> ${isEn ? "EN" : "SV"}</p>
          <hr style="border:none;border-top:1px solid #ddd;margin:16px 0">
          <p>${nl2br(meddelande)}</p>
        </div>
      `,
    });

    if (notis.error) {
      console.error("Resend (notis):", notis.error);
      return NextResponse.json({ error: "Kunde inte skicka" }, { status: 502 });
    }

    // 2) Auto-svar till kunden, på deras språk. Misslyckas det har du
    // ändå fått förfrågan, så kunden får fortfarande "skickat".
    const mail = autosvar({ namn, foretag, typ, meddelande, lang });
    const autosvarRes = await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: TO,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    });

    if (autosvarRes.error) {
      console.error("Resend (autosvar):", autosvarRes.error);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Resend:", err);
    return NextResponse.json({ error: "Kunde inte skicka" }, { status: 500 });
  }
}
