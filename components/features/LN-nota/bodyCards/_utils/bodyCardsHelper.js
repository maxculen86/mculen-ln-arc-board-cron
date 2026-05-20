import { scrollToElementWithOffset } from '../../../../private/LN/common/utils/scrollToElementWithOffset';

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
