import { useEffect, useState } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Hero, { HeroTicker } from "./components/Hero";
import Bestsellers from "./components/Bestsellers";
import Gallery from "./components/Gallery";
import Menu from "./components/Menu";
import PromoBanner from "./components/PromoBanner";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Visit from "./components/Visit";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import { ScrollProgress } from "./components/ScrollProgress";
import { Toaster } from "./components/Toaster";
import { ArrowRightIcon } from "./components/icons";
import { cn } from "./utils/cn";

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={cn(
        "fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-blush-500 to-blush-700 text-white shadow-xl shadow-blush-300 transition-all duration-300 hover:-translate-y-1",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <ArrowRightIcon className="h-5 w-5 -rotate-90" />
    </button>
  );
}

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen overflow-x-hidden bg-cream">
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <HeroTicker />
          <Bestsellers />
          <Menu />
          <PromoBanner />
          <Gallery />
          <About />
          <Testimonials />
          <Visit />
        </main>
        <Footer />
        <CartDrawer />
        <Toaster />
        <BackToTop />
      </div>
    </CartProvider>
  );
}
