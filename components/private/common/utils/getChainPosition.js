import get from './get';

const getChainPosition = (chainId, renderables = []) =>
    renderables
        .filter(
            element =>
                get(element, 'collection', '') === 'chains' &&
                !get(element, 'props.customFields.hideCaja', false) &&
                get(element, 'type') !== 'LN10_Caja_Juegos'
        )
        .findIndex(chain => chain.props.id === chainId) || 0;

export default getChainPosition;
