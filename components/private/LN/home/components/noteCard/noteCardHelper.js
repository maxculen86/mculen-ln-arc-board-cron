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

export const isImageEager = (idArticle, renderables) => {
    const pbFirstElement = initialElementInPB(renderables);

    const { type = '' } = pbFirstElement;

    return get(
        featuresValidator,
        type,
        featuresValidator.default
    )({
        element: pbFirstElement,
        checkEager: true,
        note: idArticle
    });
};

export const initialElementInPB = elementsToRender => {
    const chainsAndFeatures =
        elementsToRender.filter(elem => {
            const { props = {} } = elem;
            const { collection } = props;

            return collection === 'features' || collection === 'chains';
        }) || [];

    const firstVisibleElement = chainsAndFeatures.find(pbElement => {
        const { type = '' } = pbElement;
        return get(
            featuresValidator,
            type,
            featuresValidator.default
        )({ element: pbElement, checkEager: false });
    });

    return firstVisibleElement || {};
};

export const featuresValidator = {
    'LN-common/bomba': ({ element, checkEager, note = '' }) => {
        const { props } = element;
        const { customFields } = props;
        const {
            hideFeature,
            hideImage,
            video,
            html,
            noteId = ''
        } = customFields;

        const isFirstViewportNote = note === noteId;

        return checkEager
            ? !video && !html && isFirstViewportNote
            : !hideFeature && !hideImage;
    },
    Ln_Caja_Manual: ({ element, checkEager, note = '' }) => {
        return extractCommonIsEager(note, checkEager, element);
    },
    LN10_Caja_Apertura: ({ element, checkEager, note = '' }) => {
        return extractCommonIsEager(note, checkEager, element);
    },
    LN10_Caja_Bomba: ({ element, checkEager, note = '' }) => {
        return extractCommonIsEager(note, checkEager, element);
    },
    default: () => false
};

const extractCommonIsEager = (note, checkEager, element = {}) => {
    const { props, children = [] } = element;

    const { 0: chainFirstNote } = children;

    const { customFields } = props;
    const { hideCaja } = customFields;

    const { props: noteProps } = chainFirstNote;
    const { customFields: noteCustomFields } = noteProps;
    const { hideImage, video, html, noteId = '' } = noteCustomFields;

    const isFirstViewportNote = note === noteId;
    const hasImage = !html && !video && !hideImage;

    return checkEager ? isFirstViewportNote && hasImage : !hideCaja;
};

export const isInApertura = ({
    renderables,
    featureId,
    layoutsName,
    layoutPageBuilder,
    config
}) => {
    const inHome = isInHomeAperturaOrBomba(
        renderables,
        featureId,
        layoutsName,
        layoutPageBuilder
    );

    const inApertura = get(config, 'isApertura', false);

    return inHome && inApertura;
};
