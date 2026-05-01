import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import About from "@/components/About";
import LifePreview from "@/components/LifePreview";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden w-full max-w-full">
      <Nav />
      <Hero />
      <Marquee />
      <Work />
      <About />
      <LifePreview />
      <Footer />
    </main>
  );
}
