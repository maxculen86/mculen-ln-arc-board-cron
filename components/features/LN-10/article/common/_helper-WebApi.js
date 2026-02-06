import get from '../../../../private/common/utils/get';
import siteConfig from '../../../../../properties/sites/la-nacion-ar';
import getStreams from '../../../../private/LN/common/utils/getStreams';
import diagramationRules from '../../../../private/common/utils/diagramationRules';
import pageBuilderValidator from '../../../../private/common/utils/pageBuilderValidator';
import {
    POSITIVE,
    NEGATIVE,
    LIVE,
    EXCLUSIVE_LN
} from '../../../../private/common/badge/types';
import { getValidElementForPreload } from '../../../../private/common/utils/image/getDataToLinkImage/_helper/_homeHelper/common/helper-WebApi';
import getChainPosition from '../../../../private/common/utils/getChainPosition';
import sectionsValidationLN10 from '../../../../layouts/config/LN10-Home.config.json';
import getElementFromRenderables from '../../../../private/common/utils/getElementFromRenderables';
import getSources from '../../../../private/LN/common/utils/getSourcesJw';

export const typeBadge = {
    0: POSITIVE,
    1: NEGATIVE,
    2: LIVE,
    3: EXCLUSIVE_LN
};

export const getIsBomba = parent =>
    get(parent, 'type', '') === 'LN10_Caja_Bomba';

const getImageConfig = ({ renderables, layoutsName, config }) =>
    renderables.some(
        elem =>
            get(elem, 'collection') === 'layouts' &&
            Object.values(layoutsName).includes(get(elem, 'type', ''))
    )
        ? get(config, 'imageConfig', 'boxArticles')
        : '';

// TO-DO: REFACTOR METODO: Permitir que los elementos de la lista "chains" sean pasados como prop.
export const getChainParentOfFeature = (featureId, renderables) => {
    const chains = [
        'LN10_Caja_Manual',
        'LN10_Caja_Apertura',
        'LN10_Caja_Bomba',
        'LN10_Caja_Collection',
        'LN10_Caja_Canal',
        'LN10_Caja_WebStories',
        'Ln_Caja_Manual',
        'LN10_Caja_Carrusel',
        'LN10_Caja_Carrusel_Horizontal',
        'LN10_Caja_Juegos_v2',
        'LN10_Caja_Podcasts'
    ];

    return renderables.find(
        elem =>
            get(elem, 'collection') === 'chains' &&
            chains.includes(get(elem, 'type', '')) &&
            get(elem, 'children', []).some(
                child => get(child, 'props.id') === featureId
            )
    );
};

export const updatesTitleTag = (cardConfig = []) => {
    const updatedCardConfig = [...cardConfig];
    const titleTag = get(updatedCardConfig[0], 'titleTag');

    if (titleTag && titleTag !== 'h1') {
        updatedCardConfig[0].titleTag = 'h1';

        if (get(updatedCardConfig[0], 'subheadTag'))
            updatedCardConfig[0].subheadTag = 'h2';
    }

    return updatedCardConfig && updatedCardConfig[0];
};

export const deleteExtraH1 = (articlePosition = null, cardConfig = []) => {
    const updatedCardConfig = [...cardConfig];
    const titleTag = get(updatedCardConfig[articlePosition], 'titleTag');

    if (titleTag === 'h1') {
        updatedCardConfig[articlePosition].titleTag = 'h2';
        if (get(updatedCardConfig[articlePosition], 'subheadTag'))
            updatedCardConfig[articlePosition].subheadTag = 'h3';
    }

    return updatedCardConfig && updatedCardConfig[articlePosition];
};

export const handleTagWithBomba = (
    firstBombaChainId,
    chainId,
    cardConfig,
    articlePosition
) => {
    if (firstBombaChainId === chainId && articlePosition === 0) {
        return updatesTitleTag(cardConfig);
    }

    return deleteExtraH1(articlePosition, cardConfig);
};

export const getCardConfig = (
    cajaTemaConfig,
    layout,
    articlePosition,
    firstBombaChainId,
    chainId
) => {
    if (cajaTemaConfig)
        return get(
            cajaTemaConfig,
            `${layout}.articles[${articlePosition}]`,
            null
        );

    const cardConfig = diagramationRules(layout);

    if (firstBombaChainId)
        return handleTagWithBomba(
            firstBombaChainId,
            chainId,
            cardConfig,
            articlePosition
        );

    return cardConfig && cardConfig[articlePosition];
};

export const isBnPlayerDiagramation = config => {
    const validLayouts = [
        'bn_player_3_grid',
        'bn_player_4_grid',
        'bn_player_horizontal'
    ];
    const layout = get(config, 'props.customFields.layout', '');
    return validLayouts.includes(layout);
};

export const reorderArticlePositionForVideo = (chainConfig = {}) => {
    const isBnPlayer = isBnPlayerDiagramation(chainConfig);

    if (isBnPlayer) {
        const children = get(chainConfig, 'children', []);
        const modifiedChildren = children.reduce((acc, child) => {
            const isVideoFeature =
                child.type === 'LN-10/videoPlayer' ||
                child.type === 'LN-10/videoPlayerNota';

            if (isVideoFeature) {
                acc.unshift(child);
            } else acc.push(child);
            return acc;
        }, []);
        return { ...chainConfig, children: modifiedChildren };
    }
    return chainConfig;
};

export const getChainConfig = ({
    featureId,
    renderables,
    cajaTemaConfig,
    termicaCajaSegmentada
}) => {
    const { layoutsName = {} } = siteConfig || {};
    const parent = reorderArticlePositionForVideo(
        getChainParentOfFeature(featureId, renderables)
    );

    const chainId = get(parent, 'props.id', '');
    const chainPosition = getChainPosition(
        chainId,
        termicaCajaSegmentada,
        renderables
    );
    const layout = get(parent, 'props.customFields.layout', '');
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

    const articlePosition = get(parent, 'children', []).findIndex(
        elem => elem && get(elem, 'props.id') === featureId
    );
    const config = getCardConfig(
        cajaTemaConfig,
        layout,
        articlePosition,
        firstBombaChainId,
        chainId
    );

    return {
        imageConfig: getImageConfig({
            renderables,
            layoutsName,
            config
        }),
        config,
        index: articlePosition,
        boxPosition: `0${Number(chainPosition) + 1}`.slice(-2),
        layout,
        chainId
    };
};

export const validateArticleFeature = ({
    id,
    content,
    image,
    video,
    layout,
    imageId,
    videoId,
    variant,
    variantsDisabled,
    cllBoard,
    chapita,
    isHtml
}) => {
    const { streams, sources } = video || {};
    const { filesize } =
        getStreams(streams, '>') || getSources(sources, '>') || '';
    const maxVideoSize = 3145728;
    const oneMegabyte = 1048576;
    const labelChapita = get(content, 'label.chapita.text', '');
    const closedNote =
        get(content, 'content_restrictions.content_code', '') === 'cerrada';
    const hasBadge = chapita || labelChapita?.length > 0 || closedNote;

    const rules = [
        {
            validation: variantsDisabled && variantsDisabled.includes(variant),
            message: `Esta card no admite la variante: ${variant}`
        },
        {
            validation: !id,
            message: 'El campo Id de la Nota es obligatorio.'
        },
        {
            validation: !content,
            message: 'El ID de la nota es incorrecto.'
        },
        {
            validation: !isHtml && !videoId && imageId && image === null,
            message: 'El ID de la imagen es incorrecto.'
        },
        {
            validation: !isHtml && videoId && video === null,
            message: 'El ID del video es incorrecto.'
        },
        {
            validation:
                filesize &&
                !['grilla1', 'grillaVideo1', 'bn_player_horizontal'].includes(
                    layout
                ) &&
                filesize > maxVideoSize,
            message: `El tamaño del video debe ser inferior a 3 MB. Peso actual ${(
                filesize / oneMegabyte
            ).toFixed(2)} MB`
        },
        {
            validation: cllBoard && hasBadge,
            message: `La chapita y el embebido de canchallena no se pueden utilizar al mismo tiempo. Por favor, elija uno.`
        }
    ];

    return pageBuilderValidator(rules);
};

export const isInApertura = ({
    layoutPageBuilder,
    config,
    renderables = [],
    featureId = '',
    articlePosition
} = {}) => {
    const { children = [] } =
        getValidElementForPreload(layoutPageBuilder, renderables) || {};
    const { withPreload = false } = config || {};
    const articleIndex = withPreload ? articlePosition : 0;
    const articleFeature = children[articleIndex];

    const isImageHide = get(
        articleFeature,
        'props.customFields.hideImage',
        false
    );

    return (
        get(articleFeature, 'props.id') === featureId &&
        withPreload &&
        !isImageHide
    );
};

export const checkForId = idValue => idValue && idValue.trim();
