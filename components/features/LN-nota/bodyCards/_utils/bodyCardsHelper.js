// Altura del header sticky (~57px) + margen de seguridad para mejor UX
const HEADER_OFFSET = 100;
const MIN_DURATION_MS = 600;
const MAX_DURATION_MS = 1800;
const MS_PER_PX = 0.14;

// Animación rAF que recalcula el target cada frame. Resiliente a layout shifts
// durante el scroll (ej: componentes lazy que cambian de altura al entrar al
// viewport entre el origen y el destino).
const easeOutCubic = t => 1 - (1 - t) ** 3;

const computeTargetY = element =>
    element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

const computeDuration = distance =>
    Math.min(
        Math.max(Math.abs(distance) * MS_PER_PX, MIN_DURATION_MS),
        MAX_DURATION_MS
    );

const prefersReducedMotion = () =>
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scrollToElementWithOffset = element => {
    // Respeta la preferencia de accesibilidad "reducir movimiento": saltamos
    // a la posición final sin animación.
    if (prefersReducedMotion()) {
        window.scrollTo(0, computeTargetY(element));
        return;
    }

    const startY = window.scrollY;
    const startTime = performance.now();
    const duration = computeDuration(computeTargetY(element) - startY);
    const controller = new AbortController();
    const { signal } = controller;
    let rafId = null;

    const abort = () => {
        if (rafId !== null) cancelAnimationFrame(rafId);
        controller.abort();
    };

    // Teclas que típicamente scrollean: flechas, espacio, PgUp/PgDn, Home/End.
    const SCROLL_KEYS = [
        'ArrowUp',
        'ArrowDown',
        'PageUp',
        'PageDown',
        'Home',
        'End',
        ' '
    ];

    window.addEventListener('wheel', abort, { once: true, signal });
    window.addEventListener('touchstart', abort, { once: true, signal });
    window.addEventListener(
        'keydown',
        e => {
            if (SCROLL_KEYS.includes(e.key)) abort();
        },
        { signal }
    );

    const tick = now => {
        if (signal.aborted) return;
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = easeOutCubic(progress);
        const nextY = startY + (computeTargetY(element) - startY) * eased;
        window.scrollTo(0, nextY);
        if (progress < 1) {
            rafId = requestAnimationFrame(tick);
        } else {
            controller.abort();
        }
    };

    rafId = requestAnimationFrame(tick);
};

export const scrollToGrid = gridRef => {
    const element = gridRef.current;
    if (!element) return;
    scrollToElementWithOffset(element);
};

export const scrollToCard = cardId => {
    if (!cardId) return;
    const element = document.getElementById(`card-ampliada-${cardId}`);
    if (!element) return;
    scrollToElementWithOffset(element);
};
