// =============================================================
// DAFTAR PET
// -------------------------------------------------------------
// Setiap pet punya gambar sendiri di folder `src/assets/pets/`.
// Untuk ganti gambar pet:
//   1. Replace file di src/assets/pets/<id>.png (atau .gif)
//   2. Kalau ekstensi berubah (mis. jadi .gif), update juga
//      baris `import` di bawah ini.
// =============================================================

// Import gambar dari folder assets — Vite akan resolve ke URL jadi.
import catImg    from "@/assets/pets/cat.gif";
import rabbitImg from "@/assets/pets/cewe_kucing.gif";
import blobImg   from "@/assets/pets/kekelawar.gif";
import bearImg   from "@/assets/pets/kucing-pelangi.gif";
import duckImg   from "@/assets/pets/pink.gif";
import ghostImg  from "@/assets/pets/hantu.gif";
import frogImg   from "@/assets/pets/pokemon-ungu.gif";
import chickImg  from "@/assets/pets/anime.gif";
import cihuy from "@/assets/pets/bebek.gif";  

export type Pet = {
  id: string;
  name: string;
  emoji: string;       // fallback / dipakai di shop card kecil
  image: string;       // URL gambar (PNG/GIF) — dari folder assets
  price: number;
  description: string;
};

export const PETS: Pet[] = [
  { id: "cat",    name: "Mochi",  emoji: "🐱", image: catImg,    price: 50,  description: "Kucing abu-abu kecil pembawa balon merah, siap terbang ke hatimu." },
  { id: "rabbit", name: "Eca",    emoji: "🐰", image: rabbitImg, price: 80,  description: "Gadis kecil petualang yang selalu ditemani kucing hitam misterius." },
  { id: "blob",   name: "Tiwul",   emoji: "🫧", image: blobImg,   price: 30,  description: "Naga ungu kecil yang jago jaga perasaan, hobinya ngumpet di awan." },
  { id: "bear",   name: "Yappie", emoji: "🐻", image: bearImg,   price: 120, description: "Kucing pelangi yang lincah, siap mewarnai hari-harimu yang mendung." },
  { id: "ghost",  name: "Booo",    emoji: "👻", image: ghostImg,  price: 100, description: "hantu sopan, nggak nakut-nakutin kok" },
  { id: "frog",   name: "Wonie",  emoji: "🐸", image: frogImg,   price: 70,  description: "Monster ungu yang jago dengerin curhat, telinganya lebar banget!" },
  { id: "cihuy",  name: "Kwek",  emoji: "🦆", image: cihuy,     price: 90,  description: "bebek lucu yang suka bermain air" },
  { id: "duckImg",  name: "Pinkypo",  emoji: "🦆", image: duckImg,     price: 90,  description: "Gumpalan merah muda paling empuk sedunia, hobi utamanya cuma makan." },
];
