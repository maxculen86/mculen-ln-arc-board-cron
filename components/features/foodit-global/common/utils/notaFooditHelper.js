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

export const transformArticleFoodit = article => {
    const highestPriorityTag = getHighestPriorityTag(
        get(article, 'taxonomy.tags', [])
    );

    return {
        title: get(article, 'headlines.basic', ''),
        author: getAuthorsAsString(article, false) || 'Por Foodit',
        image: get(article, 'promo_items.basic', {}),
        href: get(article, 'website_url', ''),
        time: get(article, 'promo_items.receta.embed.config.counterTime', null),
        tag: highestPriorityTag.toUpperCase(),
        variant: getVariantBySubtype(get(article, 'subtype', ''))
    };
};

export const validateArticleFoodit = ({ id, content }) => {
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

export const getRenderablesData = (renderables, featureId) => {
    // TODO: pendiente config para el layout de home foodit, para utilizar getElementsFromRenderables
    const aperturaSection = renderables.find(
        item => item.collection === 'sections'
    );
    const children = get(aperturaSection, 'children', []);

    const parent = renderables.find(
        elem =>
            get(elem, 'collection') === 'chains' &&
            get(elem, 'type', '') === 'Foodit_Caja_Manual' &&
            get(elem, 'children', []).some(
                child => get(child, 'props.id') === featureId
            )
    );

    return {
        isOpening: children.some(
            child => child.props && child.props.id === featureId
        ),
        layout: get(parent, 'props.customFields.layout', '')
    };
};
