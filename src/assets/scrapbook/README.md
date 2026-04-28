# Scrap Book — Folder Gambar PNG

Folder ini buat naro file **PNG halaman scrap book** kamu.

## Aturan gambar

- Format: **PNG** (boleh JPG kalau mau, tapi PNG lebih recommended buat kualitas).
- Rasio: **1:1 (kotak)** — misal `1080 x 1080`, `2000 x 2000`, atau `2400 x 2400`.
- Desain bebas pakai Canva, Photoshop, dll — semua teks/foto/quote bagusnya udah
  di-bake langsung ke gambar (jadi kamu kontrol penuh tipografi, layout, warna).

## Cara nambah halaman baru

1. Drop file PNG ke folder ini, contoh: `halaman-1.png`.
2. Buka `src/lib/scrapbook.ts`.
3. Di bagian "IMPORT GAMBAR", tambahkan:
   ```ts
   import halaman1 from "@/assets/scrapbook/halaman-1.png";
   ```
4. Tambahkan entry baru ke array `PAGES`:
   ```ts
   { image: halaman1, alt: "Deskripsi halaman 1" },
   ```
5. Save → preview otomatis reload.

## Cara ganti halaman placeholder yang udah ada

Sekarang halaman default pakai gambar dari `picsum.photos` (acak) supaya animasinya
keliatan jalan walaupun kamu belum upload PNG. Tinggal:

1. Hapus baris `placeholder("...")` di `src/lib/scrapbook.ts`.
2. Ganti dengan `image: halamanKamu` setelah `import` PNG-nya.

## Tentang animasi & suara

- Animasi page-flip 3D dijalankan di `src/components/ScrapBookModal.tsx`.
- Durasi flip: ubah konstanta `FLIP_MS` di file yang sama (default 800ms).
- Suara flip: defaultnya pakai URL CDN gratis dari Mixkit. Mau pakai file
  lokal? Taruh file di `public/sounds/page-flip.mp3` lalu ubah
  `FLIP_SOUND_URL = "/sounds/page-flip.mp3"` di `ScrapBookModal.tsx`.
