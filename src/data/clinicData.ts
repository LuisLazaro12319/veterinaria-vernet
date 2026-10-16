/**
 * Veterinaria Vernet - datos de la veterinaria.
 * Fuente: ficha de Google Maps e Instagram @veterinaria_vernet; el WhatsApp lo pasó el cliente.
 * Todo lo que se muestra en la web sale de acá: para otra veterinaria alcanza con cambiar este archivo.
 */

export const CLINIC = {
  name: 'Veterinaria Vernet',
  initials: 'VV',
  professional: 'nuestro equipo',
  street: 'Av. Luis Vernet 2118',
  streets: 'Av. Luis Vernet 2118, Monte Grande',
  locality: 'Monte Grande',
  province: 'Provincia de Buenos Aires',
  fullAddress: 'Av. Luis Vernet 2118, B1842FVP Monte Grande, Provincia de Buenos Aires',
  since: 0,
  // A CONFIRMAR: número que pasó el cliente; se asume que atiende por WhatsApp.
  phone: '011 5489-8302',
  whatsappNumber: '5491154898302',
  whatsappDisplay: '11 5489-8302',
  instagramHandle: '@veterinaria_vernet',
  instagramUrl: 'https://www.instagram.com/veterinaria_vernet/',
  mapsUrl: 'https://maps.app.goo.gl/og5iysnmgLvo7wt3A',
  coordinates: { lat: -34.7931366, lng: -58.4821804 },
  // Ficha de Google: 4,4 con 107 opiniones (se muestra "+100").
  googleRating: '4.4',
  googleReviews: '+100',
  googleNote: 'Opiniones de clientes en Google',
  googleScope: '',
  // Foto principal del inicio (ruta dentro de /public); null muestra una ilustración con huellitas.
  photo: 'images/hero-vernet.jpg' as string | null,
  email: 'veterinariavernet@gmail.com',
  // Texto de presentación para Nosotros (en primera persona).
  about:
    'En Veterinaria Vernet somos un centro de atención animal ubicado en pleno corazón de Monte Grande, partido de Esteban Echeverría, sobre la Avenida Luis Vernet al 2118. Somos una clínica veterinaria con presencia consolidada en la zona sur del Gran Buenos Aires: ofrecemos servicios de salud para perros, gatos y otras mascotas, junto con un surtido petshop que permite resolver varias necesidades en un mismo lugar. Nuestra ubicación es estratégica, frente a una parada de colectivo sobre una avenida de alto tránsito, y eso nos convierte en una opción de fácil acceso tanto para vecinos de la localidad como para quienes vienen de barrios cercanos.',
  servicesSummary: 'consultas, vacunación, cirugías y más para tu mascota',
  paymentMethods: [] as string[],
  hoursSummary: 'Lunes a sábado de 10 a 13 y de 17 a 20 hs',
  headline: 'Salud y cariño',
  headlineHighlight: 'para tu mascota',
  locationLabel: 'Monte Grande',
};

export interface SocialLink {
  id: 'instagram' | 'facebook' | 'tiktok' | 'threads';
  label: string;
  handle: string;
  url: string;
}

export const SOCIALS: SocialLink[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@veterinaria_vernet',
    url: 'https://www.instagram.com/veterinaria_vernet/',
  },
];

export interface Branch {
  id: string;
  label: string;
  zone: string;
  fullAddress: string;
  mapsUrl: string;
  mapQuery: string;
  whatsapp: string;
  whatsappDisplay: string;
  /** Foto de la fachada (ruta dentro de /public); null muestra un recuadro reservado. */
  photo: string | null;
  /** Video del lugar (ruta dentro de /public); si existe se muestra en lugar de la foto. */
  video: string | null;
  showSchedule: boolean;
}

// Una sola sede. La foto de la sucursal la va a pasar Luis más adelante.
export const BRANCHES: Branch[] = [
  {
    id: 'monte-grande',
    label: 'Av. Luis Vernet 2118',
    zone: 'Monte Grande',
    fullAddress: 'Av. Luis Vernet 2118, B1842FVP Monte Grande, Provincia de Buenos Aires',
    mapsUrl: 'https://maps.app.goo.gl/og5iysnmgLvo7wt3A',
    mapQuery: '-34.7931366,-58.4821804',
    whatsapp: '5491154898302',
    whatsappDisplay: '11 5489-8302',
    photo: 'images/sucursal-vernet.jpg',
    video: null,
    showSchedule: true,
  },
];

/** Texto para aclarar la sucursal en los mensajes de WhatsApp; vacío si hay una sola sede. */
export const sedeTxt = (b: Branch): string => (BRANCHES.length > 1 ? `, sucursal ${b.label} (${b.zone})` : '');

export interface Highlight {
  icon: 'star' | 'heart' | 'calendar' | 'users' | 'pin';
  title: string;
  text: string;
}

export const HIGHLIGHTS: Highlight[] = [
  { icon: 'star', title: '4,4 en Google', text: 'Más de 100 opiniones de clientes' },
  { icon: 'pin', title: 'En Monte Grande', text: 'Av. Luis Vernet 2118' },
  { icon: 'calendar', title: 'Turnos por WhatsApp', text: 'Escribinos y coordinamos tu turno' },
];

export interface Review {
  author: string | null;
  text: string;
}

// Extractos textuales de opiniones públicas de la ficha de Google Maps (107 opiniones, 4,4).
export const REVIEWS: Review[] = [
  {
    author: 'Jose G.',
    text: 'Lo recomiendo tuve un accidente con mi gato lo mordió muy mal, nuestra perra y no solo lo curaron sino también me explicaron muy bien como hacer todo el seguimiento... La verdad que hay que resaltar que el precio es muy accesible.',
  },
  {
    author: 'Brenda R.',
    text: 'Lleve durante unos meses a mi perrito, la doctora y la atención son muy amables. Nunca conocí a alguien tan humana y profesional, es muy difícil encontrar profesionales como ella…',
  },
  { author: 'Gisela R.', text: 'Muy bien me explicaron cómo desparasitar a mis perritas. Me atendió muy amable.' },
  { author: null, text: 'Excelente atención muy buena doctora y buenos precios' },
  { author: null, text: 'La fui a llevar ahí a varias mascotas varias veces siempre todo muy bien.' },
];

export interface TeamMember {
  role: string;
  name: string | null;
  photo: string | null;
  bio?: string;
  /** Verdadero para las tarjetas de mascotas: cambia los textos del recuadro de foto. */
  mascota?: boolean;
}

// Nosotros: el equipo y dos tarjetas con espacio para fotos de los pacientes. Nombres y fotos: A CONFIRMAR con la veterinaria.
export const TEAM: TeamMember[] = [
  { role: 'Médicos veterinarios', name: null, photo: null },
  {
    role: 'Pacientes caninos',
    name: null,
    photo: null,
    mascota: true,
    bio: 'Acá compartimos las fotos de los perros que nos eligen para cuidar su salud.',
  },
  {
    role: 'Pacientes felinos',
    name: null,
    photo: null,
    mascota: true,
    bio: 'Acá compartimos las fotos de los gatos que nos eligen para cuidar su salud.',
  },
];

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  icon:
    | 'stethoscope'
    | 'sparkles'
    | 'layers'
    | 'shield'
    | 'activity'
    | 'smile'
    | 'crown'
    | 'anchor'
    | 'gem'
    | 'paw'
    | 'syringe'
    | 'scissors'
    | 'heartpulse';
}

// A CONFIRMAR con la veterinaria: lista de ejemplo para la demo; se quita lo que no ofrezcan.
export const SERVICES: ServiceItem[] = [
  {
    id: 'consulta',
    name: 'Consulta clínica',
    description: 'Revisión general de tu perro o gato, con un plan de cuidado pensado para él.',
    icon: 'stethoscope',
  },
  {
    id: 'vacunacion',
    name: 'Vacunación',
    description: 'Plan de vacunas para cachorros y adultos, con recordatorios de refuerzo.',
    icon: 'syringe',
  },
  {
    id: 'desparasitacion',
    name: 'Desparasitación',
    description: 'Control de parásitos internos y externos para que tu mascota esté protegida.',
    icon: 'shield',
  },
  {
    id: 'cirugias',
    name: 'Cirugías y castraciones',
    description: 'Procedimientos quirúrgicos programados, con indicaciones claras para el después.',
    icon: 'heartpulse',
  },
  {
    id: 'laboratorio',
    name: 'Estudios de laboratorio',
    description: 'Análisis para llegar a un diagnóstico y controlar la salud de tu mascota.',
    icon: 'activity',
  },
  {
    id: 'imagenes',
    name: 'Ecografías y radiografías',
    description: 'Estudios por imágenes para diagnosticar y planificar cada tratamiento.',
    icon: 'layers',
  },
  {
    id: 'peluqueria',
    name: 'Peluquería y baños',
    description: 'Baño, corte y cuidado del pelaje para que tu mascota esté cómoda y prolija.',
    icon: 'scissors',
  },
  {
    id: 'alimentos',
    name: 'Alimentos y accesorios',
    description: 'Alimento balanceado, correas, camas y todo lo que tu mascota necesita.',
    icon: 'paw',
  },
  {
    id: 'urgencias',
    name: 'Urgencias',
    description: 'Si tu mascota tiene una urgencia, escribinos por WhatsApp y vemos cómo atenderla.',
    icon: 'smile',
  },
];

export interface ScheduleDay {
  dayName: string;
  dayIndex: number; // 0 = domingo ... 6 = sábado
  open: string | null;
  close: string | null;
  /** Segundo turno del día (horario cortado), si lo hay. */
  open2?: string;
  close2?: string;
}

/** Falso si no se conocen los horarios: sin horarios no se muestra "Abierto ahora". */
export const HAS_SCHEDULE = true;

// Horarios del perfil de WhatsApp Business de la veterinaria: lunes a sábado, mañana y tarde.
export const SCHEDULE: ScheduleDay[] = [
  { dayName: 'Lunes', dayIndex: 1, open: '10:00', close: '13:00', open2: '17:00', close2: '20:00' },
  { dayName: 'Martes', dayIndex: 2, open: '10:00', close: '13:00', open2: '17:00', close2: '20:00' },
  { dayName: 'Miércoles', dayIndex: 3, open: '10:00', close: '13:00', open2: '17:00', close2: '20:00' },
  { dayName: 'Jueves', dayIndex: 4, open: '10:00', close: '13:00', open2: '17:00', close2: '20:00' },
  { dayName: 'Viernes', dayIndex: 5, open: '10:00', close: '13:00', open2: '17:00', close2: '20:00' },
  { dayName: 'Sábado', dayIndex: 6, open: '10:00', close: '13:00', open2: '17:00', close2: '20:00' },
  { dayName: 'Domingo', dayIndex: 0, open: null, close: null },
];

/** Turnos del día como pares [desde, hasta]; vacío si está cerrado. */
const turnosDelDia = (d?: ScheduleDay): [string, string][] => {
  if (!d) return [];
  const pares: [string | null | undefined, string | null | undefined][] = [
    [d.open, d.close],
    [d.open2, d.close2],
  ];
  return pares.filter((p): p is [string, string] => Boolean(p[0] && p[1]));
};

/** Una línea por turno ("09:00 - 12:00", "15:00 - 20:00") o "Cerrado". */
export function horarioLineas(d: ScheduleDay): string[] {
  const turnos = turnosDelDia(d);
  return turnos.length ? turnos.map(([a, b]) => `${a} - ${b}`) : ['Cerrado'];
}

const TIME_ZONE = 'America/Argentina/Buenos_Aires';

export interface ClinicStatus {
  isOpen: boolean;
  badge: string;
  detail: string;
}

const toMinutes = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

export function getClinicStatus(now: Date = new Date()): ClinicStatus {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(now);

  const weekday = (parts.find((p) => p.type === 'weekday')?.value || '').toLowerCase().slice(0, 3);
  const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10) % 24;
  const minute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
  const dayMap: Record<string, number> = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
  const today = dayMap[weekday] ?? now.getDay();
  const minutes = hour * 60 + minute;

  const turnos = turnosDelDia(SCHEDULE.find((d) => d.dayIndex === today));
  const abierto = turnos.find(([a, b]) => minutes >= toMinutes(a) && minutes < toMinutes(b));
  if (abierto) {
    return { isOpen: true, badge: 'Abierto ahora', detail: `Cierra a las ${abierto[1]} hs` };
  }
  const proximo = turnos.find(([a]) => minutes < toMinutes(a));
  if (proximo) {
    return { isOpen: false, badge: 'Cerrado ahora', detail: `Abre hoy a las ${proximo[0]} hs` };
  }

  for (let i = 1; i <= 7; i++) {
    const siguiente = turnosDelDia(SCHEDULE.find((d) => d.dayIndex === (today + i) % 7));
    if (siguiente.length) {
      const dia = SCHEDULE.find((d) => d.dayIndex === (today + i) % 7);
      const cuando = i === 1 ? 'mañana' : `el ${dia?.dayName.toLowerCase()}`;
      return { isOpen: false, badge: 'Cerrado por hoy', detail: `Abre ${cuando} a las ${siguiente[0][0]} hs` };
    }
  }
  return { isOpen: false, badge: 'Cerrado ahora', detail: '' };
}

/** Enlace de WhatsApp con el mensaje armado; sin número usa el de turnos general. */
export function whatsappUrl(message: string, number: string = CLINIC.whatsappNumber): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
