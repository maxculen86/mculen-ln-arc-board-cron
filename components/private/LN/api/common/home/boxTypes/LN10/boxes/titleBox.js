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
        tituloCaja: information.title || 'Opinión',
        url: !information.hideTitle ? information.url : null,
        parameters: {
            title: information.title || 'Opinión',
            url: !information.hideTitle ? information.url : null
        }
    };
};

export default titleBox;
