import { scheduleTask } from './scheduleTask';

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
        scheduleTask(() => {
            layer.push(eventClick);
        });
    });
    element.addEventListener('auxclick', () => {
        scheduleTask(() => {
            layer.push(eventClick);
        });
    });
};
