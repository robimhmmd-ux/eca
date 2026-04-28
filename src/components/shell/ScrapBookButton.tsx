// =============================================================
// ScrapBookButton — tombol mengambang dengan logo scrap book.
// Hanya muncul kalau user sudah membeli "scrapbook" di Pet Shop.
// Diklik => buka ScrapBookModal.
// =============================================================
import { useApp } from "@/state/AppContext";
import { ScrapBookModal } from "@/components/ScrapBookModal";

export function ScrapBookButton() {
  const { ownedItems, scrapBookOpen, openScrapBook, closeScrapBook } = useApp();
  const owned = ownedItems.includes("scrapbook");

  if (!owned) return null;

  return (
    <>
      <button
        onClick={openScrapBook}
        aria-label="Buka Scrap Book"
        title="Scrap Book"
        className="fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full bg-gradient-to-br from-blush via-rose to-butter soft-shadow flex items-center justify-center text-2xl hover:scale-110 transition-transform animate-bounce-soft"
      >
        📖
      </button>
      {scrapBookOpen && <ScrapBookModal onClose={closeScrapBook} />}
    </>
  );
}
