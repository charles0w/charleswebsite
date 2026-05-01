import Nav from "@/components/Nav";
import LifeHero from "@/components/life/LifeHero";
import CarsSection from "@/components/life/CarsSection";
import CardsSection from "@/components/life/CardsSection";
import FinanceSection from "@/components/life/FinanceSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Life — Charles Ow",
  description: "Cars, trading cards, finance, and the things that make Charles Ow tick beyond the keyboard.",
};

export default function LifePage() {
  return (
    <main className="overflow-x-hidden w-full max-w-full">
      <Nav />
      <LifeHero />
      <CarsSection />
      <CardsSection />
      <FinanceSection />
      <Footer />
    </main>
  );
}
