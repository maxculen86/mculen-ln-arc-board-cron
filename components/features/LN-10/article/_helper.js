import PropTypes from 'fusion:prop-types';
import get from '../../../private/common/utils/get';
import getAuthorsPhoto from '../../../private/common/utils/getAuthorsPhoto';
import getAuthorsAsString from '../../../private/common/utils/getAuthorsAsString';
import { getChildrenFromSectionHome } from '../../../private/LN/common/utils/cajaTemasHelperLN10-WebApi';
import { getShortestImage } from '../../../private/LN/common/utils/mediaHelper';
import getStreams from '../../../private/LN/common/utils/getStreams';
import diagramationRules, {
    size
} from '../../../private/common/utils/diagramationRules';
import featureArticleCustomsFields from '../../../private/LN/common/utils/articuloHelper';
import transformImageData from '../../../private/common/LN-10/transformImageData';
import setClassName from '../../../private/common/utils/setClassName';
import {
    getIsBomba,
    getChainParentOfFeature,
    handleTagWithBomba
} from './common/_helper-WebApi';
import sectionsValidationLN10 from '../../../layouts/config/LN10-Home.config.json';
import { isImageEager } from '../../../private/LN/home/components/noteCard/noteCardHelper';
import { getFirstParentSection } from '../../../private/common/utils/sectionUtils';
import capitalizeFirstLetter from '../../../private/common/utils/capitalizeFirstLetter';
import getElementFromRenderables from '../../../private/common/utils/getElementFromRenderables';

export const typeMedia = {
    IMAGE: 'image',
    VIDEO: 'video',
    HTML: 'html'
};

const promoItemsBasic = 'promo_items.basic';

export const sectionsTranslate = {
    '': '',
    economia: 'Economía',
    'edicion-impresa': 'Edición Impresa',
    educacion: 'Educación',
    espectaculos: 'Espectáculos',
    horoscopo: 'Horóscopo',
    'la-nacion-revista': 'LA NACION Revista',
    loterias: 'Loterías y Quinielas',
    opinion: 'Opinión',
    politica: 'Política',
    'revista-jardin': 'Revista Jardín',
    'revista-ohlala': 'Revista OHLALÁ!',
    'revista-hola': 'Revista ¡HOLA!',
    sabado: 'Sábado',
    tecnologia: 'Tecnología',
    transito: 'Tránsito y transporte',
    'ultimas-noticias': 'Últimas noticias'
};

export const translateSectionName = sectionName => {
    if (!sectionName) return '';

    const sectionKeys = Object.keys(sectionsTranslate);
    if (sectionKeys.includes(sectionName)) {
        return sectionsTranslate[sectionName];
    }

    const words = sectionName
        .split('-')
        .map(word => capitalizeFirstLetter(word));
    return words.join(' ');
};

export const showSubheadText = ({ withSubhead, article, description }) =>
    withSubhead && (description || get(article, 'subheadlines.basic'));

export const showMarquee = ({
    withMarquee,
    hideAuthors,
    authors,
    marquesina
}) => withMarquee && !hideAuthors && (authors || marquesina);

export const showMarqueeImage = ({
    withMarqueeImg,
    authorsQuantity,
    authors,
    url
}) => !authors && withMarqueeImg && authorsQuantity === 1 && url;

export const showSection = ({ withSection, article, authors, authorPhoto }) => {
    const primarySection = get(article, 'taxonomy.primary_section', {});
    const firstParentSection = getFirstParentSection(primarySection);
    const sectionName =
        firstParentSection !== null ? firstParentSection.substring(1) : null;

    return (
        !authors &&
        authorPhoto &&
        withSection &&
        translateSectionName(sectionName)
    );
};

export const validateSubhead = (config, withMedia, customFields, variant) => {
    return (
        !['author', 'liveblog'].includes(variant) &&
        get(config, 'withSubheadAndMedia', true) &&
        ((get(config, 'withSubhead') &&
            !get(customFields, 'hideDescription')) ||
            (!get(config, 'withSubhead') && !withMedia))
    );
};

export const validateMedia = (customFields, config, article) =>
    !get(customFields, 'hideImage') &&
    get(config, 'withMedia', true) &&
    (get(customFields, 'variant', 'regular') !== 'author' ||
        (get(article, 'credits.by', []).length !== 1 &&
            get(customFields, 'variant', 'regular') === 'author')) &&
    (get(customFields, 'video') ||
        get(customFields, 'html') ||
        get(customFields, 'imageId') ||
        get(article, 'promo_items.basic.type', 'image') === 'image');

export const validateVariant = (variant, authorsQuantity) =>
    variant === 'author' && !(authorsQuantity === 1) ? 'regular' : variant;

export const getBadgetConfig = ({
    article,
    style,
    text,
    isLiveblog,
    withMedia,
    typeOfMedia,
    hideBadget
}) => {
    if (get(article, 'content_restrictions.content_code') === 'cerrada') {
        return {
            badgetStyle: 'exclusive-ln',
            badgetText: 'Exclusivo suscriptores'
        };
    }

    if (isLiveblog) {
        return {
            badgetStyle: style || 'live',
            badgetText: text || 'vivo'
        };
    }

    if (get(article, 'owner.sponsored')) {
        return {
            badgetStyle: 'contentlab',
            badgetText: 'CONTENT LAB'
        };
    }

    return !hideBadget
        ? {
              badgetStyle: style || 'negative',
              badgetText:
                  withMedia &&
                  typeOfMedia !== typeMedia.HTML &&
                  (text || get(article, 'label.chapita.text'))
          }
        : {};
};
export const getOnlyHoursMinutes = (time = '') => {
    return time
        .split(':')
        .slice(0, 2)
        .join(':');
};

export const getLiveblogTitles = articleData => {
    const contentElements = get(articleData, 'content_elements', []);

    return contentElements.reduce((acc, currentValue) => {
        if (currentValue.type === 'custom_embed' && acc.length < 3) {
            return [
                ...acc,
                {
                    text: get(currentValue, 'embed.config.title', ''),
                    time: getOnlyHoursMinutes(
                        get(currentValue, 'embed.config.time', '')
                    )
                }
            ];
        }

        return acc;
    }, []);
};

export const articleCustomFields = {
    ...featureArticleCustomsFields('articuloGeneral', true),
    variant: PropTypes.oneOf(['regular', 'author', 'liveblog']).tag({
        defaultValue: 'regular',
        name: 'Variante'
    })
};

export const getDataAuthor = ({
    article,
    variant,
    authors,
    hideAuthors,
    withMarquee,
    withMarqueeImg
}) => {
    const authorsQuantity = get(article, 'credits.by', []).length;

    const marqueeImg = showMarqueeImage({
        withMarqueeImg,
        authorsQuantity,
        authors,
        url: get(getAuthorsPhoto(article), 'url', '')
    });

    const marquee = showMarquee({
        withMarquee,
        hideAuthors,
        authors,
        marquesina: getAuthorsAsString(article, true)
    });

    if (validateVariant(variant, authorsQuantity) === 'author') {
        return {
            marqueeImg: get(getAuthorsPhoto(article), 'url', ''),
            marquee,
            authorsQuantity
        };
    }

    return {
        marqueeImg,
        marquee,
        authorsQuantity
    };
};

export const isBombaHidden = renderables => {
    const preOpeningChildren =
        getChildrenFromSectionHome(renderables, 'Pre_Apertura', 0) || [];

    return preOpeningChildren.some(
        children =>
            get(children, 'props.customFields.hideCaja', false) &&
            getIsBomba(children)
    );
};

export const checkForId = idValue => {
    return idValue && idValue.trim();
};

const getImageDestacada = articleData => {
    const mediaDataOfTheOpening = get(articleData, promoItemsBasic, {});
    const type = get(mediaDataOfTheOpening, 'type', '');

    return type === 'image' ? mediaDataOfTheOpening : null;
};

export const getDynamicStreamOperator = (sizes, cardSize, middleSize = 'l') => {
    const OPERATORS = {
        LOWER: '<',
        HIGHER: '>'
    };

    const values = Object.values(sizes);
    const divisorIndex = values.findIndex(value => value === middleSize);

    const lowerSizes = values.slice(0, divisorIndex + 1);
    const higherSizes = values.slice(divisorIndex + 1);

    if (lowerSizes.includes(cardSize)) return OPERATORS.LOWER;
    if (higherSizes.includes(cardSize)) return OPERATORS.HIGHER;

    return OPERATORS.LOWER;
};

const transformVideoData = (videoData, shouldUseV2, cardSize) => {
    const streams = get(videoData, 'streams', []);
    // TODO: Quitar validacion de shouldUseV2 cuando salga resizer 2 por completo. Mantener la constante con: "get(videoData, 'promo_items.basic.resized_urls', [])"
    const videoImagesResized = shouldUseV2
        ? get(videoData, 'promo_items.basic.resized_urls', [])
        : get(videoData, 'resizedUrl', []);
    const type = get(videoData, 'type', '');
    const { resizedUrl } = getShortestImage(videoImagesResized);
    const streamOperator = getDynamicStreamOperator(size, cardSize);
    const { url = '' } = getStreams(streams, streamOperator) || {};

    return {
        type,
        dataSrc: url,
        poster: resizedUrl
    };
};

export const getMediaData = ({
    article,
    video,
    image,
    renderables = [],
    customFields = {},
    shouldUseV2 = false,
    config = {}
} = {}) => {
    const { video: videoId, imageId, html = '' } = customFields;
    const { _id } = article || {};

    const outstandingImage = getImageDestacada(article);
    const isEager = isImageEager(_id, renderables);
    const mediaDataDefault = transformImageData(
        article,
        outstandingImage,
        isEager
    );

    const rules = [
        {
            validation: html.trim(),
            data: { type: 'embedCode', embedCode: html }
        },
        {
            validation: videoId && video,
            data: transformVideoData(video, shouldUseV2, config.cardSize)
        },

        {
            validation: imageId && image,
            data: transformImageData(
                article,
                get(image, promoItemsBasic, outstandingImage),
                isEager
            )
        }
    ];

    return get(
        rules.find(({ validation }) => validation),
        'data',
        mediaDataDefault
    );
};

export const getDataAttributesForViewability = (id, boxPosition, index) => {
    const extraOpts = {};
    if (boxPosition) {
        extraOpts['data-pos'] = `${boxPosition}${`0${Number(index) + 1}`.slice(
            -2
        )}`;
        extraOpts['data-id'] = id;
        extraOpts['data-notaid'] = id;
        extraOpts['data-source'] = 'editor';
    }
    return extraOpts;
};

export const changeConfigForPB = ({ setConfig, featureId, renderables }) => {
    const chainParent = getChainParentOfFeature(featureId, renderables);
    const elementChain = document.querySelector(
        `section[data-chain-id="${get(chainParent, 'props.id')}"]`
    );
    const indexOfFeature =
        elementChain &&
        [...elementChain.querySelectorAll('article')].findIndex(
            featureNode =>
                featureNode &&
                featureNode.getAttribute('data-feature-id') === featureId
        );
    const layoutChain =
        elementChain && elementChain.getAttribute('data-diagramacion-id');
    const chainId = elementChain && elementChain.getAttribute('data-chain-id');
    const cardConfig = diagramationRules(layoutChain);
    const firstBombaChainId = get(
        getElementFromRenderables({
            position: 'Pre_Apertura.position',
            config: sectionsValidationLN10,
            typeElement: 'LN10_Caja_Bomba',
            renderables
        }),
        'props.id',
        null
    );

    if (firstBombaChainId) {
        setConfig(
            handleTagWithBomba(
                firstBombaChainId,
                chainId,
                cardConfig,
                indexOfFeature
            )
        );
        return true;
    }

    setConfig(cardConfig && cardConfig[indexOfFeature]);
    return true;
};

export const getTypeOfMedia = (customFields = {}) => {
    const { video, html } = customFields;

    if (html) return typeMedia.HTML;
    if (video) return typeMedia.VIDEO;
    return typeMedia.IMAGE;
};

export const showExtraClass = (
    typeOfMedia,
    className,
    withMedia,
    extraClass = {}
) => {
    const witoutMedia = !withMedia && extraClass.withoutMedia;
    const classname = setClassName({
        extraClass: extraClass[typeOfMedia],
        witoutMedia,
        className
    });

    return classname || undefined;
};
