import { useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import { categoryMap, useCatalog } from "@/lib/catalog";
import { scrollToId, useCatalogParams, type ScrollState } from "@/lib/useCatalogParams";
import { BestSellersCarousel } from "@/components/catalog/BestSellersCarousel";
import { DemoNotice, HowToBuy, PromoStrip } from "@/components/catalog/HomeSections";
import { CatalogExplorer } from "@/components/catalog/CatalogExplorer";

export default function Home() {
  const { data, isLoading, isError, refetch } = useCatalog();
  const location = useLocation();
  const { q } = useCatalogParams();
  const prevQ = useRef(q);

  const products = useMemo(() => (isError ? [] : (data?.products ?? [])), [data, isError]);
  const categories = useMemo(() => data?.categories ?? [], [data]);
  const byId = useMemo(() => categoryMap(categories), [categories]);
  const settings = data?.settings;

  useEffect(() => {
    document.title = "CASANOVA · Catálogo de productos";
  }, []);

  // Header links / category picks from other pages ask to scroll to a section.
  useEffect(() => {
    const target = (location.state as ScrollState | null)?.scrollTo;
    if (target) window.setTimeout(() => scrollToId(target), 60);
  }, [location.key, location.state]);

  // When the user starts typing in the header search, bring the results into view.
  useEffect(() => {
    if (!prevQ.current && q) {
      const el = document.getElementById("catalogo");
      const r = el?.getBoundingClientRect();
      if (r && (r.top > 200 || r.bottom < 200)) scrollToId("catalogo");
    }
    prevQ.current = q;
  }, [q]);

  return (
    <div data-testid="home-page">
      <header className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-14 lg:px-8">
        <h1 className="text-[34px] font-extrabold leading-[1.05] tracking-tight text-brand sm:text-5xl lg:text-6xl">Catálogo de productos</h1>
      </header>
      <div className="space-y-12 sm:space-y-20">

      <BestSellersCarousel products={products} categories={byId} settings={settings} isLoading={isLoading} />

      {settings && <PromoStrip settings={settings} />}

      <div className="space-y-6 sm:space-y-8">
        {settings?.show_demo_notice && <DemoNotice />}
        <CatalogExplorer
          products={products}
          categories={categories}
          categoryById={byId}
          settings={settings}
          isLoading={isLoading}
          isError={isError}
          onRetry={() => void refetch()}
        />
      </div>

      <HowToBuy settings={settings} />
      </div>
    </div>
  );
}
