// =============================================================
// ScrapBookModal — Versi 1024x768 Photo Drop 🍃
// -------------------------------------------------------------
// Perubahan:
// 1. Ratio: Diubah dari aspect-square ke aspect-[1024/768].
// 2. Layout: Max-width diperbesar (max-w-3xl) agar pas di layar.
// 3. Animasi: Tetap menggunakan logic jatuh random & reverse.
// =============================================================
import { useEffect, useRef, useState } from "react";
import { PAGES, SCRAPBOOK_TITLE, SCRAPBOOK_SUBTITLE } from "@/lib/scrapbook";

const SWISH_SOUND_URL = "public/sounds/page-flip.wav";

export function ScrapBookModal({ onClose }: { onClose: () => void }) {
  const [droppedIndices, setDroppedIndices] = useState<number[]>([]);
  const [isReversing, setIsReversing] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const total = PAGES.length;

  // Pre-calculate arah jatuh acak
  const [dropPaths] = useState(() => 
    PAGES.map(() => {
      const isLeft = Math.random() > 0.5;
      const x = (Math.random() * 30 + 20) * (isLeft ? -1 : 1); 
      const y = Math.random() * 40 + 80; 
      const rot = (Math.random() * 40 + 10) * (isLeft ? -1 : 1); 
      return `translate(${x}vw, ${y}vh) rotate(${rot}deg) scale(0.7)`;
    })
  );

  const [initialRots] = useState(() =>
    PAGES.map((_, i) => (i === 0 ? 0 : (Math.random() * 4 - 2)))
  );

  useEffect(() => {
    const a = new Audio(SWISH_SOUND_URL);
    a.volume = 0.3;
    a.preload = "auto";
    audioRef.current = a;
    return () => { a.pause(); audioRef.current = null; };
  }, []);

  function handleCardClick(index: number) {
    if (isReversing) return;

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      void audioRef.current.play();
    }

    if (droppedIndices.length === total - 1) {
      setIsReversing(true);
      const allDropped = [...droppedIndices, index];
      setDroppedIndices(allDropped);

      setTimeout(() => {
        let currentDropped = [...allDropped];
        const reverseInterval = setInterval(() => {
          currentDropped.pop();
          setDroppedIndices([...currentDropped]);
          if (currentDropped.length === 0) {
            clearInterval(reverseInterval);
            setIsReversing(false);
          }
        }, 150);
      }, 800);
      return;
    }

    setDroppedIndices((prev) => [...prev, index]);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-hidden"
      onClick={onClose}
    >
      <div className="text-center mb-6 text-white z-[60] pointer-events-none">
        <h2 className="text-3xl font-bold tracking-widest">{SCRAPBOOK_TITLE}</h2>
        <p className="text-sm opacity-70 mt-1 uppercase tracking-widest">{SCRAPBOOK_SUBTITLE}</p>
      </div>

      {/* PENTING: Perubahan rasio di sini 
          max-w-3xl agar gambar 1024px tidak kekecilan di desktop
      */}
      <div 
        className="relative w-full max-w-3xl aspect-[1024/768] flex items-center justify-center" 
        onClick={(e) => e.stopPropagation()}
      >
        {PAGES.map((page, index) => {
          const isDropped = droppedIndices.includes(index);
          const isTopCard = index === (function findTopCard() {
            for (let i = 0; i < total; i++) {
              if (!droppedIndices.includes(i)) return i;
            }
            return total - 1;
          })();

          return (
            <div
              key={index}
              onClick={() => isTopCard && handleCardClick(index)}
              className="absolute inset-0 rounded-lg bg-white border-[6px] border-white shadow-2xl transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                zIndex: total - index,
                transform: isDropped 
                  ? dropPaths[index] 
                  : `rotate(${initialRots[index]}deg)`,
                opacity: isDropped ? 0 : 1,
                cursor: isTopCard && !isReversing ? "pointer" : "default",
                pointerEvents: isDropped ? "none" : "auto",
              }}
            >
              <img 
                src={page.image} 
                alt={page.alt}
                className="w-full h-full object-cover rounded-sm" 
                draggable={false}
              />
            </div>
          );
        })}
      </div>

      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/50 hover:text-white text-2xl z-[70]"
      >
        ✕
      </button>
    </div>
  );
}