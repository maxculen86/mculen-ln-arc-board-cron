/* eslint-disable no-undef */
import React, { useContext, forwardRef } from 'react';
import Ln_Caja_Collection from '../../../../chains/Ln_Caja_Collection/default';
import Ln_Caja_Manual from '../../../../chains/Ln_Caja_Manual/default';
import ArticleFeature from '../../../../features/LN-common/articulo/default';
import useViewportSize from '../../../common/hooks/useViewportSize';
import findTermica from '../../../common/utils/findTermica';
import get from '../../../common/utils/get';
import { slotsConfig } from '../bannerRefactor/config';
import Comercial from '../bannerRefactor/factory/default/types/comercial';
import WithSkeletonBannerWithoutHide from '../bannerRefactor/withSkeletonBannerWithoutHide';
import { LoginStore } from '../context/loginContext';

const Components = {
    Ln_Caja_Collection,
    Ln_Caja_Manual
};

const withChilds = (childrens = []) => {
    return childrens.map(child => {
        return (
            <ArticleFeature {...child.props} />
        )
    })
};

const createComponent = element => {
    if (typeof Components[element.type] !== 'undefined') {
        return React.createElement(Components[element.type], {
            ...element.props,
            children: withChilds(element.children),
            childProps: element.children
        } 
        )
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

export const DivBanner = forwardRef((props, ref) => {
    const {
        id,
        classes = '',
        shouldRender,
        closeButton,
        fixed,
        validateSuscription = false
    } = props;
    const subscription = validateSuscription ? getSubscription() : false;

    if (typeof window === 'undefined')
        return <WithSkeletonBannerWithoutHide slotId={id} />;

    if (!shouldRender || (validateSuscription && subscription)) return <></>;

    return (
        <div
            className={`mod-banner ${classes} ${
                closeButton ? '--close' : ' '
            } ${fixed ? '--fixed' : ''} --${id}`}
            ref={ref}
        >
            {closeButton && (
                <button
                    type="button"
                    aria-label="Close"
                    className="icon-close"
                    onClick={() => ref.current.remove()}
                />
            )}
            <div id={id} className={`com-banner ${classes || ''}`} />
        </div>
    );
});

export const BannerComercial = ({ id, device, siteProperties }) => {
    if (typeof window === 'undefined')
        return <WithSkeletonBannerWithoutHide slotId={id} />;

    const termicas = findTermica('banners');
    const config = slotsConfig.home[id] || {};
    const dfpId = get(siteProperties, 'bannerConfig.dfp_id');

    return (
        <Comercial
            isHome
            targeting={config.targeting}
            dimensions={config.dimensions}
            dfpId={dfpId}
            show={{
                termicas,
                collections: true
            }}
            bidding={{}}
            sizemap={{}}
            device={device}
            slotId={id}
            slotName={config.slotName}
            slotGroup="home"
        />
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
