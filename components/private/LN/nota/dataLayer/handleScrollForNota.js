import getScrollPercent from '../../common/utils/getScrollPercent';

/* eslint-disable prettier/prettier */
export default function handleScrollForNota() {
    if (typeof window === 'undefined') return;
    if (window.dataLayer === 'undefined') return;

    const scrollPercentRounded = getScrollPercent();

    if (
        scrollPercentRounded > 25 &&
        scrollPercentRounded < 50 &&
        !window.dataLayer.some(e => e.quartile === '25')
    ) {
        window.dataLayer.push({ event: 'trackScroll', quartile: '25' });
    }

    if (
        scrollPercentRounded > 50 &&
        scrollPercentRounded < 75 &&
        !window.dataLayer.some(e => e.quartile === '50')
    ) {
        window.dataLayer.push({ event: 'trackScroll', quartile: '50' });
    }
    if (
        scrollPercentRounded > 75 &&
        scrollPercentRounded < 100 &&
        !window.dataLayer.some(e => e.quartile === '75')
    ) {
        window.dataLayer.push({ event: 'trackScroll', quartile: '75' });
    }
    if (
        scrollPercentRounded === 100 &&
        !window.dataLayer.some(e => e.quartile === '100')
    ) {
        window.dataLayer.push({ event: 'trackScroll', quartile: '100' });
    }

    if (
        scrolledIntoView('#fin-cuerpo') &&
        !window.dataLayer.some(e => e.quartile === 'fin del contenido')
    ) {
        window.dataLayer.push({
            event: 'trackScroll',
            quartile: 'fin del contenido'
        });
    }

    if (
        scrolledIntoView('#comentarios') &&
        !window.dataLayer.some(e => e.quartile === 'fin caja sugerencias')
    ) {
        window.dataLayer.push({
            event: 'trackScroll',
            quartile: 'fin caja sugerencias'
        });
    }
}

const scrolledIntoView = elem => {
    const element = document.querySelector(elem);

    if (element) {
        const docViewTop = window.scrollY;
        const docViewBottom = docViewTop + window.screen.height;

        const elemTop = element.offsetTop;
        const elemBottom = elemTop + element.clientHeight;

        return elemBottom <= docViewBottom && elemTop <= docViewTop;
    }
    return false;
};
