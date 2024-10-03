import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';

// Ensures `registeredKeys` is not accidentally deleted or reassigned,
// as it maintains state across function calls to prevent duplicate event registration.
export const registeredKeys = new Set();
export const handleEventWords = (key = '') => {
    if (!registeredKeys || registeredKeys.has(key)) {
        return;
    }
    registeredKeys.add(key);

    addEventToDataLayerV2({
        event: 'e_linkclick',
        action: 'IA',
        category: 'nota_ln9',
        label: 'palabra_glosario'
    });
};

export const getLocationTooltip = (tooltipRef, eventTarget) => {
    if (!tooltipRef || !eventTarget) {
        return null;
    }
    const tooltipElement = tooltipRef.current;

    const targetX = eventTarget?.getBoundingClientRect().left;
    const targetWidth = eventTarget?.offsetWidth;
    const tooltipWidth = tooltipElement?.clientWidth;
    const left = `${targetX - tooltipWidth / 2 + targetWidth / 2}px`;

    const targetY = eventTarget?.getBoundingClientRect().top;
    const tooltipHeight = tooltipElement?.clientHeight;
    const top = `${targetY - tooltipHeight - 8}px`;

    return {
        left,
        top
    };
};

export const findObjectGlossary = (glossaryData = [], key = '') => {
    return glossaryData.find(element => element.key === key) || {};
};
