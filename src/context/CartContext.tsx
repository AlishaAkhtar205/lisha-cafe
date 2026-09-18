import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { MenuItem } from "../data/menu";

export interface CartLine {
  item: MenuItem;
  qty: number;
}

export interface Toast {
  id: number;
  message: string;
  emoji?: string;
  image?: string;
}

interface CartContextValue {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (item: MenuItem, qty?: number) => void;
  remove: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  clear: () => void;
  count: number;
  total: number;
  lastAddedId: number | null;
  toasts: Toast[];
  pushToast: (t: Omit<Toast, "id">) => void;
  dismissToast: (id: number) => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_KEY = "lisha-cafe-cart";
const FAV_KEY = "lisha-cafe-favs";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(CART_KEY);
      return raw ? (JSON.parse(raw) as CartLine[]) : [];
    } catch {
      return [];
    }
  });
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(FAV_KEY);
      return raw ? (JSON.parse(raw) as number[]) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const [lastAddedId, setLastAddedId] = useState<number | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  useEffect(() => {
    try {
      window.localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
    } catch {
      /* ignore */
    }
  }, [favorites]);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback(
    (t: Omit<Toast, "id">) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { ...t, id }]);
      window.setTimeout(() => dismissToast(id), 2600);
    },
    [dismissToast]
  );

  const add: CartContextValue["add"] = (item, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.item.id === item.id);
      if (existing) {
        return prev.map((l) =>
          l.item.id === item.id ? { ...l, qty: l.qty + qty } : l
        );
      }
      return [...prev, { item, qty }];
    });
    setLastAddedId(item.id);
    window.setTimeout(() => setLastAddedId(null), 1200);
    pushToast({
      message: `${item.name} added`,
      emoji: "🧁",
      image: item.image,
    });
  };

  const remove: CartContextValue["remove"] = (id) =>
    setLines((prev) => prev.filter((l) => l.item.id !== id));

  const setQty: CartContextValue["setQty"] = (id, qty) =>
    setLines((prev) =>
      prev
        .map((l) => (l.item.id === id ? { ...l, qty } : l))
        .filter((l) => l.qty > 0)
    );

  const increment = (id: number) => setQty(id, (lines.find((l) => l.item.id === id)?.qty ?? 0) + 1);
  const decrement = (id: number) => setQty(id, (lines.find((l) => l.item.id === id)?.qty ?? 0) - 1);
  const clear = () => setLines([]);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.includes(id),
    [favorites]
  );

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const total = lines.reduce((s, l) => s + l.qty * l.item.price, 0);
    return {
      lines,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      add,
      remove,
      setQty,
      increment,
      decrement,
      clear,
      count,
      total,
      lastAddedId,
      toasts,
      pushToast,
      dismissToast,
      favorites,
      toggleFavorite,
      isFavorite,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines, isOpen, lastAddedId, toasts, favorites]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export const formatPrice = (n: number) => `₺${n.toLocaleString("tr-TR")}`;
