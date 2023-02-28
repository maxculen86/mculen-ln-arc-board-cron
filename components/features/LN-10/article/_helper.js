import PropTypes from 'fusion:prop-types';
import get from '../../../private/common/utils/get';
import getAuthorsPhoto from '../../../private/common/utils/getAuthorsPhoto';
import getAuthorsAsString from '../../../private/common/utils/getAuthorsAsString';
import { getChildrenFromSectionHome } from '../../../private/LN/common/utils/cajaTemasHelperLN10-WebApi';
import { getShortestImage } from '../../../private/LN/common/utils/mediaHelper';
import getStreams from '../../../private/LN/common/utils/getStreams';
import diagramationRules from '../../../private/common/utils/diagramationRules';
import featureArticleCustomsFields from '../../../private/LN/common/utils/articuloHelper';
import transformImageData from '../../../private/common/LN-10/transformImageData';
import { getIsBomba, getChainParentOfFeature } from './common/_helper-WebApi';
import { isImageEager } from '../../../private/LN/home/components/noteCard/noteCardHelper';

export const typeMedia = {
    IMAGE: 'image',
    VIDEO: 'video',
    HTML: 'html'
};

const promoItemsBasic = 'promo_items.basic';

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

export const showSection = ({ withSection, article, authors }) =>
    !authors && withSection && get(article, 'taxonomy.primary_section.name');

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
    get(customFields, 'variant', 'regular') !== 'author' &&
    (get(customFields, 'video') ||
        get(customFields, 'html') ||
        get(customFields, 'imageId') ||
        get(article, 'promo_items.basic.type', '') === 'image');

export const validateVariant = (variant, authorsQuantity) =>
    variant === 'author' && !(authorsQuantity === 1) ? 'regular' : variant;

export const getBadgetConfig = ({
    style,
    text,
    isLiveblog,
    withMedia,
    typeOfMedia
}) => {
    if (isLiveblog) {
        return {
            badgetStyle: style || 'live',
            badgetText: text || 'vivo'
        };
    }

    return {
        badgetStyle: style || undefined,
        badgetText: withMedia && typeOfMedia !== typeMedia.HTML && text
    };
};

export const getLiveblogTitles = articleData => {
    const contentElements = get(articleData, 'content_elements', []);

    return contentElements.reduce((acc, currentValue) => {
        if (currentValue.type === 'custom_embed' && acc.length < 3) {
            return [
                ...acc,
                {
                    text: get(currentValue, 'embed.config.title', ''),
                    time: get(currentValue, 'embed.config.time', '')
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

export const validateImagePosition = (imagePosition, isLiveblog, cardSize) =>
    isLiveblog && cardSize === 'm'
        ? {
              mobile: 'img-right'
          }
        : imagePosition;

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

const transformVideoData = videoData => {
    const streams = get(videoData, 'streams', []);
    const videoImagesResized = get(videoData, 'resizedUrl', []);
    const type = get(videoData, 'type', '');
    const { resizedUrl } = getShortestImage(videoImagesResized);
    const { url = '' } = getStreams(streams, '>') || {};

    return {
        type,
        src: url,
        poster: resizedUrl
    };
};

export const getMediaData = ({
    article,
    video,
    image,
    renderables = [],
    customFields = {}
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
            data: transformVideoData(video)
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

// TODO: Falta modificar logica para la nueva configuracion de imagen del resizer

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
    const cardConfig = diagramationRules(layoutChain);
    setConfig(cardConfig && cardConfig[indexOfFeature]);
    return true;
};

export const getTypeOfMedia = (customFields = {}) => {
    const { video, html } = customFields;

    if (html) return typeMedia.HTML;
    if (video) return typeMedia.VIDEO;
    return typeMedia.IMAGE;
};

export const showExtraClass = (typeOfMedia, extraClass = {}) => {
    return extraClass[typeOfMedia] || undefined;
};
