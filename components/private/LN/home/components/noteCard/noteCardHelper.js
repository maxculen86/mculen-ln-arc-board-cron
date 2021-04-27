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

    const credits =
        (get(customFields, 'hideImage') &&
            get(content, 'credits') && {
                ...get(content, 'credits', {}),
                by: get(content, 'credits.by', []).map(author => ({
                    ...author,
                    image: undefined
                }))
            }) ||
        get(content, 'credits');

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
                get(customFields, 'authors') || getAuthorsAsString(content),
            credits
        }) ||
        content
    );
};

export const getCajaTemaConfig = (featureId, renderables, cajaTemaConfig) => {
    const parent = renderables.find(
        elem =>
            get(elem, 'collection') === 'chains' &&
            get(elem, 'type') === 'Ln_Caja_Manual' &&
            get(elem, 'children') &&
            elem.children.some(child => get(child, 'props.id') === featureId)
    );

    const position =
        renderables
            .filter(ren => get(ren, 'collection') === 'chains')
            .findIndex(
                chain => get(chain, 'props.id') === get(parent, 'props.id')
            ) || 0;

    const index = get(parent, 'children', []).findIndex(
        elem => elem && get(elem, 'props.id') === featureId
    );

    const directionFocal = get(parent, 'props.customFields.layout');

    const config = get(
        cajaTemaConfig,
        `${directionFocal}.articles[${index}]`,
        null
    );

    return {
        config,
        index,
        boxPosition: `0${Number(position) + 1}`.slice(-2)
    };
};

export const getWithMedia = (customFields, articleProps, article) =>
    get(customFields, 'opinion') ||
    (!get(customFields, 'hideImage') &&
        (get(articleProps, 'withSubheadAndMedia') ||
            (!get(articleProps, 'withSubheadAndMedia') &&
                (get(article, 'promo_items.basic.type') === 'image' ||
                    get(customFields, 'html')))));

export const getWithSubhead = (articleProps, withMedia, customFields) =>
    !get(customFields, 'opinion') &&
    (get(articleProps, 'withSubheadAndMedia') ||
        (!get(articleProps, 'withSubheadAndMedia') && !withMedia));

export const getLabel = (article, customFields, withMedia) => {
    if (!withMedia || get(customFields, 'opinion') || get(customFields, 'html'))
        return undefined;

    return get(customFields, 'chapita') || get(article, 'label.chapita.text');
};

export const getIsRenderAutor = customFields =>
    get(customFields, 'opinion', false);
