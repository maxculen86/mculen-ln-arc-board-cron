export const bannerBox = (element, typeSection) => {
    const alias =
        element &&
        element.sectionAliasMobile &&
        element.sectionAliasMobile.toLowerCase();
    const type = typeSection[alias];
    return {
        ...type,
        idSeccion: element.id
    };
};

export default bannerBox;
