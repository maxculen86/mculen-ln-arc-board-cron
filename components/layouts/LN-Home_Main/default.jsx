/* eslint-disable consistent-return */
import React, { useEffect, useReducer } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import get from '../../private/common/utils/get';
import throttle from '../../private/common/utils/throttle';
import Header from '../../private/LN/common/header';
import Footer from '../../private/LN/common/footer/home';
import GlobalProvider from '../../private/common/context/globalContext';
import LoginProvider from '../../private/LN/common/context/loginContext';
// import getBannerMegatop from '../../private/common/utils/getBannerMegatop';
// import BannerRefactor from '../../features/LN-common/bannerRefactor';
import LoadBanners from '../../private/common/banners/LoadBanners';
import getScrollPercent from '../../private/LN/common/utils/getScrollPercent';
import AnexoFeature from '../../features/LN-acumulado/anexoIframe';
import SubHeader from '../../features/LN-common/subHeader';
import TePuedeInteresar from '../../features/LN-nota/tePuedeInteresar/default';
import validateSectionHome from '../../private/common/utils/validateSectionHome';

const pageBuilderSections = [
    'Anticipo',
    'Anexo_1',
    'Bomba',
    'Apertura',
    'Anexo_2',
    'Breaking_1',
    'Breaking_2',
    'Breaking_3',
    'Anexo_3',
    'Opinion',
    'Breaking_4',
    'Breaking_5',
    'Breaking_6',
    'Comercial_1',
    'Bloque_2',
    'Comercial_2',
    'Bloque_3',
    'Bloque_4',
    'Bloque_5',
    'Bloque_6',
    'Bloque_7',
    'Bloque_8'
];

const reducer = (state, action) => {
    switch (action.type) {
        case 'update': {
            const newState = updateBlocks(state, action.payload);
            return newState;
        }
        case 'updateNextBlock': {
            if (!checkIfOneBlockIsFalse(state)) return state;
            const newState2 = updateNextBlock(state);
            return newState2;
        }
        default:
            throw new Error();
    }
};

const updateBlocks = (blocks, lastBlock) => {
    const newState = { ...blocks };
    if (!lastBlock) return blocks;
    const number = Number(lastBlock.slice(-1)) + 1;
    Object.keys(blocks).forEach(key => {
        if (key.slice(-1) <= number) newState[key] = true;
    });
    return newState;
};

const updateNextBlock = blocks => {
    const b = { ...blocks };
    Object.keys(blocks).some(key => {
        if (b[key] === false) {
            b[key] = true;
            return true;
        }
    });
    return b;
};

const checkIfOneBlockIsFalse = blocksToLoad => {
    return Object.keys(blocksToLoad).some(key => !blocksToLoad[key]);
};

const sectionsWithBlocks = {
    anticipo: 'bloque1',
    anexo1: 'bloque1',
    bomba: 'bloque1',
    apertura: 'bloque1',
    anexo2: 'bloque2',
    breaking1: 'bloque2',
    breaking2: 'bloque2',
    breaking3: 'bloque2',
    anexo3: 'bloque3',
    opinion: 'bloque3',
    breaking4: 'bloque3',
    breaking5: 'bloque3',
    breaking6: 'bloque3',
    comercial1: 'bloque3',
    bloque2: 'bloque4',
    comercial2: 'bloque4',
    bloque3: 'bloque4',
    bloque4: 'bloque4',
    bloque5: 'bloque5',
    bloque6: 'bloque5',
    bloque7: 'bloque5',
    bloque8: 'bloque5',
    bloque9: 'Bloque5'
};

const LNMainHome = props => {
    const { children, outputType, isAdmin, renderables } = props;

    const [
        anticipo,
        anexo1,
        bomba,
        apertura,
        anexo2,
        breaking1,
        breaking2,
        breaking3,
        anexo3,
        opinion,
        breaking4,
        breaking5,
        breaking6,
        comercial1,
        bloque2,
        comercial2,
        bloque3,
        bloque4,
        bloque5,
        bloque6,
        bloque7,
        bloque8
    ] = pageBuilderSections.map((section, index) => {
        return validateSectionHome(
            children[index],
            section,
            index,
            renderables,
            outputType,
            isAdmin
        );
    });

    const [blocksToLoad, dispatch] = useReducer(reducer, {
        bloque1: true,
        bloque2: isAdmin,
        bloque3: isAdmin,
        bloque4: isAdmin,
        bloque5: isAdmin
    });

    const isScrollbarVisible = () => {
        return (
            get(document, 'documentElement.scrollHeight', 0) >
            get(document, 'documentElement.clientHeight', 0)
        );
    };

    const getSectionVisible = (scrollParent, targetElements) => {
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

    const scrollToSection = lastSectionSaw => {
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

    useEffect(() => {
        const handleScroll = throttle((e, dataSections) => {
            try {
                sessionStorage.setItem('hp', window.pageYOffset);
                const scrollTop = get(
                    e,
                    'target.scrollingElement.scrollTop',
                    0
                );
                const sectionVisible = getSectionVisible(
                    scrollTop,
                    dataSections
                );
                if (!sectionVisible) return;
                sessionStorage.setItem('lb', sectionVisible);
                const scrollPercentRounded = getScrollPercent();
                if (scrollPercentRounded > 70) {
                    // const blockToLoad = sectionsWithBlocks[sectionVisible];
                    dispatch({ type: 'updateNextBlock' });
                }
            } catch (error) {
                console.log('Error en useEffect =>', error);
                // Si tiene corrupto sessionStorage muestro todo el sitio
                dispatch({ type: 'update', payload: 'bloque5' });
            }
        }, 25);

        const dataSections = document.querySelectorAll('[data-section]');
        window.addEventListener('scroll', e => handleScroll(e, dataSections));
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // First Load
    useEffect(() => {
        const lastSectionSaw = sessionStorage.getItem('lb');
        const lastScrollPosition = sessionStorage.getItem('hp');

        const isScrollVisible = isScrollbarVisible();
        if (!isScrollVisible) {
            // Si resolution no tiene scroll bar, se fuerza cargar bloque 2
            dispatch({ type: 'update', payload: 'bloque1' });
        }

        if (!lastSectionSaw || !lastScrollPosition) return;
        const lastBlockSaw = sectionsWithBlocks[lastSectionSaw];
        // const newStatusBlocks = updateBlocks(blocksToLoad, lastBlockSaw);
        dispatch({ type: 'update', payload: lastBlockSaw });
        // setBlocksToLoad(newStatusBlocks);

        const readyToMove = scrollToSection(lastSectionSaw);

        const timer = setTimeout(() => {
            if (readyToMove) window.scrollTo(0, lastScrollPosition);
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <GlobalProvider>
            <LoginProvider>
                {/* {megatop} */}
                <div id="wrapper" className="home">
                    <Header />
                    <SubHeader />
                    {anticipo}
                    {anexo1}
                    {bomba}
                    <main>
                        {/* {stickyMobile} */}
                        <div className="row">
                            {/* <div className="lay">{preApertura}</div> */}
                            <div id="content-main" className="lay-sidebar">
                                {/* Cuerpo */}
                                <div className="sidebar__main">
                                    {/* 1er Bloque */}
                                    <div data-section="apertura">
                                        {apertura}
                                    </div>

                                    <div data-section="anexo2">
                                        {blocksToLoad.bloque2 && anexo2}
                                    </div>
                                    <div data-section="breaking1">
                                        {blocksToLoad.bloque2 && breaking1}
                                    </div>
                                    {/* BANNER  */}
                                    <div data-section="breaking2">
                                        {blocksToLoad.bloque2 && breaking2}
                                    </div>
                                    {/* BANNER */}
                                    {blocksToLoad.bloque2 && (
                                        <div className="row-gap-tablet-3 --ads" />
                                    )}
                                    <div data-section="breaking3">
                                        {blocksToLoad.bloque2 && breaking3}
                                    </div>
                                    {/* 2do Bloque */}
                                    <div data-section="anexo3">
                                        {blocksToLoad.bloque3 && anexo3}
                                    </div>
                                    <div data-section="opinion">
                                        {blocksToLoad.bloque3 && opinion}
                                    </div>
                                    <div data-section="breaking4">
                                        {blocksToLoad.bloque3 && breaking4}
                                    </div>
                                    {/* BANNER */}
                                    <div data-section="breaking5">
                                        {blocksToLoad.bloque3 && breaking5}
                                    </div>
                                    <div data-section="breaking6">
                                        {blocksToLoad.bloque3 && breaking6}
                                    </div>
                                </div>
                                <div className="sidebar__aside hlp-tabletlm-none">
                                    {/* BANNERS, RANKING DE NOTAS */}
                                </div>
                            </div>
                            {blocksToLoad.bloque3 && (
                                <div
                                    data-section="ranking"
                                    className="lay ranking-ln9"
                                >
                                    <AnexoFeature
                                        id="ranking"
                                        customFields={{
                                            url:
                                                'https://www.lanacion.com.ar/masleidas/home'
                                        }}
                                    />
                                </div>
                            )}
                            <div id="content-main-2" className="lay-sidebar">
                                {/* Cuerpo */}
                                <div className="sidebar__main">
                                    <div data-section="comercial1">
                                        {blocksToLoad.bloque3 && comercial1}
                                    </div>
                                    {/* 3er Bloque */}
                                    <div data-section="bloque2">
                                        {blocksToLoad.bloque4 && bloque2}
                                    </div>
                                    <div data-section="comercial2">
                                        {blocksToLoad.bloque4 && comercial2}
                                    </div>
                                    <div data-section="bloque3">
                                        {blocksToLoad.bloque4 && bloque3}
                                    </div>
                                    <div data-section="bloque4">
                                        {blocksToLoad.bloque4 && bloque4}
                                    </div>
                                    {/* 4to Bloque */}
                                    <div data-section="bloque5">
                                        {blocksToLoad.bloque5 && bloque5}
                                    </div>
                                    <div data-section="bloque6">
                                        {blocksToLoad.bloque5 && bloque6}
                                    </div>
                                    <div data-section="bloque7">
                                        {blocksToLoad.bloque5 && bloque7}
                                    </div>
                                    <div data-section="bloque8">
                                        {blocksToLoad.bloque5 && bloque8}
                                    </div>
                                    {blocksToLoad.bloque5 && (
                                        <TePuedeInteresar
                                            customFields={{ cantidadNotas: 6 }}
                                        />
                                    )}
                                </div>
                                <div className="sidebar__aside hlp-tabletlm-none">
                                    {/* BANNERS, RANKING DE NOTAS */}
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
                <LoadBanners />
            </LoginProvider>
        </GlobalProvider>
    );
};

LNMainHome.propTypes = {
    children: PropTypes.node.isRequired,
    renderables: PropTypes.node.isRequired,
    outputType: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    globalContent: PropTypes.shape({
        style: PropTypes.shape({
            section_style_name: PropTypes.string,
            headerdark: PropTypes.string
        }),
        name: PropTypes.string,
        acumuladoGeneral: PropTypes.shape({
            tipo_acumulado: PropTypes.string,
            hierarchy_navigation: PropTypes.string,
            hide_banner: PropTypes.string,
            cantidad_notas: PropTypes.string,
            id_collection_promo_items: PropTypes.string
        }),
        acumuladoColor: PropTypes.shape({
            header_class_name: PropTypes.string,
            background_color: PropTypes.string,
            navigation_color: PropTypes.string,
            navigation_color_tags: PropTypes.string,
            id_logo_image: PropTypes.string
        }),
        articlesInCollection: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string
            })
        ).isRequired
    }).isRequired
};

LNMainHome.sections = pageBuilderSections;

export default Consumer(LNMainHome);
