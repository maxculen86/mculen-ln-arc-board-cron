import getProperties from 'fusion:properties';
import get from '../../../../get';
import useGetMediaData from './useGetMediaData';
import sectionsValidation from '../../../../../../../layouts/config/LN-Home.config.json';
import sectionsValidationLN10 from '../../../../../../../layouts/config/LN10-Home.config.json';
import { getcustomFieldsData, getPromoItems, isHomeLN10 } from '../index';
import getElementFromRenderables from '../../../../getElementFromRenderables';
import diagramationRules from '../../../../diagramationRules';

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

export const getValidElementForPreload = (layout, renderables) => {
    // TODO: Remover el return default cuando salga home ln 10
    if (isHomeLN10(layout)) {
        const bomba = getElementFromRenderables({
            position: 'Pre_Apertura.position',
            config: sectionsValidationLN10,
            typeElement: 'LN10_Caja_Bomba',
            renderables,
            propNameHide: 'hideCaja'
        });

        return (
            bomba ||
            getElementFromRenderables({
                position: 'Apertura.position',
                config: sectionsValidationLN10,
                typeElement: 'LN10_Caja_Apertura',
                renderables
            }) ||
            []
        );
    }

    const bomba = getElementFromRenderables({
        position: 'Bomba.position',
        config: sectionsValidation,
        typeElement: 'LN-common/bomba',
        renderables,
        propNameHide: 'hideFeature'
    });

    return (
        bomba ||
        getElementFromRenderables({
            position: 'Apertura_1.position',
            config: sectionsValidation,
            typeElement: 'Ln_Caja_Manual',
            renderables,
            propNameHide: 'hideCaja'
        }) ||
        []
    );
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
