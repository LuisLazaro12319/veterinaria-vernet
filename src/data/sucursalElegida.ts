import { useSyncExternalStore } from 'react';
import { BRANCHES, type Branch } from './clinicData';

/**
 * Sucursal elegida por la persona. Se comparte entre el formulario de turnos, la cinta de sucursales,
 * los botones de WhatsApp y los tratamientos: así todo se envía al número de la sucursal que eligió.
 */
let indice = 0;
const oyentes = new Set<() => void>();

export function elegirSucursal(i: number) {
  const destino = Math.max(0, Math.min(BRANCHES.length - 1, i));
  if (destino === indice) return;
  indice = destino;
  oyentes.forEach((avisar) => avisar());
}

const suscribir = (avisar: () => void) => {
  oyentes.add(avisar);
  return () => {
    oyentes.delete(avisar);
  };
};

export function useSucursal(): { indice: number; sucursal: Branch; elegir: (i: number) => void } {
  const i = useSyncExternalStore(suscribir, () => indice);
  return { indice: i, sucursal: BRANCHES[i], elegir: elegirSucursal };
}
