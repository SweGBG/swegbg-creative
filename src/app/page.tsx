import Hero from "@/components/Hero";
import Build from "@/components/sections/Build";
import Pipeline from "@/components/sections/Pipeline";
import Craft from "@/components/sections/Craft";
import Marquee from "@/components/sections/Marquee";
import Founder from "@/components/sections/Founder";
import Journey from "@/components/sections/Journey";
import Cta from "@/components/sections/Cta";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <Build />
        <Pipeline />
        <Craft />
        <Marquee />
        <Founder />
        <Journey />
        <Cta />
      </main>
      <footer className="foot">
        <div className="wrap">{site.footer}</div>
      </footer>
    </>
  );
}
