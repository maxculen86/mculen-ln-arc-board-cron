const ampCarouselValidator = globalContent => {
    const galleryInElements = contentElements =>
        contentElements &&
        contentElements.filter(e => e.type === 'gallery').length;

    const { content_elements: _contentElements = [] } = globalContent;

    return galleryInElements(_contentElements) > 0;
};

export default ampCarouselValidator;
