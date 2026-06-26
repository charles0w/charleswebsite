import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import SketchPage from "@/components/SketchPage";
import Work from "@/components/Work";
import About from "@/components/About";
import LifePreview from "@/components/LifePreview";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden w-full max-w-full">
      <Nav />

      {/* 01 — Hero (its own full-screen section) */}
      <Hero />

      {/* chrome ticker */}
      <Marquee />

      {/* 02 — Work */}
      <SketchPage pageNum={2} id="work-page">
        <Work />
      </SketchPage>

      {/* 03 — About */}
      <SketchPage pageNum={3} id="about-page">
        <About />
      </SketchPage>

      {/* 04 — Life preview */}
      <SketchPage pageNum={4} id="life-page">
        <LifePreview />
      </SketchPage>

      <Footer />
    </main>
  );
}
