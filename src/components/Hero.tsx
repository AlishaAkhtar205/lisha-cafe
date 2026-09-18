import { ArrowRightIcon, SparkleIcon, StarIcon, PlusIcon } from "./icons";
import heroImg from "../assets/hero.jpg";
import { menu } from "../data/menu";
import { useCart } from "../context/CartContext";
import { useScrollY } from "../hooks/useScrollY";

const featured = menu.find((m) => m.id === 44)!; // Assorted Baklava

export default function Hero() {
  const y = useScrollY();
  const { add } = useCart();

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Background image with parallax */}
      <div className="absolute inset-0" style={{ transform: `translateY(${y * 0.35}px) scale(1.1)` }}>
        <img
          src={heroImg}
          alt="Lisha Turkish café interior with Ottoman lamps and pastries"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blush-900/55 via-blush-700/35 to-cream/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-blush-900/55 via-blush-900/20 to-transparent" />
      </div>

      {/* Floating decorative blobs */}
      <div
        className="pointer-events-none absolute -left-16 top-40 h-72 w-72 rounded-full bg-blush-400/30 blur-3xl animate-float"
        style={{ transform: `translateY(${y * -0.15}px)` }}
      />
      <div
        className="pointer-events-none absolute right-10 top-24 h-56 w-56 rounded-full bg-gold-400/25 blur-3xl animate-float-slow"
        style={{ transform: `translateY(${y * -0.25}px)` }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pb-16 pt-32 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white backdrop-blur animate-[toast-in_0.6s_ease]">
              <SparkleIcon className="h-4 w-4 animate-spin-slow text-gold-300" />
              Aşk ile yapıldı · Made with love
            </span>

            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.02] text-white text-shadow-soft sm:text-7xl lg:text-[5.5rem]">
              <span className="block">Lisha</span>
              <span className="block bg-gradient-to-r from-blush-200 via-white to-gold-300 bg-clip-text text-transparent">
                Café
              </span>
              <span className="mt-1 block font-script text-4xl font-semibold text-blush-100 sm:text-6xl">
                the taste of Türkiye
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
              Where delicate baklava meets dreamy cupcakes, fresh donuts and
              fragrant Turkish coffee — all wrapped in a blush-pink, Ottoman-lit
              escape. Bite into sweet tradition.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#menu"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-blush-700 shadow-xl shadow-blush-900/30 transition-all hover:-translate-y-1 hover:shadow-2xl"
              >
                Explore the Menu
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#story"
                className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                Our Story
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-white">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-gold-300" />
                  ))}
                </div>
                <span className="text-sm font-semibold">4.9 · 2,400+ happy guests</span>
              </div>
              <div className="h-5 w-px bg-white/30" />
              <p className="text-sm font-medium text-white/90">50+ handmade treats baked fresh daily</p>
            </div>
          </div>

          {/* Floating featured product card */}
          <div className="relative hidden lg:block">
            <div
              className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-blush-400/30 to-gold-400/20 blur-2xl"
              style={{ transform: `translateY(${y * 0.12}px)` }}
            />
            <div
              className="relative animate-float overflow-hidden rounded-[2rem] border border-white/40 bg-white/15 p-3 shadow-2xl backdrop-blur-md"
              style={{ transform: `translateY(${y * -0.05}px)` }}
            >
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <img
                  src={featured.image}
                  alt={featured.name}
                  className="aspect-square w-full object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-blush-600 to-gold-500 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-white shadow-md">
                  {featured.badge}
                </span>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-plum-800/80 to-transparent p-4 pt-10">
                  <div>
                    <p className="font-script text-xl leading-none text-blush-100">{featured.tr}</p>
                    <p className="text-sm font-bold text-white">{featured.name}</p>
                    <p className="mt-0.5 font-display text-2xl font-extrabold text-white">₺{featured.price}</p>
                  </div>
                  <button
                    onClick={() => add(featured)}
                    className="grid h-12 w-12 place-items-center rounded-full bg-white text-blush-600 shadow-lg transition-transform hover:scale-110 active:scale-90"
                    aria-label={`Add ${featured.name}`}
                  >
                    <PlusIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div
              className="absolute -left-6 top-8 flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 shadow-xl animate-float-slow"
              style={{ transform: `translateY(${y * 0.08}px)` }}
            >
              <span className="text-2xl">🏆</span>
              <div className="leading-tight">
                <p className="text-xs font-bold text-plum-800">Award winning</p>
                <p className="text-[0.65rem] text-blush-500">Best Baklava 2025</p>
              </div>
            </div>
            <div
              className="absolute -bottom-4 right-2 flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 shadow-xl animate-float"
              style={{ transform: `translateY(${y * 0.18}px)` }}
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-blush-100 text-blush-600">
                <StarIcon className="h-4 w-4" />
              </span>
              <div className="leading-tight">
                <p className="text-xs font-bold text-plum-800">5.0 rating</p>
                <p className="text-[0.65rem] text-blush-500">870 reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#menu"
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/80 transition-colors hover:text-white sm:flex"
      >
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border-2 border-white/60 p-1">
          <span className="h-2 w-1 animate-bounce rounded-full bg-white" />
        </span>
      </a>

      {/* Bottom curve */}
      <div className="absolute -bottom-px left-0 right-0">
        <svg viewBox="0 0 1440 80" className="h-12 w-full sm:h-16" preserveAspectRatio="none">
          <path
            d="M0,48 C240,90 480,90 720,56 C960,22 1200,22 1440,56 L1440,80 L0,80 Z"
            className="fill-cream"
          />
        </svg>
      </div>
    </section>
  );
}

export function HeroTicker() {
  const items = ["Baklava", "Cupcakes", "Donuts", "Türk Kahvesi", "Macarons", "Pastries", "Cheesecake", "Éclairs"];
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-blush-200 bg-blush-50/70 py-4">
      <div className="flex w-max animate-marquee items-center gap-8 pr-8">
        {doubled.map((t, i) => (
          <span key={i} className="flex items-center gap-8 text-sm font-semibold uppercase tracking-[0.25em] text-blush-700/80">
            {t}
            <span className="text-gold-400">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
