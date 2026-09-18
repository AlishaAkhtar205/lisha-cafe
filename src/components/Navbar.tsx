import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { CartIcon, CloseIcon, MenuIcon, CoffeeIcon, HeartIcon } from "./icons";
import { cn } from "../utils/cn";

const links = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "Our Story", href: "#story" },
  { label: "Loved", href: "#love" },
  { label: "Visit", href: "#visit" },
];

export default function Navbar() {
  const { count, openCart, favorites } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (count === 0) return;
    setPulse(true);
    const t = window.setTimeout(() => setPulse(false), 600);
    return () => window.clearTimeout(t);
  }, [count]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "glass border-b border-blush-200/70 shadow-[0_10px_40px_-20px_rgba(169,31,83,0.45)]"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
        <a href="#home" className="group flex items-center gap-3">
          <span className="relative grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-blush-500 to-blush-700 text-white shadow-lg shadow-blush-300 ring-2 ring-white/60">
            <CoffeeIcon className="h-6 w-6" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-script text-2xl text-blush-700 sm:text-[1.7rem]">
              Lisha
            </span>
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.42em] text-plum-700/70">
              Turkish Pâtisserie
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-plum-700 transition-colors hover:text-blush-600"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#menu"
            className="hidden rounded-full bg-gradient-to-r from-blush-500 to-blush-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blush-300 transition-transform hover:-translate-y-0.5 sm:inline-block"
          >
            Order Now
          </a>
          <a
            href="#menu"
            className="relative hidden h-11 w-11 place-items-center rounded-full bg-white text-blush-500 shadow-md ring-1 ring-blush-200 transition-transform hover:-translate-y-0.5 sm:grid"
            aria-label="View favorites"
          >
            <HeartIcon className="h-5 w-5" />
            {favorites.length > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-blush-600 px-1 text-[0.65rem] font-bold text-white ring-2 ring-white">
                {favorites.length}
              </span>
            )}
          </a>
          <button
            onClick={openCart}
            aria-label="Open cart"
            className={cn(
              "relative grid h-11 w-11 place-items-center rounded-full bg-white text-blush-600 shadow-md ring-1 ring-blush-200 transition-transform hover:-translate-y-0.5",
              pulse && "animate-pulse-ring"
            )}
          >
            <CartIcon className="h-5 w-5" />
            {count > 0 && (
              <span
                key={count}
                className="absolute -right-1 -top-1 grid h-5 min-w-[1.25rem] animate-pop place-items-center rounded-full bg-blush-600 px-1 text-[0.65rem] font-bold text-white ring-2 ring-white"
              >
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="grid h-11 w-11 place-items-center rounded-full bg-white text-plum-700 shadow-md ring-1 ring-blush-200 lg:hidden"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden transition-[max-height] duration-500 ease-in-out lg:hidden",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <div className="glass mx-4 mb-3 rounded-3xl border border-blush-200 p-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 text-base font-medium text-plum-700 transition-colors hover:bg-blush-100 hover:text-blush-600"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#menu"
            onClick={() => setOpen(false)}
            className="mt-1 block rounded-2xl bg-gradient-to-r from-blush-500 to-blush-600 px-4 py-3 text-center font-semibold text-white"
          >
            Order Now
          </a>
        </div>
      </div>
    </header>
  );
}
