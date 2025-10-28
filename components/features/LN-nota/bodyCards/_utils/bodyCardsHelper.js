export const scrollToGrid = gridRef => {
    const element = gridRef.current;
    if (!element) return;

    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const scrollToCard = cardId => {
    if (!cardId) return;
    document.getElementById(`card-ampliada-${cardId}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
};
