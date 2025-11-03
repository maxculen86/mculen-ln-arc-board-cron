import { SITE_FOODIT } from 'fusion:environment';
import capitalizeFirstLetter from '../../../../private/common/utils/capitalizeFirstLetter';
import get from '../../../../private/common/utils/get';
import {
    PARENT_CATEGORY_MAPPING,
    findParentByPattern
} from './constants/parentCategoryMapping';

export const formatSectionName = (sectionString = '') => {
    if (sectionString === 'club-la-nacion') return 'Club LA NACION';
    if (sectionString === 'dieta') return 'Dietas';
    if (sectionString === 'aprende-en-la-cocina') return 'Aprende en la cocina';
    if (sectionString === 'cocina-facil-y-rapido')
        return 'Cocina fácil y rápido';
    if (sectionString === 'cocina-a-tu-medida') return 'Cocina a tu medida';

    const sectionFormatted = sectionString.replace(/[/-]/g, ' ').trim();

    return capitalizeFirstLetter(sectionFormatted);
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

export const setArraySection = (
    stringSections = '',
    isAcu = false,
    parentInfo = null,
    pageName = ''
) => {
    if (parentInfo) {
        const arraySections = stringSections.split('/').filter(Boolean);
        const lastSection = arraySections[arraySections.length - 1];

        const displayName = pageName || formatSectionName(lastSection);

        return [
            {
                name: 'Foodit',
                url: SITE_FOODIT,
                disabled: false
            },
            {
                name: parentInfo.parentName,
                url: `${SITE_FOODIT}${parentInfo.parentId}/`,
                disabled: false
            },
            {
                name: displayName,
                url: `${SITE_FOODIT}${stringSections}/`,
                disabled: isAcu
            }
        ];
    }

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
    const name = get(globalContent, 'name', '');
    const title = get(globalContent, 'title', '');
    const acuSection = id === '/tema' ? titleTema : id;
    const noteSection = get(globalContent, 'taxonomy.primary_section._id', '');
    const isAcu = acuSection.startsWith('/');

    let parentInfo = PARENT_CATEGORY_MAPPING[id];

    if (!parentInfo && id === '/tema') {
        parentInfo = findParentByPattern(name, title);
    }

    return isAcu
        ? setArraySection(acuSection, isAcu, parentInfo, name)
        : setArraySection(noteSection, false, parentInfo, name);
};
