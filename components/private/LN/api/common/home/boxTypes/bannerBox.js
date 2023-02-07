export const bannerBox = (element, typeSection) => {
    const type = typeSection[element.sectionAliasMobile];
    return {
        ...type,
        idSeccion: element.id
    };
};

export default bannerBox;
