import { useMemo, useState } from "react";
import { menu, categories, type MenuItem } from "../data/menu";
import { useCart } from "../context/CartContext";
import { Reveal } from "./Reveal";
import { QuickView } from "./QuickView";
import { CheckIcon, PlusIcon, SearchIcon, HeartIcon } from "./icons";
import { cn } from "../utils/cn";

const categoryEmoji: Record<string, string> = {
  All: "🍽️",
  "Signature Picks": "👑",
  "Cakes & Slices": "🎂",
  "Cupcakes & Muffins": "🧁",
  Donuts: "🍩",
  "Pastries & Croissants": "🥐",
  "Cookies & Macarons": "🍪",
  "Desserts & Parfaits": "🍨",
  "Turkish Sweets": "🍯",
  Drinks: "☕",
};

const badgeStyles: Record<string, string> = {
  Bestseller: "bg-blush-500 text-white",
  New: "bg-gold-400 text-plum-800",
  "Chef's Pick": "bg-plum-700 text-white",
  Signature: "bg-gradient-to-r from-blush-600 to-gold-500 text-white",
  Seasonal: "bg-emerald-500 text-white",
};

function MenuCard({
  item,
  onQuickView,
}: {
  item: MenuItem;
  onQuickView: (item: MenuItem) => void;
}) {
  const { add, lastAddedId, toggleFavorite, isFavorite } = useCart();
  const justAdded = lastAddedId === item.id;
  const fav = isFavorite(item.id);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-blush-100 bg-white shadow-sm shadow-blush-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blush-200/60">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <button
          onClick={() => toggleFavorite(item.id)}
          aria-label="Save to favorites"
          className={cn(
            "absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full shadow-md backdrop-blur transition-all active:scale-90",
            fav ? "bg-blush-500 text-white" : "bg-white/90 text-blush-400 hover:text-blush-600"
          )}
        >
          <HeartIcon className="h-4 w-4" />
        </button>
        {item.badge && (
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full px-3 py-1 text-[0.62rem] font-bold uppercase tracking-wider shadow-md",
              badgeStyles[item.badge]
            )}
          >
            {item.badge}
          </span>
        )}
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-blush-700 backdrop-blur">
          ★ {item.rating.toFixed(1)}
        </span>
        {/* Quick view overlay */}
        <button
          onClick={() => onQuickView(item)}
          className="absolute inset-0 flex items-center justify-center bg-plum-800/0 opacity-0 backdrop-blur-0 transition-all duration-300 group-hover:bg-plum-800/30 group-hover:backdrop-blur-[2px] group-hover:opacity-100"
        >
          <span className="translate-y-3 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-blush-700 shadow-lg transition-transform duration-300 group-hover:translate-y-0">
            Quick view
          </span>
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-script text-lg leading-none text-blush-500">{item.tr}</p>
        <h3 className="mt-1.5 font-display text-xl font-bold text-plum-800">
          {item.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-plum-700/75">
          {item.desc}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="font-display text-2xl font-extrabold text-blush-600">
            ₺{item.price}
          </span>
          <button
            onClick={() => add(item)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold transition-all duration-300",
              justAdded
                ? "bg-emerald-500 text-white"
                : "bg-gradient-to-r from-blush-500 to-blush-600 text-white shadow-md shadow-blush-300 hover:shadow-lg hover:shadow-blush-300 active:scale-95"
            )}
          >
            {justAdded ? (
              <>
                <CheckIcon className="h-4 w-4" /> Added
              </>
            ) : (
              <>
                <PlusIcon className="h-4 w-4" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Menu() {
  const [active, setActive] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [quickItem, setQuickItem] = useState<MenuItem | null>(null);
  const { favorites } = useCart();

  const filtered = useMemo(() => {
    let list = menu;
    if (active === "Signature Picks") {
      list = list.filter((i) => i.badge === "Signature");
    } else if (active === "Favorites") {
      list = list.filter((i) => favorites.includes(i.id));
    } else if (active !== "All") {
      list = list.filter((i) => i.category === active);
    }
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.tr.toLowerCase().includes(q) ||
          i.desc.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [active, query]);

  return (
    <section id="menu" className="bg-paisley relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-script text-3xl text-blush-500">lezzetler</p>
          <h2 className="font-display text-4xl font-extrabold text-plum-800 sm:text-5xl">
            Our Sweet Menu
          </h2>
          <p className="mt-4 text-plum-700/75">
            Fifty lovingly handcrafted treats — from silky baklava to playful
            cupcakes and frosted donuts. Find your next craving.
          </p>
        </Reveal>

        {/* Search */}
        <Reveal delay={80} className="mx-auto mt-8 max-w-md">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blush-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cupcakes, baklava, latte…"
              className="w-full rounded-full border border-blush-200 bg-white/80 py-3.5 pl-12 pr-5 text-sm text-plum-800 shadow-sm outline-none transition-all placeholder:text-plum-700/40 focus:border-blush-400 focus:ring-4 focus:ring-blush-200"
            />
          </div>
        </Reveal>

        {/* Category chips */}
        <Reveal delay={120}>
          <div className="scrollbar-hide mt-7 flex justify-start gap-2.5 overflow-x-auto pb-2 sm:justify-center">
            <button
              onClick={() => setActive("Favorites")}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all",
                active === "Favorites"
                  ? "border-blush-500 bg-gradient-to-r from-blush-500 to-blush-600 text-white shadow-md shadow-blush-300"
                  : "border-blush-200 bg-white/70 text-plum-700 hover:border-blush-400 hover:text-blush-600"
              )}
            >
              <span>❤️</span>
              Favorites
              {favorites.length > 0 && (
                <span className="grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-blush-600 px-1 text-[0.65rem] font-bold text-white">
                  {favorites.length}
                </span>
              )}
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all",
                  active === c
                    ? "border-blush-500 bg-gradient-to-r from-blush-500 to-blush-600 text-white shadow-md shadow-blush-300"
                    : "border-blush-200 bg-white/70 text-plum-700 hover:border-blush-400 hover:text-blush-600"
                )}
              >
                <span>{categoryEmoji[c]}</span>
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <p className="mt-6 text-center text-sm font-medium text-plum-700/60">
          Showing <span className="font-bold text-blush-600">{filtered.length}</span>{" "}
          delicious {filtered.length === 1 ? "treat" : "treats"}
        </p>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item, i) => (
            <Reveal key={item.id} delay={(i % 4) * 70}>
              <MenuCard item={item} onQuickView={setQuickItem} />
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 rounded-3xl border border-dashed border-blush-300 bg-white/60 py-16 text-center">
            <p className="text-5xl">🍰</p>
            <p className="mt-3 font-display text-xl font-bold text-plum-800">
              No treats found
            </p>
            <p className="mt-1 text-plum-700/70">
              Try another search or category — the bakery is full of surprises!
            </p>
          </div>
        )}
      </div>
      <QuickView item={quickItem} onClose={() => setQuickItem(null)} />
    </section>
  );
}
