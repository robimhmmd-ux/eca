// App shell — installs all global providers and shell pieces.
// Music continues across pages because the audio element lives in MusicProvider.
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { AppProvider } from "@/state/AppContext";
import { MusicProvider } from "@/state/MusicContext";
import { HUD } from "@/components/shell/HUD";
import { ComfortOverlay } from "@/components/shell/ComfortOverlay";
import { FloatingPets } from "@/components/shell/FloatingPets";
import { ToastStack } from "@/components/shell/ToastStack";
import { ScrapBookButton } from "@/components/shell/ScrapBookButton";

import Home from "@/pages/Home";
import Playground from "@/pages/Playground";
import Shop from "@/pages/Shop";

function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center glass-card rounded-3xl p-10">
        <div className="text-6xl mb-4">🌷</div>
        <h1 className="font-display text-3xl font-bold">Halaman ini lagi sembunyi</h1>
        <p className="mt-2 text-sm text-muted-foreground">Yuk balik ke tempat yang nyaman.</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground soft-shadow"
          >
            Balik ke Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  const loc = useLocation();
  return (
    <main key={loc.pathname} className="flex-1 animate-page-in pb-32">
      {children}
    </main>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MusicProvider>
        <div className="min-h-dvh flex flex-col">
          <HUD />
          <PageWrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageWrapper>
          <FloatingPets />
          <ToastStack />
          <ComfortOverlay />
          <ScrapBookButton />
        </div>
      </MusicProvider>
    </AppProvider>
  );
}
