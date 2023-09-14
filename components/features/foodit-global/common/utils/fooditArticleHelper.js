import get from '../../../../private/common/utils/get';
import getAuthorsAsString from '../../../../private/common/utils/getAuthorsAsString';
import pageBuilderValidator from '../../../../private/common/utils/pageBuilderValidator.js';
import {
    RECETA,
    STORYTELLING
} from '../../../../private/common/utils/subtypes/subtypeHelper';

const getVariantBySubtype = subtype => {
    const variants = {
        [STORYTELLING]: 'note',
        [RECETA]: 'recipe'
    };

    return variants[subtype] || '';
};

export const getHighestPriorityTag = (tags = []) => {
    if (!tags) return '';

    const prioritySortedTags = [
        'fácil',
        'rápida',
        'saludable',
        'clásica',
        'vegana',
        'vegetariana',
        'keto',
        'sin gluten'
    ];

    return tags.reduce((highestPriority, { text: tag }) => {
        if (prioritySortedTags.includes(tag)) {
            if (
                !highestPriority ||
                prioritySortedTags.indexOf(tag) <
                    prioritySortedTags.indexOf(highestPriority)
            )
                return tag;
        }
        return highestPriority;
    }, '');
};

export const transformArticleReceta = article => {
    const highestPriorityTag = getHighestPriorityTag(
        get(article, 'taxonomy.tags', [])
    );

    return {
        title: get(article, 'headlines.basic', ''),
        author: getAuthorsAsString(article, false) || 'Por Foodit',
        image: get(article, 'promo_items.basic', {}),
        href: get(article, 'promo_items.websites.recetas.website_url', '#'),
        time: get(article, 'promo_items.receta.embed.config.counterTime', null),
        tag: highestPriorityTag.toUpperCase(),
        variant: getVariantBySubtype(get(article, 'subtype', ''))
    };
};

export const validateArticleReceta = ({ id, content }) => {
    const rules = [
        {
            validation: !id,
            message: 'El campo Id de la Nota es obligatorio.'
        },
        {
            validation: !content,
            message: 'El ID de la nota es incorrecto.'
        }
    ];

    return pageBuilderValidator(rules);
};

export const isAperturaReceta = (renderables, featureId) => {
    // TODO: pendiente config para el layout de home recetas, para utilizar getElementsFromRenderables
    const aperturaSection = renderables.find(
        item => item.collection === 'sections'
    );
    const children = get(aperturaSection, 'children', []);

    return children.some(child => child.props && child.props.id === featureId);
};
