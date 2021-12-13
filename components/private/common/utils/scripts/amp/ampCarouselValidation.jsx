const ampCarouselValidator = globalContent => {
    const galleryInElements = contentElements =>
        contentElements &&
        contentElements.filter(e => e.type === 'gallery').length;

    const { content_elements: contentElements = [] } = globalContent;

    return galleryInElements(contentElements) > 0;
};

export default ampCarouselValidator;
