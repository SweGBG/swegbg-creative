import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Words from "@/components/Words";
import Footer from "@/components/Footer";
import { LdScript } from "@/components/JsonLd";
import LandingNav from "./LandingNav";
import ContactButton from "./ContactButton";
import { landings, landingById, landingPath, landingUi, type Landing } from "@/lib/landing";
import { site, projects } from "@/lib/site";
import type { Lang } from "@/lib/i18n";

export const findLanding = (lang: Lang, slug: string) => landings.find((l) => l[lang].slug === slug);

/** Search texts, canonical and hreflang for one landing page. */
export function landingMetadata(lang: Lang, slug: string): Metadata {
  const page = findLanding(lang, slug);
  if (!page) return {};
  const t = page[lang];
  const path = landingPath(page, lang);
  return {
    title: t.title,
    description: t.description,
    keywords: [t.name, t.h1, "SweGBG", "SweGBG Agency"],
    alternates: {
      canonical: path,
      languages: { "sv-SE": landingPath(page, "sv"), "en-US": landingPath(page, "en"), "x-default": landingPath(page, "sv") },
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: "SweGBG",
      locale: lang === "sv" ? "sv_SE" : "en_US",
      alternateLocale: [lang === "sv" ? "en_US" : "sv_SE"],
      title: t.title,
      description: t.description,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: t.h1 }],
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.description, images: ["/og.jpg"] },
  };
}

/** WebPage, breadcrumbs, FAQ and (for service pages) the service itself. */
function landingGraph(page: Landing, lang: Lang) {
  const t = page[lang];
  const ui = landingUi[lang];
  const url = `${site.url}${landingPath(page, lang)}`;
  const home = lang === "sv" ? `${site.url}/` : `${site.url}/en`;
  const inLanguage = lang === "sv" ? "sv-SE" : "en-US";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: t.title,
        headline: t.h1,
        description: t.description,
        inLanguage,
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${site.url}/#org` },
        author: { "@id": `${site.url}/#lennie` },
        publisher: { "@id": `${site.url}/#org` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        primaryImageOfPage: `${site.url}/og.jpg`,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.home, item: home },
          { "@type": "ListItem", position: 2, name: t.name, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage,
        isPartOf: { "@id": `${url}#webpage` },
        mainEntity: t.faq.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
      },
      ...(page.service
        ? [
            {
              "@type": "Service",
              "@id": `${url}#service`,
              name: t.h1,
              description: t.description,
              url,
              provider: { "@id": `${site.url}/#org` },
              areaServed: [
                { "@type": "City", name: "Göteborg" },
                { "@type": "Country", name: lang === "sv" ? "Sverige" : "Sweden" },
              ],
              offers: { "@type": "Offer", price: "4999", priceCurrency: "SEK", description: lang === "sv" ? "Startpris ex. moms" : "Starting price excl. VAT" },
            },
          ]
        : []),
    ],
  };
}

export default function LandingPage({ lang, slug }: { lang: Lang; slug: string }) {
  const page = findLanding(lang, slug);
  if (!page) notFound();
  const t = page[lang];
  const ui = landingUi[lang];
  const demos = (page.demos ?? []).map((name) => projects.find((p) => p.name === name)).filter((p) => !!p);
  const related = page.related.map(landingById).filter((p) => !!p);

  return (
    <>
      <LdScript graph={landingGraph(page, lang)} />
      <header className="lp-hero">
        <div className="hex" aria-hidden="true">
          <i />
        </div>
        <LandingNav lang={lang} sv={landingPath(page, "sv")} en={landingPath(page, "en")} />
        <div className="wrap lp-hero-in">
          <nav className="lp-crumbs" aria-label={lang === "sv" ? "Brödsmulor" : "Breadcrumb"}>
            <a href={lang === "sv" ? "/" : "/en"}>{ui.home}</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{t.name}</span>
          </nav>
          <p className="kicker">{t.kicker}</p>
          <h1>{t.h1}</h1>
          <p className="lp-lead">{t.lead}</p>
          <div className="lp-btns">
            <ContactButton className="plan-btn main">{ui.btn}</ContactButton>
            <a className="lp-mail" href={`mailto:${site.email}`}>
              {ui.mail} {site.email}
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="sec lp-body">
          <div className="wrap lp-blocks">
            {t.blocks.map((b, i) => (
              <Reveal key={b.h} className="lp-block">
                <span className="lp-n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2>
                    <Words text={b.h} />
                  </h2>
                  {b.p.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                  {b.li ? (
                    <ul className="lp-list">
                      {b.li.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {demos.length ? (
          <section className="sec band lp-demos">
            <Reveal className="wrap">
              <header className="shead">
                <p className="kicker">{ui.demosKicker}</p>
                <h2>
                  <Words text={ui.demosTitle} />
                </h2>
              </header>
              <ul className="lp-demo-grid">
                {demos.map((p) => (
                  <li key={p.name} className="lp-demo" style={{ ["--bg" as string]: p.theme?.[0], ["--ac" as string]: p.theme?.[1] }}>
                    <a href={p.liveUrl} target="_blank" rel="noopener">
                      <span className={p.imageFit === "emblem" ? "lp-shot emblem" : "lp-shot"}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.image} alt="" loading="lazy" decoding="async" width={1100} height={688} />
                        <em>{ui.demoBadge}</em>
                      </span>
                      <span className="lp-demo-txt">
                        <b>{p.name}</b>
                        <small>{p.kind[lang]}</small>
                        <span className="lp-open">{ui.openDemo} ↗</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        ) : null}

        <section className="sec">
          <Reveal className="wrap faq">
            <header className="shead">
              <p className="kicker">{ui.faqKicker}</p>
              <h2>
                <Words text={ui.faqTitle} />
              </h2>
            </header>
            <div className="faq-list">
              {t.faq.map((it, i) => (
                <details key={it.q} className="faq-item" open={i === 0}>
                  <summary>
                    <h3>{it.q}</h3>
                    <span className="faq-icon" aria-hidden="true" />
                  </summary>
                  <p>{it.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="kontakt" className="sec lp-cta">
          <Reveal className="wrap lp-cta-in">
            <h2>
              <Words text={t.cta.h} />
            </h2>
            <p className="sub">{t.cta.p}</p>
            <ContactButton className="plan-btn main">{ui.btn}</ContactButton>
          </Reveal>
        </section>

        {related.length ? (
          <nav className="wrap lp-related" aria-label={ui.relatedKicker}>
            <p className="kicker">{ui.relatedKicker}</p>
            <ul>
              {related.map((r) => (
                <li key={r.id}>
                  <a href={landingPath(r, lang)}>
                    <b>{r[lang].name}</b>
                    <small>{r[lang].description}</small>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
