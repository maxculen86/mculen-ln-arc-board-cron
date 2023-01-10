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

const eventListenerAttacher = (element, layer) => {
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

export const createIntersectionObserverForLinks = () => {
    const { dataLayer } = window;

    const body = document.querySelector('.cuerpo__nota');
    const buttonLinks = body.querySelectorAll('a button') || [];
    const bodyLinks =
        body.querySelectorAll('li a.com-link, p a.com-link') || [];

    const refresh = checkUserRealoadAction(window);

    if (!refresh) {
        bodyLinks.forEach((paragraphlink, i) => {
            addPositionInNote(paragraphlink, i);
            eventListenerAttacher(paragraphlink, dataLayer);
        });

        buttonLinks.forEach((buttonlink, i) => {
            addPositionInNote(buttonlink, i);
            eventListenerAttacher(buttonlink, dataLayer);
        });

        const callback = entries => {
            entries.forEach(linkElement => {
                if (linkElement.isIntersecting) {
                    const { target } = linkElement;

                    const {
                        ctr_brand: ctrBrand,
                        ctr_position: ctrPosition
                    } = target;

                    dataLayer.push({
                        event: 'impressionNota',
                        ctr_brand: ctrBrand,
                        ctr_position: ctrPosition
                    });
                    observer.unobserve(target);
                }
            });
        };

        const observer = new IntersectionObserver(callback);

        bodyLinks.forEach(link => {
            observer.observe(link);
        });

        buttonLinks.forEach(link => {
            observer.observe(link);
        });
    }
};
