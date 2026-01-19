import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { MomentsGallery } from "./components/MomentsGallery";
import { OurStorySection } from "./components/OurStorySection";
import { GiftListSection } from "./components/GiftListSection";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { CountdownSection } from "./components/CountdownSection";
import { RSVPModal } from "./components/rsvp/RSVPModal";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CountdownSection weddingDate="2026-05-15T16:00:00" />
        <OurStorySection />
        <MomentsGallery />
        <GiftListSection />
      </main>
      <Footer />
      <CartDrawer />
      <RSVPModal />
    </div>
  );
}