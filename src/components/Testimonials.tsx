import { Reveal } from "./Reveal";
import { StarIcon, HeartIcon } from "./icons";

const reviews = [
  {
    name: "Elif Demir",
    role: "Sunday regular",
    quote:
      "The baklava is impossibly flaky and the rose latte is pure magic. Lisha feels like a warm Turkish hug — in the prettiest pink room.",
    color: "from-blush-400 to-blush-600",
    initial: "E",
  },
  {
    name: "James Whitmore",
    role: "Donut devotee",
    quote:
      "I came for a coffee and left with a box of donuts, cupcakes AND macarons. Everything looks like art and tastes even better.",
    color: "from-gold-400 to-blush-500",
    initial: "J",
  },
  {
    name: "Ayşe Kaya",
    role: "Birthday cakes",
    quote:
      "Ordered the Cherry Bosphorus Gateau for a party — guests are still texting about it. Beautiful, fresh and not too sweet. Perfect!",
    color: "from-blush-500 to-plum-700",
    initial: "A",
  },
];

export default function Testimonials() {
  return (
    <section id="love" className="bg-paisley scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-script text-3xl text-blush-500">misafirlerimiz</p>
          <h2 className="font-display text-4xl font-extrabold text-plum-800 sm:text-5xl">
            Loved at first bite
          </h2>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-5 py-2 shadow-sm ring-1 ring-blush-100">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="h-5 w-5 text-gold-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-plum-800">4.9 / 5</span>
            <span className="text-sm text-plum-700/60">· 2,400+ reviews</span>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 100}>
              <figure className="flex h-full flex-col rounded-3xl border border-blush-100 bg-white p-7 shadow-sm shadow-blush-100 transition-transform hover:-translate-y-1.5">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <StarIcon key={j} className="h-4 w-4 text-gold-400" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 leading-relaxed text-plum-700/85">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-blush-100 pt-5">
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br ${r.color} font-display text-lg font-bold text-white`}
                  >
                    {r.initial}
                  </span>
                  <div>
                    <p className="font-bold text-plum-800">{r.name}</p>
                    <p className="text-sm text-plum-700/60">{r.role}</p>
                  </div>
                  <HeartIcon className="ml-auto h-5 w-5 text-blush-300" />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
