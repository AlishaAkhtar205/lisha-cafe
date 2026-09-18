import { useEffect, useState } from "react";
import { useCart, formatPrice } from "../context/CartContext";
import {
  CloseIcon,
  PlusIcon,
  MinusIcon,
  CartIcon,
  CheckIcon,
  TruckIcon,
} from "./icons";
import { cn } from "../utils/cn";

export default function CartDrawer() {
  const {
    isOpen,
    closeCart,
    lines,
    increment,
    decrement,
    remove,
    clear,
    total,
    count,
  } = useCart();
  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) setPlaced(false);
  }, [isOpen]);

  const delivery = total > 0 ? (total > 250 ? 0 : 25) : 0;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={cn(
          "fixed inset-0 z-[60] bg-plum-800/40 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* Panel */}
      <aside
        className={cn(
          "fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-blush-200 bg-gradient-to-r from-blush-500 to-blush-600 px-6 py-5 text-white">
          <div className="flex items-center gap-2.5">
            <CartIcon className="h-6 w-6" />
            <div>
              <h2 className="font-display text-xl font-bold leading-none">Your Tray</h2>
              <p className="text-xs text-white/80">{count} item{count !== 1 ? "s" : ""}</p>
            </div>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        {placed ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-200">
              <CheckIcon className="h-10 w-10" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold text-plum-800">
              Afiyet olsun! 🎉
            </h3>
            <p className="mt-2 text-plum-700/75">
              Your sweet order is confirmed. We're preparing it with love — you'll
              get a notification shortly.
            </p>
            <button
              onClick={closeCart}
              className="mt-6 rounded-full bg-blush-500 px-6 py-3 text-sm font-bold text-white shadow-md shadow-blush-300"
            >
              Keep browsing
            </button>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="text-6xl">🧁</span>
            <h3 className="mt-4 font-display text-xl font-bold text-plum-800">
              Your tray is empty
            </h3>
            <p className="mt-1 text-sm text-plum-700/70">
              Add a few treats from the menu and they'll appear here.
            </p>
            <button
              onClick={closeCart}
              className="mt-6 rounded-full bg-gradient-to-r from-blush-500 to-blush-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-blush-300"
            >
              Explore the menu
            </button>
          </div>
        ) : (
          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
            {lines.map((l) => (
              <div
                key={l.item.id}
                className="flex gap-3 rounded-2xl border border-blush-100 bg-white p-3 shadow-sm"
              >
                <img
                  src={l.item.image}
                  alt={l.item.name}
                  className="h-20 w-20 shrink-0 rounded-xl object-cover"
                />
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-display text-sm font-bold leading-tight text-plum-800">
                        {l.item.name}
                      </p>
                      <p className="text-xs text-blush-500">{l.item.tr}</p>
                    </div>
                    <button
                      onClick={() => remove(l.item.id)}
                      className="text-plum-700/40 transition-colors hover:text-blush-600"
                      aria-label="Remove"
                    >
                      <CloseIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decrement(l.item.id)}
                        className="grid h-7 w-7 place-items-center rounded-full bg-blush-100 text-blush-600 transition-colors hover:bg-blush-200"
                      >
                        <MinusIcon className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-5 text-center text-sm font-bold text-plum-800">
                        {l.qty}
                      </span>
                      <button
                        onClick={() => increment(l.item.id)}
                        className="grid h-7 w-7 place-items-center rounded-full bg-blush-100 text-blush-600 transition-colors hover:bg-blush-200"
                      >
                        <PlusIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="font-display text-base font-bold text-blush-600">
                      {formatPrice(l.item.price * l.qty)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={clear}
              className="w-full pt-1 text-center text-xs font-semibold text-plum-700/50 underline-offset-2 hover:text-blush-600 hover:underline"
            >
              Clear tray
            </button>
          </div>
        )}

        {/* Footer */}
        {!placed && lines.length > 0 && (
          <div className="border-t border-blush-200 bg-white px-6 py-5">
            <div className="flex items-center gap-2 rounded-xl bg-blush-50 px-3 py-2 text-xs text-plum-700/80">
              <TruckIcon className="h-4 w-4 text-blush-500" />
              {delivery === 0 ? (
                <span>Yay! You unlocked <b>free delivery</b>. 🎀</span>
              ) : (
                <span>
                  Add <b>{formatPrice(250 - total)}</b> more for free delivery.
                </span>
              )}
            </div>
            <div className="mt-4 space-y-1.5 text-sm">
              <Row label="Subtotal" value={formatPrice(total)} />
              <Row label="Delivery" value={delivery === 0 ? "Free" : formatPrice(delivery)} />
              <div className="flex items-center justify-between border-t border-dashed border-blush-200 pt-2.5">
                <span className="font-display text-lg font-bold text-plum-800">Total</span>
                <span className="font-display text-xl font-extrabold text-blush-600">
                  {formatPrice(total + delivery)}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setPlaced(true);
                clear();
              }}
              className="mt-4 w-full rounded-full bg-gradient-to-r from-blush-500 to-blush-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blush-300 transition-transform hover:-translate-y-0.5"
            >
              Checkout · {formatPrice(total + delivery)}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-plum-700/75">
      <span>{label}</span>
      <span className="font-semibold text-plum-800">{value}</span>
    </div>
  );
}
