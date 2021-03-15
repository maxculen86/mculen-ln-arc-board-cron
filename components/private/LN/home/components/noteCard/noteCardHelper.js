/* eslint-disable import/prefer-default-export */
import get from '../../../../common/utils/get';
import getAuthorsAsString from '../../../../common/utils/getAuthorsAsString';
import getBajadaOrFirstTextParagraph from '../../../../common/utils/getBajadaOrFirstTextParagraph';

export const transform = (content, customFields, promoItems) => {
    const title = {
        basic:
            get(customFields, 'title') ||
            get(content, 'headlines.mobile') ||
            get(content, 'headlines.basic')
    };

    const volanta =
        (get(customFields, 'lead') && {
            volanta: {
                text: get(customFields, 'lead')
            }
        }) ||
        get(content, 'label', '');

    return (
        (content && {
            ...content,
            headlines: title,
            subheadlines: {
                basic:
                    get(customFields, 'description') ||
                    getBajadaOrFirstTextParagraph(content)
            },
            label: volanta,

            promo_items: promoItems || get(content, 'promo_items'),
            marquesina:
                get(customFields, 'authors') || getAuthorsAsString(content)
        }) ||
        content
    );
};

export const getCajaTemaConfig = (featureId, renderables, cajaTemaConfig) => {
    const parent = renderables.find(
        elem =>
            elem.collection === 'chains' &&
            elem.type === 'Ln_Caja_Manual' &&
            elem.children &&
            elem.children.some(
                child => child && child.props && child.props.id === featureId
            )
    );
    const index =
        parent &&
        parent.children.findIndex(elem => elem && elem.props.id === featureId);

    const directionFocal =
        parent &&
        parent.props &&
        parent.props.customFields &&
        parent.props.customFields.layout;

    return get(cajaTemaConfig, `${directionFocal}.articles[${index}]`, null);
};

export const getWithMedia = (customFields, articleProps, article) =>
    !get(customFields, 'hideImage') &&
    (get(articleProps, 'withSubheadAndMedia') ||
        (!get(articleProps, 'withSubheadAndMedia') &&
            get(article, 'promo_items.basic.type') === 'image'));

export const getWithSubhead = (articleProps, withMedia) =>
    get(articleProps, 'withSubheadAndMedia') ||
    (!get(articleProps, 'withSubheadAndMedia') && !withMedia);

export const getLabel = (articleProps, customFields, withMedia) =>
    withMedia && !get(customFields, 'opinion') && get(customFields, 'chapita');
