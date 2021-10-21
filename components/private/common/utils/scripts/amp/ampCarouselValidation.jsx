const ampCarouselValidator = globalContent => {
    const galleryInElements = contentElements =>
        contentElements &&
        contentElements.filter(e => e.type === 'gallery').length;

    const { content_elements: contentElements = [] } = globalContent;

    const loadCarousel = galleryInElements(contentElements) > 0;

    return loadCarousel;
};

export default ampCarouselValidator;
