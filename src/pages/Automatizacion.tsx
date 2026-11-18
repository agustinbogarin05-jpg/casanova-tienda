import { useEffect } from "react";

// Estructura provisional: etapa 3 completa las secciones definidas.
export default function Automatizacion() {
  useEffect(() => {
    document.title = "CASANOVA · Automatización de espacios";
  }, []);
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8" data-testid="automatizacion-page">
      <h1 className="text-[34px] font-extrabold leading-[1.05] tracking-tight text-brand sm:text-5xl lg:text-6xl">Tu espacio, más inteligente.</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink">
        Transformamos casas, departamentos, oficinas y locales incorporando tecnología inteligente que simplifica tu rutina.
      </p>
    </div>
  );
}
