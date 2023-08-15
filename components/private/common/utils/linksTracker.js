import { checkUserRealoadAction } from './noteTracker/ctrTracker';

export const addPositionInNote = (elem, indexElem) => {
    const { localName = {} } = elem;
    const index = indexElem + 1;
    const position = index <= 9 ? `0${index}` : index;
    if (elem)
        return Object.assign(elem, {
            ctr_brand:
                localName === 'button'
                    ? `linkInterstial_${position}`
                    : `linkParrafo_${position}`,
            ctr_position: `1111${position}`
        });
    return true;
};

export const eventListenerAttacher = (element, layer) => {
    const { ctr_brand: ctrBrand, ctr_position: ctrPosition } = element;

    const eventClick = {
        event: 'productClickNota',
        ctr_brand: ctrBrand,
        ctr_position: ctrPosition
    };

    element.addEventListener('click', () => {
        layer.push(eventClick);
    });
    element.addEventListener('auxclick', () => {
        layer.push(eventClick);
    });
};

// TODO: // TODO: Si se quiere volver a usar esta lógica. Fijarse en el histórico

export const createIntersectionObserverForLinks = () => {
    return false;
};
