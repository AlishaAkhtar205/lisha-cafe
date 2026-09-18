import { useCart } from "../context/CartContext";
import { CloseIcon } from "./icons";

export function Toaster() {
  const { toasts, dismissToast } = useCart();

  return (
    <div className="pointer-events-none fixed left-1/2 top-20 z-[90] flex w-[min(92vw,22rem)] -translate-x-1/2 flex-col items-center gap-2.5">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex w-full animate-toast-in items-center gap-3 overflow-hidden rounded-2xl border border-blush-200 bg-white/95 p-2.5 pr-3 shadow-glow backdrop-blur"
        >
          {t.image ? (
            <img
              src={t.image}
              alt=""
              className="h-11 w-11 shrink-0 rounded-xl object-cover"
            />
          ) : (
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blush-100 text-2xl">
              {t.emoji}
            </span>
          )}
          <div className="flex-1">
            <p className="text-sm font-bold text-plum-800">{t.message}</p>
            <p className="text-xs text-blush-500">Added to your tray 🎀</p>
          </div>
          <button
            onClick={() => dismissToast(t.id)}
            aria-label="Dismiss"
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-plum-700/40 transition-colors hover:bg-blush-100 hover:text-blush-600"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
