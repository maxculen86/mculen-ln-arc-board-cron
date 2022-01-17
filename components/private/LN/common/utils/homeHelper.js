/* eslint-disable camelcase */
/* eslint-disable no-undef */
import useViewportSize from '../../../common/hooks/useViewportSize';
import get from '../../../common/utils/get';
import sectionsValidation from '../../../../layouts/config/LN-Home.config';

export const getChildsFromSections = (renderable = [], sectionPosition) => {
    return get(renderable, `[${sectionPosition}].children`, []);
};

export const isBombaVisible = (renderable = []) => {
    const features = getChildsFromSections(
        renderable,
        get(sectionsValidation, 'Bomba.position', 2) + 1
    );

    const bombaFiltered = features.filter(
        element =>
            get(element, 'props.customFields.hideFeature', false) !== true &&
            get(element, 'type', null) === 'LN-common/bomba'
    );

    return bombaFiltered.length === 1 || false;
};

export const getViewport = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const device = useViewportSize();
    return {
        isMobile: device === 'mobile',
        isTablet: device === 'tablet',
        isDesktop: device === 'desktop',
        device
    };
};

export const sectionsWithBlocks = {
    apertura1: 'bloque1',
    apertura2: 'bloque1',
    apertura: 'bloque1',
    multimedia: 'bloque2',
    anexo2: 'bloque2',
    breaking1: 'bloque2',
    breaking2: 'bloque3',
    breaking3: 'bloque3',
    anexo3: 'bloque3',
    opinion: 'bloque3',
    breaking4: 'bloque3',
    breaking5: 'bloque3',
    ranking: 'bloque4',
    comercial1: 'bloque4',
    bloque2: 'bloque4',
    comercial2: 'bloque4',
    bloque3: 'bloque4',
    bloque4: 'bloque5',
    bloque5: 'bloque5',
    bloque6: 'bloque5',
    bloque7: 'bloque5',
    bloque8: 'bloque5'
};

export const getSectionVisible = (scrollParent, targetElements) => {
    let bestMatch = {};
    targetElements.forEach(domElm => {
        // check distance from top, takig scroll into account
        const delta = Math.abs(scrollParent - domElm.offsetTop);

        if (!bestMatch.sectionName)
            bestMatch = { sectionName: domElm.dataset.section, delta };

        // check which delet is closest to "0"
        if (delta < bestMatch.delta) {
            bestMatch = { sectionName: domElm.dataset.section, delta };
        }
    });

    // update state with best-fit section
    return bestMatch.sectionName;
};

export const isScrollbarVisible = () => {
    return (
        get(document, 'documentElement.scrollHeight', 0) >
        get(document, 'documentElement.clientHeight', 0)
    );
};

export const scrollToSection = lastSectionSaw => {
    if (lastSectionSaw === Object.keys(sectionsWithBlocks)[0]) return false;
    const element = document.querySelectorAll(
        `[data-section=${lastSectionSaw}]`
    );
    if (element && element.length === 0) return false;
    const elementRect = element[0].getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    const middle = absoluteElementTop - window.innerHeight / 2;
    window.scrollTo(0, middle);
    return true;
};
