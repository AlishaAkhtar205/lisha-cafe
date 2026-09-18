import { useEffect, useState } from "react";
import type { MenuItem } from "../data/menu";
import { useCart } from "../context/CartContext";
import { CloseIcon, PlusIcon, MinusIcon, StarIcon, HeartIcon, CheckIcon } from "./icons";
import { cn } from "../utils/cn";

const badgeStyles: Record<string, string> = {
  Bestseller: "bg-blush-500 text-white",
  New: "bg-gold-400 text-plum-800",
  "Chef's Pick": "bg-plum-700 text-white",
  Signature: "bg-gradient-to-r from-blush-600 to-gold-500 text-white",
  Seasonal: "bg-emerald-500 text-white",
};

export function QuickView({
  item,
  onClose,
}: {
  item: MenuItem | null;
  onClose: () => void;
}) {
  const { add, toggleFavorite, isFavorite } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setQty(1);
    setAdded(false);
  }, [item]);

  useEffect(() => {
    document.body.style.overflow = item ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  if (!item) return null;
  const fav = isFavorite(item.id);

  return (
    <div className="fixed inset-0 z-[85] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-plum-800/50 backdrop-blur-sm animate-[toast-in_0.3s_ease]"
      />
      <div className="relative flex max-h-[92vh] w-full max-w-3xl animate-pop flex-col overflow-hidden rounded-t-[2rem] bg-cream shadow-2xl sm:rounded-[2rem]">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-plum-700 shadow-md transition-transform hover:rotate-90"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        <div className="grid overflow-y-auto sm:grid-cols-2">
          {/* Image */}
          <div className="relative h-60 sm:h-auto">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-plum-800/40 to-transparent sm:bg-gradient-to-r" />
            {item.badge && (
              <span
                className={cn(
                  "absolute left-4 top-4 rounded-full px-3 py-1 text-[0.62rem] font-bold uppercase tracking-wider shadow-md",
                  badgeStyles[item.badge]
                )}
              >
                {item.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col p-7">
            <p className="font-script text-2xl leading-none text-blush-500">{item.tr}</p>
            <h2 className="mt-1 font-display text-3xl font-extrabold leading-tight text-plum-800">
              {item.name}
            </h2>

            <div className="mt-3 flex items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-gold-300/30 px-3 py-1 text-sm font-bold text-plum-800">
                <StarIcon className="h-4 w-4 text-gold-500" /> {item.rating.toFixed(1)}
              </span>
              <span className="text-xs font-medium uppercase tracking-wide text-plum-700/60">
                {item.category}
              </span>
            </div>

            <p className="mt-4 leading-relaxed text-plum-700/80">{item.desc}</p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-plum-700/70">
              {["Freshly baked", "Made with love", "Egg & dairy"].map((t) => (
                <span key={t} className="rounded-full bg-white px-3 py-1 ring-1 ring-blush-100">
                  ✦ {t}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-plum-700/60">
                    Price
                  </p>
                  <p className="font-display text-3xl font-extrabold text-blush-600">
                    ₺{item.price}
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white p-1.5 shadow-sm ring-1 ring-blush-100">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="grid h-9 w-9 place-items-center rounded-full bg-blush-100 text-blush-600 transition-colors hover:bg-blush-200"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                  <span className="w-6 text-center font-bold text-plum-800">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="grid h-9 w-9 place-items-center rounded-full bg-blush-100 text-blush-600 transition-colors hover:bg-blush-200"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => {
                    add(item, qty);
                    setAdded(true);
                    window.setTimeout(() => setAdded(false), 1400);
                  }}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold text-white shadow-lg transition-all active:scale-[0.98]",
                    added
                      ? "bg-emerald-500"
                      : "bg-gradient-to-r from-blush-500 to-blush-600 shadow-blush-300 hover:-translate-y-0.5"
                  )}
                >
                  {added ? (
                    <>
                      <CheckIcon className="h-5 w-5" /> Added!
                    </>
                  ) : (
                    <>Add {qty} to tray · ₺{item.price * qty}</>
                  )}
                </button>
                <button
                  onClick={() => toggleFavorite(item.id)}
                  aria-label="Save to favorites"
                  className={cn(
                    "grid h-[3.25rem] w-[3.25rem] shrink-0 place-items-center rounded-full shadow-md transition-all active:scale-90",
                    fav
                      ? "bg-blush-500 text-white shadow-blush-300"
                      : "bg-white text-blush-400 ring-1 ring-blush-100 hover:text-blush-600"
                  )}
                >
                  <HeartIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
