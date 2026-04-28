// =============================================================
// SCRAP BOOK — daftar halaman scrap book (sekarang berbasis PNG).
// -------------------------------------------------------------
// Setiap halaman = SATU GAMBAR PNG dengan rasio 1:1 (kotak).
// Kamu desain sendiri di Canva (1080x1080 atau 2000x2000),
// export PNG, lalu taruh di src/assets/scrapbook/<nama>.png
// dan import di bawah ini.
//
// Cara nambah halaman:
//   1. Drop file PNG kamu ke src/assets/scrapbook/
//   2. Tambahkan import di bagian "IMPORT GAMBAR" di bawah
//   3. Tambahkan entry baru ke array PAGES
// =============================================================

export type ScrapPage = {
  /** Path ke gambar PNG (rasio 1:1). */
  image: string;
  /** Alt text — buat aksesibilitas, ga muncul di layar. */
  alt: string;
};

// ----------- IMPORT GAMBAR -----------
// Contoh kalau kamu udah punya file:
//   import page1 from "@/assets/scrapbook/halaman-1.png";
//   import page2 from "@/assets/scrapbook/halaman-2.png";
//
// Sebelum kamu isi, pakai placeholder Picsum (1:1) dulu biar
// animasinya tetap bisa dilihat. Hapus & ganti dengan import
// PNG kamu sendiri kalau sudah siap.

const placeholder = (seed: string) =>
  `https://picsum.photos/seed/${seed}/900/900`;

export const SCRAPBOOK_TITLE = "Scrap Book Buat Kamu";
export const SCRAPBOOK_SUBTITLE = "kumpulan kenangan & kata semangat 💌";

export const PAGES: ScrapPage[] = [
  { image: placeholder("scrap-cover"), alt: "Cover scrap book" },
  { image: placeholder("scrap-1"),     alt: "Halaman kenangan 1" },
  { image: placeholder("scrap-2"),     alt: "Halaman kenangan 2" },
  { image: placeholder("scrap-3"),     alt: "Halaman kenangan 3" },
  { image: placeholder("scrap-4"),     alt: "Halaman kenangan 4" },
  { image: placeholder("scrap-5"),     alt: "Halaman penutup" },
];
