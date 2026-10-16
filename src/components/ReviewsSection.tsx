import React, { useEffect, useRef } from 'react';
import { ExternalLink, Quote, Star } from 'lucide-react';
import { CLINIC, REVIEWS } from '../data/clinicData';
import { GoogleG } from './GoogleBadge';

/** Velocidad de la cinta (píxeles por segundo) y cantidad de copias de la lista para que el recorrido no tenga corte. */
const VELOCIDAD_CINTA = 34;
const COPIAS = 4;

/** Opiniones reales de clientes, tomadas de la ficha pública de Google del consultorio. */
export const ReviewsSection: React.FC = () => {
  const pista = useRef<HTMLUListElement>(null);
  const pausada = useRef(false);
  const temporizador = useRef<number | undefined>(undefined);

  useEffect(() => {
    const el = pista.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cuadro = 0;
    let ultimo = performance.now();
    let pos = el.scrollLeft;

    const avanzar = (ahora: number) => {
      const dt = Math.min(ahora - ultimo, 100);
      ultimo = ahora;
      // Si la persona la movió con el dedo o el mouse, seguimos desde donde la dejó.
      if (Math.abs(el.scrollLeft - pos) > 1.5) pos = el.scrollLeft;
      if (!pausada.current && el.scrollWidth > el.clientWidth) {
        pos += (VELOCIDAD_CINTA * dt) / 1000;
        // Largo exacto de una copia de la lista: distancia entre la primera tarjeta y la primera de la copia siguiente.
        const sig = el.children[REVIEWS.length] as HTMLElement | undefined;
        const primera = el.children[0] as HTMLElement | undefined;
        const unidad = sig && primera ? sig.offsetLeft - primera.offsetLeft : el.scrollWidth / COPIAS;
        if (unidad > 0 && pos >= unidad) pos -= unidad;
        el.scrollLeft = pos;
      }
      cuadro = requestAnimationFrame(avanzar);
    };
    cuadro = requestAnimationFrame(avanzar);
    return () => {
      cancelAnimationFrame(cuadro);
      window.clearTimeout(temporizador.current);
    };
  }, []);

  if (REVIEWS.length === 0) return null;

  const pausar = () => {
    window.clearTimeout(temporizador.current);
    pausada.current = true;
  };
  const retomar = (espera = 1500) => {
    window.clearTimeout(temporizador.current);
    temporizador.current = window.setTimeout(() => {
      pausada.current = false;
    }, espera);
  };

  const copias = Array.from({ length: COPIAS }, (_, c) => REVIEWS.map((r) => ({ r, c })));

  return (
    <section
      id="opiniones"
      className="relative py-16 lg:py-24 bg-gradient-to-b from-violet-50 to-white border-b border-violet-100 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-violet-100/70 blur-3xl pointer-events-none"
      />
      <div className="relative">
        <div className="text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-violet-700 via-violet-600 to-purple-500 bg-clip-text text-transparent">
              Lo que dicen nuestros clientes
            </span>
          </h2>
          <div className="mx-auto mt-4 mb-5 h-1.5 w-20 rounded-full bg-gradient-to-r from-violet-500 to-purple-400" />
          <p className="text-base sm:text-lg text-slate-600">
            Opiniones reales de clientes en Google: {CLINIC.googleRating.replace('.', ',')} de 5 con{' '}
            {CLINIC.googleReviews} reseñas{CLINIC.googleScope}.
          </p>
        </div>

        {/* Cinta que avanza sola; se pausa al tocarla o pasar el mouse y se puede arrastrar. */}
        <ul
          ref={pista}
          onTouchStart={pausar}
          onTouchEnd={() => retomar()}
          onTouchCancel={() => retomar()}
          onMouseEnter={pausar}
          onMouseLeave={() => retomar(300)}
          aria-label="Opiniones de clientes"
          className="no-scrollbar flex gap-5 overflow-x-auto px-4 py-6"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)',
          }}
        >
          {copias.flat().map(({ r, c }, i) => (
            <li
              key={`${c}-${i}`}
              aria-hidden={c > 0 || undefined}
              className="relative flex flex-col shrink-0 w-[78vw] min-w-[260px] max-w-[360px] rounded-3xl bg-white border border-violet-100 shadow-lg shadow-violet-900/5 p-6"
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-violet-100" aria-hidden="true" />
              <div className="flex items-center gap-0.5 text-amber-400 mb-4" aria-label="5 de 5 estrellas">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="w-5 h-5 fill-current" strokeWidth={0} />
                ))}
              </div>
              <p className="text-slate-700 leading-relaxed mb-6 flex-1">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <span className="text-sm font-bold text-slate-900">{r.author ?? 'Cliente'}</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <GoogleG className="w-4 h-4" />
                  Opinión en Google
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="text-center mt-8 px-4">
          <a
            href={CLINIC.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-violet-200 text-violet-800 font-bold text-sm hover:bg-violet-50 shadow-sm transition-colors"
          >
            <span>Ver todas las opiniones en Google</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
