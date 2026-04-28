# 📖 GUIDEBOOK — U deserve to happy

Panduan lengkap project ini: cara edit di **VS Code lokal**, jalanin **preview**,
dan **publish ke Vercel**, plus penjelasan setiap file & folder.

---

## ⚡ Stack sekarang: Vite + React Router (SPA murni)

Sebelumnya project pakai TanStack Start (SSR) yang bikin susah deploy ke Vercel.
Sekarang sudah dimigrasi jadi **SPA biasa**:
- **Vite 7** sebagai bundler
- **React 19**
- **React Router v7** (`react-router-dom`)
- **Tailwind CSS v4**

Semua state aplikasi di-handle di client (localStorage), jadi nggak butuh server.
Output build cuma `dist/` static — bisa di-host di mana aja.

---

## 💻 Jalanin di VS Code (Lokal)

### 1. Prasyarat
Install salah satu (rekomendasi **Bun**, lebih cepat):
- [Bun](https://bun.sh) — `curl -fsSL https://bun.sh/install | bash`
- atau [Node.js](https://nodejs.org) v20+

### 2. Clone & install
```bash
git clone https://github.com/USERNAME/NAMA-REPO.git
cd NAMA-REPO
bun install        # atau: npm install
```

### 3. Jalanin preview lokal
```bash
bun dev            # atau: npm run dev
```
Buka `http://localhost:8080`. Edit file → browser auto-reload.

### 4. Build production (cek sebelum deploy)
```bash
bun run build      # output ke folder dist/
bun run preview    # preview hasil build
```

---

## 🚀 Deploy ke Vercel (paling simpel)

### Cara A — Via Dashboard (rekomendasi)
1. Push project kamu ke GitHub.
2. Buka [vercel.com/new](https://vercel.com/new) → **Import** repo-nya.
3. Vercel otomatis deteksi setting dari `vercel.json` di root:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: otomatis
4. Klik **Deploy** → selesai 🎉

File `vercel.json` sudah include rewrite rule supaya semua route SPA
(misal `/playground`, `/shop`) **nggak 404 lagi** kalau di-refresh.

### Cara B — Via Vercel CLI
```bash
npm i -g vercel
vercel login
vercel              # preview deploy
vercel --prod       # production
```

---

## 🌐 Deploy ke Cloudflare Pages / Netlify
Sama-sama static SPA, tinggal:
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **SPA fallback**: Cloudflare Pages dan Netlify auto-detect dari `index.html`,
  tapi kalau ada masalah refresh route, tambahkan file:
  - Netlify → `public/_redirects`: `/* /index.html 200`
  - Cloudflare Pages → otomatis pakai `index.html` fallback

---

## 📁 Penjelasan Tiap File & Folder

### Root project
| File | Fungsi |
|---|---|
| `index.html` | **Entry HTML** — root template. Edit di sini untuk title, meta, font. |
| `package.json` | Daftar dependency + script `dev`, `build` |
| `vite.config.ts` | Konfigurasi Vite (plugin React, Tailwind, alias `@`) |
| `vercel.json` | Setting deploy Vercel + SPA rewrite |
| `tsconfig.json` | Konfigurasi TypeScript |
| `eslint.config.js` | Aturan linter |
| `components.json` | Konfigurasi shadcn/ui |
| `GUIDEBOOK.md` | File ini 🌷 |

### `public/`
File yang di-serve apa adanya di root URL.
- `public/external-games/<nama-game>/index.html` →
  diakses di `https://situsmu.com/external-games/<nama-game>/index.html`

### `src/`

#### `src/main.tsx`
Entry point JavaScript. Mount React + bungkus dengan `<BrowserRouter>`.
Biasanya nggak perlu diedit.

#### `src/App.tsx`
**Pengganti `__root.tsx` dulu**. Berisi:
- Semua provider global (`AppProvider`, `MusicProvider`)
- HUD (header) dan komponen mengambang (FloatingPets, ToastStack, dll)
- `<Routes>` — daftar semua route SPA

Mau nambah halaman baru? Buka file ini, tambahkan `<Route path="..." element={...} />`.

#### `src/pages/`
Komponen halaman (1 file = 1 halaman).
- `Home.tsx` → `/`
- `Playground.tsx` → `/playground`
- `Shop.tsx` → `/shop`

#### `src/components/`
- `games/` → mini-game native + `EmbedGame.tsx` (iframe untuk game eksternal)
  - `GameModal.tsx` → modal yang nampilin game terpilih + tombol fullscreen
- `shell/` → komponen tetap UI (HUD, MusicPlayer, ComfortOverlay, FloatingPets, dll)
- `ui/` → komponen shadcn/ui

#### `src/assets/`
- `animations/` → GIF peluk/elus/cubit + komponen wrapper
- `music/` → file `.mp3` + `tracks.ts`
- `logos/` → logo brand
- `pets/` → gambar hewan peliharaan virtual
- `scrapbook/` → PNG halaman scrap book (1:1)

#### `src/lib/`
Logic & data murni (tanpa UI).
- `games.ts` → daftar semua game (native + embed)
- `pets.ts` → daftar pet
- `vocab.ts` → kamus untuk game Translate
- `comfortMessages.ts` → kalimat penyemangat
- `scrapbook.ts` → daftar PNG halaman scrap book
- `utils.ts` → helper umum

#### `src/state/`
Context global.
- `AppContext.tsx` → heart points, toast, comfort, owned pets/items
- `MusicContext.tsx` → state pemutar musik

#### `src/styles.css`
**Design system** — semua warna, font, gradient, shadow.

---

## 🎵 Tambah / Hapus Lagu
**Lokasi**: `src/assets/music/` — drop `.mp3` ke folder ini, otomatis muncul.

## 🎞️ Animasi Peluk / Elus / Cubit
**Lokasi**: `src/assets/animations/` — drop `hug.gif`, `elus.gif`, `cubit.gif`.

---

## 🎮 Tambah Mini Game

### A. Game native (React)
1. Bikin `src/components/games/NamaGame.tsx`:
   ```tsx
   import type { GameProps } from "./GameModal";
   export function NamaGame({ onScore }: GameProps) {
     return <button onClick={() => onScore(5)}>Klik aku</button>;
   }
   ```
2. Daftar di `src/components/games/GameModal.tsx` (object `REGISTRY`).
3. Tambah meta di `src/lib/games.ts`.

### B. Game embed (HTML/JS dari ZIP)
1. Extract ZIP ke `public/external-games/<nama-game>/` (harus ada `index.html`).
2. Tambah ke `src/lib/games.ts` dengan field `embed: "/external-games/<nama-game>/index.html"`.

> Game eksternal **tidak memberi heart points** (sengaja). Hanya game native.

---

## 📖 Scrap Book
- Beli di Pet Shop (150 hearts) → tombol mengambang muncul.
- Setiap halaman = 1 file PNG rasio 1:1, taruh di `src/assets/scrapbook/`.
- Daftar halaman edit di `src/lib/scrapbook.ts`.
- Animasi page-flip 3D + suara halaman dibalik (`src/components/ScrapBookModal.tsx`).

---

## 🏷️ Ubah Nama Brand
Cari `"U deserve to happy"` di `index.html`, `src/components/shell/HUD.tsx`,
dan halaman-halaman di `src/pages/`. Logo: `src/assets/logos/brand.png`.

## 🎨 Ubah Warna / Tema
**Lokasi**: `src/styles.css` (block `:root`).

---

## 🛠️ Workflow Edit di VS Code

1. Buka folder project di VS Code.
2. Install extension: **ESLint**, **Prettier**, **Tailwind CSS IntelliSense**.
3. Jalanin `bun dev` di terminal.
4. Edit → save → browser auto-reload.

---

## 📤 Push Perubahan
```bash
git add .
git commit -m "deskripsi perubahan"
git push
```
Vercel otomatis re-deploy setiap push ke branch `main`.

---

## 🆘 Troubleshooting

| Masalah | Solusi |
|---|---|
| `bun dev` error "module not found" | `bun install` lagi |
| Vercel deploy 404 di route selain `/` | Cek `vercel.json` ada di root + isi `rewrites` |
| Game embed 404 di Vercel | Path harus diawali `/external-games/...` (case-sensitive!) |
| Mau ubah `<title>` tab browser | Edit `index.html` |

---

Selamat ngoprek! 🌷
