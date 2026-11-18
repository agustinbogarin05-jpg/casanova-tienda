import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { SiFacebook, SiInstagram, SiTiktok, SiYoutube } from "@icons-pack/react-simple-icons";
import { useCatalog } from "@/lib/catalog";
import type { Settings } from "@/lib/types";
import { SiteHeader } from "./SiteHeader";
import { Logo } from "./Logo";
import { WhatsAppButton } from "./WhatsAppButton";
import { FavoritesSheet, FavoritesTrigger } from "./Favorites";
import { useCartCount } from "@/lib/favorites";
import { cn } from "@/lib/utils";

const SOCIALS: { key: keyof Settings; label: string; Icon: typeof SiInstagram }[] = [
  { key: "instagram_url", label: "Instagram", Icon: SiInstagram },
  { key: "facebook_url", label: "Facebook", Icon: SiFacebook },
  { key: "tiktok_url", label: "TikTok", Icon: SiTiktok },
  { key: "youtube_url", label: "YouTube", Icon: SiYoutube },
];

function SocialLinks({ settings }: { settings: Settings | undefined }) {
  const links = SOCIALS.filter((s) => s.key === "instagram_url" && settings && String(settings[s.key] ?? "").startsWith("https://"));
  if (links.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-3" aria-label="Redes sociales">
      {links.map(({ key, label, Icon }) => (
        <li key={key}>
          <a
            href={String(settings?.[key])}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`footer-social-${label.toLowerCase()}`}
            className="group inline-flex h-11 items-center gap-2.5 rounded-xl border border-beige px-4 text-[15px] font-semibold text-brand transition-[background-color,border-color] duration-200 hover:border-teal hover:bg-beige"
          >
            <Icon size={18} color="#2e6a94" aria-hidden="true" />
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function SiteFooter() {
  const { data } = useCatalog();
  const settings = data?.settings;
  return (
    <footer id="contacto" data-testid="site-footer" className="mt-24 border-t border-beige bg-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-12 lg:px-8">
        <div className="space-y-6 md:col-span-7">
          <Logo testId="footer-logo-link" />
          <p className="max-w-md text-base leading-relaxed text-ink">
            Casanova es una marca argentina que acerca la tecnología inteligente a hogares, departamentos, oficinas y locales comerciales.
          </p>
          <WhatsAppButton settings={settings} testId="footer-whatsapp-button" size="md">
            Escribinos por WhatsApp
          </WhatsAppButton>
        </div>
        <div className="space-y-4 md:col-span-5">
          <h2 className="text-lg font-bold text-brand">Seguinos</h2>
          <SocialLinks settings={settings} />
          <p className="text-base leading-relaxed text-ink">Trabajamos en CABA, AMBA y alrededores.</p>
        </div>
      </div>
      <div className="border-t border-beige">
        <div className="mx-auto max-w-7xl px-4 py-5 text-sm text-ink sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} CASANOVA</p>
        </div>
      </div>
    </footer>
  );
}

/** Persistent shell for public pages: the header (and its live search) stays mounted across routes. */
/** Phones: floating "Favoritos" pill once something is saved (sits above the product page's sticky bar). */
function FloatingFavorites() {
  const count = useCartCount();
  const path = useLocation().pathname;
  const onProduct = path.startsWith("/producto/");
  if (!count || !(onProduct || path.startsWith("/catalogo"))) return null;
  return (
    <div className={cn("fixed right-4 z-30 animate-fade-up sm:hidden", onProduct ? "bottom-24" : "bottom-4")}>
      <FavoritesTrigger label />
    </div>
  );
}

export function SiteLayout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-cream"
      >
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <FloatingFavorites />
      <FavoritesSheet />
    </div>
  );
}
