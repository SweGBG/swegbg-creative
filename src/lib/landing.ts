// Search landing pages ("sökordssidor"). One entry = one page in Swedish (/slug) and English (/en/slug).
// Each page targets one search intent so the pages don't compete with each other or with the start page.
// To add a page: add an entry below. Routes, sitemap, footer links and structured data pick it up automatically.
// Keep this file free of "@/" imports: next.config.ts reads the slugs from here.

export type LandingText = {
  /** URL segment. Swedish: /slug, English: /en/slug */
  slug: string;
  /** Short name used in breadcrumbs, footer and related links. */
  name: string;
  /** Search result title, ≈ 50–60 characters. */
  title: string;
  /** Search result text, ≈ 140–160 characters. */
  description: string;
  kicker: string;
  h1: string;
  lead: string;
  blocks: { h: string; p: string[]; li?: string[] }[];
  faq: { q: string; a: string }[];
  cta: { h: string; p: string };
};

export type Landing = {
  id: string;
  /** schema.org Service name this page offers (omit for guide pages). */
  service?: boolean;
  /** Demo projects (names from lib/site.ts) shown on the page. */
  demos?: string[];
  /** Ids of related pages linked at the bottom. */
  related: string[];
  sv: LandingText;
  en: LandingText;
};

export const landings: Landing[] = [
  /* ------------------------------------------------------------------ */
  {
    id: "billig-hemsida",
    service: true,
    demos: ["Proviant", "Coal is King", "Stålco"],
    related: ["vad-kostar-en-hemsida", "hemsidor-till-salu", "hemsida-hantverkare"],
    sv: {
      slug: "billig-hemsida",
      name: "Billig hemsida",
      title: "Billig hemsida för småföretag – från 4 999 kr | SweGBG",
      description:
        "Billig hemsida utan månadshyra: handbyggd, mobilanpassad och snabb, från 4 999 kr ex. moms. Du äger koden, domänen och kontona från dag ett.",
      kicker: "Billig hemsida · från 4 999 kr",
      h1: "Billig hemsida som du äger själv",
      lead:
        "En bra hemsida behöver inte kosta tiotusentals kronor, och den ska inte hyras månad för månad. Hos SweGBG får du en handbyggd sajt från 4 999 kr ex. moms – en gång – och sedan är den din.",
      blocks: [
        {
          h: "Vad ingår för 4 999 kr?",
          p: ["Paketet Start är gjort för småföretag som behöver synas på nätet utan att betala för saker de inte använder:"],
          li: [
            "Upp till fem sidor, till exempel start, tjänster, om oss, priser och kontakt",
            "Mobilanpassad och snabb – de flesta av dina kunder hittar dig via mobilen",
            "Kontaktformulär som skickar förfrågningar direkt till din mejl",
            "Hjälp med Google Företagsprofil så att du syns på kartan",
            "En ändringsrunda innan lansering",
          ],
        },
        {
          h: "Billig betyder inte mall",
          p: [
            "Många billiga hemsidor är en färdig mall med ditt namn inklistrat. Jag bygger varje sajt från grunden i Next.js, samma teknik som stora företag använder. Det gör sajten snabb, lätt för Google att läsa och enkel att bygga vidare på när verksamheten växer.",
            "Du pratar dessutom direkt med mig som bygger. Ingen säljare, ingen kundtjänst och inga mellanhänder som gör priset dyrare.",
          ],
        },
        {
          h: "Billigare än en sajtbyggare – räknat över tid",
          p: [
            "Wix, Squarespace och liknande ser billiga ut den första månaden. Men du betalar så länge sidan finns, och slutar du betala försvinner den. En sajt från SweGBG köper du en gång.",
            "Det enda du betalar löpande är din domän. För de flesta mindre företagssajter räcker gratisnivåerna hos Vercel (hosting) och Supabase (databas). Därför blir en egen sajt ofta billigare än en sajtbyggare redan efter något år.",
          ],
        },
        {
          h: "När räcker inte Start?",
          p: [
            "Tar du emot tidsbokningar, säljer varor på nätet eller vill ha en egen produktfilm passar paketen Bokning eller Signatur bättre. De offereras efter vad du behöver, och du ser alltid priset innan du bestämmer dig. Introduktionspriset 4 999 kr gäller de första kunderna.",
          ],
        },
      ],
      faq: [
        {
          q: "Vad är det billigaste sättet att skaffa en hemsida?",
          a: "Billigast den första månaden är en gratis sajtbyggare, men då betalar du med reklam, en låst design eller en månadsavgift som aldrig tar slut. Billigast över tid är oftast en egen sajt som du köper en gång och sedan bara betalar domänen för. Hos SweGBG kostar det från 4 999 kr ex. moms.",
        },
        {
          q: "Tillkommer det några månadskostnader?",
          a: "Jag tar ingen månadshyra. Domänen betalar du direkt till registraren, och för de flesta mindre sajter räcker gratisnivåerna hos Vercel och Supabase. Vill du ha löpande hjälp med ändringar kommer vi överens om det separat.",
        },
        {
          q: "Kan jag bygga ut sajten senare?",
          a: "Ja. Sajten är byggd för att växa: bokningssystem, webbutik, fler språk eller en egen produktfilm kan läggas till när du är redo, utan att du behöver börja om.",
        },
      ],
      cta: { h: "Vill du veta vad din hemsida skulle kosta?", p: "Berätta kort om verksamheten så får du svar inom 24 timmar, utan förpliktelser." },
    },
    en: {
      slug: "affordable-website",
      name: "Affordable website",
      title: "Affordable Website for Small Businesses – SEK 4,999 | SweGBG",
      description:
        "An affordable website with no monthly rent: hand-built, mobile-first and fast, from SEK 4,999 excl. VAT. You own the code, domain and accounts from day one.",
      kicker: "Affordable website · from SEK 4,999",
      h1: "An affordable website you actually own",
      lead:
        "A good website doesn't have to cost a fortune, and it shouldn't be rented month after month. With SweGBG you get a hand-built site from SEK 4,999 excl. VAT – once – and then it's yours.",
      blocks: [
        {
          h: "What do you get for SEK 4,999?",
          p: ["The Start package is made for small businesses that need to be found online without paying for things they don't use:"],
          li: [
            "Up to five pages, for example home, services, about, pricing and contact",
            "Mobile-first and fast – most of your customers find you on their phone",
            "A contact form that sends enquiries straight to your inbox",
            "Help with your Google Business Profile so you show up on the map",
            "One round of changes before launch",
          ],
        },
        {
          h: "Affordable doesn't mean a template",
          p: [
            "Many cheap websites are a ready-made template with your name pasted in. I build every site from scratch in Next.js, the same technology large companies use. That makes the site fast, easy for Google to read and simple to extend as the business grows.",
            "You also talk directly to me, the person building it. No sales team, no call centre and no middlemen pushing the price up.",
          ],
        },
        {
          h: "Cheaper than a site builder – over time",
          p: [
            "Wix, Squarespace and similar platforms look cheap in the first month. But you pay for as long as the site exists, and if you stop paying it disappears. A SweGBG site is bought once.",
            "The only ongoing cost is your domain. For most smaller business sites the free tiers at Vercel (hosting) and Supabase (database) are enough. That's why your own site often works out cheaper than a site builder within a year or so.",
          ],
        },
        {
          h: "When is Start not enough?",
          p: [
            "If you take appointments, sell products online or want an original product film, the Booking or Signature packages are a better fit. They are quoted based on what you need, and you always see the price before you decide. The SEK 4,999 introductory price applies to the first clients.",
          ],
        },
      ],
      faq: [
        {
          q: "What is the cheapest way to get a website?",
          a: "The cheapest option in month one is a free site builder, but you pay with ads, a locked design or a monthly fee that never ends. The cheapest option over time is usually your own site, bought once, where you only pay for the domain. With SweGBG that starts at SEK 4,999 excl. VAT.",
        },
        {
          q: "Are there any monthly costs?",
          a: "I don't charge monthly rent. You pay for the domain directly to the registrar, and for most smaller sites the free tiers at Vercel and Supabase are enough. If you want ongoing help with changes, we agree on that separately.",
        },
        {
          q: "Can I extend the site later?",
          a: "Yes. The site is built to grow: a booking system, online store, more languages or an original product film can be added when you're ready, without starting over.",
        },
      ],
      cta: { h: "Want to know what your website would cost?", p: "Tell me briefly about your business and you'll hear back within 24 hours, no strings attached." },
    },
  },

  /* ------------------------------------------------------------------ */
  {
    id: "hemsidor-till-salu",
    service: true,
    demos: ["SweProtein", "Botanicatural", "Pizzeria dell'Anima", "Proviant", "Coal is King", "Atilli Berg", "IronDäck", "HiTekk", "Stålco"],
    related: ["billig-hemsida", "hemsida-restaurang", "dropshipping"],
    sv: {
      slug: "hemsidor-till-salu",
      name: "Hemsidor till salu",
      title: "Färdiga hemsidor till salu – med ditt namn | SweGBG",
      description:
        "Färdiga hemsidor till salu: välj ett koncept för restaurang, butik, verkstad eller salong så bygger jag om det med ditt namn, din logga och dina färger.",
      kicker: "Hemsidor till salu · färdiga koncept",
      h1: "Färdiga hemsidor till salu",
      lead:
        "Vill du se din hemsida innan du betalar för den? Här är färdiga koncept för olika branscher. Välj det som passar, så bygger jag om det med ditt företagsnamn, din logga, dina texter och dina färger.",
      blocks: [
        {
          h: "Så fungerar det",
          p: ["Koncepten nedan är riktiga, fungerande sajter. Du köper inte en kopia av min demo – du får en egen version byggd för ditt företag:"],
          li: [
            "Du väljer ett koncept, eller blandar delar från flera",
            "Jag byter namn, logga, färger, texter och bilder till dina",
            "Du ser resultatet via en förhandslänk och tycker till",
            "Sajten går live på din domän och allt lämnas över till dig",
          ],
        },
        {
          h: "Snabbare och billigare än att börja från noll",
          p: [
            "Eftersom grunden redan är byggd och testad går det fortare. En enklare sajt i stil med Start-paketet kostar från 4 999 kr ex. moms. Koncept med bokningssystem, webbutik eller egen produktfilm offereras efter hur mycket som ska anpassas.",
          ],
        },
        {
          h: "Du äger sajten – och kan sälja den vidare",
          p: [
            "Koden hamnar i ditt eget GitHub-konto, domänen registreras i ditt namn och hosting- och databaskonton är dina från start. Det betyder att sajten följer med om du säljer företaget, och att du kan låta vem du vill jobba vidare med den. Hos plattformar som Wix eller Shopify hyr du bara.",
          ],
        },
        {
          h: "Hittar du inte din bransch?",
          p: [
            "Koncepten visar bredden, inte gränserna. Frisör, snickare, café, gym eller konsult – berätta vad du gör så bygger jag ett utkast med ditt eget företag innan du bestämmer dig.",
          ],
        },
      ],
      faq: [
        {
          q: "Är hemsidorna mallar?",
          a: "Nej. Varje koncept är handbyggt i Next.js och anpassas på riktigt: struktur, texter, bilder och funktioner ändras efter ditt företag. Du får ingen sajt som ser likadan ut som tio andra.",
        },
        {
          q: "Vad kostar en färdig hemsida?",
          a: "En enklare sajt kostar från 4 999 kr ex. moms (introduktionspris). Koncept med bokning, inloggning, webbutik eller egen film offereras, och du ser alltid priset innan du bestämmer dig.",
        },
        {
          q: "Hur snabbt kan sajten vara live?",
          a: "Det beror på hur mycket som ska anpassas och hur snabbt texter och bilder kommer på plats. En enklare sajt går ofta att lansera på några dagar till ett par veckor.",
        },
      ],
      cta: { h: "Hittade du ett koncept du gillar?", p: "Säg vilket, så visar jag hur det kan se ut med ditt företag. Svar inom 24 timmar." },
    },
    en: {
      slug: "websites-for-sale",
      name: "Websites for sale",
      title: "Ready-Made Websites for Sale – With Your Name | SweGBG",
      description:
        "Ready-made websites for sale: pick a concept for a restaurant, shop, workshop or salon and I rebuild it with your name, logo and colours. You own it all.",
      kicker: "Websites for sale · ready-made concepts",
      h1: "Ready-made websites for sale",
      lead:
        "Want to see your website before you pay for it? Here are ready-made concepts for different industries. Pick the one that fits and I rebuild it with your business name, logo, copy and colours.",
      blocks: [
        {
          h: "How it works",
          p: ["The concepts below are real, working sites. You don't buy a copy of my demo – you get your own version built for your business:"],
          li: [
            "You choose a concept, or mix parts from several",
            "I swap in your name, logo, colours, copy and images",
            "You review the result through a preview link",
            "The site goes live on your domain and everything is handed over to you",
          ],
        },
        {
          h: "Faster and cheaper than starting from zero",
          p: [
            "Because the foundation is already built and tested, it goes quicker. A simpler site along the lines of the Start package costs from SEK 4,999 excl. VAT. Concepts with booking systems, online stores or an original product film are quoted based on how much needs adapting.",
          ],
        },
        {
          h: "You own the site – and can sell it on",
          p: [
            "The code goes into your own GitHub account, the domain is registered in your name and the hosting and database accounts are yours from the start. So the site goes with the business if you sell it, and you can have anyone you like keep working on it. On platforms like Wix or Shopify you only rent.",
          ],
        },
        {
          h: "Can't find your industry?",
          p: [
            "The concepts show the range, not the limits. Hairdresser, carpenter, café, gym or consultant – tell me what you do and I'll build a draft with your own business before you decide.",
          ],
        },
      ],
      faq: [
        {
          q: "Are these websites templates?",
          a: "No. Each concept is hand-built in Next.js and genuinely adapted: structure, copy, images and features change to fit your business. You won't get a site that looks like ten others.",
        },
        {
          q: "How much does a ready-made website cost?",
          a: "A simpler site starts at SEK 4,999 excl. VAT (introductory price). Concepts with booking, login, an online store or original film are quoted, and you always see the price before you decide.",
        },
        {
          q: "How quickly can the site be live?",
          a: "It depends on how much needs adapting and how quickly copy and images are in place. A simpler site can often launch within a few days to a couple of weeks.",
        },
      ],
      cta: { h: "Found a concept you like?", p: "Tell me which one and I'll show you how it could look with your business. Reply within 24 hours." },
    },
  },

  /* ------------------------------------------------------------------ */
  {
    id: "bygga-egen-hemsida",
    demos: ["Proviant", "Atilli Berg"],
    related: ["billig-hemsida", "vad-kostar-en-hemsida", "digitalt-hantverk"],
    sv: {
      slug: "bygga-egen-hemsida",
      name: "Bygga egen hemsida",
      title: "Bygga egen hemsida – steg för steg-guide 2026 | SweGBG",
      description:
        "Så bygger du en egen hemsida: domän, plattform, struktur, texter, bilder och Google. En ärlig guide – och vad det kostar att låta någon göra det åt dig.",
      kicker: "Guide · bygga egen hemsida",
      h1: "Bygga egen hemsida – en ärlig guide",
      lead:
        "Du kan absolut bygga din hemsida själv. Här är stegen jag själv följer när jag bygger åt kunder, så att du vet vad som krävs – och kan avgöra om du vill göra det själv eller låta någon annan göra det.",
      blocks: [
        {
          h: "1. Skaffa en domän",
          p: [
            "Domänen är din adress på nätet, till exempel dittforetag.se. Registrera den i ditt eget namn hos en registrar, så att den alltid är din. Välj något kort som är lätt att säga i telefon och skriva rätt.",
          ],
        },
        {
          h: "2. Välj hur sajten ska byggas",
          p: ["Det finns i grunden tre vägar:"],
          li: [
            "Sajtbyggare (Wix, Squarespace): enklast att komma igång, men månadsavgift och du äger inte sajten",
            "WordPress: flexibelt, men kräver uppdateringar och tillägg som måste skötas",
            "Egen kod (till exempel Next.js): snabbast och mest flexibelt, men kräver att du kan programmera",
          ],
        },
        {
          h: "3. Planera sidorna innan du designar",
          p: [
            "Skriv ner vad en besökare vill veta: vad du gör, var du finns, vad det kostar och hur man når dig. För de flesta småföretag räcker fem sidor: start, tjänster, om oss, priser och kontakt. Varje sida ska ha ett tydligt mål, till exempel att få besökaren att ringa eller boka.",
          ],
        },
        {
          h: "4. Texter och bilder",
          p: [
            "Skriv som du pratar med en kund, och använd de ord dina kunder söker på. Använd egna bilder när du kan – stockbilder som konkurrenten också har gör dig anonym. Komprimera bilderna så att sajten laddar snabbt på mobilen.",
          ],
        },
        {
          h: "5. Synas på Google",
          p: [
            "Ge varje sida en egen titel och beskrivning, skapa en Google Företagsprofil och lägg in sajten i Google Search Console. Där ser du vilka sökord du syns på och om Google hittar alla sidor. Räkna med att det tar veckor till månader innan du rankar på konkurrensutsatta ord.",
          ],
        },
        {
          h: "Eller låt mig bygga den åt dig",
          p: [
            "Har du hellre tid över för ditt företag bygger jag sajten från 4 999 kr ex. moms. Du får samma resultat som stegen ovan, utan att lära dig verktygen – och du äger allt från dag ett, precis som om du hade byggt den själv.",
          ],
        },
      ],
      faq: [
        {
          q: "Hur lång tid tar det att bygga en egen hemsida?",
          a: "Med en sajtbyggare kan du ha något uppe på en helg. En sajt som ser proffsig ut, laddar snabbt och syns på Google tar för de flesta betydligt längre, eftersom texter, bilder och SEO tar tid att få rätt.",
        },
        {
          q: "Vilken plattform är bäst för att bygga en hemsida själv?",
          a: "Vill du komma igång snabbt utan kod är en sajtbyggare enklast. Vill du äga sajten och slippa månadsavgift är egen kod bäst, men den kräver kunskap eller att någon bygger åt dig.",
        },
        {
          q: "Måste jag kunna programmera?",
          a: "Inte för en sajtbyggare. För en egen, handbyggd sajt behövs programmering – det är där jag kommer in om du vill ha det resultatet utan att lära dig det själv.",
        },
      ],
      cta: { h: "Hellre slippa bygga själv?", p: "Berätta om ditt företag så får du ett första utkast med ditt eget namn innan du bestämmer dig." },
    },
    en: {
      slug: "build-your-own-website",
      name: "Build your own website",
      title: "Build Your Own Website – Step-by-Step Guide 2026 | SweGBG",
      description:
        "How to build your own website: domain, platform, structure, copy, images and Google. An honest guide – and what it costs to have someone build it for you.",
      kicker: "Guide · build your own website",
      h1: "Build your own website – an honest guide",
      lead:
        "You can absolutely build your website yourself. These are the steps I follow when I build for clients, so you know what it takes – and can decide whether to do it yourself or have someone else do it.",
      blocks: [
        {
          h: "1. Get a domain",
          p: [
            "The domain is your address online, for example yourbusiness.com. Register it in your own name with a registrar so it's always yours. Pick something short that's easy to say over the phone and spell correctly.",
          ],
        },
        {
          h: "2. Choose how the site is built",
          p: ["There are basically three routes:"],
          li: [
            "Site builder (Wix, Squarespace): easiest to start, but a monthly fee and you don't own the site",
            "WordPress: flexible, but needs updates and plugins that have to be maintained",
            "Custom code (e.g. Next.js): fastest and most flexible, but requires programming",
          ],
        },
        {
          h: "3. Plan the pages before you design",
          p: [
            "Write down what a visitor wants to know: what you do, where you are, what it costs and how to reach you. For most small businesses five pages are enough: home, services, about, pricing and contact. Each page needs a clear goal, such as getting the visitor to call or book.",
          ],
        },
        {
          h: "4. Copy and images",
          p: [
            "Write the way you talk to a customer, and use the words your customers search for. Use your own photos when you can – stock images your competitor also uses make you anonymous. Compress images so the site loads fast on phones.",
          ],
        },
        {
          h: "5. Get found on Google",
          p: [
            "Give every page its own title and description, create a Google Business Profile and add the site to Google Search Console. There you see which keywords you appear for and whether Google finds all your pages. Expect weeks to months before you rank for competitive terms.",
          ],
        },
        {
          h: "Or let me build it for you",
          p: [
            "If you'd rather spend your time on your business, I build the site from SEK 4,999 excl. VAT. You get the result of the steps above without learning the tools – and you own everything from day one, just as if you had built it yourself.",
          ],
        },
      ],
      faq: [
        {
          q: "How long does it take to build your own website?",
          a: "With a site builder you can have something up in a weekend. A site that looks professional, loads fast and gets found on Google takes most people considerably longer, because copy, images and SEO take time to get right.",
        },
        {
          q: "Which platform is best for building a website yourself?",
          a: "If you want to start quickly without code, a site builder is easiest. If you want to own the site and avoid monthly fees, custom code is best, but it requires the skills or someone to build it for you.",
        },
        {
          q: "Do I need to know how to code?",
          a: "Not for a site builder. For your own hand-built site you need programming – that's where I come in if you want that result without learning it yourself.",
        },
      ],
      cta: { h: "Rather not build it yourself?", p: "Tell me about your business and you'll get a first draft with your own name before you decide." },
    },
  },

  /* ------------------------------------------------------------------ */
  {
    id: "webbyra-sverige",
    service: true,
    demos: ["Botanicatural", "Pizzeria dell'Anima", "IronDäck"],
    related: ["webbyra-goteborg", "digitalt-hantverk", "hemsidor-till-salu"],
    sv: {
      slug: "webbyra-sverige",
      name: "Webbyrå i Sverige",
      title: "Webbyrå i Sverige – personlig och prisvärd | SweGBG",
      description:
        "SweGBG är en personlig webbyrå som bygger hemsidor, bokningssystem och webbutiker åt småföretag i hela Sverige. Från 4 999 kr, och du äger allt.",
      kicker: "Webbyrå · hela Sverige",
      h1: "Webbyrå i Sverige för småföretag",
      lead:
        "SweGBG är en liten webbyrå med bas i Göteborg som bygger åt företag i hela Sverige. Du får design, teknik och eget bildmaterial från en och samma person – och du pratar alltid direkt med den som bygger.",
      blocks: [
        {
          h: "Vad SweGBG bygger",
          p: [],
          li: [
            "Hemsidor och landningssidor för småföretag",
            "Bokningssystem med adminpanel, kundregister och påminnelser",
            "Webbutiker och B2B-flöden med offertlista",
            "Egna AI-produktfilmer utan licenser eller stockfilm",
            "SEO och AEO, så att både Google och AI-assistenter förstår ditt företag",
          ],
        },
        {
          h: "En webbyrå utan mellanhänder",
          p: [
            "På en större byrå går du ofta via säljare och projektledare innan du når den som bygger. Hos SweGBG finns ingen säljavdelning. Det gör det snabbare, billigare och mer personligt – och du vet alltid vem som ansvarar för din sajt.",
          ],
        },
        {
          h: "Distans fungerar – i hela landet",
          p: [
            "Möten sker över telefon eller video och du följer bygget via en förhandslänk som uppdateras löpande. Du kan sitta i Malmö, Stockholm eller Umeå och ändå se varje steg. Bor du i Göteborgsområdet tar vi gärna en kaffe.",
          ],
        },
        {
          h: "Du äger allt från dag ett",
          p: [
            "Koden ligger i ditt GitHub-konto, domänen står i ditt namn och hosting- och databaskonton är dina. Ingen inlåsning och ingen månadshyra till byrån. Vill du byta leverantör en dag tar du med dig allt.",
          ],
        },
      ],
      faq: [
        {
          q: "Hur mycket kostar det att anlita en webbyrå?",
          a: "Det varierar mycket mellan byråer. Hos SweGBG kostar en företagssajt från 4 999 kr ex. moms (introduktionspris). Bokningssystem, webbutik och egen film offereras efter behov, utan dolda avgifter.",
        },
        {
          q: "Jobbar ni med företag utanför Göteborg?",
          a: "Ja, med företag i hela Sverige. Allt kan skötas på distans via telefon, video och förhandslänk.",
        },
        {
          q: "Vilken teknik använder ni?",
          a: "Next.js, TypeScript och React för sajten, Supabase för databas och inloggning, Resend för mejl, Vercel för hosting och Figma för design. Samma moderna teknik som stora företag använder.",
        },
      ],
      cta: { h: "Letar du efter en webbyrå?", p: "Berätta vad du behöver så hör jag av mig inom 24 timmar, utan förpliktelser." },
    },
    en: {
      slug: "web-agency-sweden",
      name: "Web agency in Sweden",
      title: "Web Agency in Sweden – Personal and Affordable | SweGBG",
      description:
        "SweGBG is a personal web agency building websites, booking systems and online stores for small businesses across Sweden. From SEK 4,999, and you own it all.",
      kicker: "Web agency · all of Sweden",
      h1: "A web agency in Sweden for small businesses",
      lead:
        "SweGBG is a small web agency based in Gothenburg that builds for businesses all over Sweden. You get design, development and original imagery from one and the same person – and you always talk directly to the person building it.",
      blocks: [
        {
          h: "What SweGBG builds",
          p: [],
          li: [
            "Websites and landing pages for small businesses",
            "Booking systems with admin panel, client records and reminders",
            "Online stores and B2B flows with quote lists",
            "Original AI product films with no licences or stock footage",
            "SEO and AEO, so both Google and AI assistants understand your business",
          ],
        },
        {
          h: "A web agency without middlemen",
          p: [
            "At a larger agency you often go through sales people and project managers before reaching the person who builds. SweGBG has no sales department. That makes it faster, more affordable and more personal – and you always know who is responsible for your site.",
          ],
        },
        {
          h: "Remote works – across the country",
          p: [
            "Meetings happen by phone or video and you follow the build through a preview link that updates as I go. You can be in Malmö, Stockholm or Umeå and still see every step. If you're in the Gothenburg area, let's grab a coffee.",
          ],
        },
        {
          h: "You own everything from day one",
          p: [
            "The code lives in your GitHub account, the domain is in your name and the hosting and database accounts are yours. No lock-in and no monthly rent to the agency. If you ever switch provider, you take everything with you.",
          ],
        },
      ],
      faq: [
        {
          q: "How much does it cost to hire a web agency?",
          a: "It varies a lot between agencies. With SweGBG a business website starts at SEK 4,999 excl. VAT (introductory price). Booking systems, online stores and original film are quoted based on your needs, with no hidden fees.",
        },
        {
          q: "Do you work with businesses outside Gothenburg?",
          a: "Yes, with businesses all over Sweden. Everything can be handled remotely by phone, video and preview link.",
        },
        {
          q: "What technology do you use?",
          a: "Next.js, TypeScript and React for the site, Supabase for database and login, Resend for email, Vercel for hosting and Figma for design. The same modern technology large companies use.",
        },
      ],
      cta: { h: "Looking for a web agency?", p: "Tell me what you need and I'll get back to you within 24 hours, no strings attached." },
    },
  },

  /* ------------------------------------------------------------------ */
  {
    id: "webbyra-goteborg",
    service: true,
    demos: ["Coal is King", "Atilli Berg", "Proviant"],
    related: ["webbyra-sverige", "hemsida-hantverkare", "hemsida-restaurang"],
    sv: {
      slug: "webbyra-goteborg",
      name: "Webbyrå i Göteborg",
      title: "Webbyrå i Göteborg – hemsidor från 4 999 kr | SweGBG",
      description:
        "Lokal webbyrå i Göteborg: handbyggda hemsidor, bokningssystem och Google-profil åt småföretag. Vi ses gärna över en kaffe. Från 4 999 kr ex. moms.",
      kicker: "Webbyrå · Göteborg",
      h1: "Webbyrå i Göteborg",
      lead:
        "SweGBG har sin bas i Göteborg och bygger hemsidor åt företag i staden och runt om – från Hisingen och centrum till Mölndal, Partille, Kungälv och Kungsbacka. Lokalt, personligt och utan byråpriser.",
      blocks: [
        {
          h: "Lokal hjälp när du vill ses",
          p: [
            "Många företagare vill hellre prata över en kaffe än i ett videomöte. Bor du i Göteborgsområdet ses vi gärna, går igenom verksamheten och skissar på vad sajten ska göra. Resten av bygget följer du via en förhandslänk, i din egen takt.",
          ],
        },
        {
          h: "Syns när göteborgare söker",
          p: [
            "För ett lokalt företag är det viktigaste att synas när någon i närheten söker efter det du gör. Därför ingår hjälp med Google Företagsprofil i grundpaketet, och sajten byggs med strukturerad data som berättar för Google och AI-assistenter var du finns och vad du erbjuder.",
          ],
        },
        {
          h: "Vad jag bygger åt Göteborgsföretag",
          p: [],
          li: [
            "Hemsidor för hantverkare, butiker, restauranger och konsulter",
            "Bokningssystem för frisörer, salonger och verkstäder",
            "Menyer och bordsbokning för restauranger och caféer",
            "Webbutiker och B2B-sajter med offertförfrågan",
            "Svenska och engelska – bra för turister och internationella kunder",
          ],
        },
        {
          h: "Priser",
          p: [
            "En företagssajt kostar från 4 999 kr ex. moms (introduktionspris för de första kunderna). Bokning, webbutik och egen produktfilm offereras. Ingen månadshyra – du äger sajten.",
          ],
        },
      ],
      faq: [
        {
          q: "Var i Göteborg finns SweGBG?",
          a: "SweGBG är ett serviceföretag i Göteborg utan öppen butik. Vi ses där det passar dig, eller tar mötet över telefon eller video.",
        },
        {
          q: "Bygger ni hemsidor även utanför Göteborg?",
          a: "Ja. Basen är Göteborg, men jag bygger åt företag i hela Sverige på distans.",
        },
        {
          q: "Hjälper ni till med Google Företagsprofil?",
          a: "Ja, det ingår i paketet Start. En komplett profil gör att du syns på Google Maps och i lokala sökningar.",
        },
      ],
      cta: { h: "Ska vi ta en kaffe?", p: "Berätta om ditt företag så hör jag av mig inom 24 timmar." },
    },
    en: {
      slug: "web-agency-gothenburg",
      name: "Web agency in Gothenburg",
      title: "Web Agency in Gothenburg – Websites from SEK 4,999 | SweGBG",
      description:
        "A local web agency in Gothenburg: hand-built websites, booking systems and Google profiles for small businesses. Happy to meet for coffee. From SEK 4,999.",
      kicker: "Web agency · Gothenburg",
      h1: "Web agency in Gothenburg",
      lead:
        "SweGBG is based in Gothenburg and builds websites for businesses in the city and around it – from Hisingen and the centre to Mölndal, Partille, Kungälv and Kungsbacka. Local, personal and without agency prices.",
      blocks: [
        {
          h: "Local help when you want to meet",
          p: [
            "Many business owners would rather talk over coffee than in a video call. If you're in the Gothenburg area, let's meet, go through the business and sketch what the site should do. You follow the rest of the build through a preview link, at your own pace.",
          ],
        },
        {
          h: "Get found when locals search",
          p: [
            "For a local business, what matters most is showing up when someone nearby searches for what you do. That's why help with your Google Business Profile is included in the base package, and the site is built with structured data that tells Google and AI assistants where you are and what you offer.",
          ],
        },
        {
          h: "What I build for Gothenburg businesses",
          p: [],
          li: [
            "Websites for tradespeople, shops, restaurants and consultants",
            "Booking systems for hairdressers, salons and workshops",
            "Menus and table booking for restaurants and cafés",
            "Online stores and B2B sites with quote requests",
            "Swedish and English – great for tourists and international customers",
          ],
        },
        {
          h: "Pricing",
          p: [
            "A business website starts at SEK 4,999 excl. VAT (introductory price for the first clients). Booking, online stores and original product film are quoted. No monthly rent – you own the site.",
          ],
        },
      ],
      faq: [
        {
          q: "Where in Gothenburg is SweGBG?",
          a: "SweGBG is a service business in Gothenburg without a public storefront. We meet wherever suits you, or by phone or video.",
        },
        {
          q: "Do you build websites outside Gothenburg too?",
          a: "Yes. The base is Gothenburg, but I build for businesses all over Sweden remotely.",
        },
        {
          q: "Do you help with Google Business Profile?",
          a: "Yes, it's included in the Start package. A complete profile gets you onto Google Maps and into local searches.",
        },
      ],
      cta: { h: "Shall we grab a coffee?", p: "Tell me about your business and I'll get back to you within 24 hours." },
    },
  },

  /* ------------------------------------------------------------------ */
  {
    id: "hemsida-hantverkare",
    service: true,
    demos: ["IronDäck", "Stålco"],
    related: ["billig-hemsida", "bokningssystem", "webbyra-goteborg"],
    sv: {
      slug: "hemsida-hantverkare",
      name: "Hemsida för hantverkare",
      title: "Hemsida för hantverkare och byggfirmor | SweGBG",
      description:
        "Hemsida för snickare, elektriker, rörmokare, målare och byggfirmor: tjänster, bilder från jobben och offertförfrågan direkt i mobilen. Från 4 999 kr.",
      kicker: "Hemsida · hantverkare och bygg",
      h1: "Hemsida för hantverkare",
      lead:
        "Du är bra på ditt hantverk – din hemsida ska visa det. Jag bygger sajter för snickare, elektriker, rörmokare, målare och byggfirmor som gör det enkelt för kunden att förstå vad du gör och be om en offert.",
      blocks: [
        {
          h: "Det en hantverkarsajt behöver",
          p: [],
          li: [
            "Tydlig lista över tjänster och var du jobbar",
            "Bilder från riktiga jobb – det säljer mer än något annat",
            "Offertförfrågan där kunden kan beskriva jobbet och bifoga bilder",
            "Info om ROT-avdrag, så att kunden förstår vad det faktiskt kostar",
            "Telefonnummer och kontakt som syns direkt i mobilen",
          ],
        },
        {
          h: "Byggd för mobilen – där dina kunder söker",
          p: [
            "Den som har en läcka eller ska renovera badrummet söker oftast på mobilen. Sajten laddar snabbt även på dålig täckning, och de viktigaste knapparna – ring och begär offert – finns alltid nära tummen.",
          ],
        },
        {
          h: "Syns lokalt på Google",
          p: [
            "Hjälp med Google Företagsprofil ingår, så att du syns på kartan när någon söker efter en hantverkare i närheten. Sajten berättar dessutom för Google vilka orter du jobbar i, vilket hjälper dig i lokala sökningar.",
          ],
        },
        {
          h: "Pris",
          p: [
            "En hantverkarsajt med upp till fem sidor kostar från 4 999 kr ex. moms (introduktionspris). Vill du att kunder ska kunna boka platsbesök direkt i en kalender bygger jag in ett bokningssystem – det offereras separat.",
          ],
        },
      ],
      faq: [
        {
          q: "Behöver en hantverkare verkligen en hemsida?",
          a: "Många nya kunder kollar upp dig innan de ringer. En hemsida med bilder från dina jobb och tydliga tjänster gör att du ser seriös ut och väljs före konkurrenten – även om de hittade dig via rekommendation.",
        },
        {
          q: "Kan kunder skicka bilder med offertförfrågan?",
          a: "Ja, offertformuläret kan byggas så att kunden beskriver jobbet och bifogar bilder, så att du kan ge ett bättre svar direkt.",
        },
        {
          q: "Kan jag uppdatera bilderna själv?",
          a: "Det går att bygga en enkel adminpanel där du lägger upp nya jobbilder själv. Annars skickar du bilderna till mig så lägger jag in dem.",
        },
      ],
      cta: { h: "Vill du ha fler offertförfrågningar?", p: "Berätta vad du jobbar med och var, så visar jag hur din sajt kan se ut." },
    },
    en: {
      slug: "website-for-tradespeople",
      name: "Website for tradespeople",
      title: "Website for Tradespeople and Builders | SweGBG",
      description:
        "Websites for carpenters, electricians, plumbers, painters and builders: services, photos of your work and quote requests straight from a phone. From SEK 4,999.",
      kicker: "Website · trades and construction",
      h1: "Website for tradespeople",
      lead:
        "You're great at your trade – your website should show it. I build sites for carpenters, electricians, plumbers, painters and construction firms that make it easy for customers to understand what you do and ask for a quote.",
      blocks: [
        {
          h: "What a tradesperson's site needs",
          p: [],
          li: [
            "A clear list of services and the areas you cover",
            "Photos from real jobs – nothing sells better",
            "Quote requests where customers describe the job and attach photos",
            "Information about the Swedish ROT tax deduction, so customers understand the real cost",
            "Phone number and contact visible straight away on mobile",
          ],
        },
        {
          h: "Built for mobile – where your customers search",
          p: [
            "Someone with a leak or planning a bathroom renovation usually searches on their phone. The site loads fast even on poor coverage, and the key buttons – call and request a quote – are always close to the thumb.",
          ],
        },
        {
          h: "Get found locally on Google",
          p: [
            "Help with your Google Business Profile is included, so you show up on the map when someone searches for a tradesperson nearby. The site also tells Google which towns you work in, which helps in local searches.",
          ],
        },
        {
          h: "Price",
          p: [
            "A tradesperson's site with up to five pages starts at SEK 4,999 excl. VAT (introductory price). If you want customers to book site visits straight into a calendar, I build in a booking system – quoted separately.",
          ],
        },
      ],
      faq: [
        {
          q: "Does a tradesperson really need a website?",
          a: "Many new customers look you up before they call. A website with photos of your work and clear services makes you look serious and get picked over the competition – even when they found you through a recommendation.",
        },
        {
          q: "Can customers send photos with a quote request?",
          a: "Yes, the quote form can let customers describe the job and attach photos, so you can give a better answer right away.",
        },
        {
          q: "Can I update the photos myself?",
          a: "A simple admin panel can be built where you upload new job photos yourself. Otherwise you send me the photos and I add them.",
        },
      ],
      cta: { h: "Want more quote requests?", p: "Tell me what you do and where, and I'll show you how your site could look." },
    },
  },

  /* ------------------------------------------------------------------ */
  {
    id: "bokningssystem",
    service: true,
    demos: ["Atilli Berg", "IronDäck"],
    related: ["hemsida-restaurang", "hemsida-hantverkare", "vad-kostar-en-hemsida"],
    sv: {
      slug: "bokningssystem",
      name: "Bokningssystem",
      title: "Bokningssystem på din hemsida – utan månadsavgift | SweGBG",
      description:
        "Eget bokningssystem för frisör, salong, verkstad eller hantverkare: onlinebokning dygnet runt, adminpanel, kundregister och påminnelser. Du äger det.",
      kicker: "Bokningssystem · egen lösning",
      h1: "Bokningssystem på din egen hemsida",
      lead:
        "Låt kunderna boka själva dygnet runt – direkt på din sajt, med ditt varumärke, utan en bokningsplattform som tar betalt varje månad. Du får adminpanel, kundregister och automatiska påminnelser.",
      blocks: [
        {
          h: "Det här ingår",
          p: [],
          li: [
            "Onlinebokning där kunden väljer tjänst, personal och tid",
            "Adminpanel med dagens schema och alla bokningar",
            "Kundregister med historik",
            "Bekräftelser och påminnelser via mejl, så att färre uteblir",
            "Mina sidor där kunden kan se och avboka sina tider",
          ],
        },
        {
          h: "Passar alla som tar emot tider",
          p: [
            "Frisörer, barberare, salonger, massörer, däckverkstäder, bilverkstäder, tränare och hantverkare som bokar platsbesök. Flödet byggs efter hur just du jobbar – hur långa tjänsterna är, hur många som jobbar och vilka tider du har öppet.",
          ],
        },
        {
          h: "Egen lösning istället för plattform",
          p: [
            "Bokningsplattformar tar ofta en månadsavgift per anställd, och dina kunder hamnar i deras system. Med ett eget system ligger databasen i ditt eget Supabase-konto och mejlen skickas via ditt eget Resend-konto. Kunderna är dina, och för de flesta mindre verksamheter räcker gratisnivåerna.",
          ],
        },
        {
          h: "Testa innan du bestämmer dig",
          p: [
            "Demosajterna nedan har riktiga bokningsflöden. IronDäck har dessutom ett demokonto så att du kan logga in och se både kundens och verkstadens vy. Bokningssystem offereras efter hur mycket som ska anpassas.",
          ],
        },
      ],
      faq: [
        {
          q: "Vad kostar ett eget bokningssystem?",
          a: "Det offereras efter dina behov, eftersom antal tjänster, personal och funktioner varierar. Du betalar en gång och har ingen månadsavgift till mig. Du ser alltid priset innan du bestämmer dig.",
        },
        {
          q: "Kan kunderna betala när de bokar?",
          a: "Ja, betalning kan kopplas in, till exempel via Stripe, om du vill ta betalt eller en deposition vid bokning.",
        },
        {
          q: "Kan jag flytta mina befintliga kunder?",
          a: "Oftast ja. Kan du exportera kundlistan från ditt nuvarande system kan den importeras till ditt nya kundregister.",
        },
      ],
      cta: { h: "Vill du att kunderna bokar själva?", p: "Berätta hur du tar emot bokningar i dag, så föreslår jag ett upplägg." },
    },
    en: {
      slug: "booking-system",
      name: "Booking system",
      title: "Booking System on Your Website – No Monthly Fee | SweGBG",
      description:
        "Your own booking system for salons, barbers, workshops or tradespeople: online booking around the clock, admin panel, client records and reminders. You own it.",
      kicker: "Booking system · your own",
      h1: "A booking system on your own website",
      lead:
        "Let customers book themselves around the clock – right on your site, with your brand, without a booking platform charging you every month. You get an admin panel, client records and automatic reminders.",
      blocks: [
        {
          h: "What's included",
          p: [],
          li: [
            "Online booking where customers pick a service, staff member and time",
            "Admin panel with today's schedule and all bookings",
            "Client records with history",
            "Confirmations and reminders by email, so fewer no-shows",
            "A customer portal where clients can see and cancel their bookings",
          ],
        },
        {
          h: "For anyone who takes appointments",
          p: [
            "Hairdressers, barbers, salons, massage therapists, tyre and car workshops, trainers and tradespeople booking site visits. The flow is built around how you work – how long services take, how many people work and your opening hours.",
          ],
        },
        {
          h: "Your own system instead of a platform",
          p: [
            "Booking platforms often charge a monthly fee per employee, and your customers end up in their system. With your own system the database lives in your own Supabase account and emails go out through your own Resend account. The customers are yours, and for most smaller businesses the free tiers are enough.",
          ],
        },
        {
          h: "Try before you decide",
          p: [
            "The demo sites below have real booking flows. IronDäck even has a demo account so you can log in and see both the customer's and the workshop's view. Booking systems are quoted based on how much needs adapting.",
          ],
        },
      ],
      faq: [
        {
          q: "How much does a custom booking system cost?",
          a: "It's quoted based on your needs, since the number of services, staff and features varies. You pay once with no monthly fee to me, and you always see the price before you decide.",
        },
        {
          q: "Can customers pay when they book?",
          a: "Yes, payments can be added, for example through Stripe, if you want to charge in full or take a deposit at booking.",
        },
        {
          q: "Can I move my existing customers over?",
          a: "Usually yes. If you can export the customer list from your current system, it can be imported into your new client records.",
        },
      ],
      cta: { h: "Want customers to book themselves?", p: "Tell me how you take bookings today and I'll suggest a setup." },
    },
  },

  /* ------------------------------------------------------------------ */
  {
    id: "hemsida-restaurang",
    service: true,
    demos: ["Pizzeria dell'Anima", "Coal is King", "Proviant"],
    related: ["hemsidor-till-salu", "bokningssystem", "digitalt-hantverk"],
    sv: {
      slug: "hemsida-restaurang",
      name: "Hemsida för restaurang",
      title: "Hemsida för restaurang – meny och bordsbokning | SweGBG",
      description:
        "Hemsida för restaurang, café eller bar: meny, bordsbokning, öppettider och egen matfilm, på svenska och engelska. Syns på Google och hos AI-assistenter.",
      kicker: "Hemsida · restaurang och café",
      h1: "Hemsida för restaurang och café",
      lead:
        "Gästen bestämmer sig ofta på några sekunder, i mobilen, på väg någonstans. Din sajt ska visa maten, menyn och öppettiderna direkt – och göra det lätt att boka bord.",
      blocks: [
        {
          h: "Det en restaurangsajt behöver",
          p: [],
          li: [
            "Meny som är lätt att uppdatera, med filter för till exempel vegetariskt och glutenfritt",
            "Bordsbokning direkt på sajten",
            "Öppettider, adress och karta som syns direkt",
            "Svenska och engelska för turister och internationella gäster",
            "Strukturerad data så att Google och AI-assistenter kan svara på frågor om dig",
          ],
        },
        {
          h: "Egen matfilm – utan stockfilm",
          p: [
            "Jag skapar egna filmer med AI (MiniMax H3) som kan spolas fram med scrollen, till exempel en pizza som går från deg till färdig. Inga licenser, inga upphovsrättsproblem och ingen film som konkurrenten också använder. Du får använda den i sociala medier och reklam.",
          ],
        },
        {
          h: "Snabb på mobilen",
          p: [
            "Tunga bilder och filmer får inte göra sajten långsam. Filmer anpassas för mobilen och animationerna är handskriven CSS, så att sajten laddar snabbt även på dålig täckning.",
          ],
        },
        {
          h: "Pris",
          p: [
            "En enklare restaurangsajt med meny, öppettider och kontakt kostar från 4 999 kr ex. moms. Bordsbokning, onlinebeställning och egen film offereras.",
          ],
        },
      ],
      faq: [
        {
          q: "Kan jag uppdatera menyn själv?",
          a: "Ja, menyn kan läggas i en enkel adminpanel där du ändrar rätter och priser själv, eller så skickar du ändringarna till mig.",
        },
        {
          q: "Kan gäster beställa mat på sajten?",
          a: "Ja, onlinebeställning med betalning kan byggas in. Det offereras efter hur upplägget ska se ut, till exempel avhämtning eller utkörning.",
        },
        {
          q: "Behöver jag en egen film?",
          a: "Nej, det är ett tillval. Men en film på din egen mat får sajten att sticka ut och kan återanvändas i sociala medier.",
        },
      ],
      cta: { h: "Ska vi duka upp din nya sajt?", p: "Berätta om din restaurang så får du ett första utkast med ditt eget namn." },
    },
    en: {
      slug: "restaurant-website",
      name: "Restaurant website",
      title: "Restaurant Website – Menu and Table Booking | SweGBG",
      description:
        "A website for your restaurant, café or bar: menu, table booking, opening hours and original food film, in Swedish and English. Found on Google and by AI assistants.",
      kicker: "Website · restaurants and cafés",
      h1: "Website for restaurants and cafés",
      lead:
        "Guests often decide in a few seconds, on their phone, on the way somewhere. Your site should show the food, menu and opening hours straight away – and make booking a table easy.",
      blocks: [
        {
          h: "What a restaurant site needs",
          p: [],
          li: [
            "A menu that's easy to update, with filters for vegetarian, gluten-free and more",
            "Table booking right on the site",
            "Opening hours, address and map visible straight away",
            "Swedish and English for tourists and international guests",
            "Structured data so Google and AI assistants can answer questions about you",
          ],
        },
        {
          h: "Original food film – no stock footage",
          p: [
            "I create original films with AI (MiniMax H3) that can be scrubbed with the scroll, like a pizza going from dough to finished. No licences, no copyright issues and no footage your competitor uses too. You can use it on social media and in ads.",
          ],
        },
        {
          h: "Fast on mobile",
          p: [
            "Heavy images and films mustn't slow the site down. Films are adapted for mobile and the animations are hand-written CSS, so the site loads quickly even on poor coverage.",
          ],
        },
        {
          h: "Price",
          p: [
            "A simpler restaurant site with menu, opening hours and contact starts at SEK 4,999 excl. VAT. Table booking, online ordering and original film are quoted.",
          ],
        },
      ],
      faq: [
        {
          q: "Can I update the menu myself?",
          a: "Yes, the menu can live in a simple admin panel where you change dishes and prices yourself, or you send the changes to me.",
        },
        {
          q: "Can guests order food on the site?",
          a: "Yes, online ordering with payment can be built in. It's quoted based on the setup, for example takeaway or delivery.",
        },
        {
          q: "Do I need an original film?",
          a: "No, it's optional. But a film of your own food makes the site stand out and can be reused on social media.",
        },
      ],
      cta: { h: "Shall we set the table for your new site?", p: "Tell me about your restaurant and you'll get a first draft with your own name." },
    },
  },

  /* ------------------------------------------------------------------ */
  {
    id: "dropshipping",
    service: true,
    demos: ["HiTekk", "SweProtein", "Botanicatural"],
    related: ["hemsidor-till-salu", "vad-kostar-en-hemsida", "lab"],
    sv: {
      slug: "dropshipping",
      name: "Dropshipping-butik",
      title: "Dropshipping-butik – egen webbutik utan Shopify-hyra | SweGBG",
      description:
        "Starta dropshipping med en egen, handbyggd webbutik: produktsidor, varukorg, betalning via Stripe och egen produktfilm. Ingen plattformshyra, du äger butiken.",
      kicker: "Webbutik · dropshipping",
      h1: "Dropshipping-butik som du äger",
      lead:
        "Inom dropshipping säljer många samma produkter. Det som skiljer dig från konkurrenten är butiken, bilderna och förtroendet. Jag bygger en egen webbutik som ser ut som ett riktigt varumärke – inte som en mall till.",
      blocks: [
        {
          h: "Vad jag bygger",
          p: [],
          li: [
            "Produktsidor, kategorier, filter och varukorg",
            "Betalning via Stripe (kort, Apple Pay och Google Pay)",
            "Orderbekräftelser via mejl",
            "Egna produktfilmer och bilder skapade med AI – inte leverantörens bilder som alla andra använder",
            "Svenska och engelska om du vill sälja utanför Sverige",
          ],
        },
        {
          h: "Egen butik eller Shopify?",
          p: [
            "Shopify är snabbt att komma igång med, men du betalar månadsavgift, ofta tillägg för appar, och butiken går inte att ta med sig. En egen butik kostar mer i början men har ingen plattformshyra – du betalar bara Stripes avgift per köp. Ju mer du säljer, desto mer lönar det sig att äga.",
          ],
        },
        {
          h: "Det här står du för",
          p: [
            "Jag bygger tekniken och designen. Du väljer produkter och leverantör, sätter priser och ansvarar för villkoren mot kunden – till exempel leveranstider, ångerrätt och reklamationer enligt svensk lag. Har din leverantör ett API kan jag koppla in produkter och lager automatiskt; annars läggs produkterna in via en adminpanel.",
          ],
        },
        {
          h: "Pris",
          p: [
            "En webbutik offereras efter antal produkter, integrationer och om du vill ha egen film. Du ser alltid priset innan du bestämmer dig, och du äger koden, domänen och kontona.",
          ],
        },
      ],
      faq: [
        {
          q: "Är dropshipping lagligt i Sverige?",
          a: "Ja, men du är säljaren och har samma ansvar som en vanlig butik: tydliga villkor, korrekt information om leveranstid, ångerrätt och reklamationsrätt. Långa leveranstider från utlandet måste framgå tydligt.",
        },
        {
          q: "Kan ni koppla butiken till min leverantör?",
          a: "Om leverantören har ett API kan produkter, priser och lager hämtas automatiskt. Annars hanteras produkterna i en adminpanel.",
        },
        {
          q: "Hjälper ni till att välja produkter?",
          a: "Nej, produktval och leverantör är ditt beslut. Jag hjälper dig att presentera produkterna så att de säljer.",
        },
      ],
      cta: { h: "Ska vi bygga din butik?", p: "Berätta vad du vill sälja så föreslår jag ett upplägg och ett pris." },
    },
    en: {
      slug: "dropshipping-store",
      name: "Dropshipping store",
      title: "Dropshipping Store – Your Own Shop, No Shopify Rent | SweGBG",
      description:
        "Start dropshipping with your own hand-built online store: product pages, cart, Stripe payments and original product film. No platform rent – you own the store.",
      kicker: "Online store · dropshipping",
      h1: "A dropshipping store you own",
      lead:
        "In dropshipping, many sellers offer the same products. What sets you apart is the store, the imagery and the trust. I build your own online store that looks like a real brand – not one more template.",
      blocks: [
        {
          h: "What I build",
          p: [],
          li: [
            "Product pages, categories, filters and cart",
            "Payments through Stripe (cards, Apple Pay and Google Pay)",
            "Order confirmations by email",
            "Original product films and images made with AI – not the supplier photos everyone else uses",
            "Swedish and English if you want to sell outside Sweden",
          ],
        },
        {
          h: "Your own store or Shopify?",
          p: [
            "Shopify is quick to start with, but you pay a monthly fee, often extra for apps, and you can't take the store with you. Your own store costs more up front but has no platform rent – you only pay Stripe's fee per sale. The more you sell, the more owning pays off.",
          ],
        },
        {
          h: "What you're responsible for",
          p: [
            "I build the technology and design. You choose products and supplier, set prices and are responsible for the terms with your customers – such as delivery times, right of withdrawal and complaints under Swedish law. If your supplier has an API I can sync products and stock automatically; otherwise products are added through an admin panel.",
          ],
        },
        {
          h: "Price",
          p: [
            "An online store is quoted based on the number of products, integrations and whether you want original film. You always see the price before you decide, and you own the code, domain and accounts.",
          ],
        },
      ],
      faq: [
        {
          q: "Is dropshipping legal in Sweden?",
          a: "Yes, but you are the seller and have the same responsibilities as a regular shop: clear terms, accurate delivery information, right of withdrawal and the right to complain. Long delivery times from abroad must be stated clearly.",
        },
        {
          q: "Can you connect the store to my supplier?",
          a: "If the supplier has an API, products, prices and stock can be fetched automatically. Otherwise products are managed in an admin panel.",
        },
        {
          q: "Do you help choose products?",
          a: "No, product choice and supplier are your decision. I help you present the products so they sell.",
        },
      ],
      cta: { h: "Shall we build your store?", p: "Tell me what you want to sell and I'll suggest a setup and a price." },
    },
  },

  /* ------------------------------------------------------------------ */
  {
    id: "vad-kostar-en-hemsida",
    related: ["billig-hemsida", "bygga-egen-hemsida", "bokningssystem"],
    sv: {
      slug: "vad-kostar-en-hemsida",
      name: "Vad kostar en hemsida?",
      title: "Vad kostar en hemsida 2026? Priser förklarade | SweGBG",
      description:
        "Vad kostar en hemsida? Jämför sajtbyggare, frilansare och webbyrå, se vad som påverkar priset och vilka löpande kostnader du ska räkna med.",
      kicker: "Guide · vad kostar en hemsida",
      h1: "Vad kostar en hemsida?",
      lead:
        "Svaret beror på vad sajten ska göra och om du hyr eller äger den. Här är vad som påverkar priset, vilka löpande kostnader som finns och vad det kostar hos SweGBG.",
      blocks: [
        {
          h: "Tre sätt att skaffa en hemsida",
          p: [],
          li: [
            "Sajtbyggare (Wix, Squarespace m.fl.): låg startkostnad, men månadsavgift så länge sidan finns",
            "Frilansare eller liten byrå: engångskostnad, ofta mer personligt och flexibelt",
            "Större webbyrå: ofta betydligt dyrare, med projektledning och fler inblandade",
          ],
        },
        {
          h: "Vad påverkar priset?",
          p: ["Det som driver kostnaden är sällan antalet sidor, utan vad sajten ska kunna:"],
          li: [
            "Bokningssystem, inloggning eller kundportal",
            "Webbutik med betalning och lager",
            "Flera språk",
            "Egen design, animationer och film istället för mall och stockbilder",
            "Hur mycket text och bild du själv tar fram",
          ],
        },
        {
          h: "Löpande kostnader att räkna med",
          p: [
            "Domänen kostar en mindre summa per år. Hosting kan vara gratis för mindre sajter (till exempel Vercels gratisnivå), medan sajtbyggare och vissa byråer tar en månadsavgift. Fråga alltid vad som händer med sajten om du slutar betala – hos en plattform försvinner den, hos SweGBG är den din.",
          ],
        },
        {
          h: "Vad kostar en hemsida hos SweGBG?",
          p: [
            "Paketet Start kostar 4 999 kr ex. moms (introduktionspris) och innehåller upp till fem sidor, mobilanpassning, kontaktformulär och hjälp med Google-profil. Paketen Bokning och Signatur offereras efter behov. Ingen månadshyra till mig och inga dolda avgifter.",
          ],
        },
      ],
      faq: [
        {
          q: "Vad kostar en enkel hemsida för ett småföretag?",
          a: "Hos SweGBG kostar en enkel företagssajt med upp till fem sidor 4 999 kr ex. moms som engångskostnad. Därtill kommer bara din domän.",
        },
        {
          q: "Är det dyrare att äga sin hemsida än att hyra den?",
          a: "Startkostnaden är oftast högre, men månadsavgiften försvinner. Över några år blir det ofta billigare att äga – och sajten är din även om du pausar företaget.",
        },
        {
          q: "Vad kostar ett bokningssystem eller en webbutik?",
          a: "Det beror på omfattningen och offereras därför. Du ser alltid priset innan du bestämmer dig.",
        },
      ],
      cta: { h: "Vill du ha ett exakt pris?", p: "Berätta vad sajten ska kunna så får du ett prisförslag inom 24 timmar." },
    },
    en: {
      slug: "website-cost",
      name: "How much does a website cost?",
      title: "How Much Does a Website Cost? Prices Explained | SweGBG",
      description:
        "How much does a website cost? Compare site builders, freelancers and agencies, see what drives the price and which ongoing costs to expect.",
      kicker: "Guide · website cost",
      h1: "How much does a website cost?",
      lead:
        "It depends on what the site needs to do and whether you rent or own it. Here's what affects the price, which ongoing costs exist and what it costs with SweGBG.",
      blocks: [
        {
          h: "Three ways to get a website",
          p: [],
          li: [
            "Site builder (Wix, Squarespace etc.): low start-up cost, but a monthly fee for as long as the site exists",
            "Freelancer or small agency: one-off cost, often more personal and flexible",
            "Larger agency: often considerably more expensive, with project management and more people involved",
          ],
        },
        {
          h: "What drives the price?",
          p: ["What drives cost is rarely the number of pages, but what the site has to do:"],
          li: [
            "Booking system, login or customer portal",
            "Online store with payments and stock",
            "Multiple languages",
            "Custom design, animation and film instead of templates and stock images",
            "How much copy and imagery you provide yourself",
          ],
        },
        {
          h: "Ongoing costs to expect",
          p: [
            "The domain costs a small amount per year. Hosting can be free for smaller sites (for example Vercel's free tier), while site builders and some agencies charge a monthly fee. Always ask what happens to the site if you stop paying – on a platform it disappears, with SweGBG it's yours.",
          ],
        },
        {
          h: "What does a website cost with SweGBG?",
          p: [
            "The Start package is SEK 4,999 excl. VAT (introductory price) and includes up to five pages, mobile-first design, a contact form and help with your Google profile. The Booking and Signature packages are quoted based on your needs. No monthly rent to me and no hidden fees.",
          ],
        },
      ],
      faq: [
        {
          q: "How much does a simple small business website cost?",
          a: "With SweGBG a simple business site with up to five pages is SEK 4,999 excl. VAT as a one-off cost. The only addition is your domain.",
        },
        {
          q: "Is owning a website more expensive than renting one?",
          a: "The start-up cost is usually higher, but the monthly fee disappears. Over a few years owning often works out cheaper – and the site stays yours even if you pause the business.",
        },
        {
          q: "How much does a booking system or online store cost?",
          a: "It depends on the scope and is therefore quoted. You always see the price before you decide.",
        },
      ],
      cta: { h: "Want an exact price?", p: "Tell me what the site needs to do and you'll get a quote within 24 hours." },
    },
  },

  /* ------------------------------------------------------------------ */
  {
    id: "digitalt-hantverk",
    demos: ["SweProtein", "Pizzeria dell'Anima", "Proviant"],
    related: ["webbyra-sverige", "lab", "hemsidor-till-salu"],
    sv: {
      slug: "digitalt-hantverk",
      name: "Digitalt hantverk",
      title: "Digitalt hantverk – hemsidor byggda för hand | SweGBG",
      description:
        "Digitalt hantverk från Göteborg: hemsidor byggda för hand, handskrivna CSS-animationer och egna AI-filmer. Inga mallar – varje detalj gjord för ditt företag.",
      kicker: "Digitalt hantverk · filosofin",
      h1: "Digitalt hantverk",
      lead:
        "En snickare som bygger ett kök på plats gör det annorlunda än ett platta-paket från varuhuset. Samma sak gäller hemsidor. Digitalt hantverk betyder att varje sajt byggs för hand, för just ditt företag.",
      blocks: [
        {
          h: "Inte ur en mall",
          p: [
            "De flesta hemsidor i dag bygger på samma mallar, och det syns. Jag skissar i Figma, skriver koden från grunden och formar sajten efter ditt varumärke – dina färger, din logga, ditt sätt att prata med kunder.",
          ],
        },
        {
          h: "Tre hantverk under ett tak",
          p: [],
          li: [
            "Webbdesign och animation: handskriven CSS som laddar snabbt, utan tunga bibliotek",
            "Teknik: bokning, inloggning, adminpaneler och webbutiker i Next.js och Supabase",
            "Film och bild: egna produktfilmer skapade med AI, fria från licenser",
          ],
        },
        {
          h: "Detaljerna som märks",
          p: [
            "En logga som materialiseras när sidan laddar. En film som spolas fram när du scrollar. Text som är skriven för de ord dina kunder faktiskt söker på. Snabb laddning även på en gammal mobil. Det är summan av små beslut som gör att besökaren stannar.",
          ],
        },
        {
          h: "Ett hantverk som du äger",
          p: [
            "Ett möbelsnickeri lämnar inte kvar ett lås på köksluckorna. På samma sätt får du koden, domänen och kontona. Sajten är din, och du kan låta vem du vill jobba vidare med den.",
          ],
        },
      ],
      faq: [
        {
          q: "Vad betyder digitalt hantverk?",
          a: "Att en hemsida byggs för hand från grunden istället för att sättas ihop av en färdig mall. Design, kod och bildmaterial görs för ditt företag.",
        },
        {
          q: "Är en handbyggd hemsida dyrare?",
          a: "Inte nödvändigtvis. Hos SweGBG börjar en handbyggd företagssajt på 4 999 kr ex. moms, och du slipper månadsavgiften som mallplattformar tar.",
        },
        {
          q: "Vem står bakom SweGBG?",
          a: "Lenn, som driver SweGBG från Göteborg och bygger varje sajt själv.",
        },
      ],
      cta: { h: "Har du en passion? Vi bygger den.", p: "Berätta om ditt företag så får du ett första utkast med ditt eget namn." },
    },
    en: {
      slug: "digital-craft",
      name: "Digital craft",
      title: "Digital Craft – Websites Built by Hand | SweGBG",
      description:
        "Digital craft from Gothenburg: websites built by hand, hand-written CSS animation and original AI film. No templates – every detail made for your business.",
      kicker: "Digital craft · the philosophy",
      h1: "Digital craft",
      lead:
        "A carpenter building a kitchen on site works differently from a flat-pack from the warehouse. The same goes for websites. Digital craft means every site is built by hand, for your business specifically.",
      blocks: [
        {
          h: "Not from a template",
          p: [
            "Most websites today are built on the same templates, and it shows. I sketch in Figma, write the code from scratch and shape the site around your brand – your colours, your logo, the way you talk to customers.",
          ],
        },
        {
          h: "Three crafts under one roof",
          p: [],
          li: [
            "Web design and animation: hand-written CSS that loads fast, with no heavy libraries",
            "Development: booking, login, admin panels and online stores in Next.js and Supabase",
            "Film and imagery: original product films made with AI, free from licences",
          ],
        },
        {
          h: "The details that show",
          p: [
            "A logo that materializes as the page loads. A film that plays as you scroll. Copy written for the words your customers actually search for. Fast loading even on an old phone. It's the sum of small decisions that makes a visitor stay.",
          ],
        },
        {
          h: "Craft that you own",
          p: [
            "A cabinet maker doesn't leave a lock on your kitchen doors. In the same way, you get the code, the domain and the accounts. The site is yours, and you can have anyone you like keep working on it.",
          ],
        },
      ],
      faq: [
        {
          q: "What does digital craft mean?",
          a: "That a website is built by hand from scratch instead of being assembled from a ready-made template. Design, code and imagery are made for your business.",
        },
        {
          q: "Is a hand-built website more expensive?",
          a: "Not necessarily. With SweGBG a hand-built business site starts at SEK 4,999 excl. VAT, and you avoid the monthly fee template platforms charge.",
        },
        {
          q: "Who is behind SweGBG?",
          a: "Lenn, who runs SweGBG from Gothenburg and builds every site himself.",
        },
      ],
      cta: { h: "Got a passion? Let's build it.", p: "Tell me about your business and you'll get a first draft with your own name." },
    },
  },

  /* ------------------------------------------------------------------ */
  {
    id: "lab",
    demos: ["SweProtein", "IronDäck"],
    related: ["digitalt-hantverk", "webbyra-sverige", "dropshipping"],
    sv: {
      slug: "lab",
      name: "SweGBG Lab",
      title: "SweGBG Lab – där nya webbfunktioner testas först",
      description:
        "SweGBG Lab är labbet där nya API:er, AI-verktyg och webbfunktioner testas innan de används i kundprojekt. Samma företag som SweGBG Agency i Göteborg.",
      kicker: "SweGBG Lab · experiment",
      h1: "SweGBG Lab",
      lead:
        "SweGBG Lab är min verkstad för experiment. Här testar jag nya API:er, AI-verktyg och funktioner innan de hamnar i en kundsajt – så att du får det som fungerar, inte det som bara är nytt.",
      blocks: [
        {
          h: "Ett namn, samma företag",
          p: [
            "SweGBG Lab, SweGBG Agency och SweGBG Trading är samma verksamhet i Göteborg. SweGBG Trading är företagsnamnet, SweGBG Agency är webbyrån som bygger hemsidor och bokningssystem, och SweGBG Lab är där nya idéer testas.",
          ],
        },
        {
          h: "Vad som testas i labbet",
          p: [],
          li: [
            "AI-film och bild: produktfilmer med MiniMax H3 och nya sätt att visa dem på webben",
            "API:er: sök, prisbevakning, mejlutskick och betalningar",
            "Animationer: scrollstyrd film och CSS-effekter som är snabba även på mobilen",
            "SEO och AEO: hur sajter blir förstådda av Google och AI-assistenter",
          ],
        },
        {
          h: "Från labb till kundsajt",
          p: [
            "Det mesta som syns i demosajterna har börjat som ett experiment i labbet – den scrollstyrda filmen, inloggningen i kundportalen och bokningsflödena. När något fungerar stabilt blir det en del av det jag erbjuder kunder.",
          ],
        },
        {
          h: "Appar från labbet",
          p: [
            "Labbet bygger inte bara webb. SweGBGPlayer är en Windows-app som började där: en mediaspelare med inbyggd musik-grabber och automatiska undertexter, gratis att ladda ner. Behöver ditt företag en egen app eller ett internt verktyg kan vi prata om det också.",
          ],
        },
      ],
      faq: [
        {
          q: "Är SweGBG Lab ett eget företag?",
          a: "Nej, SweGBG Lab är en del av SweGBG i Göteborg, samma verksamhet som SweGBG Agency och SweGBG Trading.",
        },
        {
          q: "Kan jag få en funktion från labbet på min sajt?",
          a: "Ja, om den är stabil. Berätta vad du vill att sajten ska kunna, så berättar jag om det finns något i labbet som passar.",
        },
        {
          q: "Bygger ni appar också?",
          a: "Ja, skräddarsydda appar och interna verktyg kan byggas. SweGBGPlayer är ett exempel.",
        },
      ],
      cta: { h: "Har du en idé du vill testa?", p: "Berätta vad du funderar på, så ser vi om den kan bli verklighet." },
    },
    en: {
      slug: "lab",
      name: "SweGBG Lab",
      title: "SweGBG Lab – where new web features are tested first",
      description:
        "SweGBG Lab is where new APIs, AI tools and web features are tested before they are used in client projects. Same company as SweGBG Agency in Gothenburg.",
      kicker: "SweGBG Lab · experiments",
      h1: "SweGBG Lab",
      lead:
        "SweGBG Lab is my workshop for experiments. Here I test new APIs, AI tools and features before they reach a client site – so you get what works, not just what's new.",
      blocks: [
        {
          h: "One name, the same company",
          p: [
            "SweGBG Lab, SweGBG Agency and SweGBG Trading are the same business in Gothenburg. SweGBG Trading is the company name, SweGBG Agency is the web agency building websites and booking systems, and SweGBG Lab is where new ideas are tested.",
          ],
        },
        {
          h: "What gets tested in the lab",
          p: [],
          li: [
            "AI film and imagery: product films with MiniMax H3 and new ways to show them on the web",
            "APIs: search, price monitoring, email and payments",
            "Animation: scroll-driven film and CSS effects that stay fast on mobile",
            "SEO and AEO: how sites get understood by Google and AI assistants",
          ],
        },
        {
          h: "From lab to client site",
          p: [
            "Most of what you see in the demo sites started as an experiment in the lab – the scroll-driven film, the customer portal login and the booking flows. When something works reliably, it becomes part of what I offer clients.",
          ],
        },
        {
          h: "Apps from the lab",
          p: [
            "The lab doesn't only build for the web. SweGBGPlayer is a Windows app that started there: a media player with a built-in music grabber and automatic subtitles, free to download. If your business needs its own app or an internal tool, we can talk about that too.",
          ],
        },
      ],
      faq: [
        {
          q: "Is SweGBG Lab a separate company?",
          a: "No, SweGBG Lab is part of SweGBG in Gothenburg, the same business as SweGBG Agency and SweGBG Trading.",
        },
        {
          q: "Can I get a feature from the lab on my site?",
          a: "Yes, if it's stable. Tell me what you want your site to do and I'll tell you if there's something in the lab that fits.",
        },
        {
          q: "Do you build apps too?",
          a: "Yes, custom apps and internal tools can be built. SweGBGPlayer is one example.",
        },
      ],
      cta: { h: "Got an idea you want to try?", p: "Tell me what you have in mind and we'll see if it can become real." },
    },
  },
];

/** Shared UI text on the landing pages. */
export const landingUi = {
  sv: {
    home: "Start",
    btn: "Skicka en förfrågan",
    demosKicker: "// demos & koncept",
    demosTitle: "Se hur det kan se ut",
    demoBadge: "Demo",
    openDemo: "Öppna demon",
    faqKicker: "// vanliga frågor",
    faqTitle: "Frågor och svar",
    relatedKicker: "// läs också",
    footerTitle: "Tjänster och guider",
    mail: "eller mejla",
    langLabel: "Språk",
  },
  en: {
    home: "Home",
    btn: "Send a request",
    demosKicker: "// demos & concepts",
    demosTitle: "See how it could look",
    demoBadge: "Demo",
    openDemo: "Open the demo",
    faqKicker: "// FAQ",
    faqTitle: "Questions and answers",
    relatedKicker: "// read next",
    footerTitle: "Services and guides",
    mail: "or email",
    langLabel: "Language",
  },
} as const;

export const landingById = (id: string) => landings.find((l) => l.id === id);
export const landingPath = (l: Landing, lang: "sv" | "en") => (lang === "sv" ? `/${l.sv.slug}` : `/en/${l.en.slug}`);
