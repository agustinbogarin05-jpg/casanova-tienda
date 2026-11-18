import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MessageCircle, ShieldCheck, Wrench } from "lucide-react";
import { useCatalog } from "@/lib/catalog";
import { Foto } from "@/components/Foto";
import { WhatsAppButton } from "@/components/catalog/WhatsAppButton";

const ACCESOS = [
  { to: "/automatizacion", title: "Automatizamos tu espacio", id: "automatizacion", foto: "inicio-automatizamos.jpg" },
  { to: "/catalogo", title: "Catálogo de productos", id: "catalogo", foto: "inicio-catalogo.jpg" },
];
const DIFERENCIALES = [
  { icon: MessageCircle, title: "Te asesoramos" },
  { icon: Wrench, title: "Instalamos y configuramos" },
  { icon: ShieldCheck, title: "Seguimos acompañándote" },
];
const wrap = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
const h2 = "text-[28px] font-extrabold leading-tight tracking-tight text-brand sm:text-4xl";

export default function Inicio() {
  const { data } = useCatalog();
  useEffect(() => {
    document.title = "CASANOVA · Automatización de espacios";
  }, []);
  return (
    <div className="space-y-14 pt-8 sm:space-y-24 sm:pt-14" data-testid="inicio-page">
      <section className={wrap} data-testid="inicio-portada">
        <h1 className="max-w-3xl text-[34px] font-extrabold leading-[1.05] tracking-tight text-brand sm:text-5xl lg:text-6xl">
          La tecnología que transforma tus espacios
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink sm:text-lg">
          Integramos tecnología para que puedas controlar luces, televisores, aire acondicionado y otros dispositivos desde tu celular, crear automatizaciones y simplificar tu rutina. Desde una habitación hasta una casa completa, te asesoramos y acompañamos en cada paso.
        </p>
        <Foto name="inicio-portada.jpg" alt="Un espacio cotidiano con tecnología inteligente" eager className="mt-7 aspect-[4/3] w-full rounded-3xl sm:mt-10 sm:aspect-[16/8]" />
      </section>

      <section className={wrap} aria-label="Accesos principales" data-testid="inicio-accesos">
        {/* Una al lado de la otra también en celulares: 50% cada una */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          {ACCESOS.map(({ to, title, id, foto }) => (
            <Link key={to} to={to} data-testid={`inicio-acceso-${id}`} className="group block overflow-hidden rounded-2xl border border-beige bg-cream transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-brand">
             <Foto name={foto} alt={title} className={`aspect-[4/5] w-full transition-transform duration-500 ease-out group-hover:scale-[1.03] sm:aspect-[4/3] ${id === "automatizacion" ? "object-[center_35%]" : ""}`} />
              <span className="flex items-center justify-between gap-2 p-3 text-[15px] font-bold leading-tight text-brand sm:p-5 sm:text-xl">
                {title}
                <ArrowUpRight className="size-4 shrink-0 text-teal sm:size-5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={wrap} data-testid="inicio-presentacion">
        <div className="max-w-3xl space-y-4">
          <h2 className={h2}>Tu casa puede ser más inteligente de lo que imaginás.</h2>
          <p className="text-base leading-relaxed text-ink sm:text-lg">
            Podés controlar luces, televisores, aire acondicionado y otros dispositivos compatibles desde el celular o mediante comandos de voz.
          </p>
        </div>
      </section>

      <section className={wrap} aria-labelledby="acompanamos-title" data-testid="inicio-acompanamos">
        <h2 id="acompanamos-title" className={h2}>¿Cómo te acompañamos?</h2>
        <ul className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-6">
          {DIFERENCIALES.map(({ icon: Icon, title }) => (
            <li key={title} className="flex items-center gap-4 rounded-2xl border border-beige p-5 sm:flex-col sm:items-start sm:gap-5 sm:p-6">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-beige text-teal">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className="text-lg font-bold leading-tight text-brand">{title}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={wrap} data-testid="inicio-cierre">
        <div className="rounded-3xl border border-beige bg-beige px-5 py-10 text-center sm:px-10 sm:py-16">
          <h2 className={h2}>¿Tenés una idea en mente?</h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-ink sm:text-lg">Contanos qué te gustaría automatizar.</p>
          <WhatsAppButton settings={data?.settings} testId="inicio-whatsapp-button" size="lg" className="mt-6">
            Consultar por WhatsApp
          </WhatsAppButton>
        </div>
      </section>
    </div>
  );
}
