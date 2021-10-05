/* eslint-disable import/prefer-default-export */
import get from '../../../../common/utils/get';
import getAuthorsAsString from '../../../../common/utils/getAuthorsAsString';
import getBajadaOrFirstTextParagraph from '../../../../common/utils/getBajadaOrFirstTextParagraph';
import {
    getChildrenFromAperturaHome,
    getChildrenFromSectionHome
} from '../../../common/utils/cajaTemasHelper';
import siteConfig from '../../../../../../properties/sites/la-nacion-ar';

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

export const getCajaTemaConfig = (
    featureId,
    renderables,
    cajaTemaConfig,
    isBomba
) => {
    if (isBomba)
        return {
            imageConfig: get(cajaTemaConfig, `bomba1.articles[0].imageConfig`),
            config: get(cajaTemaConfig, `bomba1.articles[0]`),
            index: 0,
            boxPosition: '00',
            layout: 'bomba1'
        };
    const { layoutsName = {} } = siteConfig || {};

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

    const layout = get(parent, 'props.customFields.layout');

    const config = get(cajaTemaConfig, `${layout}.articles[${index}]`, null);
    return {
        imageConfig:
            (renderables.some(
                elem =>
                    get(elem, 'collection') === 'layouts' &&
                    get(elem, 'type') === layoutsName.Home
            ) &&
                get(
                    cajaTemaConfig,
                    `${layout}.articles[${index}].imageConfig`,
                    'boxArticles'
                )) ||
            '',
        config,
        index,
        boxPosition: `0${Number(position) + 1}`.slice(-2),
        layout
    };
};

export const getWithMedia = (customFields, articleProps, article) =>
    get(customFields, 'opinion') ||
    get(customFields, 'video') ||
    (!get(customFields, 'hideImage') &&
        (get(articleProps, 'withSubheadAndMedia') ||
            (!get(articleProps, 'withSubheadAndMedia') &&
                (get(article, 'promo_items.basic.type') === 'image' ||
                    get(customFields, 'html')))));

export const getWithSubhead = (articleProps, withMedia, customFields) =>
    !get(customFields, 'opinion') &&
    !get(customFields, 'hideDescription') &&
    (get(articleProps, 'withSubheadAndMedia') ||
        (!get(articleProps, 'withSubheadAndMedia') && !withMedia));

export const getLabel = (article, customFields, withMedia) => {
    if (!withMedia || get(customFields, 'opinion') || get(customFields, 'html'))
        return undefined;

    return get(customFields, 'chapita') || get(article, 'label.chapita.text');
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
