import { isTodayEnabled } from '../../../chains/LN10_Caja_Segmentada/_helpers';
import get from './get';

const EXCLUDED_CHAIN_POSITION_TYPES = [
    'LN10_Caja_Juegos_v2',
    'LN10_Caja_Encuesta'
];

const getChainPosition = (chainId, termicaCajaSegmentada, renderables = []) => {
    if (!Array.isArray(renderables)) {
        return 0;
    }

    const shouldIgnoreCaja = element => {
        const isCajaSegmentada =
            get(element, 'type') === 'LN10_Caja_Segmentada';
        if (!isCajaSegmentada) return false;
        if (!termicaCajaSegmentada) return true;
        return !isTodayEnabled(element.props.customFields.enabledDays);
    };

    const idsToIgnore = new Set(
        renderables.filter(shouldIgnoreCaja).map(el => get(el, 'props.id'))
    );

    const filteredChains = renderables.filter(
        el =>
            get(el, 'collection') === 'chains' &&
            !get(el, 'props.customFields.hideCaja') &&
            !EXCLUDED_CHAIN_POSITION_TYPES.includes(get(el, 'type')) &&
            !idsToIgnore.has(get(el, 'props.id'))
    );

    return filteredChains.findIndex(chain => chain.props.id === chainId) || 0;
};
export default getChainPosition;
