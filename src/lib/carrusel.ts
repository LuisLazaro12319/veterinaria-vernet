import { useEffect, type RefObject } from 'react';

/**
 * Carruseles con "snap" que se sienten como en el celular también en la computadora:
 * - Se arrastran con el mouse (en pantallas táctiles sigue el desplazamiento nativo del dedo).
 * - Al soltar, encajan en la tarjeta más cercana con una animación corta y propia, en vez de la
 *   animación suave del navegador (`scroll-behavior: smooth`), que en escritorio se siente lenta.
 */

const animaciones = new WeakMap<HTMLElement, number>();

const salida = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic

/** Lleva el carrusel a la posición horizontal `destino` con una animación corta (260 ms). */
export function animarScroll(el: HTMLElement, destino: number, ms = 260) {
  const previa = animaciones.get(el);
  if (previa) cancelAnimationFrame(previa);

  const inicio = el.scrollLeft;
  const distancia = destino - inicio;
  if (Math.abs(distancia) < 1) {
    el.scrollLeft = destino;
    el.style.scrollSnapType = '';
    return;
  }

  // Mientras anima, se apaga el snap para que no pelee con la animación; después se restituye.
  el.style.scrollSnapType = 'none';
  const t0 = performance.now();
  const paso = (ahora: number) => {
    const t = Math.min(1, (ahora - t0) / ms);
    el.scrollLeft = inicio + distancia * salida(t);
    if (t < 1) {
      animaciones.set(el, requestAnimationFrame(paso));
    } else {
      animaciones.delete(el);
      el.style.scrollSnapType = '';
    }
  };
  animaciones.set(el, requestAnimationFrame(paso));
}

/** Permite arrastrar el carrusel con el mouse y encaja en la tarjeta más cercana al soltar. */
export function useArrastreMouse(pista: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = pista.current;
    if (!el) return;

    let activo = false;
    let movido = false;
    let inicioX = 0;
    let inicioScroll = 0;
    let ultimoX = 0;
    let velocidad = 0;
    let ultimoT = 0;

    const alBajar = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      const previa = animaciones.get(el);
      if (previa) cancelAnimationFrame(previa);
      activo = true;
      movido = false;
      inicioX = e.clientX;
      ultimoX = e.clientX;
      inicioScroll = el.scrollLeft;
      velocidad = 0;
      ultimoT = performance.now();
      el.style.scrollSnapType = 'none';
    };

    const alMover = (e: PointerEvent) => {
      if (!activo) return;
      const dx = e.clientX - inicioX;
      if (!movido && Math.abs(dx) > 5) {
        movido = true;
        el.setPointerCapture(e.pointerId);
        el.style.cursor = 'grabbing';
        el.style.userSelect = 'none';
      }
      if (!movido) return;
      const ahora = performance.now();
      const dt = Math.max(1, ahora - ultimoT);
      velocidad = (e.clientX - ultimoX) / dt; // px por ms, positivo = hacia la derecha
      ultimoX = e.clientX;
      ultimoT = ahora;
      el.scrollLeft = inicioScroll - dx;
    };

    const alSoltar = () => {
      if (!activo) return;
      activo = false;
      el.style.cursor = '';
      el.style.userSelect = '';
      if (!movido) {
        el.style.scrollSnapType = '';
        return;
      }
      const ancho = el.clientWidth || 1;
      // Un empujón rápido avanza una tarjeta aunque el arrastre haya sido corto.
      const empuje = Math.abs(velocidad) > 0.4 ? -Math.sign(velocidad) * 0.35 : 0;
      const indice = Math.round(el.scrollLeft / ancho + empuje);
      const maximo = Math.max(0, Math.round((el.scrollWidth - ancho) / ancho));
      animarScroll(el, Math.max(0, Math.min(maximo, indice)) * ancho);
    };

    // Si hubo arrastre, no se dispara el clic en enlaces o botones de adentro.
    const alHacerClic = (e: MouseEvent) => {
      if (movido) {
        e.preventDefault();
        e.stopPropagation();
        movido = false;
      }
    };

    el.addEventListener('pointerdown', alBajar);
    el.addEventListener('pointermove', alMover);
    el.addEventListener('pointerup', alSoltar);
    el.addEventListener('pointercancel', alSoltar);
    el.addEventListener('click', alHacerClic, true);
    el.addEventListener('dragstart', (e) => e.preventDefault());
    return () => {
      el.removeEventListener('pointerdown', alBajar);
      el.removeEventListener('pointermove', alMover);
      el.removeEventListener('pointerup', alSoltar);
      el.removeEventListener('pointercancel', alSoltar);
      el.removeEventListener('click', alHacerClic, true);
    };
  }, [pista]);
}
