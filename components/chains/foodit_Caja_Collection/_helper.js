let nextId = 0;
const collectionToCarouselMap = new Map();

export const getCarouselId = id => {
    if (!collectionToCarouselMap.has(id)) {
        collectionToCarouselMap.set(id, (nextId += 1));
    }
    return `carousel-${collectionToCarouselMap.get(id)}`;
};
