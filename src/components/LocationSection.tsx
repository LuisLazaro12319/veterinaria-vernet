import React, { useEffect, useRef, useState } from 'react';
import { Camera, Check, ChevronLeft, ChevronRight, Clock, Copy, ExternalLink, MapPin, Navigation } from 'lucide-react';
import { BRANCHES, CLINIC, SCHEDULE, getClinicStatus, horarioLineas, sedeTxt, whatsappUrl } from '../data/clinicData';
import { WhatsAppIcon } from './BrandIcons';
import { animarScroll, useArrastreMouse } from '../lib/carrusel';
import { useSucursal } from '../data/sucursalElegida';

const rutaFoto = (foto: string | null) => (foto ? `${import.meta.env.BASE_URL}${foto}` : null);

/** Sección de sucursales: una cinta deslizable con foto, mapa y datos de cada una. */
export const LocationSection: React.FC = () => {
  const pista = useRef<HTMLDivElement>(null);
  useArrastreMouse(pista);
  const [activo, setActivo] = useState(0);
  const { indice, elegir } = useSucursal();
  const [copiada, setCopiada] = useState<string | null>(null);
  const status = getClinicStatus();
  const unica = BRANCHES.length === 1;
  const todayIndex = new Date().getDay();

  const alScrollear = () => {
    const el = pista.current;
    if (!el || el.clientWidth === 0) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setActivo(i);
    elegir(i);
  };

  /* Si la sucursal se cambió en otro lugar (por ejemplo en el formulario de turnos), la cinta se acomoda sola. */
  useEffect(() => {
    const el = pista.current;
    if (!el || el.clientWidth === 0 || indice === activo) return;
    el.scrollTo({ left: indice * el.clientWidth, behavior: 'instant' });
    setActivo(indice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indice]);

  const irA = (i: number) => {
    const el = pista.current;
    if (!el) return;
    const destino = Math.max(0, Math.min(BRANCHES.length - 1, i));
    animarScroll(el, destino * el.clientWidth);
  };

  const copiar = (id: string, direccion: string) => {
    navigator.clipboard?.writeText(direccion);
    setCopiada(id);
    setTimeout(() => setCopiada(null), 2000);
  };

  return (
    <section
      id="ubicacion"
      className="py-14 md:py-20 lg:py-24 bg-gradient-to-b from-white to-violet-50 border-b border-violet-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título con el mismo estilo que las demás secciones */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-violet-700 via-violet-600 to-purple-500 bg-clip-text text-transparent">
              {unica ? 'Dónde estamos' : 'Nuestras sucursales'}
            </span>
          </h2>
          <div className="mx-auto mt-4 mb-5 h-1.5 w-20 rounded-full bg-gradient-to-r from-violet-500 to-teal-400" />
          <p className="text-base sm:text-lg text-slate-600">
            {unica
              ? CLINIC.fullAddress
              : `${BRANCHES.length} sucursales en ${CLINIC.locality}. Deslizá para ver cómo llegar a cada una.`}
          </p>
        </div>

        {/* Selector rápido de sucursal (solo si hay más de una) */}
        <div
          className={`flex flex-wrap justify-center gap-2 mb-6 ${unica ? 'hidden' : ''}`}
          role="tablist"
          aria-label="Sucursales"
        >
          {BRANCHES.map((b, i) => (
            <button
              key={b.id}
              type="button"
              role="tab"
              aria-selected={activo === i}
              onClick={() => irA(i)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold border transition-colors cursor-pointer ${
                activo === i
                  ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white border-transparent shadow-md shadow-violet-500/25'
                  : 'bg-white text-violet-800 border-violet-200 hover:bg-violet-50'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>{b.zone.replace(' (1º piso)', '')}</span>
            </button>
          ))}
        </div>

        {/* Cinta de sucursales */}
        <div
          ref={pista}
          onScroll={alScrollear}
          className="no-scrollbar -mx-4 sm:-mx-6 lg:-mx-8 flex overflow-x-auto snap-x snap-mandatory md:cursor-grab"
        >
          {BRANCHES.map((b, i) => {
            const foto = rutaFoto(b.photo);
            const mapa = `https://www.google.com/maps?q=${encodeURIComponent(b.mapQuery)}&z=16&hl=es&output=embed`;
            return (
              <div
                key={b.id}
                className="basis-full w-full min-w-0 grow-0 shrink-0 snap-center px-4 sm:px-6 lg:px-8 py-4"
              >
                <article className="rounded-3xl bg-white border border-violet-100 shadow-xl shadow-violet-900/5 p-4 sm:p-6">
                  <header className="flex items-center justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        {b.label}
                      </h3>
                      <p className="text-sm sm:text-base font-semibold text-violet-700">{b.zone}</p>
                    </div>
                    {!unica && (
                      <span className="shrink-0 px-3 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-800 text-xs font-bold">
                        {i + 1} de {BRANCHES.length}
                      </span>
                    )}
                  </header>

                  {/* Video o foto de la sucursal y mapa, lado a lado en pantallas grandes */}
                  <div
                    className={`grid grid-cols-1 gap-4 lg:gap-6 ${
                      b.video ? 'lg:grid-cols-[340px_minmax(0,1fr)]' : 'lg:grid-cols-2'
                    }`}
                  >
                    <div
                      className={`relative rounded-2xl overflow-hidden bg-violet-50 ${
                        b.video
                          ? 'bg-black w-full max-w-[320px] mx-auto lg:max-w-none aspect-[9/16]'
                          : 'h-56 sm:h-72 lg:h-[340px]'
                      }`}
                    >
                      {b.video ? (
                        <video
                          src={`${import.meta.env.BASE_URL}${b.video}#t=3`}
                          controls
                          playsInline
                          preload="metadata"
                          aria-label={`Video: cómo llegar a ${CLINIC.name}`}
                          className="w-full h-full object-contain bg-black"
                        />
                      ) : foto ? (
                        <img
                          src={foto}
                          alt={`Sucursal ${b.zone} de ${CLINIC.name}, ${b.label}`}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-violet-50 to-purple-100 flex flex-col items-center justify-center gap-2 text-violet-400">
                          <div className="w-20 h-20 rounded-full border-2 border-dashed border-violet-300 flex items-center justify-center">
                            <Camera className="w-9 h-9" />
                          </div>
                          <span className="text-xs font-semibold">Foto de la sucursal</span>
                        </div>
                      )}
                    </div>
                    <div
                      className={`relative rounded-2xl overflow-hidden border border-violet-100 ${
                        b.video ? 'h-72 lg:h-auto lg:min-h-[420px]' : 'h-72 lg:h-[340px]'
                      }`}
                    >
                      <iframe
                        title={`Mapa de la sucursal ${b.zone}, ${b.label}`}
                        src={mapa}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Datos de la sucursal */}
                  <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
                    <div className="space-y-4">
                      <p className="flex items-start gap-2 text-slate-800 font-semibold">
                        <MapPin className="w-5 h-5 text-violet-600 mt-0.5 shrink-0" />
                        <span>{b.fullAddress}</span>
                      </p>
                      <div className="flex flex-wrap gap-2.5">
                        <a
                          href={whatsappUrl(`Hola! Quisiera pedir un turno en ${CLINIC.name}${sedeTxt(b)}.`, b.whatsapp)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#16c55e] hover:bg-[#12a84f] text-white text-sm font-bold shadow-md transition-colors"
                        >
                          <WhatsAppIcon className="w-4 h-4" />
                          <span>WhatsApp {b.whatsappDisplay}</span>
                        </a>
                        <a
                          href={b.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white text-sm font-bold shadow-md shadow-violet-500/25 transition-all"
                        >
                          <Navigation className="w-4 h-4" />
                          <span>Cómo llegar</span>
                          <ExternalLink className="w-3.5 h-3.5 text-white/70" />
                        </a>
                        <button
                          type="button"
                          onClick={() => copiar(b.id, b.fullAddress)}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-sm font-medium transition-colors cursor-pointer"
                        >
                          {copiada === b.id ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                          <span>{copiada === b.id ? 'Copiada' : 'Copiar dirección'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-violet-50/60 border border-violet-100 p-4">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                          <Clock className="w-4 h-4 text-violet-700" />
                          <span>Horarios de atención</span>
                        </div>
                        {b.showSchedule && (
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                              status.isOpen
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}
                          >
                            <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-green-500' : 'bg-amber-400'}`} />
                            {status.badge}
                          </span>
                        )}
                      </div>
                      {b.showSchedule ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-slate-700">
                          {SCHEDULE.map((d) => {
                            const hoy = d.dayIndex === todayIndex;
                            return (
                              <div
                                key={d.dayName}
                                className={`flex items-center justify-between py-1 px-2 rounded-lg ${
                                  hoy ? 'bg-white font-semibold text-violet-900 border border-violet-100' : ''
                                }`}
                              >
                                <span>{d.dayName}</span>
                                <span className="font-mono text-xs text-right">{horarioLineas(d).map((l) => (<span key={l} className="block">{l}</span>))}</span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-700">
                          Consultá los días y horarios de esta sucursal por WhatsApp al {b.whatsappDisplay}.
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        {/* Controles de la cinta */}
        <div className={`flex items-center justify-center gap-4 mt-4 ${unica ? 'hidden' : ''}`}>
          <button
            type="button"
            onClick={() => irA(activo - 1)}
            disabled={activo === 0}
            aria-label="Sucursal anterior"
            className="w-10 h-10 rounded-full border border-violet-200 bg-white text-violet-800 flex items-center justify-center hover:bg-violet-50 disabled:opacity-35 disabled:cursor-default transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2" aria-hidden="true">
            {BRANCHES.map((b, i) => (
              <span
                key={b.id}
                className={`h-2.5 rounded-full transition-all ${activo === i ? 'w-8 bg-violet-600' : 'w-2.5 bg-violet-200'}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => irA(activo + 1)}
            disabled={activo === BRANCHES.length - 1}
            aria-label="Sucursal siguiente"
            className="w-10 h-10 rounded-full border border-violet-200 bg-white text-violet-800 flex items-center justify-center hover:bg-violet-50 disabled:opacity-35 disabled:cursor-default transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
