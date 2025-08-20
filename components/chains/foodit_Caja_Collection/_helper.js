let nextId = 0;
const collectionToCarouselMap = new Map();

export const getCarouselId = id => {
    if (!collectionToCarouselMap.has(id)) {
        nextId += 1;
        collectionToCarouselMap.set(id, nextId);
    }
    return `carousel-${collectionToCarouselMap.get(id)}`;
};
