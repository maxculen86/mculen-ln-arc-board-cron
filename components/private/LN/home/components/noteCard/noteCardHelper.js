/* eslint-disable import/prefer-default-export */
import get from '../../../../common/utils/get';
import getAuthorsAsString from '../../../../common/utils/getAuthorsAsString';
import getBajadaOrFirstTextParagraph from '../../../../common/utils/getBajadaOrFirstTextParagraph';
import {
    getChildrenFromAperturaHome,
    getChildrenFromSectionHome
} from '../../../common/utils/cajaTemasHelper';

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

export const getWithMedia = (customFields, articleProps, article) =>
    get(customFields, 'opinion') ||
    get(customFields, 'video') ||
    (!get(customFields, 'hideImage') &&
        (get(articleProps, 'withSubheadAndMedia') ||
            (!get(articleProps, 'withSubheadAndMedia') &&
                (get(article, 'promo_items.basic.type', '') === 'image' ||
                    get(customFields, 'html')))));

export const getWithSubhead = (articleProps, withMedia, customFields) =>
    (!get(customFields, 'opinion') &&
        !get(customFields, 'hideDescription') &&
        (get(customFields, 'video') || get(customFields, 'html'))) ||
    get(articleProps, 'withSubheadAndMedia') ||
    (!get(articleProps, 'withSubheadAndMedia') && !withMedia);

export const getLabel = (article, customFields, withMedia, layout) => {
    if (
        !withMedia ||
        get(customFields, 'opinion') ||
        (get(customFields, 'html') && layout !== 'grillaVideo1')
    )
        return undefined;

    return {
        text:
            get(customFields, 'chapita') || get(article, 'label.chapita.text'),
        style: get(customFields, 'chapitaStyle', '')
    };
};

export const getIsRenderAutor = (customFields, layout) =>
    get(customFields, 'opinion', false) || layout === 'author3';

export const isInHomeAperturaOrBomba = (
    renderables,
    featureId,
    layoutsName,
    layoutPageBuilder
) => {
    const aperturasChildren =
        layoutsName.Home === layoutPageBuilder
            ? (getChildrenFromAperturaHome(renderables) || []).concat(
                  getChildrenFromSectionHome(renderables, 'Bomba', 2) || []
              )
            : [];

    return aperturasChildren.some(el => {
        return (
            !get(el, 'props.customFields.hideCaja', false) &&
            (get(el, 'children', []).some(
                child => get(child, 'props.id') === featureId
            ) ||
                get(el, 'props.id') === featureId)
        );
    });
};
