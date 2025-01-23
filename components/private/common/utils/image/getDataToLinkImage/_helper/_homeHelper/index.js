import getProperties from 'fusion:properties';
import get from '../../../../get';
import useGetMediaData from './useGetMediaData';
import { getcustomFieldsData, getPromoItems } from '../index';
import { isHomeLN10 } from '../common/helper-WebApi';
import diagramationRules, {
    diagramationExceptions
} from '../../../../diagramationRules';
import { getValidElementForPreload } from './common/helper-WebApi';

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
        noteID
    });

    const mediaDataSecondArticle = useGetMediaData({
        imageConfig: secondImageConfig,
        isHideImage: secondArticleData.isHideImage,
        isAdmin,
        imageID: secondArticleData.imageID,
        videoID: secondArticleData.videoID,
        arcSite,
        layout,
        noteID: secondArticleData.noteID
    });
    const promoItemsSecondArticle = getPromoItems(mediaDataSecondArticle) || [];

    const preloadSecondArticle = promoItemsSecondArticle.reduce(
        (acc, promoItem = {}) => {
            if (promoItem.media === '(min-width: 768px)') {
                const desktopPromoItem = {
                    ...promoItem,
                    media: '(min-width: 1024px)',
                    option: {
                        ...promoItem.option,
                        media_preload: '(min-width: 1024px)'
                    }
                };
                acc.push(desktopPromoItem);
            }
            return acc;
        },
        []
    );

    const allMediaData = [
        ...getPromoItems(mediaDataFirstArticle),
        ...preloadSecondArticle
    ];

    return allMediaData || [];
};

export default useGetMediaApertura;
