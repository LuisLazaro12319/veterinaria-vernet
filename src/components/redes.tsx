import React from 'react';
import type { SocialLink } from '../data/clinicData';
import { FacebookIcon, InstagramIcon, ThreadsIcon, TikTokIcon } from './BrandIcons';

/** Ícono y color de marca (al pasar el mouse o tocar) de cada red. Clases completas para que Tailwind las detecte. */
export const ICONOS_REDES: Record<
  SocialLink['id'],
  { Icono: React.FC<{ className?: string }>; hover: string; fondo: string }
> = {
  instagram: {
    Icono: InstagramIcon,
    hover: 'hover:bg-gradient-to-tr hover:from-[#feda75] hover:via-[#d62976] hover:to-[#4f5bd5] hover:text-white',
    fondo: 'bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white',
  },
  facebook: {
    Icono: FacebookIcon,
    hover: 'hover:bg-[#1877F2] hover:text-white',
    fondo: 'bg-[#1877F2] text-white',
  },
  tiktok: {
    Icono: TikTokIcon,
    hover: 'hover:bg-black hover:text-white',
    fondo: 'bg-black text-white',
  },
  threads: {
    Icono: ThreadsIcon,
    hover: 'hover:bg-black hover:text-white',
    fondo: 'bg-black text-white',
  },
};
