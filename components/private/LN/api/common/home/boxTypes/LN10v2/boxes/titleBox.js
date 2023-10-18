export const titleBox = (element, typeSection) => {
    if (!element) {
        return null;
    }
    const { information, sectionAliasMobile } = element;
    const alias =
        (sectionAliasMobile && sectionAliasMobile.toLowerCase()) || null;

    const type = typeSection[alias];
    if (!alias || !type) {
        return null;
    }
    return {
        ...type,
        parameters: {
            title: (information.title || 'Opinión').toUpperCase(),
            url: !information.hideTitle ? information.url : null
        }
    };
};

export default titleBox;
