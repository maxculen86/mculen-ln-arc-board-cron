import getProperties from 'fusion:properties';
import get from '../../../../get';
import useGetMediaData from './useGetMediaData';
import { getcustomFieldsData, getPromoItems } from '../index';
import { isHomeLN10 } from '../common/helper-WebApi';
import diagramationRules, {
    diagramationExceptions
} from '../../../../diagramationRules';
import { getValidElementForPreload } from './common/helper-WebApi';

const MOBILE = '(max-width: 767px)';
const TABLET = '(min-width: 768px)';
const DESKTOP = '(min-width: 1024px)';

export const FIRST_ARTICLE_TARGET_MEDIA = {
    'center-focal': MOBILE
};

export const SECOND_ARTICLE_TARGET_MEDIA = {
    'center-focal': TABLET,
    'left-focal': DESKTOP,
    'left-focal-without-timeline': DESKTOP
};

export const getPromoItemMedia = (promoItem = {}) =>
    get(promoItem, 'media', '') || get(promoItem, 'option.media_preload', '');

export const getTargetMedia = (diagramation, mediaRules = {}) =>
    mediaRules[diagramation] || null;

export function applyFirstArticleRules(diagramation, promoItems = []) {
    const targetMedia = getTargetMedia(
        diagramation,
        FIRST_ARTICLE_TARGET_MEDIA
    );
    if (!targetMedia) return promoItems;
    return promoItems.filter(
        promoItem => getPromoItemMedia(promoItem) === targetMedia
    );
}

export function buildSecondArticlePreload(diagramation, promoItems = []) {
    const targetMedia = getTargetMedia(
        diagramation,
        SECOND_ARTICLE_TARGET_MEDIA
    );
    if (!targetMedia) return [];

    const basePromoItem = promoItems.find(
        promoItem => getPromoItemMedia(promoItem) === TABLET
    );
    if (!basePromoItem) return [];

    return [
        {
            ...basePromoItem,
            media: targetMedia,
            option: {
                ...basePromoItem.option,
                media_preload: targetMedia
            }
        }
    ];
}

const getImageConfig = (configArticle, diagramacion, arcSite, layout) => {
    if (isHomeLN10(layout)) {
        return get(configArticle, 'imageConfig', 'boxArticles');
    }

    const siteProperties = getProperties(arcSite);

    return get(
        siteProperties,
        `cajaTemaConfig.${diagramacion}.articles[0].imageConfig`,
        ''
    );
};

const getArticleAndConfig = (diagramacion, element, layout) => {
    const children = get(element, 'children', []);
    const isHome = isHomeLN10(layout);

    if (!isHome) {
        return { article: children[0] };
    }

    const config = diagramationRules(diagramacion) || [];

    if (diagramationExceptions.includes(diagramacion) && children.length > 1) {
        return {
            article: children[0],
            configArticle: config[0],
            secondArticle: children[1],
            secondConfig: config[1]
        };
    }

    const articlePosition = config.findIndex(
        ({ withPreload = false } = {}) => withPreload
    );

    return {
        article: children[articlePosition],
        configArticle: config[articlePosition]
    };
};

const useGetMediaApertura = ({
    arcSite,
    isAdmin,
    renderables = [],
    layout
}) => {
    const apertura = getValidElementForPreload(layout, renderables);
    const diagramacion = get(apertura, 'props.customFields.layout', '');

    const { article, configArticle, secondArticle, secondConfig } =
        getArticleAndConfig(diagramacion, apertura, layout);

    const { isHideImage, imageID, noteID, videoID } =
        getcustomFieldsData(article);

    const imageConfig = getImageConfig(
        configArticle,
        diagramacion,
        arcSite,
        layout
    );

    const secondArticleData =
        secondArticle && secondConfig
            ? getcustomFieldsData(secondArticle)
            : {
                  isHideImage: true,
                  imageID: null,
                  noteID: null,
                  videoID: null
              };

    const secondImageConfig = secondConfig
        ? getImageConfig(secondConfig, diagramacion, arcSite, layout)
        : null;

    const mediaDataFirstArticle = useGetMediaData({
        imageConfig,
        isHideImage,
        isAdmin,
        imageID,
        videoID,
        arcSite,
        layout,
        noteID,
        diagramacion
    });
    const promoItemsFirstArticle = getPromoItems(mediaDataFirstArticle);

    const preloadFirstArticle = applyFirstArticleRules(
        diagramacion,
        promoItemsFirstArticle
    );

    const mediaDataSecondArticle = useGetMediaData({
        imageConfig: secondImageConfig,
        isHideImage: secondArticleData.isHideImage,
        isAdmin,
        imageID: secondArticleData.imageID,
        videoID: secondArticleData.videoID,
        arcSite,
        layout,
        noteID: secondArticleData.noteID,
        diagramacion
    });
    const promoItemsSecondArticle = getPromoItems(mediaDataSecondArticle) || [];

    const preloadSecondArticle = buildSecondArticlePreload(
        diagramacion,
        promoItemsSecondArticle
    );
    return [...preloadFirstArticle, ...preloadSecondArticle];
};

export default useGetMediaApertura;
