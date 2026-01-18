import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { MomentsGallery } from "./components/MomentsGallery";
import { OurStorySection } from "./components/OurStorySection";
import { GiftListSection } from "./components/GiftListSection";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <OurStorySection />
        <MomentsGallery />
        <GiftListSection />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}