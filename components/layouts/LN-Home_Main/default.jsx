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
    sectionsWithBlocks,
    getSectionVisible,
    scrollToSection,
    getViewport,
    isScrollbarVisible,
    isBombaVisible,
    validateSectionHome
} from '../../private/LN/common/utils/homeHelper';
import getScrollPercent from '../../private/LN/common/utils/getScrollPercent';
import AnexoFeature from '../../features/LN-acumulado/anexoIframe';
import SubHeader from '../../features/LN-common/subHeader';
import TePuedeInteresar from '../../features/LN-nota/tePuedeInteresar/default';
import DivBanner from '../../private/common/banners/DivBanner';
import BannerComercial from '../../private/common/banners/BannerComercial';
import pageBuilderSections from '../config/LN-PageBuilder.config.json';
import TagsListFeature from '../../features/LN-acumulado/tagList';
import CajaPromo from '../../features/LN-common/cajaPromo/default';

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

const BannerCabezal = ({ isDesktop, isTablet }) => {
    return (
        <>
            <DivBanner
                id="cabezal_dsk"
                shouldRender={isDesktop}
                classes="--dark"
            />
            <DivBanner
                id="cabezal_tab"
                shouldRender={isTablet}
                classes="--dark"
            />
        </>
    );
};

const LNMainHome = props => {
    const { children, outputType, isAdmin, renderables } = props;

    const [
        anticipo,
        anexo1,
        bomba,
        apertura1,
        apertura2,
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

    const showBomba = isBombaVisible(renderables);

    const { isMobile, isTablet, isDesktop, device } = getViewport();

    const [blocksToLoad, dispatch] = useReducer(reducer, {
        bloque1: true,
        bloque2: isAdmin,
        bloque3: isAdmin,
        bloque4: isAdmin,
        bloque5: isAdmin
    });

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
            // Si resolution no tiene scroll bar, se fuerza cargar hasta bloque 3
            dispatch({ type: 'update', payload: 'bloque3' });
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
                        slotGroup="home"
                    />
                )}
                {isMobile && (
                    <BannerComercial
                        id="comercial_mob"
                        device={device}
                        slotGroup="home"
                    />
                )}

                <div id="wrapper" className="home">
                    <Header />
                    <SubHeader />
                    {/* ANTICIPO */}
                    {anticipo}

                    {/* ANEXO_1 */}
                    <section
                        data-block-name="h_anexo-1"
                        data-diagramacion-id="9999"
                        data-is-block="true"
                    >
                        {anexo1}
                    </section>

                    {/* BANNER_CABEZAL (BOMBA) */}
                    {showBomba && (
                        <BannerCabezal
                            isTablet={isTablet}
                            isDesktop={isDesktop}
                        />
                    )}

                    {/* BOMBA */}
                    {bomba}
                    <main>
                        {/* STICKY MOB */}
                        <DivBanner
                            id="sticky2_mob"
                            classes="--sticky2_mob --sticky"
                            shouldRender={isMobile}
                        />
                        <div className="row">
                            <div id="content-main" className="lay-sidebar">
                                {/* Cuerpo */}
                                <div className="sidebar__main">
                                    {/* BANNER CABEZAL */}
                                    {!showBomba && (
                                        <BannerCabezal
                                            isTablet={isTablet}
                                            isDesktop={isDesktop}
                                        />
                                    )}

                                    {/* 1er Bloque */}
                                    <div data-section="apertura">
                                        {apertura1}
                                        {/* BANNER CAJA 1 MOB */}
                                        <DivBanner
                                            id="caja1_mob"
                                            shouldRender={isMobile}
                                        />
                                        {apertura2}
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
                                    {blocksToLoad.bloque2 && (
                                        <section
                                            data-section="anexo2"
                                            data-block-name="h_anexo-2"
                                            data-diagramacion-id="9999"
                                            data-is-block="true"
                                        >
                                            {anexo2}
                                        </section>
                                    )}

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
                                    {blocksToLoad.bloque3 && (
                                        <div className="row-gap-tablet-2">
                                            <CajaPromo
                                                customFields={{
                                                    text:
                                                        'La información más completa del mercado inmobiliario minuto a minuto.',
                                                    link:
                                                        'https://www.lanacion.com.ar/propiedades/',
                                                    logoName: 'propiedades'
                                                }}
                                            />
                                            <CajaPromo
                                                customFields={{
                                                    text:
                                                        'La mejor información para un sector clave que evoluciona día a día.',
                                                    link:
                                                        'https://www.lanacion.com.ar/economia/campo/',
                                                    logoName: 'campo'
                                                }}
                                            />
                                        </div>
                                    )}
                                    {/* 3er Bloque */}
                                    {blocksToLoad.bloque3 && (
                                        <section
                                            data-section="anexo3"
                                            data-block-name="h_anexo-3"
                                            data-diagramacion-id="9999"
                                            data-is-block="true"
                                        >
                                            {anexo3}
                                        </section>
                                    )}

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
                                        classes="--megalateral --sticky"
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
                                                'https://www.lanacion.com.ar/masleidas/home'
                                        }}
                                    />
                                </div>
                            )}
                            <div className="lay" data-section="comercial1">
                                {blocksToLoad.bloque3 && comercial1}
                            </div>
                            <div id="content-main-2" className="lay-sidebar">
                                {/* Cuerpo */}
                                <div className="sidebar__main">
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
                                </div>
                                <div className="sidebar__aside hlp-tabletlm-none">
                                    {/* BANNER ASIDE */}
                                    {blocksToLoad.bloque4 && (
                                        <DivBanner
                                            id="megalateral2_dsk"
                                            classes="--megalateral --sticky"
                                            shouldRender={isDesktop}
                                        />
                                    )}
                                </div>
                            </div>
                            <div id="content-main-3" className="lay-sidebar">
                                {/* Cuerpo */}
                                <div className="sidebar__main">
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
                                    <div className="acumulado">
                                        <section className="mod-linklist">
                                            <TagsListFeature
                                                id="TagsListFeatureHome"
                                                title="Temas del día:"
                                            />
                                        </section>
                                    </div>
                                </div>
                                <div className="sidebar__aside hlp-tabletlm-none">
                                    {/* BANNER ASIDE */}
                                    {blocksToLoad.bloque5 && (
                                        <DivBanner
                                            id="megalateral3_dsk"
                                            classes="--megalateral --sticky"
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
                                        classes="--adhesion_dsk --fixed"
                                        shouldRender={isDesktop}
                                        closeButton
                                        validateSuscription
                                    />

                                    <DivBanner
                                        id="adhesion_mob"
                                        classes="--adhesion_mob --fixed"
                                        shouldRender={isMobile}
                                        closeButton
                                        validateSuscription
                                    />
                                    <DivBanner
                                        id="adhesion_tab"
                                        classes="--adhesion_tab --fixed"
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
    children: PropTypes.node.isRequired,
    renderables: PropTypes.node.isRequired,
    outputType: PropTypes.string,
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
    outputType: 'default'
};

LNMainHome.sections = pageBuilderSections;

export default Consumer(LNMainHome);
