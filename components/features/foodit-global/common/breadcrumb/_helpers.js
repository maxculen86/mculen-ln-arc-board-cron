import { SITE_FOODIT } from 'fusion:environment';
import capitalizeFirstLetter from '../../../../private/common/utils/capitalizeFirstLetter';

export const formatSectionName = (sectionString = '') => {
    const sectionFormated = sectionString.replace(/[\/-]/g, ' ').trim();

    return capitalizeFirstLetter(sectionFormated);
};

export const setArraySection = (stringSections = '', isAcu = false) => {
    const arraySections = stringSections.split('/');
    const sectionsTransformed = arraySections.map((section, index) => {
        return arraySections.slice(0, index + 1).join('/');
    });

    return arraySections.map((section, index) => {
        const nameSection = formatSectionName(section);
        return {
            name: section ? nameSection : 'Foodit',
            url: section
                ? `${SITE_FOODIT}${sectionsTransformed[index]}/`
                : SITE_FOODIT,
            disabled: isAcu && index === arraySections.length - 1
        };
    });
};
