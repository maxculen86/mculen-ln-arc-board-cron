/* eslint-disable camelcase */
/* eslint-disable no-undef */
import React, { useContext } from 'react';
import Ln_Caja_Collection from '../../../../chains/Ln_Caja_Collection/default';
import Ln_Caja_Manual from '../../../../chains/Ln_Caja_Manual/default';
import ArticleFeature from '../../../../features/LN-common/articulo/default';
import useViewportSize from '../../../common/hooks/useViewportSize';
import get from '../../../common/utils/get';
import { LoginStore } from '../context/loginContext';
import sectionsValidation from '../../../../layouts/config/LN-Home.config';
import DivBanner from '../../../common/banners/DivBanner';

const Components = {
    Ln_Caja_Collection,
    Ln_Caja_Manual
};

const withChilds = (childrens = []) => {
    return childrens.map(child => {
        return <ArticleFeature {...child.props} />;
    });
};

const createComponent = element => {
    if (typeof Components[element.type] !== 'undefined') {
        return React.createElement(
            Components[element.type],
            {
                ...element.props,
                childProps: element.children
            },
            withChilds(element.children)
        );
    }
    return null;
};

export const getChildsFromSections = (renderable = [], sectionPosition) => {
    return get(renderable, `[${sectionPosition}].children`, []);
};

export const getChainsFromApertura = (renderable = []) => {
    const chains = getChildsFromSections(
        renderable,
        get(sectionsValidation, 'Apertura.position', 3) + 1
    );
    const chainApertura1 = createComponent(chains[0] || {});
    const chainApertura2 = createComponent(chains[1] || {});
    return { chainApertura1, chainApertura2 };
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
    const device = useViewportSize();
    return {
        isMobile: device === 'mobile',
        isTablet: device === 'tablet',
        isDesktop: device === 'desktop',
        device
    };
};

export const getSubscription = () => {
    const { state } = useContext(LoginStore);
    const { loginData } = state || {};
    const { subscription = false } = loginData || {};
    return subscription;
};

// eslint-disable-next-line react/prop-types
export const BannerCabezal = ({ isDesktop, isTablet }) => {
    return (
        <>
            <DivBanner id="cabezal_dsk" shouldRender={isDesktop} />
            <DivBanner id="cabezal_tab" shouldRender={isTablet} />
        </>
    );
};

export const sectionsWithBlocks = {
    apertura: 'bloque1',
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
