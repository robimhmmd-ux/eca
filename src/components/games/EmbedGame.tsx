// =============================================================
// EmbedGame — render game eksternal (HTML/JS) di dalam iframe.
// Dipakai untuk game-game yang ditaruh di public/external-games/.
//
// Cara kerja:
//  - GameMeta yang punya field `embed` akan dirender pakai komponen ini.
//  - `src` iframe = path ke index.html game (mis. /external-games/foo/index.html)
//  - Iframe pakai sandbox seperlunya biar aman tapi tetep bisa jalan.
//
// CATATAN: Game eksternal TIDAK memberikan heart points
// (sesuai permintaan user — heart points hanya untuk game internal/native).
// =============================================================
import type { GameProps } from "./GameModal";

export function makeEmbedGame(src: string) {
  return function EmbedGame(_props: GameProps) {
    return (
      <iframe
        src={src}
        title="external game"
        sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-popups allow-forms"
        allow="autoplay; fullscreen; gamepad"
        className="w-full h-[60vh] sm:h-[70vh] rounded-xl border-0 bg-white"
      />
    );
  };
}
