import { useState } from "react";
import { cn } from "@/lib/utils";

/** Foto de /public/images/<name>. Si todavía no está subida, muestra un recuadro neutro (nunca una imagen inventada). */
export function Foto({ name, alt, className, eager = false }: { name: string; alt: string; className?: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div role="img" aria-label={alt} className={cn("bg-beige", className)} />;
  return (
    <img
      src={`/images/${name}`}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={cn("object-cover", className)}
    />
  );
}
