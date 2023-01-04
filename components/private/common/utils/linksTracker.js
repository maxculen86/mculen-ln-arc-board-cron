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

export const createIntersectionObserverForLinks = () => {
    const { dataLayer } = window;

    const body = document.querySelector('.cuerpo__nota');
    const buttonLinks = body.querySelectorAll('a button') || [];
    const bodyLinks =
        body.querySelectorAll('li a.com-link, p a.com-link') || [];

    const refresh = checkUserRealoadAction(window);

    bodyLinks.forEach((link, i) => {
        addPositionInNote(link, i);
    });

    buttonLinks.forEach((link, i) => {
        addPositionInNote(link, i);
    });

    bodyLinks.forEach(paragraphlink => {
        paragraphlink.addEventListener('click', e => {
            if (!refresh) {
                const { target } = e;
                const {
                    ctr_brand: ctrBrand,
                    ctr_position: ctrPosition
                } = target;
                dataLayer.push({
                    event: 'productClickNota',
                    ctr_brand: ctrBrand,
                    ctr_position: ctrPosition
                });
            }
        });
        paragraphlink.addEventListener('auxclick', e => {
            if (!refresh) {
                const { target } = e;
                const {
                    ctr_brand: ctrBrand,
                    ctr_position: ctrPosition
                } = target;
                dataLayer.push({
                    event: 'productClickNota',
                    ctr_brand: ctrBrand,
                    ctr_position: ctrPosition
                });
            }
        });
    });

    buttonLinks.forEach(buttonlink => {
        buttonlink.addEventListener('click', e => {
            if (!refresh) {
                dataLayer.push({
                    event: 'productClickNota',
                    ctr_brand: buttonlink.ctr_brand,
                    ctr_position: buttonlink.ctr_position
                });
            }
        });
        buttonlink.addEventListener('auxclick', e => {
            if (!refresh) {
                dataLayer.push({
                    event: 'productClickNota',
                    ctr_brand: buttonlink.ctr_brand,
                    ctr_position: buttonlink.ctr_position
                });
            }
        });
    });

    const callback = entries => {
        entries.forEach((linkElement, i) => {
            if (linkElement.isIntersecting && !refresh) {
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
};
