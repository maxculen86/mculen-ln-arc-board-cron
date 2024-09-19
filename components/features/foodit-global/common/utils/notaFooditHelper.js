import get from '../../../../private/common/utils/get';
import getAuthorsAsString from '../../../../private/common/utils/getAuthorsAsString';
import pageBuilderValidator from '../../../../private/common/utils/pageBuilderValidator.js';
import {
    RECETA,
    STORYTELLING
} from '../../../../private/common/utils/subtypes/subtypeHelper';

const PRIORITY_SORTED_TAGS = [
    'Fácil',
    'Vegana',
    'Keto',
    'Vegetariana',
    'Rápida',
    'Sin Gluten',
    'Clásica',
    'Maridaje'
];

const getVariantBySubtype = subtype => {
    const variants = {
        [STORYTELLING]: 'note',
        [RECETA]: 'recipe'
    };

    return variants[subtype] || '';
};

export const getHighestPriorityTag = (sections = []) => {
    if (!sections) return '';

    return sections.reduce((highestPriority, { name: section = '' } = {}) => {
        if (PRIORITY_SORTED_TAGS.includes(section)) {
            if (
                !highestPriority ||
                PRIORITY_SORTED_TAGS.indexOf(section) <
                    PRIORITY_SORTED_TAGS.indexOf(highestPriority)
            )
                return section;
        }
        return highestPriority;
    }, '');
};

export const transformArticleFoodit = article => {
    const highestPriorityTag = getHighestPriorityTag(
        get(article, 'taxonomy.sections', [])
    );

    const title = get(article, 'headlines.basic', '');

    return {
        articleId: get(article, '_id', ''),
        title,
        mobileTitle: get(article, 'headlines.mobile', ''),
        author: getFooditAuthor(article),
        image: { ...get(article, 'promo_items.basic', {}), title },
        href: get(article, 'website_url', ''),
        time: get(article, 'promo_items.receta.embed.config.counterTime', null),
        tag: highestPriorityTag.toUpperCase(),
        variant: getVariantBySubtype(get(article, 'subtype', '')),
        primarySection: get(article, 'taxonomy.primary_section.name', ''),
        canonicalUrl: get(article, 'canonical_url', ''),
        credits: get(article, 'credits', {}),
        contentCode: get(article, 'content_restrictions.content_code', '')
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

export const getOpeningProps = (renderables = []) => {
    const aperturaSection = renderables.find(
        item => item.collection === 'sections'
    );

    const [cajaApertura] = get(aperturaSection, 'children', []);

    return {
        id: get(cajaApertura, 'children[0].props.id', ''),
        noteId: get(cajaApertura, 'children[0].props.customFields.noteId', ''),
        openingLayout: get(cajaApertura, 'props.customFields.layout', '')
    };
};

export const getManualParentLayout = (renderables, featureId) => {
    const parent = renderables.find(
        ({ type = '', children = [], collection }) =>
            collection === 'chains' &&
            (type === 'foodit_Caja_Manual' ||
                type === 'foodit_Caja_Apertura') &&
            children.some(child => get(child, 'props.id') === featureId)
    );

    return get(parent, 'props.customFields.layout', '');
};

export const getRenderablesData = (renderables, featureId) => {
    const { id = '' } = getOpeningProps(renderables);
    const isOpening = id === featureId;

    const layout = getManualParentLayout(renderables, featureId);

    return {
        isOpening,
        layout
    };
};

export const getFooditAuthor = (article, getOnlyAuthorName = false) =>
    get(article, 'label.autor.text') === 'Usuario'
        ? ''
        : getAuthorsAsString(article, getOnlyAuthorName) || 'Por Foodit';
