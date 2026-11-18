import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCatalog } from "@/lib/catalog";
import { scrollToId } from "@/lib/useCatalogParams";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./Logo";
import { SearchField } from "./SearchField";
import { WhatsAppButton } from "./WhatsAppButton";
import { FavoritesTrigger } from "./Favorites";
import { favorites } from "@/lib/favorites";

const navLink =
  "inline-flex h-10 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-beige hover:text-brand focus-visible:outline-2 focus-visible:outline-teal";

const NAV = [
  { to: "/", label: "Inicio", id: "inicio" },
  { to: "/automatizacion", label: "Automatización", id: "automatizacion" },
  { to: "/catalogo", label: "Catálogo", id: "catalogo" },
] as const;
const mobileItem =
  "flex min-h-12 w-full items-center rounded-xl px-3 text-left text-[15px] font-semibold text-ink transition-colors hover:bg-beige";

export function SiteHeader() {
  const { data } = useCatalog();
  const { pathname } = useLocation();
  // Buscador y "Mi pedido" solo tienen sentido dentro del catálogo.
  const showCatalogTools = pathname.startsWith("/catalogo") || pathname.startsWith("/producto");
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRowRef = useRef<HTMLDivElement>(null);
  const [collapse, setCollapse] = useState(0); // px to slide up: hides the logo row, keeps the search visible

  // Phones/tablets (< md): scrolling down hides the logo row and keeps only the search fixed; scrolling up shows it again.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const searchFocused = document.activeElement?.id === "catalog-search";
      const offset = (searchRowRef.current?.offsetTop ?? 0) - 10;
      if (!mq.matches || !showCatalogTools || y < 90 || menuOpen) setCollapse(0);
      else if (y > lastY + 4 && !searchFocused) setCollapse(offset);
      else if (y < lastY - 4) setCollapse(0);
      lastY = y;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    mq.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", update);
    };
  }, [menuOpen, showCatalogTools]);
  const settings = data?.settings;

  const goContact = () => {
    setMenuOpen(false);
    scrollToId("contacto");
  };

  return (
    <header
      data-testid="site-header"
      data-collapsed={collapse > 0}
      style={{ transform: collapse ? `translateY(-${collapse}px)` : undefined }}
      className="sticky top-0 z-40 border-b border-beige bg-cream/90 backdrop-blur-md transition-transform duration-300 ease-out supports-[backdrop-filter]:bg-cream/80"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-3.5 sm:gap-x-4 px-4 pb-3.5 pt-4 sm:px-6 sm:py-3 lg:gap-x-6 lg:px-8 lg:py-4">
        <div
          className={cn(
            "min-w-0 flex-1 basis-0 transition-opacity duration-200 md:flex-none md:basis-auto",
            collapse > 0 && "pointer-events-none opacity-0",
          )}
        >
          <Logo fluid />
        </div>

        <nav aria-label="Navegación principal" className="hidden items-center gap-0.5 lg:flex">
          {NAV.map(({ to, label, id }) => {
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <Link key={to} to={to} aria-current={active ? "page" : undefined} data-testid={`header-nav-${id}`} className={cn(navLink, active && "bg-beige text-brand")}>
                {label}
              </Link>
            );
          })}
          <button type="button" onClick={goContact} data-testid="header-nav-contacto" className={navLink}>
            Contacto
          </button>
        </nav>

        {showCatalogTools && (
        <div ref={searchRowRef} className="order-last w-full md:order-none md:ml-auto md:w-auto md:max-w-md md:flex-1 xl:max-w-lg">
          <SearchField />
        </div>
        )}

        <div className="ml-auto flex shrink-0 items-center gap-2 md:ml-0">
          {showCatalogTools && <FavoritesTrigger className="hidden sm:inline-flex" />}
          <WhatsAppButton
            settings={settings}
            testId="header-whatsapp-button"
            className="hidden sm:inline-flex"
            size="md"
          >
            Consultanos
          </WhatsAppButton>
          <WhatsAppButton settings={settings} testId="header-whatsapp-icon-button" variant="icon" className="sm:hidden" />

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              aria-label="Abrir menú"
              data-testid="header-mobile-menu-trigger"
              className="inline-flex size-11 items-center justify-center rounded-xl border border-beige bg-cream text-brand transition-colors duration-200 hover:bg-beige lg:hidden"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm bg-cream p-0" data-testid="mobile-menu">
              <SheetHeader className="border-b border-beige px-5 py-4">
                <SheetTitle className="text-left text-base font-bold text-brand">Menú</SheetTitle>
              </SheetHeader>
              <div className="space-y-6 overflow-y-auto px-3 py-5">
                <div>
                  {NAV.map(({ to, label, id }) => (
                    <Link key={to} to={to} onClick={() => setMenuOpen(false)} data-testid={`mobile-nav-${id}`} className={mobileItem}>
                      {label}
                    </Link>
                  ))}
                  <button type="button" onClick={goContact} data-testid="mobile-nav-contacto" className={mobileItem}>
                    Contacto
                  </button>
                  {showCatalogTools && (
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        favorites.setPanel(true);
                      }}
                      data-testid="mobile-nav-favorites"
                      className={mobileItem}
                    >
                      Mi pedido
                    </button>
                  )}
                </div>
                <div className="px-3">
                  <WhatsAppButton settings={settings} testId="mobile-menu-whatsapp-button" size="lg" className="w-full">
                    Consultanos por WhatsApp
                  </WhatsAppButton>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
