export const titleBox = (element, typeSection) => {
    const alias =
        element &&
        element.sectionAliasMobile &&
        element.sectionAliasMobile.toLowerCase();
    const type = typeSection[alias];
    return {
        ...type,
        parameters: {
            title: 'Opinión'
        }
    };
};

export default titleBox;
