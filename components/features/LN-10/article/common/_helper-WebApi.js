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

export const typeBadge = {
    0: POSITIVE,
    1: NEGATIVE,
    2: LIVE,
    3: EXCLUSIVE_LN
};

export const getIsBomba = parent =>
    get(parent, 'type', '') === 'LN10_Caja_Bomba';

const getImageConfig = ({
    renderables,
    layoutsName,
    articlePosition,
    layout
}) => {
    return renderables.some(
        elem =>
            get(elem, 'collection') === 'layouts' &&
            get(elem, 'type', '') === layoutsName.HomeLN10
    )
        ? get(
              diagramationRules(layout),
              `[${articlePosition}].imageConfig`,
              'boxArticles'
          )
        : '';
};

const getFeatureData = (featureId, renderables = []) => {
    const chains = [
        'LN10_Caja_Manual',
        'LN10_Caja_Apertura',
        'LN10_Caja_Bomba',
        'LN10_Caja_Collection',
        'LN10_Caja_Canal'
    ];

    return renderables.find(
        elem =>
            get(elem, 'collection') === 'chains' &&
            chains.includes(get(elem, 'type', '')) &&
            get(elem, 'children') &&
            elem.children.some(child => get(child, 'props.id') === featureId)
    );
};

export const getChainParentOfFeature = (featureId, renderables) => {
    return getFeatureData(featureId, renderables);
};

// TODO: agregar test (sin mockear return) y reemplazar codigo repetido a esta logica que se encuentra en otros arhivos como noteCardImageHelper.js y cajaTemasHelperLN10.js
// TODO: unificar custom field hideBox que tiene la chain apertura por hideCaja que tiene el resto de chains
export const getChainConfig = (featureId, renderables, cajaTemaConfig) => {
    const { layoutsName = {} } = siteConfig || {};
    const parent = getFeatureData(featureId, renderables);
    const position =
        renderables
            .filter(ren => get(ren, 'collection') === 'chains')
            .filter(
                chain =>
                    get(chain, 'props.customFields.hideCaja', false) !== true &&
                    get(chain, 'props.customFields.hideBox', false) !== true
            )
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
        layout,
        chainId: get(parent, 'props.id', '')
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
    const maxVideoSize = 3000000;
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
