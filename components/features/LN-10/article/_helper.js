import PropTypes from 'fusion:prop-types';
import get from '../../../private/common/utils/get';
import siteConfig from '../../../../properties/sites/la-nacion-ar';
import getAuthorsPhoto from '../../../private/common/utils/getAuthorsPhoto';
import getAuthorsAsString from '../../../private/common/utils/getAuthorsAsString';
import { getChildrenFromSectionHome } from '../../../private/LN/common/utils/cajaTemasHelperLN10';
import { getShortestImage } from '../../../private/LN/common/utils/mediaHelper';
import getStreams from '../../../private/LN/common/utils/getStreams';
import diagramationRules from '../../../private/common/utils/diagramationRules';
import featureArticleCustomsFields from '../../../private/LN/common/utils/articuloHelper';
import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';
import transformImageData from '../../../private/common/LN-10/transformImageData';

const promoItemsBasic = 'promo_items.basic';

export const showSubheadText = ({ withSubhead, article, description }) =>
    withSubhead && (description || get(article, 'subheadlines.basic'));

export const validateSubhead = (config, withMedia, customFields, variant) => {
    return (
        (!['author', 'liveblog'].includes(variant) &&
            get(config, 'withSubhead') &&
            !get(customFields, 'hideDescription')) ||
        (!get(config, 'withSubhead') && !withMedia)
    );
};

export const validateVariant = (variant, authorsQuantity) =>
    variant === 'author' && !(authorsQuantity === 1) ? 'regular' : variant;

export const getBadgetConfig = (style, text, isLiveblog) => {
    if (isLiveblog) {
        return {
            badgetStyle: style || 'liveblog-red',
            badgetText: text || 'vivo'
        };
    }

    return {
        badgetStyle: style,
        badgetText: text
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

export const getDataAuthor = ({
    article,
    variant,
    authors,
    hideAuthors,
    withMarquee,
    withMarqueeImg
}) => {
    const authorsQuantity = get(article, 'credits.by', []).length;
    const imageAuthor = get(getAuthorsPhoto(article), 'url', '');

    const nameAuthors =
        !hideAuthors && (authors || getAuthorsAsString(article, true));

    if (validateVariant(variant, authorsQuantity) === 'author') {
        return {
            marqueeImg: imageAuthor,
            marquee: nameAuthors,
            authorsQuantity
        };
    }

    return {
        marqueeImg: withMarqueeImg && imageAuthor,
        marquee: withMarquee && nameAuthors,
        authorsQuantity
    };
};

const getIsBomba = parent => get(parent, 'type', '') === 'LN10_Caja_Bomba';

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
    customFields = {}
} = {}) => {
    const { video: videoId, imageId, html = '' } = customFields;

    const outstandingImage = getImageDestacada(article);
    const mediaDataDefault = transformImageData(article, outstandingImage);

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
                get(image, promoItemsBasic, outstandingImage)
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

const getImageConfig = ({
    renderables,
    layoutsName,
    cajaTemaConfig,
    articlePosition,
    layout,
    isBomba
}) => {
    if (isBomba) {
        return get(cajaTemaConfig, `bomba1.articles[0].imageConfig`);
    }

    return renderables.some(
        elem =>
            get(elem, 'collection') === 'layouts' &&
            get(elem, 'type', '') === layoutsName.HomeLN10
    )
        ? get(
              cajaTemaConfig,
              `${layout}.articles[${articlePosition}].imageConfig`,
              'boxArticles'
          )
        : '';
};

const getFeatureData = (featureId, renderables = []) => {
    const chains = [
        'LN10_Caja_Manual',
        'LN10_Caja_Apertura',
        'LN10_Caja_Bomba'
    ];

    return renderables.find(
        elem =>
            get(elem, 'collection') === 'chains' &&
            chains.includes(get(elem, 'type', '')) &&
            get(elem, 'children') &&
            elem.children.some(child => get(child, 'props.id') === featureId)
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

export const getChainParentOfFeature = (featureId, renderables) => {
    return getFeatureData(featureId, renderables);
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

const getChainConfig = (featureId, renderables, cajaTemaConfig) => {
    const { layoutsName = {} } = siteConfig || {};
    const parent = getFeatureData(featureId, renderables);
    const position =
        renderables
            .filter(ren => get(ren, 'collection') === 'chains')
            .findIndex(
                chain => get(chain, 'props.id') === get(parent, 'props.id')
            ) || 0;

    const index = get(parent, 'children', []).findIndex(
        elem => elem && get(elem, 'props.id') === featureId
    );

    const layout = get(parent, 'props.customFields.layout', '');
    const cardConfig = diagramationRules(layout);
    const config = cardConfig && cardConfig[index];

    return {
        imageConfig: getImageConfig({
            renderables,
            layoutsName,
            cajaTemaConfig,
            articlePosition: index,
            layout,
            isBomba: getIsBomba(parent)
        }),
        config,
        index,
        boxPosition: `0${Number(position) + 1}`.slice(-2),
        layout
    };
};

export const validateArticleFeature = ({
    id,
    content,
    image,
    video,
    layout,
    imageId,
    videoId
}) => {
    const { streams } = video || {};
    const { filesize } = getStreams(streams, '>') || '';
    const maxVideoSize = 3000000;
    const oneMegabyte = 1048576;

    const rules = [
        {
            validation: !id,
            message: 'El campo Id de la Nota es obligatorio.'
        },
        {
            validation: !content,
            message: 'El ID de la nota es incorrecto.'
        },
        {
            validation: imageId && image === null,
            message: 'El ID de la imagen es incorrecto.'
        },
        {
            validation: videoId && video === null,
            message: 'El ID del video es incorrecto.'
        },
        {
            validation:
                filesize &&
                !['grilla1', 'grillaVideo1'].includes(layout) &&
                filesize > maxVideoSize,
            message: `El tamaño del video debe ser inferior a 3 MB. Peso actual ${(
                filesize / oneMegabyte
            ).toFixed(2)} MB`
        }
    ];

    return pageBuilderValidator(rules);
};

export default getChainConfig;
