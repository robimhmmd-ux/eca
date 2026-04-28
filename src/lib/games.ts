// =============================================================
// Definisi metadata untuk setiap mini game di Playground.
//
// - Game native (kode React lokal) tidak punya field `embed`.
//   Komponennya didaftarkan di REGISTRY src/components/games/GameModal.tsx
// - Game eksternal (HTML statis di public/external-games/...) pakai
//   field `embed`. Game embed TIDAK memberi heart points.
// =============================================================

export type GameMeta = {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  tone: string;
  /** Path ke index.html di public/external-games/... */
  embed?: string;
};

export const GAMES: GameMeta[] = [
  { id: "heart-clicker",   name: "Klik Hati",        emoji: "💗", desc: "Klik hati yang muncul, sebanyak yang kamu mau",  tone: "from-blush to-rose" },
  { id: "falling-stars",   name: "Tangkap Bintang",  emoji: "⭐", desc: "Geser keranjang, tangkap bintang yang jatuh",     tone: "from-sky to-lavender" },
  { id: "memory",          name: "Memory Match",     emoji: "🧠", desc: "Cocokkan pasangan kartu emoji",                   tone: "from-mint to-sky" },
  { id: "whack",           name: "Tepuk Kucing",     emoji: "🐱", desc: "Tepuk kucing lucu yang muncul (versi lembut)",    tone: "from-butter to-blush" },
  { id: "guess-word",      name: "Tebak Kata Emoji", emoji: "📝", desc: "Tebak kata sederhana dari emoji",                 tone: "from-lavender to-blush" },
  { id: "puzzle",          name: "Puzzle Geser",     emoji: "🧩", desc: "Geser kotak sampe gambar utuh",                   tone: "from-mint to-butter" },
  { id: "reflex",          name: "Refleks",          emoji: "⚡", desc: "Klik secepat mungkin saat warna jadi hijau",      tone: "from-sky to-mint" },
  { id: "dodge",           name: "Hindari Awan",     emoji: "☁️", desc: "Geser cloud kamu, hindari rintangan",            tone: "from-lavender to-sky" },
  { id: "translate-id-en", name: "Translate ID→EN",  emoji: "🇮🇩", desc: "25 round: tebak kosa kata Indonesia ke Inggris", tone: "from-rose to-butter" },
  { id: "translate-en-id", name: "Translate EN→ID",  emoji: "🇬🇧", desc: "25 round: tebak kosa kata Inggris ke Indonesia", tone: "from-butter to-mint" },
  { id: "flying-bird",     name: "Flying Bird",      emoji: "🐦", desc: "Lompat-lompat hindari pipa hijau",                tone: "from-sky to-mint" },
  { id: "jigsaw-20",       name: "Jigsaw 5×5",       emoji: "🖼️", desc: "Susun puzzle gambar 25 keping",                   tone: "from-mint to-lavender" },
  { id: "snake-apple",     name: "Ular Makan Apel",  emoji: "🐍", desc: "Pakai tombol arah, makan apel, jangan tabrak",    tone: "from-mint to-sky" },

  // ---------- Game eksternal (embed iframe) — TIDAK memberi heart points ----------
  { id: "ext-sokoban-3d",  name: "Sokoban 3D",       emoji: "📦", desc: "Sokoban 3D dengan banyak level (eksternal)",      tone: "from-lavender to-mint",
    embed: "/external-games/sokoban-3d/index.html" },
  { id: "ext-sokoban-solver", name: "Sokoban Solver", emoji: "🧠", desc: "Sokoban klasik + solver otomatis (eksternal)",   tone: "from-butter to-mint",
    embed: "/external-games/sokoban-solver/index.html" },
];
