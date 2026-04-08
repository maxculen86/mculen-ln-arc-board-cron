import { SITE_FOODIT } from 'fusion:environment';
import get from '../../../../private/common/utils/get';

const generateBaseUrlTag = (tagName = '') => {
    const tagPathTransformed = tagName.replace(/\s/g, '-').trim().toLowerCase();
    return `${SITE_FOODIT}/tema/${tagPathTransformed}/?query=recetas&title=${tagName}`;
};

export const setUrlTag = ({ nameSection = '', tagList = [] } = {}) => {
    if (tagList) {
        return tagList.map(tag => {
            const tagPath = get(tag, 'path', '');

            const tagPathValidated =
                tagPath && (tagPath.endsWith('/') ? tagPath : `${tagPath}/`);

            const tagPathWithQuery = !tagPath
                ? `${generateBaseUrlTag(tag)}&groups=${nameSection}&itemGroups=${tag}`
                : '';

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
    regions = [],
    hasVideo = false
} = {}) => {
    const sectionsTags = setUrlTag({
        tagList: get(taxonomy, 'sections', [])
    });

    const EXCLUDED_TAGS = ['¿Qué cocinar hoy?', 'Recetas', 'Dietas'];

    const filteredSectionsTags = sectionsTags.filter(
        ({ text = '' }) => text && !EXCLUDED_TAGS.includes(text)
    );

    const cookingTypesTags = setUrlTag({
        nameSection: 'cookingtypes',
        tagList: cookingTypes
    });

    const occasionsTags = setUrlTag({
        nameSection: 'occasions',
        tagList: occasions
    });

    const regionsTags = setUrlTag({
        nameSection: 'regions',
        tagList: regions
    });

    const videoTag = hasVideo
        ? [
              {
                  text: 'video',
                  url: `${generateBaseUrlTag('Recetas con video')}&groups=video_jw|subtype&itemGroups=video_jw|7`
              }
          ]
        : [];

    return [
        ...cookingTypesTags,
        ...occasionsTags,
        ...regionsTags,
        ...filteredSectionsTags,
        ...videoTag
    ];
};

export default getTagList;
