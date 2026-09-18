import { menu } from "../data/menu";
import { useCart } from "../context/CartContext";
import { Reveal } from "./Reveal";
import { PlusIcon, CheckIcon, StarIcon, SparkleIcon } from "./icons";
import { cn } from "../utils/cn";

const featured = [...menu]
  .sort((a, b) => b.rating - a.rating || (b.badge ? 1 : 0) - (a.badge ? 1 : 0))
  .slice(0, 4);

export default function Bestsellers() {
  const { add, lastAddedId } = useCart();

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 font-script text-3xl text-blush-500">
              <SparkleIcon className="h-5 w-5 text-gold-400" /> en sevilenler
            </p>
            <h2 className="font-display text-3xl font-extrabold text-plum-800 sm:text-4xl">
              This week's bestsellers
            </h2>
          </div>
          <a
            href="#menu"
            className="rounded-full border border-blush-300 px-5 py-2.5 text-sm font-semibold text-blush-600 transition-colors hover:bg-blush-500 hover:text-white"
          >
            See full menu
          </a>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item, i) => {
            const justAdded = lastAddedId === item.id;
            return (
              <Reveal key={item.id} delay={i * 80}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm shadow-blush-100 ring-1 ring-blush-100 transition-all hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blush-200/60">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-blush-700 backdrop-blur">
                      <StarIcon className="h-3.5 w-3.5 text-gold-400" /> {item.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-bold leading-snug text-plum-800">
                      {item.name}
                    </h3>
                    <p className="mt-1 font-script text-base text-blush-500">{item.tr}</p>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <span className="font-display text-xl font-extrabold text-blush-600">
                        ₺{item.price}
                      </span>
                      <button
                        onClick={() => add(item)}
                        className={cn(
                          "grid h-10 w-10 place-items-center rounded-full text-white shadow-md transition-all active:scale-90",
                          justAdded
                            ? "bg-emerald-500"
                            : "bg-gradient-to-br from-blush-500 to-blush-600 shadow-blush-300"
                        )}
                        aria-label={`Add ${item.name}`}
                      >
                        {justAdded ? (
                          <CheckIcon className="h-5 w-5" />
                        ) : (
                          <PlusIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
