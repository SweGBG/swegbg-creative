import Hero from "@/components/Hero";
import Marquee from "@/components/sections/Marquee";
import Workshop from "@/components/sections/Workshop";
import CraftTeaser from "@/components/sections/CraftTeaser";
import Process from "@/components/sections/Process";
import Pricing from "@/components/sections/Pricing";
import Ownership from "@/components/sections/Ownership";
import About from "@/components/sections/About";
import Start from "@/components/sections/Start";
import Footer from "@/components/Footer";
import PauseOffscreen from "@/components/PauseOffscreen";

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <Marquee />
        <Workshop />
        <CraftTeaser />
        <Process />
        <Pricing />
        <Ownership />
        <About />
        <Start />
      </main>
      <Footer />
      <PauseOffscreen />
    </>
  );
}
