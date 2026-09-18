import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";
import { AwardIcon, LeafIcon, CoffeeIcon, HeartIcon } from "./icons";

const img = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;

const stats = [
  { end: 50, suffix: "+", label: "Handmade treats" },
  { end: 12, suffix: "", label: "Years of baking" },
  { end: 4.9, decimals: 1, suffix: "★", label: "Guest rating" },
  { end: 100, suffix: "%", label: "Fresh daily" },
] as const;

const features = [
  { icon: CoffeeIcon, title: "Slow-brewed coffee", desc: "Authentic Türk kahvesi simmered in copper cezve." },
  { icon: HeartIcon, title: "Hand-rolled baklava", desc: "Forty paper-thin layers, folded fresh each morning." },
  { icon: LeafIcon, title: "Garden-fresh", desc: "Locally sourced berries, pistachios & dairy." },
  { icon: AwardIcon, title: "Original recipes", desc: "Family secrets passed down for generations." },
];

export default function About() {
  return (
    <section id="story" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        {/* Image collage */}
        <Reveal className="relative">
          <div className="relative">
            <img
              src={img(14415008)}
              alt="Pastries with pink peonies and coffee"
              className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl shadow-blush-200"
            />
            <img
              src={img(21207660)}
              alt="Istanbul bakery display"
              className="absolute -bottom-8 -right-4 hidden w-44 rounded-3xl border-4 border-white object-cover shadow-xl sm:block lg:w-52"
            />
            <div className="absolute -left-5 -top-5 grid h-24 w-24 place-items-center rounded-2xl bg-gradient-to-br from-blush-500 to-blush-700 text-white shadow-xl animate-float">
              <div className="text-center">
                <p className="font-script text-2xl leading-none">Hoş</p>
                <p className="font-script text-2xl leading-none">geldiniz</p>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-10 right-20 h-40 w-40 rounded-full bg-blush-300/40 blur-3xl" />
        </Reveal>

        {/* Text */}
        <Reveal delay={120} className="lg:pl-6">
          <p className="font-script text-3xl text-blush-500">bizim hikâyemiz</p>
          <h2 className="mt-1 font-display text-4xl font-extrabold leading-tight text-plum-800 sm:text-5xl">
            A little corner of Türkiye, dipped in pink
          </h2>
          <p className="mt-5 leading-relaxed text-plum-700/80">
            Lisha Café began with a grandmother's recipe book and a love for the
            warm glow of Ottoman lamps. Today we blend time-honoured Turkish
            craft with playful, blush-hued patisserie — baklava beside cupcakes,
            Turkish coffee beside frosted donuts.
          </p>
          <p className="mt-4 leading-relaxed text-plum-700/80">
            Every pastry is made by hand, every cup poured with heart. Pull up a
            velvet chair, breathe in the rose and cardamom, and let us sweeten
            your day.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-blush-100 bg-white/70 p-4 text-center shadow-sm transition-transform hover:-translate-y-1"
              >
                <p className="font-display text-3xl font-extrabold text-blush-600">
                  <CountUp
                    end={s.end}
                    decimals={"decimals" in s ? s.decimals : 0}
                    suffix={s.suffix}
                  />
                </p>
                <p className="mt-1 text-[0.7rem] font-medium uppercase tracking-wide text-plum-700/60">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="flex gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blush-100 text-blush-600">
                  <f.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-plum-800">{f.title}</p>
                  <p className="text-sm text-plum-700/70">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
