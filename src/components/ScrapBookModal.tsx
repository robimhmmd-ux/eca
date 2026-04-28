// =============================================================
// ScrapBookModal — buku kenangan dengan animasi page-flip realistis.
// -------------------------------------------------------------
// Setiap halaman = satu PNG (rasio 1:1) dari src/lib/scrapbook.ts.
// Animasi: pakai 3D rotateY + perspective. Halaman terbalik
// dari kanan -> kiri (next), dengan dua sisi (depan = halaman
// sekarang, belakang = halaman berikutnya), persis seperti
// membuka buku.
// Suara: page-flip MP3 dimuat dari URL publik (CDN). Kalau mau
// pakai suara lokal, taruh file di public/sounds/page-flip.mp3
// dan ganti FLIP_SOUND_URL di bawah jadi "/sounds/page-flip.mp3".
// =============================================================
import { useEffect, useRef, useState } from "react";
import { PAGES, SCRAPBOOK_TITLE, SCRAPBOOK_SUBTITLE } from "@/lib/scrapbook";

// Suara flip — gratis dari mixkit. Bisa diganti dengan path lokal.
const FLIP_SOUND_URL =
  "https://assets.mixkit.co/active_storage/sfx/2434/2434-preview.mp3";

const FLIP_MS = 800;

export function ScrapBookModal({ onClose }: { onClose: () => void }) {
  const [page, setPage] = useState(0);
  const [flipping, setFlipping] = useState<"next" | "prev" | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const total = PAGES.length;

  // Init audio sekali
  useEffect(() => {
    const a = new Audio(FLIP_SOUND_URL);
    a.volume = 0.55;
    a.preload = "auto";
    audioRef.current = a;
    return () => { a.pause(); audioRef.current = null; };
  }, []);

  function playFlipSound() {
    const a = audioRef.current;
    if (!a) return;
    try { a.currentTime = 0; void a.play(); } catch {}
  }

  function go(dir: "next" | "prev") {
    if (flipping) return;
    if (dir === "next" && page >= total - 1) return;
    if (dir === "prev" && page <= 0) return;
    playFlipSound();
    setFlipping(dir);
    // Update halaman setelah animasi selesai
    setTimeout(() => {
      setPage((p) => p + (dir === "next" ? 1 : -1));
      setFlipping(null);
    }, FLIP_MS);
  }

  // Halaman yang muncul saat animasi
  const currentImg = PAGES[page]?.image;
  const nextImg = PAGES[Math.min(page + 1, total - 1)]?.image;
  const prevImg = PAGES[Math.max(page - 1, 0)]?.image;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{
        background: "color-mix(in oklab, var(--foreground) 45%, transparent)",
        backdropFilter: "blur(8px)",
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md sm:max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center mb-3 text-white drop-shadow">
          <h2 className="font-display text-2xl font-bold">{SCRAPBOOK_TITLE} 📖</h2>
          <p className="text-xs opacity-90">{SCRAPBOOK_SUBTITLE}</p>
        </div>

        {/* Buku — square karena PNG-nya rasio 1:1 */}
        <div
          className="relative w-full aspect-square"
          style={{ perspective: "1800px" }}
        >
          {/* Bayangan buku */}
          <div className="absolute inset-2 rounded-2xl bg-black/40 blur-xl" />

          {/* Halaman dasar (selalu menampilkan halaman sekarang) */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden soft-shadow bg-white">
            <img
              src={currentImg}
              alt={PAGES[page]?.alt}
              className="w-full h-full object-cover select-none"
              draggable={false}
            />
          </div>

          {/* Halaman flipping — hanya muncul saat animasi */}
          {flipping === "next" && (
            <div
              className="absolute inset-0 rounded-2xl scrapbook-page scrapbook-flip-next"
              style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
            >
              {/* Sisi depan = halaman sekarang */}
              <div className="scrapbook-face scrapbook-front">
                <img src={currentImg} alt="" className="w-full h-full object-cover" draggable={false} />
              </div>
              {/* Sisi belakang = halaman berikutnya */}
              <div className="scrapbook-face scrapbook-back">
                <img src={nextImg} alt="" className="w-full h-full object-cover" draggable={false} />
              </div>
            </div>
          )}

          {flipping === "prev" && (
            <div
              className="absolute inset-0 rounded-2xl scrapbook-page scrapbook-flip-prev"
              style={{ transformOrigin: "right center", transformStyle: "preserve-3d" }}
            >
              <div className="scrapbook-face scrapbook-front">
                <img src={currentImg} alt="" className="w-full h-full object-cover" draggable={false} />
              </div>
              <div className="scrapbook-face scrapbook-back">
                <img src={prevImg} alt="" className="w-full h-full object-cover" draggable={false} />
              </div>
            </div>
          )}

          {/* Garis spine di tengah biar berasa kayak buku */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-black/15" />
        </div>

        {/* Kontrol */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => go("prev")}
            disabled={page === 0 || !!flipping}
            className="px-4 py-2 rounded-full bg-white/80 hover:bg-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed soft-shadow"
          >
            ← Sebelumnya
          </button>
          <div className="text-white text-sm font-semibold drop-shadow tabular-nums">
            {page + 1} / {total}
          </div>
          <button
            onClick={() => go("next")}
            disabled={page === total - 1 || !!flipping}
            className="px-4 py-2 rounded-full bg-white/80 hover:bg-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed soft-shadow"
          >
            Selanjutnya →
          </button>
        </div>

        {/* Tombol close */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center text-lg"
          aria-label="Tutup"
        >
          ✕
        </button>
      </div>

      {/* Style animasi page flip — keyframes berisi rotasi 3D dengan
          easing yang bikin halaman ke-flip mirip kertas asli. */}
      <style>{`
        .scrapbook-page {
          will-change: transform;
        }
        .scrapbook-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 10px 30px -10px rgba(0,0,0,.45);
          background: white;
        }
        .scrapbook-front { transform: rotateY(0deg); }
        .scrapbook-back  { transform: rotateY(180deg); }

        @keyframes scrap-flip-next {
          0%   { transform: rotateY(0deg);   box-shadow: 0 0 0 rgba(0,0,0,0); }
          50%  { transform: rotateY(-90deg); box-shadow: -30px 0 40px rgba(0,0,0,.35); }
          100% { transform: rotateY(-180deg); box-shadow: 0 0 0 rgba(0,0,0,0); }
        }
        @keyframes scrap-flip-prev {
          0%   { transform: rotateY(0deg);   box-shadow: 0 0 0 rgba(0,0,0,0); }
          50%  { transform: rotateY(90deg);  box-shadow: 30px 0 40px rgba(0,0,0,.35); }
          100% { transform: rotateY(180deg); box-shadow: 0 0 0 rgba(0,0,0,0); }
        }
        .scrapbook-flip-next {
          animation: scrap-flip-next ${FLIP_MS}ms cubic-bezier(.45,.05,.25,1) forwards;
        }
        .scrapbook-flip-prev {
          animation: scrap-flip-prev ${FLIP_MS}ms cubic-bezier(.45,.05,.25,1) forwards;
        }
      `}</style>
    </div>
  );
}
