import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, PawPrint, UserRound } from 'lucide-react';
import { CLINIC, PACIENTES_FOTOS, TEAM } from '../data/clinicData';
import { animarScroll, useArrastreMouse } from '../lib/carrusel';

const rutaFoto = (foto: string | null) => (foto ? `${import.meta.env.BASE_URL}${foto}` : null);

export const ProfessionalSection: React.FC = () => {
  const pista = useRef<HTMLDivElement>(null);
  useArrastreMouse(pista);
  const [activo, setActivo] = useState(0);

  const alScrollear = () => {
    const el = pista.current;
    if (!el || el.clientWidth === 0) return;
    setActivo(Math.round(el.scrollLeft / el.clientWidth));
  };

  const irA = (i: number) => {
    const el = pista.current;
    if (!el) return;
    const destino = Math.max(0, Math.min(TEAM.length - 1, i));
    animarScroll(el, destino * el.clientWidth);
  };

  return (
    <section id="profesional" className="relative py-16 lg:py-24 bg-white border-b border-purple-100 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-purple-100/70 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-purple-100/60 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título de la sección, centrado y arriba */}
        <div className="text-center mb-6 lg:mb-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-violet-700 via-violet-600 to-purple-500 bg-clip-text text-transparent">
              Nosotros
            </span>
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-20 rounded-full bg-gradient-to-r from-violet-500 to-teal-400" />
        </div>

        {/* Carrusel: una tarjeta por persona, todas con el mismo diseño.
            Los márgenes negativos + el relleno de cada tarjeta dejan lugar al brillo del marco para que no se corte. */}
        <div
          ref={pista}
          onScroll={alScrollear}
          className="no-scrollbar -mx-4 sm:-mx-6 lg:-mx-8 flex overflow-x-auto snap-x snap-mandatory md:cursor-grab"
        >
          {TEAM.map((m, i) => {
            const foto = rutaFoto(m.photo);
            const principal = i === 0;
            const titulo = m.name ?? m.role;

            /* Tarjeta de pacientes: varios cuadros para fotos de perros y gatos, sin tarjeta de nombre. */
            if (m.galeria) {
              const cuadros = Array.from({ length: Math.max(6, PACIENTES_FOTOS.length) }, (_, k) => PACIENTES_FOTOS[k] ?? null);
              return (
                <div
                  key={m.role}
                  className="basis-full w-full min-w-0 grow-0 shrink-0 snap-center px-4 sm:px-6 lg:px-8 py-10"
                >
                  <div className="max-w-5xl mx-auto text-center">
                    <p className="mb-5">
                      <span className="inline-block px-3.5 py-1.5 rounded-full bg-violet-50 text-violet-700 border border-purple-200 text-xs font-bold uppercase tracking-wider">
                        {m.role}
                      </span>
                    </p>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                      Perros, gatos y{' '}
                      <span className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
                        otras mascotas
                      </span>
                    </h3>
                    {m.bio && <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">{m.bio}</p>}
                    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
                      {cuadros.map((src, k) => (
                        <li key={k}>
                          {src ? (
                            <img
                              src={rutaFoto(src) ?? undefined}
                              alt={`Paciente de ${CLINIC.name}`}
                              loading="lazy"
                              className="w-full aspect-square object-cover object-[50%_25%] rounded-2xl shadow-lg shadow-violet-900/10"
                            />
                          ) : (
                            <div className="w-full aspect-square rounded-2xl border-2 border-dashed border-violet-200 bg-gradient-to-br from-violet-50 to-purple-100 flex flex-col items-center justify-center gap-1.5 text-violet-400">
                              <PawPrint className="w-9 h-9 sm:w-11 sm:h-11" />
                              <span className="text-xs font-semibold">Foto del paciente</span>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={m.role}
                className="basis-full w-full min-w-0 grow-0 shrink-0 snap-center px-4 sm:px-6 lg:px-8 py-10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-5">
                    <div className="max-w-md mx-auto">
                      <p className="text-center mb-5">
                        <span className="inline-block px-3.5 py-1.5 rounded-full bg-violet-50 text-violet-700 border border-purple-200 text-xs font-bold uppercase tracking-wider">
                          {m.role}
                        </span>
                      </p>

                      <div className="relative">
                        <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-violet-400 via-purple-300 to-violet-600 opacity-80 blur-sm" />
                        <div className="relative rounded-[1.75rem] overflow-hidden bg-purple-100 shadow-2xl shadow-violet-900/20 aspect-square">
                          {foto ? (
                            <img
                              src={foto}
                              alt={`${titulo}, ${m.role.toLowerCase()} de ${CLINIC.name}`}
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-violet-50 to-purple-100 flex flex-col items-center justify-center gap-2 text-violet-400">
                              <div className="w-24 h-24 rounded-full border-2 border-dashed border-violet-300 flex items-center justify-center">
                                <UserRound className="w-11 h-11" />
                              </div>
                              <span className="text-xs font-semibold">Foto del integrante</span>
                            </div>
                          )}
                        </div>
                        <div className="relative -mt-8 mx-6 rounded-2xl bg-white shadow-xl shadow-violet-900/10 border border-purple-100 px-5 py-4 text-center">
                          <h3 className={`text-xl font-extrabold ${m.name ? 'text-slate-900' : 'text-slate-400 italic'}`}>
                            {m.name ?? 'Nombre y apellido'}
                          </h3>
                          <p className="text-sm text-violet-700 font-semibold mt-0.5">
                            {`${m.role} · ${CLINIC.name}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    {principal ? (
                      <>
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                          Atención personalizada en{' '}
                          <span className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
                            {CLINIC.locality}
                          </span>
                        </h3>
                        <p className="text-lg text-slate-600 leading-relaxed mb-4">{CLINIC.about}</p>
                        <p className="text-lg text-slate-600 leading-relaxed mb-7">
                          Escribinos por WhatsApp para contarnos qué necesita tu mascota y coordinar tu turno.
                        </p>

                        <div className="hidden md:flex flex-wrap items-center gap-3 text-sm font-semibold mb-8">
                          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-violet-50 text-violet-900 border border-purple-200">
                            <MapPin className="w-4 h-4 text-violet-600" />
                            <span>{CLINIC.streets}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                          <span className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
                            {m.role}
                          </span>
                        </h3>
                        <p className="text-lg text-slate-600 leading-relaxed mb-8">
                          {m.bio ?? `Forma parte del equipo de ${CLINIC.name} y te acompaña en cada consulta.`}
                        </p>
                      </>
                    )}

                    {principal && TEAM.length > 1 && (
                      <button
                        type="button"
                        onClick={() => irA(1)}
                        className="hidden md:inline-flex items-center gap-1.5 px-5 py-3.5 text-sm font-bold text-violet-800 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl transition-colors cursor-pointer"
                      >
                        <span>Mirá a nuestros pacientes</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controles del carrusel, centrados debajo */}
        {TEAM.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-2">
            <button
              type="button"
              onClick={() => irA(activo - 1)}
              disabled={activo === 0}
              aria-label="Anterior"
              className="w-10 h-10 rounded-full border border-purple-200 bg-white text-violet-800 flex items-center justify-center hover:bg-purple-50 disabled:opacity-35 disabled:cursor-default transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2" role="tablist" aria-label="Integrantes del equipo">
              {TEAM.map((m, i) => (
                <button
                  key={m.role}
                  type="button"
                  role="tab"
                  aria-selected={activo === i}
                  aria-label={m.name ?? m.role}
                  onClick={() => irA(i)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    activo === i ? 'w-8 bg-violet-600' : 'w-2.5 bg-purple-200 hover:bg-purple-300'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => irA(activo + 1)}
              disabled={activo === TEAM.length - 1}
              aria-label="Siguiente"
              className="w-10 h-10 rounded-full border border-purple-200 bg-white text-violet-800 flex items-center justify-center hover:bg-purple-50 disabled:opacity-35 disabled:cursor-default transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
