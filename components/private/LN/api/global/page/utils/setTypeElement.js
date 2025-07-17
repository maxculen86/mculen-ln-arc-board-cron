import configsTypesByLayout from '../config/configTypesByLayout';

const setTypeElement = (sectionAliasMobile, layoutPage) => {
    const sectionAlias = sectionAliasMobile
        ? sectionAliasMobile.toLowerCase()
        : sectionAliasMobile;

    const getTypeNumberBySectionAlias = configsTypesByLayout(layoutPage);

    return Number(getTypeNumberBySectionAlias(sectionAlias));
};

export default setTypeElement;
