import { SITE_FOODIT } from 'fusion:environment';
import get from '../../../../private/common/utils/get';

export const setUrlTag = ({
    nameSection = '',
    primarySection = '',
    tagList = []
} = {}) => {
    const baseUrl = `${SITE_FOODIT}/buscador/?query=${primarySection}`;

    if (tagList) {
        return tagList.map(tag => ({
            text: tag.name || tag,
            url: tag.path || `${baseUrl}&fkey=${nameSection}&fval=${tag}`
        }));
    }

    return [];
};

const getTagList = ({
    cookingTypes = [],
    occasions = [],
    taxonomy = {},
    regions = []
} = {}) => {
    const primarySection = get(taxonomy, 'primary_section.name', '');
    const sectionsTags = setUrlTag({
        primarySection,
        tagList: get(taxonomy, 'sections', [])
    });

    const EXCLUDED_TAGS = ['¿Qué cocinar hoy?', 'Recetas', 'Dietas'];

    const filteredSectionsTags = sectionsTags.filter(
        ({ text = '' }) => text && !EXCLUDED_TAGS.includes(text)
    );

    const cookingTypesTags = setUrlTag({
        nameSection: 'cookingTypes',
        primarySection,
        tagList: cookingTypes
    });

    const occasionsTags = setUrlTag({
        nameSection: 'occasions',
        primarySection,
        tagList: occasions
    });

    const regionsTags = setUrlTag({
        nameSection: 'regions',
        primarySection,
        tagList: regions
    });

    return [
        ...cookingTypesTags,
        ...occasionsTags,
        ...regionsTags,
        ...filteredSectionsTags
    ];
};

export default getTagList;
