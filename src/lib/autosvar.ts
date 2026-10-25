// Autosvar till kunden efter kontaktformuläret.
// E-post-HTML: tabeller + inline-stilar, inga externa typsnitt eller bilder,
// så den ser likadan ut i Gmail, Outlook, Proton och Apple Mail.

const C = {
  bg: "#080c18",
  panel: "#0d1320",
  panel2: "#16203a",
  fg: "#e9e4d8",
  muted: "#9aa3b5",
  gold: "#c9922a",
  glow: "#f0b347",
  line: "#2a2a2a",
  blue: "#4fc3f7",
};

const DISPLAY = `'Chakra Petch','Trebuchet MS',Arial,sans-serif`;
const BODY = `Inter,-apple-system,'Segoe UI',Roboto,Arial,sans-serif`;
const MONO = `'IBM Plex Mono',Menlo,Consolas,monospace`;

function esc(s: string) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
const nl2br = (s: string) => esc(s).replace(/\n/g, "<br>");

const T = {
  sv: {
    subject: "Tack, din förfrågan har kommit fram — SweGBG",
    preheader: "Jag återkommer inom 24 timmar. Här är en kopia av det du skickade.",
    kicker: "Förfrågan mottagen",
    hello: (n: string) => `Hej ${n}!`,
    lead: "Tack för att du hörde av dig. Din förfrågan har kommit fram och jag återkommer personligen inom 24 timmar.",
    summary: "Din förfrågan",
    project: "Projekt",
    company: "Företag",
    message: "Meddelande",
    nextTitle: "Så här går det vidare",
    steps: [
      ["Jag läser igenom", "Jag går igenom det du skrivit och tittar på din nuvarande närvaro online."],
      ["Jag hör av mig", "Inom 24 timmar får du svar med frågor eller ett första förslag."],
      ["Vi bygger", "Du äger allt från dag ett — kod, domän och konton."],
    ],
    cta: "Se mina projekt",
    reply: "Vill du lägga till något? Svara bara på det här mejlet.",
    regards: "Vänliga hälsningar,",
    footer: "Du får det här mejlet för att du skickade en förfrågan via swegbg.com.",
  },
  en: {
    subject: "Thanks, your request came through — SweGBG",
    preheader: "I'll get back to you within 24 hours. Here's a copy of what you sent.",
    kicker: "Request received",
    hello: (n: string) => `Hi ${n}!`,
    lead: "Thanks for reaching out. Your request came through and I'll get back to you personally within 24 hours.",
    summary: "Your request",
    project: "Project",
    company: "Company",
    message: "Message",
    nextTitle: "What happens next",
    steps: [
      ["I read it through", "I go over what you wrote and take a look at your current online presence."],
      ["I get in touch", "Within 24 hours you'll hear back with questions or a first proposal."],
      ["We build", "You own everything from day one — code, domain and accounts."],
    ],
    cta: "See my work",
    reply: "Anything to add? Just reply to this email.",
    regards: "Best regards,",
    footer: "You're receiving this because you sent a request via swegbg.com.",
  },
};

type Input = { namn: string; foretag?: string; typ?: string; meddelande: string; lang?: string };

export function autosvar({ namn, foretag, typ, meddelande, lang }: Input) {
  const t = lang === "en" ? T.en : T.sv;
  const first = String(namn).trim().split(/\s+/)[0] || namn;

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:0 0 12px;font:500 11px/1.4 ${MONO};letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};width:110px;vertical-align:top">${label}</td>
      <td style="padding:0 0 12px;font:400 15px/1.5 ${BODY};color:${C.fg};vertical-align:top">${value}</td>
    </tr>`;

  const steps = t.steps
    .map(
      ([title, text], i) => `
    <tr>
      <td style="width:44px;vertical-align:top;padding:0 0 18px">
        <div style="width:30px;height:30px;line-height:30px;text-align:center;border:1px solid ${C.gold};border-radius:50%;font:600 13px/30px ${MONO};color:${C.glow}">${i + 1}</div>
      </td>
      <td style="vertical-align:top;padding:2px 0 18px">
        <div style="font:600 15px/1.4 ${DISPLAY};color:${C.fg}">${title}</div>
        <div style="font:400 14px/1.55 ${BODY};color:${C.muted};padding-top:2px">${text}</div>
      </td>
    </tr>`
    )
    .join("");

  const html = `<!doctype html>
<html lang="${lang === "en" ? "en" : "sv"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>${esc(t.subject)}</title>
</head>
<body style="margin:0;padding:0;background:${C.bg};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.bg}">${t.preheader}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.bg}">
<tr><td align="center" style="padding:32px 16px">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px">

    <!-- Wordmark -->
    <tr><td style="padding:0 4px 20px">
      <span style="font:600 13px/1 ${DISPLAY};letter-spacing:4px;color:${C.fg}">SWEGBG</span>
      <span style="font:400 13px/1 ${DISPLAY};letter-spacing:4px;color:${C.gold}">&nbsp;AGENCY</span>
    </td></tr>

    <!-- Card -->
    <tr><td style="background:${C.panel};border:1px solid #1f2a44;border-radius:14px;overflow:hidden">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">

        <!-- Gold bar -->
        <tr><td style="height:4px;line-height:4px;font-size:0;background:${C.gold};background-image:linear-gradient(90deg,${C.glow},${C.gold},${C.blue})">&nbsp;</td></tr>

        <!-- Hero -->
        <tr><td style="padding:36px 32px 8px">
          <div style="font:500 11px/1 ${MONO};letter-spacing:2px;text-transform:uppercase;color:${C.glow}">&#10003;&nbsp; ${t.kicker}</div>
          <h1 style="margin:16px 0 0;font:600 28px/1.25 ${DISPLAY};color:${C.fg}">${esc(t.hello(first))}</h1>
          <p style="margin:14px 0 0;font:400 16px/1.65 ${BODY};color:${C.fg}">${t.lead}</p>
        </td></tr>

        <!-- Summary -->
        <tr><td style="padding:24px 32px 8px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.panel2};border-left:3px solid ${C.gold};border-radius:8px">
            <tr><td style="padding:20px 22px 8px">
              <div style="font:600 14px/1 ${DISPLAY};letter-spacing:1px;color:${C.glow};padding-bottom:16px">${t.summary}</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${typ ? row(t.project, esc(typ)) : ""}
                ${foretag ? row(t.company, esc(foretag)) : ""}
                ${row(t.message, nl2br(meddelande))}
              </table>
            </td></tr>
          </table>
        </td></tr>

        <!-- Next steps -->
        <tr><td style="padding:28px 32px 4px">
          <div style="font:600 18px/1.3 ${DISPLAY};color:${C.fg};padding-bottom:18px">${t.nextTitle}</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${steps}</table>
        </td></tr>

        <!-- CTA -->
        <tr><td style="padding:4px 32px 28px">
          <a href="https://www.swegbg.com" style="display:inline-block;background:${C.gold};color:${C.bg};text-decoration:none;font:600 15px/1 ${DISPLAY};letter-spacing:.5px;padding:14px 26px;border-radius:999px">${t.cta} &rarr;</a>
        </td></tr>

        <!-- Sign-off -->
        <tr><td style="padding:22px 32px 32px;border-top:1px solid #1f2a44">
          <p style="margin:0 0 14px;font:400 14px/1.6 ${BODY};color:${C.muted}">${t.reply}</p>
          <p style="margin:0;font:400 15px/1.6 ${BODY};color:${C.fg}">${t.regards}<br>
            <span style="font:600 15px/1.6 ${DISPLAY};color:${C.fg}">Lennie Söderberg</span><br>
            <span style="color:${C.muted}">SweGBG Trading &middot; Göteborg</span></p>
        </td></tr>

      </table>
    </td></tr>

    <!-- Footer -->
    <tr><td align="center" style="padding:22px 16px 0;font:400 12px/1.6 ${BODY};color:#5d6679">
      <a href="https://www.swegbg.com" style="color:${C.gold};text-decoration:none">swegbg.com</a>
      &nbsp;&middot;&nbsp; <a href="mailto:kontakt@swegbg.com" style="color:#5d6679;text-decoration:none">kontakt@swegbg.com</a><br>
      ${t.footer}
    </td></tr>

  </table>
</td></tr>
</table>
</body>
</html>`;

  const text =
    `${t.hello(first)}\n\n${t.lead}\n\n` +
    `— ${t.summary} —\n` +
    (typ ? `${t.project}: ${typ}\n` : "") +
    (foretag ? `${t.company}: ${foretag}\n` : "") +
    `${t.message}:\n${meddelande}\n\n` +
    `${t.nextTitle}:\n` +
    t.steps.map(([a, b], i) => `${i + 1}. ${a} — ${b}`).join("\n") +
    `\n\n${t.reply}\n\n${t.regards}\nLennie Söderberg\nSweGBG Trading · Göteborg\nhttps://www.swegbg.com`;

  return { subject: t.subject, html, text };
}
