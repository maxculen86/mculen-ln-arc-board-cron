const SCROLL_BEHAVIOR = 'smooth';
// Altura del header sticky (~57px) + margen de seguridad para mejor UX
const HEADER_OFFSET = 100;

const scrollToElementWithOffset = element => {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: offsetPosition, behavior: SCROLL_BEHAVIOR });
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
