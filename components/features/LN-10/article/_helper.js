import PropTypes from 'fusion:prop-types';
import get from '../../../private/common/utils/get';
import siteConfig from '../../../../properties/sites/la-nacion-ar';
import getAuthorsPhoto from '../../../private/common/utils/getAuthorsPhoto';
import getAuthorsAsString from '../../../private/common/utils/getAuthorsAsString';
import { getChildrenFromSectionHome } from '../../../private/LN/common/utils/cajaTemasHelperLN10';
import {
    getShortestImage,
    getSourceSet
} from '../../../private/LN/common/utils/mediaHelper';
import getStreams from '../../../private/LN/common/utils/getStreams';
import diagramationRules from '../../../private/common/utils/diagramationRules';
import featureArticleCustomsFields from '../../../private/LN/common/utils/articuloHelper';

const promoItemsBasic = 'promo_items.basic';

export const showSubheadText = ({ withSubhead, article, description }) =>
    withSubhead && (description || get(article, 'subheadlines.basic'));

export const validateSubhead = (config, withMedia, customFields, variant) =>
    (variant !== 'author' &&
        !get(customFields, 'hideDescription') &&
        (get(customFields, 'video') || get(customFields, 'html'))) ||
    get(config, 'withSubhead') ||
    (!get(config, 'withSubhead') && !withMedia);

export const validateVariant = (variant, authorsQuantity) =>
    variant === 'author' && !(authorsQuantity === 1) ? 'regular' : variant;

export const articleCustomFields = {
    ...featureArticleCustomsFields('articuloGeneral', true),
    variant: PropTypes.oneOf(['regular', 'author']).tag({
        defaultValue: 'regular',
        name: 'Variante'
    })
};

export const getDataAuthor = article => {
    return {
        ...getAuthorsPhoto(article),
        marquesina: getAuthorsAsString(article, true)
    };
};

export const isBombaHidden = renderables => {
    const preOpeningChildren =
        getChildrenFromSectionHome(renderables, 'Pre_Apertura', 0) || [];

    return preOpeningChildren.some(children => {
        const isBomba = get(children, 'type', '') === 'LN10_Caja_Bomba';
        return get(children, 'props.customFields.hideCaja', false) && isBomba;
    });
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

const transformImageData = (articleData, imageData) => {
    const { height, width } = imageData || {};
    const resizedUrls = get(imageData, 'resized_urls', []);
    const sources = resizedUrls.filter(v => !!v.option);
    const { resizedUrl } = getShortestImage(sources);

    return {
        height,
        width,
        alt: get(articleData, 'headlines.basic'),
        src: resizedUrl,
        srcset: getSourceSet(false, imageData, sources)
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
    layout
}) => {
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
            layout
        }),
        config,
        index,
        boxPosition: `0${Number(position) + 1}`.slice(-2),
        layout
    };
};

export default getChainConfig;
