// Global app state: heart points, owned pets, owned items (scrapbook), comfort overlay, toasts.
// Persist to localStorage so progress isn't lost.
import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { randomFrom, comfortMessages } from "@/lib/comfortMessages";

type AppState = {
  hearts: number;
  ownedPets: string[];
  activePets: string[];
  ownedItems: string[]; // non-pet items, mis. "scrapbook"
  addHearts: (n: number, reason?: string) => void;
  spendHearts: (n: number) => boolean;
  buyPet: (id: string, price: number) => boolean;
  togglePetActive: (id: string) => void;
  buyItem: (id: string, price: number, label?: string) => boolean;
  toast: (msg: string) => void;
  toasts: { id: number; msg: string }[];
  showComfort: () => void;
  comfortOpen: boolean;
  closeComfort: () => void;
  comfortText: string;
  // Scrap book modal
  scrapBookOpen: boolean;
  openScrapBook: () => void;
  closeScrapBook: () => void;
};

const Ctx = createContext<AppState | null>(null);

const LS_KEY = "comfort-nook-v1";

type Persisted = { hearts: number; ownedPets: string[]; activePets: string[]; ownedItems?: string[] };

function load(): Persisted {
  if (typeof window === "undefined") return { hearts: 0, ownedPets: [], activePets: [], ownedItems: [] };
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { hearts: 0, ownedPets: [], activePets: [], ownedItems: [] };
    const parsed = JSON.parse(raw);
    return { ownedItems: [], ...parsed };
  } catch {
    return { hearts: 0, ownedPets: [], activePets: [], ownedItems: [] };
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [hearts, setHearts] = useState(0);
  const [ownedPets, setOwnedPets] = useState<string[]>([]);
  const [activePets, setActivePets] = useState<string[]>([]);
  const [ownedItems, setOwnedItems] = useState<string[]>([]);
  const [toasts, setToasts] = useState<{ id: number; msg: string }[]>([]);
  const [comfortOpen, setComfortOpen] = useState(false);
  const [comfortText, setComfortText] = useState("");
  const [scrapBookOpen, setScrapBookOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const p = load();
    setHearts(p.hearts);
    setOwnedPets(p.ownedPets);
    setActivePets(p.activePets);
    setOwnedItems(p.ownedItems || []);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(LS_KEY, JSON.stringify({ hearts, ownedPets, activePets, ownedItems }));
  }, [hearts, ownedPets, activePets, ownedItems, hydrated]);

  const toast = useCallback((msg: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const addHearts = useCallback((n: number, reason?: string) => {
    setHearts((h) => {
      const next = h + n;
      if (Math.floor(next / 100) > Math.floor(h / 100)) {
        setTimeout(() => toast(randomFrom(comfortMessages)), 400);
      }
      return next;
    });
    if (reason) toast(`+${n} 🤍 ${reason}`);
  }, [toast]);

  const spendHearts = useCallback((n: number) => {
    let ok = false;
    setHearts((h) => {
      if (h >= n) { ok = true; return h - n; }
      return h;
    });
    return ok;
  }, []);

  const buyPet = useCallback((id: string, price: number) => {
    if (ownedPets.includes(id)) return false;
    if (hearts < price) { toast("Heart points belum cukup, main lagi yuk 🤍"); return false; }
    setHearts((h) => h - price);
    setOwnedPets((p) => [...p, id]);
    setActivePets((a) => [...a, id]);
    toast("Pet baru jadi temenmu 💕");
    return true;
  }, [hearts, ownedPets, toast]);

  const togglePetActive = useCallback((id: string) => {
    setActivePets((a) => a.includes(id) ? a.filter((x) => x !== id) : [...a, id]);
  }, []);

  const buyItem = useCallback((id: string, price: number, label?: string) => {
    if (ownedItems.includes(id)) return false;
    if (hearts < price) { toast("Heart points belum cukup, main lagi yuk 🤍"); return false; }
    setHearts((h) => h - price);
    setOwnedItems((p) => [...p, id]);
    toast(label ? `${label} udah jadi punyamu 💌` : "Berhasil dibeli 💌");
    return true;
  }, [hearts, ownedItems, toast]);

  const showComfort = useCallback(() => {
    setComfortText(randomFrom(comfortMessages));
    setComfortOpen(true);
  }, []);
  const closeComfort = useCallback(() => setComfortOpen(false), []);

  const openScrapBook = useCallback(() => setScrapBookOpen(true), []);
  const closeScrapBook = useCallback(() => setScrapBookOpen(false), []);

  return (
    <Ctx.Provider value={{
      hearts, ownedPets, activePets, ownedItems,
      addHearts, spendHearts, buyPet, togglePetActive, buyItem,
      toast, toasts,
      showComfort, comfortOpen, closeComfort, comfortText,
      scrapBookOpen, openScrapBook, closeScrapBook,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
