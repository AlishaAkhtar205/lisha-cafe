import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { useCart } from "../context/CartContext";
import { menu } from "../data/menu";
import { CountUp } from "./CountUp";
import { ArrowRightIcon, SparkleIcon } from "./icons";

const deal = menu.find((m) => m.id === 21)!; // Pink Strawberry Donut

function useCountdown(target: number) {
  const [left, setLeft] = useState(target - Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setLeft(target - Date.now()), 1000);
    return () => window.clearInterval(t);
  }, [target]);
  const clamped = Math.max(0, left);
  return {
    h: Math.floor(clamped / 3.6e6),
    m: Math.floor((clamped % 3.6e6) / 6e4),
    s: Math.floor((clamped % 6e4) / 1000),
  };
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 font-display text-2xl font-extrabold tabular-nums text-white backdrop-blur sm:h-16 sm:w-16 sm:text-3xl">
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/70">
        {label}
      </span>
    </div>
  );
}

export default function PromoBanner() {
  // Countdown resets every 24h from now (stable for the session)
  const [target] = useState(() => {
    const d = new Date();
    d.setHours(23, 59, 59, 999);
    return d.getTime();
  });
  const { h, m, s } = useCountdown(target);
  const { add } = useCart();

  return (
    <section className="px-5 py-12 sm:px-8 sm:py-16">
      <Reveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blush-600 via-blush-500 to-blush-700 p-1 shadow-glow">
          <div className="relative overflow-hidden rounded-[2.4rem] bg-gradient-to-br from-blush-600 via-blush-500 to-blush-700 px-6 py-10 sm:px-12 sm:py-12">
            {/* decorative */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-gold-400/20 blur-3xl" />
            <SparkleIcon className="pointer-events-none absolute right-12 top-10 h-8 w-8 animate-spin-slow text-white/30" />

            <div className="relative grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
              {/* text */}
              <div className="text-white">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] backdrop-blur">
                  <SparkleIcon className="h-4 w-4 text-gold-300" /> Günün Fırsatı · Deal of the Day
                </span>
                <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
                  Pink Donut Tuesday — <span className="text-gold-300">25% off</span>
                </h2>
                <p className="mt-3 max-w-md text-white/85">
                  Grab our signature Pink Strawberry Donut at a sweet discount.
                  Hurry, the oven cools when the clock hits zero!
                </p>

                <div className="mt-6 flex gap-3">
                  <TimeBox value={h} label="Hours" />
                  <span className="self-start pt-3 font-display text-2xl font-bold text-white/60">:</span>
                  <TimeBox value={m} label="Mins" />
                  <span className="self-start pt-3 font-display text-2xl font-bold text-white/60">:</span>
                  <TimeBox value={s} label="Secs" />
                </div>

                <button
                  onClick={() => add(deal)}
                  className="group mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-blush-700 shadow-xl transition-transform hover:-translate-y-1"
                >
                  Claim deal · ₺{Math.round(deal.price * 0.75)}
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <span className="ml-3 text-sm text-white/70 line-through">₺{deal.price}</span>
              </div>

              {/* product */}
              <div className="relative mx-auto hidden w-full max-w-xs sm:block">
                <div className="absolute inset-0 -m-4 animate-pulse-ring rounded-full" />
                <div className="relative overflow-hidden rounded-3xl border-4 border-white/30 shadow-2xl animate-float">
                  <img src={deal.image} alt={deal.name} className="aspect-square w-full object-cover" />
                </div>
                <div className="absolute -right-3 -top-3 grid h-20 w-20 rotate-12 place-items-center rounded-full bg-gold-400 text-center font-display text-plum-800 shadow-xl animate-float-slow">
                  <div>
                    <span className="block text-xs font-bold leading-none">SAVE</span>
                    <span className="block text-2xl font-extrabold leading-none">25%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* trust strip */}
            <div className="relative mt-9 grid grid-cols-2 gap-4 border-t border-white/20 pt-6 sm:grid-cols-4">
              {[
                { end: 50, suffix: "+", label: "Daily treats" },
                { end: 12, suffix: "k", label: "Orders served" },
                { end: 4.9, dec: 1, suffix: "★", label: "Avg. rating" },
                { end: 30, suffix: "min", label: "Fast delivery" },
              ].map((t) => (
                <div key={t.label} className="text-center text-white">
                  <p className="font-display text-2xl font-extrabold sm:text-3xl">
                    <CountUp end={t.end} suffix={t.suffix} decimals={t.dec ?? 0} />
                  </p>
                  <p className="text-[0.65rem] font-medium uppercase tracking-wide text-white/70">
                    {t.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
