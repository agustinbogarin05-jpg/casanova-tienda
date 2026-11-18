import { useEffect } from "react";
import { Link } from "react-router-dom";

// Estructura provisional de la portada: etapa 2 completa el diseño, las fotos y el resto de las secciones.
const ACCESOS = [
  { to: "/automatizacion", title: "Automatizamos tu espacio", id: "automatizacion" },
  { to: "/catalogo", title: "Catálogo de productos", id: "catalogo" },
];

export default function Inicio() {
  useEffect(() => {
    document.title = "CASANOVA · La tecnología que transforma tus espacios";
  }, []);
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8" data-testid="inicio-page">
      <h1 className="text-[34px] font-extrabold leading-[1.05] tracking-tight text-brand sm:text-5xl lg:text-6xl">
        La tecnología que transforma tus espacios
      </h1>
      {/* Siempre una al lado de la otra, también en celulares (50% cada una) */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-6">
        {ACCESOS.map(({ to, title, id }) => (
          <Link
            key={to}
            to={to}
            data-testid={`inicio-acceso-${id}`}
            className="flex aspect-[4/5] items-end rounded-2xl border border-beige bg-beige p-4 text-lg font-bold leading-tight text-brand transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-brand sm:p-6 sm:text-2xl"
          >
            {title}
          </Link>
        ))}
      </div>
    </div>
  );
}
