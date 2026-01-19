import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Reveal } from "./components/Reveal";
import { CartDrawer } from "./components/CartDrawer";
import { HeroSection } from "./components/HeroSection";
import { MomentsGallery } from "./components/MomentsGallery";
import { OurStorySection } from "./components/OurStorySection";
import { GiftListSection } from "./components/GiftListSection";
import { CountdownSection } from "./components/CountdownSection";
import { CelebrationFX } from "./components/effects/CelebrationFX";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* <CelebrationFX intensity={35} /> */}
        <HeroSection />
        <CountdownSection weddingDate="2026-05-15T16:00:00" />
        <Reveal>
          <OurStorySection />
        </Reveal>
        <Reveal>
          <MomentsGallery />
        </Reveal>
        <GiftListSection />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}