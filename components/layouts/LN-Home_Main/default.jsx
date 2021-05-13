/* eslint-disable consistent-return */
import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import get from '../../private/common/utils/get';
import throttle from '../../private/common/utils/throttle';
import Header from '../../private/LN/common/header';
import Footer from '../../private/LN/common/footer/home';
import GlobalProvider from '../../private/common/context/globalContext';
import LoginProvider from '../../private/LN/common/context/loginContext';
import LoadBanners from '../../private/common/banners/LoadBanners';
import blocksBanners from '../../private/common/banners/blocksBannerHome';
import Metarefresh from '../../features/LN-common/metarefresh';
import {
    DivBanner,
    BannerComercial,
    getChainsFromApertura,
    sectionsWithBlocks,
    getSectionVisible,
    scrollToSection,
    getViewport,
    isScrollbarVisible
} from '../../private/LN/common/utils/homeHelper';
import getScrollPercent from '../../private/LN/common/utils/getScrollPercent';
import AnexoFeature from '../../features/LN-acumulado/anexoIframe';
import SubHeader from '../../features/LN-common/subHeader';
import TePuedeInteresar from '../../features/LN-nota/tePuedeInteresar/default';

const pageBuilderSections = [
    'Anticipo',
    'Anexo-1',
    'Bomba',
    'Apertura',
    'Anexo-2',
    'Breaking-1',
    'Breaking-2',
    'Breaking-3',
    'Anexo-3',
    'Opinion',
    'Breaking-4',
    'Breaking-5',
    'Breaking-6',
    'Comercial-1',
    'Bloque-2',
    'Comercial-2',
    'Bloque-3',
    'Bloque-4',
    'Bloque-5',
    'Bloque-6',
    'Bloque-7',
    'Bloque-8'
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
    const number = Number(lastBlock.slice(-1));
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

const LNMainHome = props => {
    const {
        children: [
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
        ],
        outputType,
        tree,
        renderables,
        isAdmin,
        siteProperties
    } = props;

    const { chainApertura1, chainApertura2 } = getChainsFromApertura(
        renderables
    );

    const { isMobile, isTablet, isDesktop, device } = getViewport();

    const [blocksToLoad, dispatch] = useReducer(reducer, {
        bloque1: true,
        bloque2: isAdmin,
        bloque3: isAdmin,
        bloque4: isAdmin,
        bloque5: isAdmin
    });

    // First load
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
                {/* 1x1 */}
                <DivBanner
                    id="unoxuno_dsk"
                    shouldRender={isDesktop}
                    validateSuscription
                />
                <DivBanner
                    id="unoxuno_mob"
                    shouldRender={isMobile}
                    validateSuscription
                />
                {/* COMERCIAL */}
                {isDesktop && (
                    <BannerComercial
                        id="comercial_dsk"
                        device={device}
                        siteProperties={siteProperties}
                    />
                )}
                {isMobile && (
                    <BannerComercial
                        id="comercial_mob"
                        device={device}
                        siteProperties={siteProperties}
                    />
                )}

                <div id="wrapper" className="home">
                    <Header />
                    <SubHeader />
                    {anticipo}
                    {anexo1}
                    {bomba}
                    <main>
                        {/* STICKY MOB */}
                        <DivBanner id="sticky2_mob" shouldRender={isMobile} />
                        <div className="row">
                            <div id="content-main" className="lay-sidebar">
                                {/* Cuerpo */}
                                <div className="sidebar__main">
                                    {/* BANNER CABEZAL */}
                                    <DivBanner
                                        id="cabezal_dsk"
                                        shouldRender={isDesktop}
                                    />
                                    <DivBanner
                                        id="cabezal_tab"
                                        shouldRender={isTablet}
                                    />

                                    {/* 1er Bloque */}
                                    <div data-section="apertura">
                                        {chainApertura1}
                                        {/* BANNER CAJA 1 MOB */}
                                        <DivBanner
                                            id="caja1_mob"
                                            shouldRender={isMobile}
                                        />
                                        {chainApertura2}
                                    </div>

                                    {/* BANNER BILLBOARD */}
                                    <DivBanner
                                        id="billboard_dsk"
                                        shouldRender={isDesktop}
                                    />

                                    {/* BANNER CAJA 2 MOB */}
                                    {blocksToLoad.bloque2 && (
                                        <DivBanner
                                            id="caja2_mob"
                                            shouldRender={isMobile}
                                        />
                                    )}
                                    <div data-section="anexo2">
                                        {blocksToLoad.bloque2 && anexo2}
                                    </div>
                                    <div data-section="breaking1">
                                        {blocksToLoad.bloque2 && breaking1}
                                    </div>
                                    {/* BANNER CAJA 3 MOB */}
                                    {blocksToLoad.bloque2 && (
                                        <>
                                            <DivBanner
                                                id="caja3_mob"
                                                shouldRender={isMobile}
                                            />
                                            <div className="row-gap-tablet-2 --ads">
                                                <DivBanner
                                                    id="caja1_tab"
                                                    shouldRender={isTablet}
                                                />
                                                <DivBanner
                                                    id="caja2_tab"
                                                    shouldRender={isTablet}
                                                />
                                            </div>
                                        </>
                                    )}
                                    {/* BANNER CAJA DSK  */}
                                    {blocksToLoad.bloque2 && (
                                        <div className="row-gap-tablet-3 --ads">
                                            <DivBanner
                                                id="caja1_dsk"
                                                shouldRender={isDesktop}
                                            />
                                            <DivBanner
                                                id="caja_producto1_dsk"
                                                shouldRender={isDesktop}
                                            />
                                            <DivBanner
                                                id="caja2_dsk"
                                                shouldRender={isDesktop}
                                            />
                                        </div>
                                    )}
                                    <div data-section="breaking2">
                                        {blocksToLoad.bloque2 && breaking2}
                                    </div>
                                    {/* BANNER CAJA 4 MOB */}
                                    {blocksToLoad.bloque2 && (
                                        <>
                                            <DivBanner
                                                id="caja4_mob"
                                                shouldRender={isMobile}
                                            />
                                            <DivBanner
                                                id="middle1_tab"
                                                shouldRender={isTablet}
                                            />
                                        </>
                                    )}
                                    {/* BANNER CINTURON 1 */}
                                    {blocksToLoad.bloque2 && (
                                        <DivBanner
                                            id="cinturon1_dsk"
                                            shouldRender={isDesktop}
                                        />
                                    )}

                                    <div data-section="breaking3">
                                        {blocksToLoad.bloque2 && breaking3}
                                    </div>
                                    {/* 2do Bloque */}
                                    {blocksToLoad.bloque3 && anexo3}
                                    {/* BANNER CAJA 5 MOB - BANNER CINTURON 2 - BANNER MIDDLE 2 */}
                                    {blocksToLoad.bloque3 && (
                                        <>
                                            <DivBanner
                                                id="caja5_mob"
                                                shouldRender={isMobile}
                                            />
                                            <DivBanner
                                                id="cinturon2_dsk"
                                                shouldRender={isDesktop}
                                            />
                                            <DivBanner
                                                id="middle2_tab"
                                                shouldRender={isTablet}
                                            />
                                        </>
                                    )}

                                    <div data-section="opinion">
                                        {blocksToLoad.bloque3 && opinion}
                                    </div>
                                    {/* BANNER  */}
                                    {blocksToLoad.bloque3 && (
                                        <div className="row-gap-tablet-3 --ads">
                                            <DivBanner
                                                id="caja3_dsk"
                                                shouldRender={isDesktop}
                                            />
                                            <DivBanner
                                                id="caja_producto2_dsk"
                                                shouldRender={isDesktop}
                                            />
                                            <DivBanner
                                                id="caja4_dsk"
                                                shouldRender={isDesktop}
                                            />
                                        </div>
                                    )}
                                    {/* BANNER CAJAS TAB */}
                                    {blocksToLoad.bloque3 && (
                                        <div className="row-gap-tablet-2 --ads">
                                            <DivBanner
                                                id="caja3_tab"
                                                shouldRender={isTablet}
                                            />
                                            <DivBanner
                                                id="caja4_tab"
                                                shouldRender={isTablet}
                                            />
                                        </div>
                                    )}
                                    <div data-section="breaking4">
                                        {blocksToLoad.bloque3 && breaking4}
                                    </div>
                                    {/* BANNER MIDDLE 1 */}
                                    {blocksToLoad.bloque3 && (
                                        <DivBanner
                                            id="middle1_dsk"
                                            shouldRender={isDesktop}
                                        />
                                    )}
                                    <div data-section="breaking5">
                                        {blocksToLoad.bloque3 && breaking5}
                                    </div>
                                    <div data-section="breaking6">
                                        {blocksToLoad.bloque3 && breaking6}
                                    </div>
                                </div>
                                <div className="sidebar__aside hlp-tabletlm-none">
                                    {/* BANNERS */}
                                     <DivBanner
                                            id="megalateral_dsk"
                                            classes="--megalateral"
                                            shouldRender={isDesktop}
                                        />
                                </div>
                            </div>
                            {/* RANKING */}
                            {blocksToLoad.bloque3 && (
                                <div
                                    data-section="ranking"
                                    className="lay ranking-ln9"
                                >
                                    <AnexoFeature
                                        id="ranking"
                                        customFields={{
                                            url:
                                                'https://dp-ln9.lanacion.com.ar/masleidas/home'
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
                                    {/* 4to Bloque */}
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
                                    {/* 5to Bloque */}
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
                                    {/* BANNER ASIDE */}
                                    {blocksToLoad.bloque4 && (
                                        <DivBanner
                                            id="megalateral2_dsk"
                                            classes="--megalateral"
                                            shouldRender={isDesktop}
                                        />
                                    )}
                                    {blocksToLoad.bloque5 && (
                                        <DivBanner
                                            id="megalateral3_dsk"
                                            classes="--megalateral"
                                            shouldRender={isDesktop}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="lay-sidebar">
                                <div className="sidebar__main">
                                    {/* ADHESION */}
                                    <DivBanner
                                        id="adhesion_dsk"
                                        classes="--adhesiondsk"
                                        shouldRender={isDesktop}
                                        closeButton
                                        validateSuscription
                                    />

                                    <DivBanner
                                        id="adhesion_mob"
                                        shouldRender={isMobile}
                                        closeButton
                                        validateSuscription
                                    />
                                    <DivBanner
                                        id="adhesion_tab"
                                        shouldRender={isTablet}
                                        closeButton
                                        validateSuscription
                                    />
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
                <LoadBanners blocksBanners={blocksBanners.bloque1} />
                {blocksToLoad.bloque2 && (
                    <LoadBanners blocksBanners={blocksBanners.bloque2} />
                )}
                {blocksToLoad.bloque3 && (
                    <LoadBanners blocksBanners={blocksBanners.bloque3} />
                )}
                {blocksToLoad.bloque4 && (
                    <LoadBanners blocksBanners={blocksBanners.bloque4} />
                )}
                {blocksToLoad.bloque5 && (
                    <LoadBanners blocksBanners={blocksBanners.bloque5} />
                )}
                <Metarefresh />
            </LoginProvider>
        </GlobalProvider>
    );
};

LNMainHome.propTypes = {
    siteProperties: PropTypes.node,
    children: PropTypes.node.isRequired,
    outputType: PropTypes.string,
    tree: PropTypes.shape(PropTypes.arrayOf(PropTypes.node)).isRequired,
    renderables: PropTypes.arrayOf(PropTypes.node).isRequired,
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
        )
    }).isRequired
};

LNMainHome.defaultProps = {
    outputType: 'default',
    siteProperties: undefined
};

LNMainHome.sections = pageBuilderSections;

export default Consumer(LNMainHome);
