import getProperties from 'fusion:properties';
import get from '../../../../get';
import useGetMediaData from './useGetMediaData';
import { getcustomFieldsData, getPromoItems } from '../index';
import { isHomeLN10 } from '../common/helper-WebApi';
import diagramationRules from '../../../../diagramationRules';
import { getValidElementForPreload } from './common/helper-WebApi';

const getImageConfig = (
    configArticle,
    diagramacion,
    arcSite,
    layout,
    isBombaFeature
) => {
    // TODO: Remover la validacion "isBombaFeature" y el default cuando salga nueva home

    if (isHomeLN10(layout)) {
        return get(configArticle, 'imageConfig', 'boxArticles');
    }

    const siteProperties = getProperties(arcSite);

    if (isBombaFeature) {
        return get(
            siteProperties,
            `cajaTemaConfig.bomba1.articles[0].imageConfig`,
            'bomba'
        );
    }

    return get(
        siteProperties,
        `cajaTemaConfig.${diagramacion}.articles[0].imageConfig`,
        ''
    );
};

const getArticleAndConfig = (diagramacion, element, isBombaFeature, layout) => {
    // TODO: Remover la validacion "isBombaFeature" y default cuando salga nueva home

    const children = get(element, 'children', []);

    if (isHomeLN10(layout)) {
        const config = diagramationRules(diagramacion) || [];
        const articlePosition = config.findIndex(
            ({ withPreload = false } = {}) => withPreload
        );

        return {
            article: children[articlePosition],
            configArticle: config[articlePosition]
        };
    }

    if (isBombaFeature) {
        return { article: element };
    }

    return { article: children[0] };
};

const useGetMediaApertura = ({
    arcSite,
    isAdmin,
    renderables = [],
    layout
}) => {
    const apertura = getValidElementForPreload(layout, renderables);
    const isBombaFeature = get(apertura, 'type', '') === 'LN-common/bomba';
    const diagramacion = get(apertura, 'props.customFields.layout', '');

    const { article, configArticle } = getArticleAndConfig(
        diagramacion,
        apertura,
        isBombaFeature,
        layout
    );

    const { isHideImage, imageID, noteID, videoID } = getcustomFieldsData(
        article
    );

    const imageConfig = getImageConfig(
        configArticle,
        diagramacion,
        arcSite,
        layout,
        isBombaFeature
    );

    const mediaData = useGetMediaData({
        imageConfig,
        isHideImage,
        isAdmin,
        imageID,
        videoID,
        arcSite,
        layout,
        noteID
    });

    return getPromoItems(mediaData) || [];
};

export default useGetMediaApertura;
