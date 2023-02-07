export const anticipoBox = (element, featureInfo) => {
    const { sectionAliasMobile } = element;

    if (sectionAliasMobile === 'Anticipo') return { ...featureInfo };

    return null;
};

export default anticipoBox;
