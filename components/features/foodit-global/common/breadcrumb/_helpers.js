import { SITE_FOODIT } from 'fusion:environment';
import capitalizeFirstLetter from '../../../../private/common/utils/capitalizeFirstLetter';
import get from '../../../../private/common/utils/get';

export const formatSectionName = (sectionString = '') => {
    if (sectionString === 'club-la-nacion') return 'Club LA NACION';
    if (sectionString === 'dieta') return 'Dietas';

    const sectionFormated = sectionString.replace(/[/-]/g, ' ').trim();

    return capitalizeFirstLetter(sectionFormated);
};

export const getFooditAcuTitle = globalContent => {
    const { _id: id = '', name = '', title = '' } = globalContent;
    if (id === '/tema') return formatSectionName(title);

    const sectionsArray = id.split('/').filter(Boolean);
    const sectionsTransformed =
        sectionsArray.length > 1
            ? [...sectionsArray.slice(0, 1), ...sectionsArray.slice(-1)]
            : sectionsArray;
    const sectionStringTransformed = sectionsTransformed.join('/');
    return (
        get(globalContent, 'site.site_title') ||
        name ||
        formatSectionName(sectionStringTransformed)
    );
};
export const setArraySection = (stringSections = '', isAcu = false) => {
    const arraySections = stringSections.split('/');
    const sectionsTransformed = arraySections.map((section, index) =>
        arraySections.slice(0, index + 1).join('/')
    );

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
export const getBreadcrumbSections = globalContent => {
    const titleTema = `/${get(globalContent, 'title', '')}`;
    const id = get(globalContent, '_id', '');
    const acuSection = id === '/tema' ? titleTema : id;
    const noteSection = get(globalContent, 'taxonomy.primary_section._id', '');
    const isAcu = acuSection.startsWith('/');

    return isAcu
        ? setArraySection(acuSection, isAcu)
        : setArraySection(noteSection);
};
