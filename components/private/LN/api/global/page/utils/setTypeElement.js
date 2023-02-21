import configsTypesByLayout from '../config/configTypesByLayout';

const setTypeElement = (information, sectionAliasMobile, layoutPage) => {
    const sectionAlias = sectionAliasMobile
        ? sectionAliasMobile.toLowerCase()
        : sectionAliasMobile;
    return Number(configsTypesByLayout(layoutPage)(sectionAlias));
};

export default setTypeElement;
