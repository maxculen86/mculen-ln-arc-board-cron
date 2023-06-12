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

export const typeBadge = {
    0: POSITIVE,
    1: NEGATIVE,
    2: LIVE,
    3: EXCLUSIVE_LN
};

export const getIsBomba = parent =>
    get(parent, 'type', '') === 'LN10_Caja_Bomba';

const getImageConfig = ({ renderables, layoutsName, config }) => {
    return renderables.some(
        elem =>
            get(elem, 'collection') === 'layouts' &&
            get(elem, 'type', '') === layoutsName.HomeLN10
    )
        ? get(config, 'imageConfig', 'boxArticles')
        : '';
};

export const getChainParentOfFeature = (featureId, renderables) => {
    const chains = [
        'LN10_Caja_Manual',
        'LN10_Caja_Apertura',
        'LN10_Caja_Bomba',
        'LN10_Caja_Collection',
        'LN10_Caja_Canal',
        'LN10_Caja_WebStories',
        'Ln_Caja_Manual'
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

export const getCardConfig = (
    cajaTemaConfig,
    layout,
    articlePosition,
    bomba,
    chainId
) => {
    if (cajaTemaConfig)
        return get(
            cajaTemaConfig,
            `${layout}.articles[${articlePosition}]`,
            null
        );

    const cardConfig = diagramationRules(layout);

    if (
        bomba &&
        get(bomba, 'props.id', null) === chainId &&
        articlePosition === 0
    ) {
        return updatesTitleTag(cardConfig);
    }

    if (bomba) {
        return deleteExtraH1(articlePosition, cardConfig);
    }

    return cardConfig && cardConfig[articlePosition];
};

export const getChainConfig = ({ featureId, renderables, cajaTemaConfig }) => {
    const { layoutsName = {} } = siteConfig || {};
    const parent = getChainParentOfFeature(featureId, renderables);
    const chainId = get(parent, 'props.id', '');
    const chainPosition = getChainPosition(chainId, renderables);
    const layout = get(parent, 'props.customFields.layout', '');
    const bomba = firstBomba(renderables);

    const articlePosition = get(parent, 'children', []).findIndex(
        elem => elem && get(elem, 'props.id') === featureId
    );
    const config = getCardConfig(
        cajaTemaConfig,
        layout,
        articlePosition,
        bomba,
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
    variantsDisabled
}) => {
    const { streams } = video || {};
    const { filesize } = getStreams(streams, '>') || '';
    const maxVideoSize = 3145728;
    const oneMegabyte = 1048576;

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

export const firstBomba = (renderables = []) => {
    const sections = renderables.filter(ren => ren.collection === 'sections');
    const bomba = sections
        .map(section => section.children)
        .flat()
        .find(
            child =>
                child.type === 'LN10_Caja_Bomba' &&
                !child.props.customFields.hideCaja
        );

    return bomba || null;
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
