/* eslint-disable camelcase */
import React from 'react';
import Ln_Caja_Collection from '../../../../chains/Ln_Caja_Collection/default';
import Ln_Caja_Manual from '../../../../chains/Ln_Caja_Manual/default';
import useViewportSize from '../../../common/hooks/useViewportSize';
import get from '../../../common/utils/get';
import WithSkeletonBannerWithoutHide from '../bannerRefactor/withSkeletonBannerWithoutHide';

const Components = {
    Ln_Caja_Collection,
    Ln_Caja_Manual
};

const createComponent = element => {
    if (typeof Components[element.type] !== 'undefined') {
        return React.createElement(Components[element.type], {
            ...element.props
        });
    }
    return null;
};

export const getChainsFromSections = (renderable = [], sectionPosition) => {
    return get(renderable, `[${sectionPosition}].children`, []);
};

export const getChainsFromApertura = (renderable = []) => {
    const chains = getChainsFromSections(renderable, 4);
    const chainApertura1 = createComponent(chains[0] || {});
    const chainApertura2 = createComponent(chains[1] || {});
    return { chainApertura1, chainApertura2 };
};

export const getViewport = () => {
    const device = useViewportSize();
    return {
        isMobile: device === 'mobile', 
        isTablet: device === 'tablet', 
        isDesktop: device === 'desktop'
    };
};

export const DivBanner = ({ id, classes, shouldRender }) => {
    if (typeof window === 'undefined')
        return <WithSkeletonBannerWithoutHide slotId={id} />;

    if (!shouldRender) return <></>;
    return <div id={id} className={`com-banner ${classes}`} />;
};

export const sectionsWithBlocks = {
    apertura: 'bloque2',
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

export const scrollToSection = lastSectionSaw => {
    if (lastSectionSaw === Object.keys(sectionsWithBlocks)[0]) return false;
    const element = document.querySelectorAll(
        `[data-section=${lastSectionSaw}]`
    );
    if (element && element.length === 0) return;
    const elementRect = element[0].getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    const middle = absoluteElementTop - window.innerHeight / 2;
    window.scrollTo(0, middle);
    return true;
};
