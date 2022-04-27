import get from '../../../../common/utils/get';
import siteConfig from '../../../../../../properties/sites/la-nacion-ar';

const getCajaTemaConfig = (featureId, renderables, cajaTemaConfig, isBomba) => {
    if (isBomba)
        return {
            imageConfig: get(cajaTemaConfig, `bomba1.articles[0].imageConfig`),
            config: get(cajaTemaConfig, `bomba1.articles[0]`),
            index: 0,
            boxPosition: '00',
            layout: 'bomba1'
        };
    const { layoutsName = {} } = siteConfig || {};

    const parent = renderables.find(
        elem =>
            get(elem, 'collection') === 'chains' &&
            get(elem, 'type', '') === 'Ln_Caja_Manual' &&
            get(elem, 'children') &&
            elem.children.some(child => get(child, 'props.id') === featureId)
    );

    const position =
        renderables
            .filter(ren => get(ren, 'collection') === 'chains')
            .findIndex(
                chain => get(chain, 'props.id') === get(parent, 'props.id')
            ) || 0;

    const index = get(parent, 'children', []).findIndex(
        elem => elem && get(elem, 'props.id') === featureId
    );

    const layout = get(parent, 'props.customFields.layout');

    const config = get(cajaTemaConfig, `${layout}.articles[${index}]`, null);
    return {
        imageConfig:
            (renderables.some(
                elem =>
                    get(elem, 'collection') === 'layouts' &&
                    get(elem, 'type', '') === layoutsName.Home
            ) &&
                get(
                    cajaTemaConfig,
                    `${layout}.articles[${index}].imageConfig`,
                    'boxArticles'
                )) ||
            '',
        config,
        index,
        boxPosition: `0${Number(position) + 1}`.slice(-2),
        layout
    };
};

export default getCajaTemaConfig;
