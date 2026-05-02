import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SketchPage from "@/components/SketchPage";
import Work from "@/components/Work";
import About from "@/components/About";
import LifePreview from "@/components/LifePreview";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden w-full max-w-full">
      <Nav />

      {/* pg 01 — Hero (no SketchPage wrapper; it's its own sketch-section) */}
      <Hero />

      {/* pg 02 — Work */}
      <SketchPage pageNum={2} id="work-page">
        <Work />
      </SketchPage>

      {/* pg 03 — About */}
      <SketchPage pageNum={3} id="about-page">
        <About />
      </SketchPage>

      {/* pg 04 — Life preview */}
      <SketchPage pageNum={4} id="life-page">
        <LifePreview />
      </SketchPage>

      <Footer />
    </main>
  );
}
