// Pet Shop
import { PETS } from "@/lib/pets";
import { useApp } from "@/state/AppContext";

const SCRAPBOOK_PRICE = 150;

export default function Shop() {
  const { hearts, ownedPets, activePets, ownedItems, buyPet, togglePetActive, buyItem, openScrapBook } = useApp();
  const scrapbookOwned = ownedItems.includes("scrapbook");
  const canAffordScrapbook = hearts >= SCRAPBOOK_PRICE;

  return (
    <section className="px-4 sm:px-8">
      <div className="mx-auto max-w-5xl pt-6">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold">Pet Shop 🐾</h1>
          <p className="text-muted-foreground mt-2">
            Tukar heart points kamu sama temen baru. Mereka bakal floating nemenin di sini.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blush/70 border border-white/60 font-semibold">
            🤍 {hearts} heart points
          </div>
        </div>

        <div className="mb-8">
          <h2 className="font-display text-xl font-bold mb-3 text-center">Item Spesial 💌</h2>
          <div className="glass-card rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-5 bg-gradient-to-br from-blush/40 via-rose/30 to-butter/40">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blush via-rose to-butter flex items-center justify-center text-5xl soft-shadow shrink-0">
              📖
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="font-display font-bold text-lg">Scrap Book</div>
              <p className="text-sm text-muted-foreground mt-1">
                Ini adalah scecret item yang harus kamu beli hehehehehe.....
              </p>
            </div>
            <div className="shrink-0">
              {scrapbookOwned ? (
                <button
                  onClick={openScrapBook}
                  className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold soft-shadow hover:scale-105 transition"
                >
                  📖 Buka Scrap Book
                </button>
              ) : (
                <button
                  onClick={() => buyItem("scrapbook", SCRAPBOOK_PRICE, "Scrap Book")}
                  disabled={!canAffordScrapbook}
                  className={`px-5 py-2.5 rounded-full font-semibold transition ${
                    canAffordScrapbook
                      ? "bg-primary text-primary-foreground hover:scale-105 soft-shadow"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  🤍 {SCRAPBOOK_PRICE}
                </button>
              )}
            </div>
          </div>
        </div>

        <h2 className="font-display text-xl font-bold mb-3 text-center">Pet 🐾</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {PETS.map((p) => {
            const owned = ownedPets.includes(p.id);
            const active = activePets.includes(p.id);
            const canAfford = hearts >= p.price;
            return (
              <div key={p.id} className="glass-card rounded-3xl p-5 flex flex-col items-center text-center">
                <div className={`w-20 h-20 mb-3 ${owned ? "animate-bounce-soft" : "opacity-90"}`}>
                  <img
                    src={p.image}
                    alt={p.name}
                    width={80}
                    height={80}
                    loading="lazy"
                    className="w-full h-full object-contain drop-shadow"
                  />
                </div>
                <div className="font-display font-bold">{p.name}</div>
                <div className="text-xs text-muted-foreground mt-1 mb-3 min-h-[2.5rem]">{p.description}</div>

                {owned ? (
                  <button
                    onClick={() => togglePetActive(p.id)}
                    className={`w-full py-2 rounded-full text-sm font-semibold transition ${
                      active
                        ? "bg-primary text-primary-foreground soft-shadow"
                        : "bg-white/70 hover:bg-white text-foreground"
                    }`}
                  >
                    {active ? "✓ Lagi nemenin" : "Panggil keluar"}
                  </button>
                ) : (
                  <button
                    onClick={() => buyPet(p.id, p.price)}
                    disabled={!canAfford}
                    className={`w-full py-2 rounded-full text-sm font-semibold transition ${
                      canAfford
                        ? "bg-primary text-primary-foreground hover:scale-105 soft-shadow"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    🤍 {p.price}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
