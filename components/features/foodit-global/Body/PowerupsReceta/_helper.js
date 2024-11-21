import { SITE_FOODIT } from 'fusion:environment';
import get from '../../../../private/common/utils/get';

export const setUrlTag = ({
    nameSection = '',
    primarySection = '',
    tagList = []
} = {}) => {
    const baseUrl = `${SITE_FOODIT}/tema/?query=${primarySection}&title=${primarySection}`;

    if (tagList) {
        return tagList.map(tag => {
            const tagPath = get(tag, 'path', '');

            const tagPathValidated =
                tagPath && (tagPath.endsWith('/') ? tagPath : `${tagPath}/`);

            const tagPathWithQuery = `${baseUrl}&groups=${nameSection}&itemGroups=${tag}`;

            return {
                text: tag.name || tag,
                url: tagPathValidated || tagPathWithQuery
            };
        });
    }

    return [];
};

export const getListsFromPowerup = (contentElements = []) => {
    const {
        'custom-nutrition': nutritionLists,
        'foodit-ingredientes': fooditIngredientsLists,
        'custom-ingrediente': customIngredientsLists
    } = contentElements.reduce(
        (acc, item) => {
            const subtype = get(item, 'subtype', '');
            if (Object.prototype.hasOwnProperty.call(acc, subtype)) {
                const embed = get(item, 'embed.config');
                if (embed) {
                    acc[subtype].push(embed);
                }
            }
            return acc;
        },
        {
            'custom-nutrition': [],
            'foodit-ingredientes': [],
            'custom-ingrediente': []
        }
    );

    const ingredientsLists = [
        ...fooditIngredientsLists,
        ...customIngredientsLists.map(data => ({
            ...data,
            items: data.items.map(item => ({
                fullIngredientString: item,
                ingredient: item
            }))
        }))
    ];

    return { nutritionLists, ingredientsLists };
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
