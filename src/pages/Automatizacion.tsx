import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown, Clock, House, Lightbulb, Plug, Smartphone, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCatalog } from "@/lib/catalog";
import { Foto } from "@/components/Foto";
import { WhatsAppButton } from "@/components/catalog/WhatsAppButton";

const wrap = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
const h2 = "text-[28px] font-extrabold leading-tight tracking-tight text-brand sm:text-4xl";
const body = "text-base leading-relaxed text-ink sm:text-lg";

const FLUJO = [
  { icon: House, label: "Tu espacio actual" },
  { icon: Plug, label: "Dispositivos inteligentes" },
  { icon: Smartphone, label: "Control desde el celular" },
];
const BENEFICIOS = [
  { icon: Zap, title: "Evitá gastar electricidad innecesariamente.", text: "Controlá equipos desde el celular, programá horarios y consultá el consumo de los dispositivos que permiten medirlo." },
  { icon: Smartphone, title: "Controlá tus dispositivos desde el celular o por voz.", text: "Encendé y apagá luces, televisores, aire acondicionado y otros equipos compatibles con un toque o comandos de voz." },
  { icon: Lightbulb, title: "Luces que se encienden y se apagan solas.", text: "Olvidate de preocuparte por dejar luces prendidas. Se encienden cuando detectan movimiento y se apagan solas después de 5, 10 minutos o el tiempo que prefieras sin detectar movimiento. ¡Vos elegís cuánto tiempo querés que permanezcan encendidas!" },
  { icon: House, title: "Controlá tu casa aunque no estés.", text: "Supervisá y controlá dispositivos desde cualquier lugar, incluso trabajando o de vacaciones." },
  { icon: Sparkles, title: "Adaptá tu casa a cada momento.", text: "Creá escenas de iluminación para descansar, trabajar, mirar películas o recibir visitas." },
  { icon: Clock, title: "Ahorrá tiempo en tareas cotidianas.", text: "Programá encendidos y apagados, agrupá dispositivos y creá rutinas." },
];
const ESPACIOS = [
  { title: "Casas", foto: "espacio-casas.jpg" },
  { title: "Departamentos", foto: "espacio-departamentos.jpg" },
  { title: "Oficinas", foto: "espacio-oficinas.jpg" },
  { title: "Locales comerciales", foto: "espacio-locales.jpg" },
];
const CATEGORIAS = [
  { title: "Iluminación", foto: "auto-iluminacion.jpg", text: "Encendido, apagado, horarios programados y automatizaciones para tus luces. También podés controlar colores e intensidad incorporando lámparas compatibles." },
  { title: "Televisores", foto: "auto-televisores.jpg", text: "Encendé, apagá y controlá tu televisor desde el celular o mediante comandos de voz." },
  { title: "Aire acondicionado", foto: "auto-aire.jpg", text: "Controlá el encendido, apagado y la temperatura desde tu celular, incluso cuando no estés en casa." },
  { title: "Enchufes y electrodomésticos", foto: "auto-enchufes.jpg", text: "Encendé y apagá equipos conectados a enchufes inteligentes y programá sus horarios de funcionamiento." },
  { title: "Sensores de movimiento", foto: "auto-sensores.jpg", text: "Activá luces y otras automatizaciones cuando se detecta movimiento." },
];
const PASOS = [
  { n: 1, title: "Nos contás tu idea", foto: "paso-1-idea.jpg", text: ["Nos contactás por WhatsApp y nos contás qué te gustaría automatizar. Te hacemos algunas preguntas y, si es necesario, te pedimos fotos o videos del espacio. En una charla de aproximadamente 10 minutos podemos entender lo que buscás y orientarte sobre cómo llevarlo a cabo.", "En casos específicos puede coordinarse una visita presencial."] },
  { n: 2, title: "Definimos cómo hacerlo", foto: "paso-2-definimos.jpg", text: ["Analizamos tu idea y te contamos qué posibilidades existen, qué dispositivos podemos incorporar y qué alternativas te recomendamos. También te explicamos si hay alguna limitación o modificación que debamos tener en cuenta. Una vez que definimos juntos qué se va a realizar, preparamos el presupuesto."] },
  { n: 3, title: "Coordinamos la instalación", foto: "paso-3-instalacion.jpg", text: ["Coordinamos una fecha conveniente para realizar el trabajo y llevar adelante la instalación de los dispositivos."] },
  { n: 4, title: "Te enseñamos a utilizarlo", foto: "paso-4-uso.jpg", text: ["Una vez terminada la instalación, te mostramos cómo utilizar los dispositivos, controlar todo desde el celular y aprovechar sus principales funciones."] },
  { n: 5, title: "Seguimos acompañándote", foto: "paso-5-acompanamiento.jpg", text: ["Después de la instalación, seguimos disponibles para ayudarte. Podés contactarnos por WhatsApp si tenés dudas, necesitás asistencia o surge algún inconveniente. También contamos con garantía de 6 meses sobre los dispositivos y la instalación."] },
];
const REFORMAS = [
  { title: "Convertí tus teclas en inteligentes", foto: "reforma-1-tecla-detras.jpg", text: "Incorporamos un pequeño dispositivo detrás de tus teclas actuales para poder controlar las luces desde el celular." },
  { title: "Reemplazá tus teclas tradicionales", foto: "reforma-2-tecla-reemplazo.jpg", text: "También podés incorporar teclas inteligentes que reemplazan las convencionales y suman nuevas formas de controlar la iluminación." },
  { title: "Elegí la opción más práctica", foto: "reforma-3-enchufe.jpg", text: "Algunos dispositivos, como los enchufes inteligentes, simplemente se conectan a un tomacorriente existente. También contamos con tomacorrientes inteligentes que reemplazan los convencionales." },
];
const FAQ = [
  ["¿Cuánto cuesta automatizar una casa?", "Depende de qué quieras automatizar, cuántos dispositivos necesites y las características de tu espacio. Cada presupuesto se prepara según las necesidades de cada cliente."],
  ["¿Tengo que hacer reformas o romper paredes?", "No necesariamente. La mayoría de las instalaciones se realizan sin grandes modificaciones en el espacio. En algunos casos puede ser necesario realizar pequeñas intervenciones en la instalación eléctrica, como adaptar o reemplazar un interruptor de luz, trabajos habituales dentro de una instalación eléctrica convencional."],
  ["¿Puedo controlar todo desde mi celular?", "¡Sí! Vas a poder controlar tus dispositivos desde el celular y también mediante comandos de voz. Además, podemos incorporar un asistente inteligente, similar a Alexa, al que simplemente le hablás para encender las luces, controlar el aire acondicionado y manejar otros dispositivos de tu hogar."],
  ["¿Funciona con iPhone y Android?", "Sí. Trabajamos con alternativas compatibles con ambos sistemas, buscando que puedas controlar tus dispositivos independientemente del teléfono que utilices."],
  ["¿Necesito tener Alexa o Google Home?", "No. No necesitás tener previamente un dispositivo como Alexa o Google Home. En Casanova podemos ofrecerte alternativas para incorporar el control por voz a tu hogar."],
  ["¿Puedo automatizar solamente una habitación?", "¡Por supuesto! Podés empezar por una habitación, un departamento o un ambiente específico y ampliar la automatización cuando quieras."],
  ["¿Qué pasa si se corta internet?", "Depende del dispositivo y del tipo de automatización. Algunas funciones locales pueden seguir funcionando, mientras que el control remoto y determinadas funciones necesitan conexión a internet."],
  ["¿Casanova realiza la instalación?", "Sí. Nos encargamos de la instalación y configuración de los dispositivos incluidos en el proyecto, además de enseñarte cómo utilizarlos."],
  ["¿Puedo agregar más dispositivos en el futuro?", "¡Claro! Podemos planificar la instalación pensando en futuras ampliaciones, incorporando nuevos dispositivos a medida que lo necesites."],
  ["¿Qué pasa si me mudo?", "¡Podés llevarte tu casa inteligente con vos! Los dispositivos que instalamos pueden trasladarse a tu nuevo hogar, siempre que las condiciones de compatibilidad e instalación lo permitan. En ese caso, solo tendrás que abonar la nueva instalación."],
];

/** Aparece suavemente al llegar a la pantalla (sin librerías; se desactiva si el usuario reduce animaciones). */
function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setShown(true);
        io.disconnect();
      }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn("transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none", shown ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0", className)}>
      {children}
    </div>
  );
}

function Pregunta({ id, q, a }: { id: string; q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-beige" data-testid={`faq-${id}`}>
      <h3>
        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls={`${id}-resp`} className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-base font-bold text-brand sm:text-lg">
          {q}
          <ChevronDown className={cn("size-5 shrink-0 text-teal transition-transform duration-300", open && "rotate-180")} aria-hidden="true" />
        </button>
      </h3>
      <div id={`${id}-resp`} aria-hidden={!open} className={cn("grid transition-[grid-template-rows] duration-300 ease-out", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden">
          <p className={cn(body, "pb-5")}>{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Automatizacion() {
  const { data } = useCatalog();
  const settings = data?.settings;
  useEffect(() => {
    document.title = "CASANOVA · Automatización de espacios";
  }, []);
  return (
    <div className="space-y-16 pt-8 sm:space-y-28 sm:pt-14" data-testid="automatizacion-page">
      {/* 1. Presentación */}
      <section className={wrap} data-testid="auto-presentacion">
        <h1 className="text-[34px] font-extrabold leading-[1.05] tracking-tight text-brand sm:text-5xl lg:text-6xl">Tu espacio, más inteligente.</h1>
        <p className={cn(body, "mt-5 max-w-2xl")}>Transformamos casas, departamentos, oficinas y locales incorporando tecnología inteligente que simplifica tu rutina.</p>
        <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" aria-label="Cómo se integra la tecnología">
          {FLUJO.map(({ icon: Icon, label }, i) => (
            <Fragment key={label}>
              {i > 0 && <li aria-hidden="true" className="hidden text-2xl text-teal sm:block">→</li>}
              <li className="flex items-center gap-3 rounded-2xl border border-beige bg-cream px-4 py-3 text-[15px] font-bold text-brand">
                <span className="flex size-10 items-center justify-center rounded-xl bg-beige text-teal"><Icon className="size-5" aria-hidden="true" /></span>
                {label}
              </li>
            </Fragment>
          ))}
        </ul>
      </section>

      {/* 2. ¿Por qué automatizar tu espacio? */}
      <section className={wrap} aria-labelledby="beneficios-title" data-testid="auto-beneficios">
        <Reveal>
          <h2 id="beneficios-title" className={h2}>¿Por qué automatizar tu espacio?</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {BENEFICIOS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="space-y-3 rounded-2xl border border-beige p-5 sm:p-6">
                <span className="flex size-10 items-center justify-center rounded-xl bg-beige text-teal"><Icon className="size-5" aria-hidden="true" /></span>
                <h3 className="text-lg font-bold leading-snug text-brand">{title}</h3>
                <p className="text-[15px] leading-relaxed text-ink">{text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* 3. ¿En qué espacios trabajamos? */}
      <section className={wrap} aria-labelledby="espacios-title" data-testid="auto-espacios">
        <Reveal>
          <h2 id="espacios-title" className={h2}>¿En qué espacios trabajamos?</h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {ESPACIOS.map(({ title, foto }) => (
              <li key={title} className="overflow-hidden rounded-2xl border border-beige">
                <Foto name={foto} alt={title} className="aspect-[4/5] w-full" />
                <p className="p-3 text-base font-bold text-brand sm:p-4 sm:text-lg">{title}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 space-y-2 rounded-2xl bg-beige p-6 sm:p-8">
            <h3 className="text-xl font-bold text-brand">¿Querés automatizar solamente una habitación?</h3>
            <p className={body}>No necesitás automatizar todo tu espacio. Podés empezar por tu dormitorio, living, cocina, baño o cualquier otro ambiente y ampliar el proyecto cuando quieras.</p>
          </div>
          <div className="mt-6 space-y-2">
            <h3 className="text-xl font-bold text-brand">¿Tu espacio es diferente?</h3>
            <p className={cn(body, "max-w-3xl")}>Cada espacio tiene sus propias características. Contactanos para evaluar cómo incorporar tecnología inteligente según las necesidades del lugar.</p>
          </div>
        </Reveal>
      </section>

      {/* 4. ¿Qué podemos automatizar? */}
      <section className={wrap} aria-labelledby="categorias-title" data-testid="auto-categorias">
        <Reveal>
          <h2 id="categorias-title" className={h2}>¿Qué podemos automatizar?</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {CATEGORIAS.map(({ title, foto, text }) => (
              <li key={title} className="overflow-hidden rounded-2xl border border-beige">
                <Foto name={foto} alt={title} className="aspect-[4/3] w-full" />
                <div className="space-y-2 p-5">
                  <h3 className="text-lg font-bold text-brand">{title}</h3>
                  <p className="text-[15px] leading-relaxed text-ink">{text}</p>
                </div>
              </li>
            ))}
            <li className="flex flex-col justify-center space-y-2 rounded-2xl bg-beige p-6">
              <h3 className="text-lg font-bold text-brand">¿Tenés otro dispositivo en mente?</h3>
              <p className="text-[15px] leading-relaxed text-ink">No todos los equipos y posibilidades entran en estas categorías. Si tenés otro aparato electrónico que te gustaría controlar o automatizar, consultanos. Evaluamos su compatibilidad y las alternativas para incorporarlo a tu espacio.</p>
            </li>
          </ul>
        </Reveal>
      </section>

      {/* 5. Cómo trabajamos */}
      <section className={wrap} aria-labelledby="pasos-title" data-testid="auto-pasos">
        <h2 id="pasos-title" className={h2}>Cómo trabajamos</h2>
        <ol className="relative mt-10 space-y-12 sm:space-y-20">
          <span aria-hidden="true" className="absolute bottom-2 left-5 top-2 w-px bg-beige md:left-1/2 md:-translate-x-1/2" />
          {PASOS.map((p, i) => (
            <li key={p.n} className="relative pl-14 md:pl-0" data-testid={`auto-paso-${p.n}`}>
              <span className="absolute left-0 top-0 z-10 flex size-10 items-center justify-center rounded-full bg-brand text-base font-bold text-cream md:left-1/2 md:top-1/2 md:size-12 md:-translate-x-1/2 md:-translate-y-1/2 md:text-lg">{p.n}</span>
              <Reveal className="md:grid md:grid-cols-2 md:items-center md:gap-24">
                <div className={cn("space-y-3", i % 2 === 1 && "md:order-2")}>
                  <h3 className="text-2xl font-bold text-brand">{p.title}</h3>
                  {p.text.map((t) => <p key={t} className={body}>{t}</p>)}
                </div>
                <Foto name={p.foto} alt={p.title} className={cn("mt-5 aspect-[4/3] w-full rounded-2xl md:mt-0", i % 2 === 1 && "md:order-1")} />
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* 6. Incorporá tecnología sin grandes reformas */}
      <section className={wrap} aria-labelledby="reformas-title" data-testid="auto-reformas">
        <Reveal>
          <div className="max-w-3xl space-y-3">
            <h2 id="reformas-title" className={h2}>Incorporá tecnología sin grandes reformas</h2>
            <p className={body}>No necesitás cambiar toda tu instalación ni hacer grandes modificaciones para empezar a disfrutar de un espacio inteligente. Trabajamos con dispositivos que se adaptan a lo que ya tenés, aprovechando las instalaciones existentes siempre que sea posible.</p>
            <p className="text-sm text-ink">Cada instalación se evalúa según las características del espacio y los dispositivos elegidos.</p>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-6">
            {REFORMAS.map(({ title, foto, text }) => (
              <li key={title} className="overflow-hidden rounded-2xl border border-beige">
                <Foto name={foto} alt={title} className="aspect-[4/3] w-full" />
                <div className="space-y-2 p-5">
                  <h3 className="text-lg font-bold text-brand">{title}</h3>
                  <p className="text-[15px] leading-relaxed text-ink">{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid items-center gap-6 rounded-3xl bg-beige p-5 sm:p-8 md:grid-cols-2 md:gap-10">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-brand">Empezá por donde quieras</h3>
              <p className={body}>No necesitás automatizar todo de una vez. Podés comenzar con un solo ambiente y ampliar el proyecto cuando quieras.</p>
              <p className={body}>Por ejemplo, empezá por las luces de tu dormitorio y más adelante sumá el living, el aire acondicionado u otros dispositivos.</p>
            </div>
            <Foto name="ambiente-inicio.jpg" alt="Empezá por un solo ambiente" className="aspect-[4/3] w-full rounded-2xl" />
          </div>
        </Reveal>
      </section>

      {/* 7. Preguntas frecuentes */}
      <section className={wrap} aria-labelledby="faq-title" data-testid="auto-faq">
        <h2 id="faq-title" className={h2}>Preguntas frecuentes</h2>
        <div className="mt-6 max-w-3xl border-t border-beige">
          {FAQ.map(([q, a], i) => <Pregunta key={q} id={`faq-${i + 1}`} q={q} a={a} />)}
        </div>
      </section>

      {/* 8. Cierre */}
      <section className={wrap} data-testid="auto-cierre">
        <Reveal className="rounded-3xl border border-beige bg-beige px-5 py-10 text-center sm:px-10 sm:py-16">
          <h2 className={h2}>¿Empezamos a hacer tu espacio más inteligente?</h2>
          <p className={cn(body, "mx-auto mt-3 max-w-xl")}>Contanos qué te gustaría automatizar. Te asesoramos y te ayudamos a encontrar la mejor manera de incorporarlo a tu espacio.</p>
          <WhatsAppButton settings={settings} testId="auto-whatsapp-button" size="lg" className="mt-6">Consultar por WhatsApp</WhatsAppButton>
          <p className="mt-5 text-[15px] text-ink">
            También podés encontrarnos en{" "}
            <a href={settings?.instagram_url || "https://www.instagram.com/casanovahogar.ar"} target="_blank" rel="noopener noreferrer" data-testid="auto-instagram-link" className="font-bold text-brand underline underline-offset-4 hover:decoration-2">Instagram</a>.
          </p>
        </Reveal>
      </section>
    </div>
  );
}
