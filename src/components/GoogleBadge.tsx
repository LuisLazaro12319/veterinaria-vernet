import React from 'react';
import { Star } from 'lucide-react';
import { CLINIC } from '../data/clinicData';

/** Logo de Google en sus cuatro colores. */
export const GoogleG: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
    />
    <path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    />
  </svg>
);

/** Cinco estrellas con relleno proporcional a la calificación (4.3 llena 4 y un poco más de 1/4). */
const Estrellas: React.FC<{ valor: number }> = ({ valor }) => {
  const porcentaje = Math.max(0, Math.min(100, (valor / 5) * 100));
  const fila = (clase: string) => (
    <span className={`flex ${clase}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 fill-current" strokeWidth={0} />
      ))}
    </span>
  );
  return (
    <span className="relative inline-flex" aria-hidden="true">
      {fila('text-slate-300')}
      <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${porcentaje}%` }}>
        {fila('text-amber-400')}
      </span>
    </span>
  );
};

/** Insignia de reseñas de Google con la calificación real que figura en la ficha del consultorio. */
export const GoogleBadge: React.FC = () => {
  const valor = parseFloat(CLINIC.googleRating);
  const numero = CLINIC.googleRating.replace('.', ',');

  return (
    <a
      href={CLINIC.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${numero} de 5 en Google, ${CLINIC.googleReviews} reseñas`}
      className="inline-flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-6 sm:mb-7 px-4 py-3 rounded-2xl bg-white/95 hover:bg-white shadow-lg shadow-black/10 text-slate-900 transition-colors [text-shadow:none]"
    >
      <GoogleG className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" />
      <span className="text-2xl sm:text-3xl font-extrabold leading-none tracking-tight">{numero}</span>
      <Estrellas valor={valor} />
      <span className="hidden sm:block self-stretch w-px bg-slate-200" aria-hidden="true" />
      <span className="leading-tight">
        <span className="block text-sm sm:text-base font-extrabold">{CLINIC.googleReviews} reseñas</span>
        <span className="hidden sm:block text-[11px] text-slate-500">{CLINIC.googleNote}</span>
      </span>
    </a>
  );
};
