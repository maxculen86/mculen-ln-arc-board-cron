import { iaSummaryStore } from './store/iaSummaryStore';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';

const IA_FEATURE_TYPE = 'LN-10/IA';

// renderables es un árbol (las zonas/sections de primer nivel anidan los
// features en `children`), por eso aplanamos antes de buscar el feature.
const flattenRenderables = (items = []) =>
    items.reduce((acc, item) => {
        acc.push(item);
        if (Array.isArray(item.children)) {
            acc.push(...flattenRenderables(item.children));
        }
        return acc;
    }, []);

export const hasIaFeature = (renderables = []) =>
    flattenRenderables(renderables).some(
        item => item.collection === 'features' && item.type === IA_FEATURE_TYPE
    );

// Regla única para mostrar el trigger del Resumen con IA.
export const isIaSummaryAvailable = ({
    renderables = [],
    summaryData = [],
    isThermalSummaryEnabled
} = {}) =>
    hasIaFeature(renderables) &&
    Array.isArray(summaryData) &&
    summaryData.length > 0 &&
    Boolean(isThermalSummaryEnabled);

// Apertura del Resumen con IA con gating de suscripción.
export const openIaSummary = ({
    suscription,
    openBarrier,
    event,
    closeEvent = null
} = {}) => {
    if (!suscription) {
        openBarrier?.();
        return;
    }

    iaSummaryStore.open(closeEvent);

    if (event) addEventToDataLayerV2(event);
};

export const closeIaSummary = () => {
    const { closeEvent } = iaSummaryStore.getSnapshot();

    iaSummaryStore.close();

    if (closeEvent) addEventToDataLayerV2(closeEvent);
};
