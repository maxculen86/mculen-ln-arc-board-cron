export default function handleScrollForNota() {
    if (typeof window === 'undefined') return;
    if (window.dataLayer === 'undefined') return;

    const scrollPercentRounded = getScrollPercent(); // Math.round(scrollPercent * 100);

    if (scrollPercentRounded > 25) {
        if (!window.dataLayer.some(e => e.quartile === '25')) {
            window.dataLayer.push({ 'event': 'trackScroll', 'quartile': '25' });
        }
    }

    if (scrollPercentRounded > 50) {
        if (!window.dataLayer.some(e => e.quartile === '50')) {
            window.dataLayer.push({ 'event': 'trackScroll', 'quartile': '50' });
        }
    }
    if (scrollPercentRounded > 75) {
        if (!window.dataLayer.some(e => e.quartile === '75')) {
            window.dataLayer.push({ 'event': 'trackScroll', 'quartile': '75' });
        }
    }
    if (scrollPercentRounded === 100) {
        if (!window.dataLayer.some(e => e.quartile === '100')) {
            window.dataLayer.push({ 'event': 'trackScroll', 'quartile': '100' });
        }
    }

    if (scrolledIntoView('#fin-cuerpo')) {
        if (!window.dataLayer.some(e => e.quartile === 'fin del contenido')) {
            window.dataLayer.push({
                'event': 'trackScroll',
                'quartile': 'fin del contenido'
            });
        }
    }

    if (scrolledIntoView('#comentarios')) {
        if (
            !window.dataLayer.some(e => e.quartile === 'fin caja sugerencias')
        ) {
            window.dataLayer.push({
                'event': 'trackScroll',
                'quartile': 'fin caja sugerencias'
            });
        }
    }
}

const getScrollPercent = () => {
    const docElem = document.documentElement;
    const bod = document.body;
    return (
        ((docElem.scrollTop || bod.scrollTop) /
            ((docElem.scrollHeight || bod.scrollHeight) -
                docElem.clientHeight)) *
        100
    );
};

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
