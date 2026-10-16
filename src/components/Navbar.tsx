import React, { useEffect, useState } from 'react';
import { Clock, MapPin, Menu, PawPrint, X } from 'lucide-react';
import { CLINIC, HAS_SCHEDULE, getClinicStatus, whatsappUrl } from '../data/clinicData';
import { useSucursal } from '../data/sucursalElegida';
import { InstagramIcon, WhatsAppIcon } from './BrandIcons';

const LINKS = [
  { href: '#top', label: 'Inicio' },
  { href: '#tratamientos', label: 'Servicios' },
  { href: '#profesional', label: 'Nosotros' },
  { href: '#turnos', label: 'Turnos' },
  { href: '#ubicacion', label: 'Dónde estamos' },
];

const TURNO_MSG = `Hola! Quisiera hacer una consulta en ${CLINIC.name}.`;

const horaLocal = () =>
  new Date().toLocaleTimeString('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });

export const Navbar: React.FC = () => {
  const { sucursal } = useSucursal();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(() => getClinicStatus());
  const [hora, setHora] = useState(() => horaLocal());

  // El encabezado es fijo (sticky): un enlace a "#top" no se mueve porque ya está arriba de todo.
  // Por eso "Inicio" y el logo suben al principio de la página con scroll.
  const irArriba = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const id = setInterval(() => {
      setStatus(getClinicStatus());
      setHora(horaLocal());
    }, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Barra superior con el estado del consultorio en tiempo real */}
      <div className="bg-violet-100 text-violet-900 text-xs py-1.5 px-4 border-b border-violet-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-violet-900">
              <MapPin className="w-3.5 h-3.5 text-violet-600 shrink-0" />
              <span>{CLINIC.streets}</span>
            </span>
            {HAS_SCHEDULE && (
              <>
                <span className="hidden md:inline text-violet-300">·</span>
                <span className="hidden md:flex items-center gap-1.5 text-violet-700">
                  <Clock className="w-3.5 h-3.5 text-violet-700 shrink-0" />
                  <span>Hora local: {hora} hs</span>
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            {HAS_SCHEDULE && (
              <>
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <span
                    className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-green-400 animate-pulse' : 'bg-amber-400'}`}
                  />
                  <span className={status.isOpen ? 'text-green-700' : 'text-amber-700'}>{status.badge}</span>
                  {status.detail && <span className="text-violet-700 hidden lg:inline">({status.detail})</span>}
                </span>
                <span className="text-violet-300">·</span>
              </>
            )}
            <a
              href={CLINIC.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-800 hover:text-violet-950 transition-colors flex items-center gap-1.5"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-[#e1306c]" />
              <span>{CLINIC.instagramHandle}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Encabezado principal en degradado azul */}
      <header
        className="sticky top-0 z-50 text-violet-950 bg-gradient-to-r from-violet-300 via-teal-200 to-violet-300 shadow-lg shadow-violet-500/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-6">
          <a
            href="#top"
            onClick={irArriba}
            className="flex items-center gap-3 text-violet-950 transition-opacity hover:opacity-95 shrink-0"
          >
            {/* Marca provisoria: huellita. Cuando la veterinaria mande su logo se reemplaza por la imagen. */}
            <span
              aria-hidden="true"
              className="w-10 h-10 shrink-0 rounded-full bg-white/60 text-violet-700 flex items-center justify-center shadow-inner"
            >
              <PawPrint className="w-5 h-5" />
            </span>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-violet-950 leading-none">
                {CLINIC.name}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-violet-900 font-medium leading-tight mt-1">
                {CLINIC.locationLabel}
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-6">
            {LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={l.href === '#top' ? irArriba : undefined}
                className={`text-[14px] transition-colors whitespace-nowrap ${
                  i === 0 ? 'font-bold text-violet-950' : 'font-medium text-violet-950/80 hover:text-violet-950'
                }`}
              >
                {l.label}
              </a>
            ))}

            <span className="flex items-center gap-2.5 pl-3 border-l border-violet-950/20">
              <a
                href={CLINIC.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${CLINIC.instagramHandle}`}
                title={`Instagram ${CLINIC.instagramHandle}`}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-md bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] hover:scale-110 transition-transform"
              >
                <InstagramIcon className="w-[18px] h-[18px]" />
              </a>
              <a
                href={whatsappUrl(TURNO_MSG, sucursal.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-md bg-[#25D366] hover:bg-[#20ba5a] hover:scale-110 transition-all"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            </span>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="lg:hidden p-1.5 text-violet-950 hover:text-violet-800"
              aria-label="Abrir menú"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden bg-violet-50 border-t border-violet-200 px-6 py-5 space-y-3">
            <div className="flex flex-col space-y-3 text-sm">
              {LINKS.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={l.href === '#top' ? irArriba : () => setOpen(false)}
                  className={`text-left py-1 ${i === 0 ? 'text-violet-950 font-bold' : 'text-violet-900/80 hover:text-violet-950'}`}
                >
                  {l.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-violet-200 flex flex-col gap-2.5">
              <a
                href={whatsappUrl(TURNO_MSG, sucursal.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#25D366] text-white rounded-full text-xs font-bold"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp {CLINIC.name}</span>
              </a>
              <a
                href={CLINIC.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-[#d62976] to-[#4f5bd5] text-white rounded-full text-xs font-bold"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram {CLINIC.instagramHandle}</span>
              </a>
              <a
                href={CLINIC.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 bg-violet-100 text-violet-900 rounded-full text-xs font-semibold"
              >
                <MapPin className="w-4 h-4 text-violet-700" />
                <span>Ver en Google Maps</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
