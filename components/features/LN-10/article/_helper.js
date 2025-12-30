import PropTypes from 'fusion:prop-types';
import get from '../../../private/common/utils/get';
import getAuthorsPhoto from '../../../private/common/utils/getAuthorsPhoto';
import getAuthorsAsString from '../../../private/common/utils/getAuthorsAsString';
import { getShortestImage } from '../../../private/LN/common/utils/mediaHelper';
import diagramationRules, {
    size
} from '../../../private/common/utils/diagramationRules';
import featureArticleCustomsFields from '../../../private/LN/common/utils/articuloHelper';
import transformImageData from '../../../private/common/LN-10/transformImageData';
import setClassName from '../../../private/common/utils/setClassName';
import {
    getChainParentOfFeature,
    handleTagWithBomba,
    getChainConfig
} from './common/_helper-WebApi';
import sectionsValidationLN10 from '../../../layouts/config/LN10-Home.config.json';
import { isImageEager } from '../../../private/LN/home/components/noteCard/noteCardHelper';
import { getFirstParentSection } from '../../../private/common/utils/sectionUtils';
import capitalizeFirstLetter from '../../../private/common/utils/capitalizeFirstLetter';
import getElementFromRenderables from '../../../private/common/utils/getElementFromRenderables';
import getSourcesJw from '../../../private/LN/common/utils/getSourcesJw';
import { transformUrl } from './common/_helper';
import { isAudioGenerated } from '../../../../content/sources/utils/audioNews/helper';
import replaceUrlResizerToWWW from '../../../../content/sources/utils/replaceUrlResizerToWWW';
import { checkVariants } from '../../../chains/utils/_helpers';
import {
    LIVEBLOG_EDITORIAL,
    LIVEBLOG
} from '../../../private/common/utils/subtypes/subtypeHelper';

export const typeMedia = {
    IMAGE: 'image',
    VIDEO: 'video',
    HTML: 'html'
};

const PREFERRED_HEIGHT_FOR_VIDEO_HOME = 360;
const BIG_CARD_SIZES = new Set([
    size.fourXL,
    size.threeXL,
    size.XL,
    size.XLL,
    size.fiveXL,
    size.sixXL,
    size.T1,
    size.T1Focal100
]);

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
    'ultimas-noticias': 'Últimas noticias',
    lnmas: 'LN+'
};

const pickPreferredMedia = (
    collection = [],
    key = 'file',
    preferredHeight = PREFERRED_HEIGHT_FOR_VIDEO_HOME
) => {
    const valid = collection.filter(
        item => item && typeof item.height === 'number'
    );

    if (!valid.length) return null;

    const upToPreferred = valid
        .filter(item => item.height <= preferredHeight)
        .sort((a, b) => b.height - a.height)[0];

    const lowest = valid.sort((a, b) => a.height - b.height)[0];

    const selected = upToPreferred || lowest;

    return selected[key] || '';
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
    const sectionKey =
        firstParentSection !== null ? firstParentSection.substring(1) : null;
    const sectionName =
        translateSectionName(sectionKey) || primarySection.name || '';

    return authors && authorPhoto && withSection && sectionName;
};

export const validateSubhead = (config, withMedia, customFields, variant) =>
    !['author', 'liveblog'].includes(variant) &&
    get(config, 'withSubheadAndMedia', true) &&
    ((get(config, 'withSubhead') && !get(customFields, 'hideDescription')) ||
        (!get(config, 'withSubhead') && !withMedia));

export const validateMedia = (customFields, config, article) =>
    !get(customFields, 'hideImage') &&
    get(config, 'withMedia', true) &&
    (get(customFields, 'variant', 'regular') !== 'author' ||
        (get(article, 'credits.by', []).length !== 1 &&
            get(customFields, 'variant', 'regular') === 'author')) &&
    Boolean(
        get(customFields, 'cllBoard') ||
            get(customFields, 'video') ||
            get(customFields, 'html') ||
            get(customFields, 'imageId') ||
            get(article, 'promo_items.basic.type', 'image') === 'image'
    );

export const validateVariant = (variant, authorsQuantity) =>
    variant === 'author' && authorsQuantity !== 1 ? 'regular' : variant;

export const getBadgetConfig = ({
    article,
    style,
    text,
    isLiveblog,
    withMedia,
    typeOfMedia,
    hideBadget
}) => {
    if (hideBadget) return {};

    if (get(article, 'content_restrictions.content_code') === 'cerrada') {
        return {
            badgetStyle: 'subscriber',
            badgetText: 'Suscriptores'
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

    return {
        badgetStyle: style || 'negative',
        badgetText:
            withMedia &&
            typeOfMedia !== typeMedia.HTML &&
            (text || get(article, 'label.chapita.text'))
    };
};

export const isSubtypeLiveblog = article => {
    const subtype = get(article, 'subtype', '');
    return subtype === LIVEBLOG || subtype === LIVEBLOG_EDITORIAL;
};

export const getOnlyHoursMinutes = (time = '') =>
    time.split(':').slice(0, 2).join(':');

export const getLiveblogTitles = articleData => {
    const contentElements = get(articleData, 'content_elements', []);

    return contentElements.reduce((acc, currentValue) => {
        if (currentValue.subtype === 'custom-liveblog' && acc.length < 3) {
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

export const transformVideoData = (
    videoData,
    cardSize,
    isAdmin = false,
    isHome = false,
    isInApertura = false
) => {
    const isBigHomeCard = isHome && BIG_CARD_SIZES.has(cardSize);

    const sources = get(videoData, 'sources', []);
    const poster = get(videoData, 'poster', '');
    const videoImagesResized = get(
        videoData,
        'resizedImages.promo_items.basic',
        {}
    );
    const basicWithWWW = isInApertura
        ? replaceUrlResizerToWWW(videoImagesResized)
        : videoImagesResized;

    const type = get(videoData, 'type', '');
    const resizedUrls = get(basicWithWWW, 'resized_urls', []);
    const { resizedUrl } = getShortestImage(resizedUrls);

    const streamOperator = getDynamicStreamOperator(size, cardSize);

    const preferredSourceFile = isBigHomeCard
        ? pickPreferredMedia(sources, 'file')
        : null;

    const { file } = getSourcesJw(sources, streamOperator) || {};

    const pickedData = preferredSourceFile || file || '';

    return {
        type,
        [isAdmin ? 'src' : 'dataSrc']: pickedData,
        poster: resizedUrl || poster
    };
};

export const getYoutubeIdFromEmbed = (html = '') =>
    html.match(/youtube\.com\/embed\/([\w-]+)/)?.[1];

export const addDataTestIdToYoutubeEmbed = (html = '') => {
    if (!getYoutubeIdFromEmbed(html)) return html;

    return html.replace(
        /<iframe\b(.*?)>/i,
        `<iframe$1 data-testid="youtube-comercial">`
    );
};

export const generateLazyLoadEmbedCode = embedCode => {
    const youtubeId = getYoutubeIdFromEmbed(embedCode);
    if (!youtubeId) return embedCode;

    const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

    const uniqueId = `youtube-${Math.random().toString(36).substring(7)}`;

    const isAutoplay = embedCode.includes('autoplay');

    let dataSrc = `https://www.youtube.com/embed/${youtubeId}`;

    if (isAutoplay) dataSrc += '?autoplay=1&mute=1';

    return embedCode.replace(
        /src="(https:\/\/www\.youtube\.com\/embed\/[\w-]+[^"]*)"/,
        `src="" data-src="${dataSrc}" id="${uniqueId}" style="background-image: url(${thumbnailUrl}); background-size: cover; background-position: center; width: 100%; height: 100%;"`
    );
};

export const getMediaData = ({
    article,
    video,
    image,
    renderables = [],
    customFields = {},
    config = {},
    isAdmin = false,
    isHome = false,
    isLoadWithPicture,
    isInApertura = false
} = {}) => {
    const {
        video: videoId,
        imageId,
        html = '',
        cllBoard = '',
        videoComercial
    } = customFields;
    const { _id } = article || {};

    const outstandingImage = getImageDestacada(article);
    const isEager =
        config.isFetchPriorityHigh || isImageEager(_id, renderables);
    const mediaDataDefault = transformImageData({
        articleData: article,
        imageData: outstandingImage,
        isEager,
        isLoadWithPicture
    });
    const promoItemsImage = transformImageData({
        articleData: article,
        imageData: get(image, promoItemsBasic, outstandingImage),
        isEager,
        isLoadWithPicture
    });

    const videoData = transformVideoData(
        video,
        config.cardSize,
        isAdmin,
        isHome,
        isInApertura
    );

    const rules = [
        {
            validation: Boolean(cllBoard.trim()),
            data: promoItemsImage
        },
        {
            validation: html.trim(),
            data: {
                type: 'embedCode',
                embedCode: videoComercial
                    ? addDataTestIdToYoutubeEmbed(html)
                    : generateLazyLoadEmbedCode(html),
                dataSrc: html.match(/src="(.*?)"/)?.[1]
            }
        },
        {
            validation: videoId && video,
            data: videoData
        },
        {
            validation: imageId && image,
            data: promoItemsImage
        }
    ];

    return get(
        rules.find(({ validation }) => validation),
        'data',
        mediaDataDefault
    );
};

export const getCllBoard = inputUrl => {
    if (!inputUrl) return {};
    const src = transformUrl(inputUrl.trim());

    if (!src) return {};

    return {
        embedCode: `<iframe src=${src} title="Embebido canchallena" class="w-100 h-57" scrolling="no" > </iframe>`,
        classNames: 'h-57'
    };
};

export const getDataAttributesForViewability = (
    id,
    boxPosition,
    index,
    hasVideo = false
) => {
    const extraOpts = {};
    const indexNested = `0${Number(index) + 1}`.slice(-2);
    if (boxPosition) {
        extraOpts['data-pos'] = `${boxPosition}${indexNested}`;
        extraOpts['data-id'] = id;
        extraOpts['data-notaid'] = id;
        extraOpts['data-source'] = hasVideo ? 'video' : 'editor';
    }
    return extraOpts;
};

export const getIndexOfFeature = ({
    elementChain,
    isException,
    customIndex = 0,
    featureId
}) => {
    if (isException) {
        return customIndex;
    }

    return (
        elementChain &&
        [...elementChain.querySelectorAll('article')].findIndex(
            featureNode =>
                featureNode &&
                featureNode.getAttribute('data-feature-id') === featureId
        )
    );
};

export const changeConfigForPB = ({ setConfig, featureId, renderables }) => {
    const chainParent = getChainParentOfFeature(featureId, renderables);
    const elementChain = document.querySelector(
        `section[data-chain-id="${get(chainParent, 'props.id')}"]`
    );
    const layoutChain =
        elementChain && elementChain.getAttribute('data-diagramacion-id');
    const indexOfFeature = getIndexOfFeature({
        elementChain,
        isException: layoutChain === 'bn_player_horizontal',
        customIndex: 0,
        featureId
    });
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
    } else if (cardConfig) {
        setConfig(cardConfig[indexOfFeature]);
    }

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

export const getImageIdValidations = (
    isHtmlParam,
    isVideoParam,
    imageIdParam
) => (isHtmlParam || isVideoParam || imageIdParam === '' ? null : imageIdParam);

export const shouldHighlightCustomVoice = (article = {}, config = {}) => {
    const author = get(article, 'credits.by[0]', {});
    const isCustomVoiceCandidate = get(config, 'isCustomVoiceCandidate', false);
    const hasAuthorVoice = get(
        author,
        'additional_properties.original.voice',
        false
    );
    const hasAuthorImage = get(
        author,
        'additional_properties.original.image',
        false
    );
    const hasOneAuthor = get(article, 'credits.by.length', 0) === 1;

    const audioStatus = get(
        article,
        'promo_items.audio_nota.embed.config.audio_status',
        null
    );
    const textAudioNews = get(article, 'label.republicar_audio.text', '');
    const isAudioAllowedByLabel = textAudioNews !== 'No mostrar audio';

    const isAudioValid = isAudioGenerated(audioStatus) && isAudioAllowedByLabel;

    return (
        hasAuthorVoice &&
        hasAuthorImage &&
        hasOneAuthor &&
        isCustomVoiceCandidate &&
        isAudioValid
    );
};

export const getRenderType = data => {
    const renderRules = [
        {
            type: 'adminError',
            condition: data.isAdmin && !!data.error
        },
        {
            type: 'null',
            condition:
                !data.isAdmin &&
                (!!data.error ||
                    !data.transformedArticle ||
                    !data.articleContent)
        },
        {
            type: 'card',
            condition: true
        }
    ];

    const matchingRule = renderRules.find(rule => rule.condition);
    return matchingRule.type;
};

export const getEditorConfig = customFields => {
    const {
        noteId: id,
        imageId,
        video: videoId,
        lead,
        html,
        title,
        authors,
        chapita,
        chapitaStyle,
        description,
        hideAuthors,
        hideImage,
        variant = 'regular',
        cllBoard = '',
        videoComercial
    } = customFields ?? {};

    return {
        id,
        imageId,
        videoId,
        video: videoId,
        html,
        lead,
        title,
        authors,
        chapita,
        chapitaStyle,
        description,
        hideAuthors,
        hideImage,
        variant,
        cllBoard,
        videoComercial,
        isHtml: Boolean(html),
        isVideo: Boolean(videoId),
        isLiveblog: variant === 'liveblog'
    };
};

export const getInitialChainConfig = (featureId, renderables) => {
    const {
        config: initialConfig = {},
        index,
        layout,
        imageConfig,
        boxPosition,
        isBomba,
        chainId
    } = getChainConfig({ featureId, renderables }) || {};

    const hasVariants = checkVariants({ renderables, featureId });

    return {
        initialConfig,
        index,
        layout,
        imageConfig,
        boxPosition,
        isBomba,
        chainId,
        hasVariants
    };
};
