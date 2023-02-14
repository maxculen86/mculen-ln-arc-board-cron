import get from '../../../../private/common/utils/get';
import siteConfig from '../../../../../properties/sites/la-nacion-ar';
import { getChildrenFromSectionHome } from '../../../../private/LN/common/utils/cajaTemasHelperLN10-WebApi';
import getStreams from '../../../../private/LN/common/utils/getStreams';
import diagramationRules from '../../../../private/common/utils/diagramationRules';
import pageBuilderValidator from '../../../../private/common/utils/pageBuilderValidator';

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

export const getChainParentOfFeature = (featureId, renderables) => {
    return getFeatureData(featureId, renderables);
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

export const getLiveblogTitles = articleData => {
    const contentElements = get(articleData, 'content_elements', []);

    return contentElements.reduce((acc, currentValue) => {
        if (currentValue.type === 'custom_embed' && acc.length < 3) {
            return [
                ...acc,
                {
                    title: get(currentValue, 'embed.config.title', ''),
                    time: get(currentValue, 'embed.config.time', '')
                }
            ];
        }

        return acc;
    }, []);
};

export default getChainConfig;
