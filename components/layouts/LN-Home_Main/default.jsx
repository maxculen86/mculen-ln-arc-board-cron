/* eslint-disable no-console */
/* eslint-disable consistent-return */
import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import get from '../../private/common/utils/get';
import throttle from '../../private/common/utils/throttle';
import Header from '../../private/LN/common/header';
import Footer from '../../private/LN/common/footer';
import GlobalProvider from '../../private/common/context/globalContext';
import LoadBanners from '../../private/common/banners/LoadBanners';
import blocksBanners from '../../private/common/banners/blocksBannerHome';
import Metarefresh from '../../features/LN-common/metarefresh';
import {
    sectionsWithBlocks,
    getSectionVisible,
    isScrollbarVisible,
    isBombaVisible
} from '../../private/LN/common/utils/homeHelper';
import sectionHelper from '../../private/LN/common/utils/sectionHelper';
import getScrollPercent from '../../private/LN/common/utils/getScrollPercent';
import AnexoFeature from '../../features/LN-acumulado/anexoIframe';
import SubHeader from '../../features/LN-common/subHeader';
import TePuedeInteresar from '../../features/LN-nota/tePuedeInteresar/default';
import pageBuilderSections from '../config/LN-PageBuilder.config.json';
import TagsListFeature from '../../features/LN-acumulado/tagList';
import CajaPromo from '../../features/LN-common/cajaPromo/default';
import DivBannerSSR from '../../private/common/banners/DivBannerSSR';
import { getScriptForComercial } from '../../private/common/banners/bannersRules';
import PwaModals from '../../private/LN/common/pwaModals';
import { homeLayoutsPropTypes } from '../../private/common/utils/propTypesHelper';

const reducer = (state, action) => {
    switch (action.type) {
        case 'update': {
            return updateBlocks(state, action.payload);
        }
        case 'updateNextBlock': {
            if (!findBlockToLoad(state)) return state;
            return updateNextBlock(state);
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
        if (key.slice(-1) <= number) newState[key].loaded = true;
    });
    return newState;
};

const updateNextBlock = blocks => {
    const b = { ...blocks };
    Object.keys(blocks).some(key => {
        if (b[key].loaded === false) {
            b[key].loaded = true;
            return true;
        }
    });
    return b;
};

const findBlockToLoad = blocksToLoad => {
    return Object.keys(blocksToLoad).find(key => !blocksToLoad[key].loaded);
};

const BannerCabezal = () => {
    return (
        <Static id="bannersCabezal">
            <div className="container --ads">
                <DivBannerSSR
                    bannerConfiguration={{
                        slotId: 'cabezal_dsk',
                        classes: '--dark'
                    }}
                />
                <DivBannerSSR
                    bannerConfiguration={{
                        slotId: 'cabezal_tab',
                        classes: '--dark'
                    }}
                />
            </div>
        </Static>
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
        multimedia,
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
        bloque8,
        appAnexo1,
        appAnexo2
    ] = pageBuilderSections.map((section, index) => {
        return sectionHelper(
            children[index],
            section,
            index,
            renderables,
            outputType,
            isAdmin
        );
    });

    const showBomba = isBombaVisible(renderables);

    const [blocksToLoad, dispatch] = useReducer(reducer, {
        bloque1: { loaded: true, loadPercent: 70 },
        bloque2: { loaded: isAdmin, loadPercent: 25 },
        bloque3: { loaded: isAdmin, loadPercent: 70 },
        bloque4: { loaded: isAdmin, loadPercent: 70 },
        bloque5: { loaded: isAdmin, loadPercent: 70 }
    });

    const megaLateralSticky = '--megalateral --sticky';

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

                const keyBlockToLoad = findBlockToLoad(blocksToLoad);
                const blockToLoad = blocksToLoad[keyBlockToLoad];
                if (
                    blockToLoad &&
                    scrollPercentRounded > blockToLoad.loadPercent
                ) {
                    dispatch({ type: 'updateNextBlock' });
                }
            } catch (error) {
                console.error('Error en useEffect LN-Main_Home =>', {
                    error,
                    layout: 'LN-Home_Main'
                });
                // Si tiene corrupto sessionStorage muestro todo el sitio
                dispatch({ type: 'update', payload: 'bloque5' });
            }
        }, 25);

        const dataSections = document.querySelectorAll('[data-section]');
        window.addEventListener('scroll', e => handleScroll(e, dataSections));
        return () => window.removeEventListener('scroll', handleScroll);
    }, [blocksToLoad]);

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
        dispatch({ type: 'update', payload: lastBlockSaw });

        const timer = setTimeout(() => {
            window.scrollTo(0, lastScrollPosition);
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <GlobalProvider>
            {/* 1x1 */}
            <Static id="banner1x1">
                <DivBannerSSR
                    bannerConfiguration={{
                        slotId: '1x1_dsk',
                        hideForSubscriptor: true
                    }}
                />
                <DivBannerSSR
                    bannerConfiguration={{
                        slotId: '1x1_mob',
                        hideForSubscriptor: true
                    }}
                />
            </Static>
            {/* COMERCIAL */}
            <Static id="bannerComercial">
                <DivBannerSSR
                    bannerConfiguration={{
                        slotId: 'comercial_dsk',
                        classes: '--comercial hlp-none',
                        closeButton: true
                    }}
                />
                {getScriptForComercial('comercial_dsk')}
                <DivBannerSSR
                    bannerConfiguration={{
                        slotId: 'comercial_mob',
                        classes: '--comercial hlp-none',
                        closeButton: true
                    }}
                />
                {getScriptForComercial('comercial_mob')}
            </Static>

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
                {showBomba && <BannerCabezal />}

                {/* BOMBA */}
                {bomba}
                <main id="content">
                    {/* STICKY MOB */}
                    <Static id="sticky2">
                        <DivBannerSSR
                            bannerConfiguration={{
                                slotId: 'sticky2_mob',
                                classes: '--sticky2_mob --sticky'
                            }}
                        />
                    </Static>

                    <div className="">
                        <div id="content-main" className="lay-sidebar">
                            {/* Cuerpo */}
                            <div className="sidebar__main">
                                {/* BANNER CABEZAL */}
                                {!showBomba && <BannerCabezal />}

                                {/* 1er Bloque */}
                                <div data-section="apertura">
                                    {apertura1}
                                    {/* BANNER CAJA 1 MOB */}
                                    <Static id="caja1_mob">
                                        <DivBannerSSR
                                            bannerConfiguration={{
                                                slotId: 'caja1_mob',
                                                withoutHide: true
                                            }}
                                        />
                                    </Static>

                                    {apertura2}
                                </div>

                                {/* BANNER BILLBOARD */}
                                <DivBannerSSR
                                    bannerConfiguration={{
                                        slotId: 'billboard_dsk',
                                        withoutHide: true
                                    }}
                                />

                                {/* BANNER CAJA 2 MOB */}
                                <DivBannerSSR
                                    bannerConfiguration={{
                                        slotId: 'caja2_mob',
                                        withoutHide: true
                                    }}
                                />

                                {blocksToLoad.bloque2.loaded && (
                                    <section
                                        id="multimedia"
                                        data-section="multimedia"
                                    >
                                        {multimedia}
                                    </section>
                                )}

                                {blocksToLoad.bloque2.loaded && (
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
                                    {blocksToLoad.bloque2.loaded && breaking1}
                                </div>
                                {/* BANNER CAJA 3 MOB */}
                                <>
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'caja3_mob',
                                            withoutHide: true
                                        }}
                                    />
                                    <div className="row-gap-tablet-2 --ads">
                                        <DivBannerSSR
                                            bannerConfiguration={{
                                                slotId: 'caja1_tab',
                                                withoutHide: true
                                            }}
                                        />
                                        <DivBannerSSR
                                            bannerConfiguration={{
                                                slotId: 'caja2_tab',
                                                withoutHide: true
                                            }}
                                        />
                                    </div>
                                </>
                                {/* BANNER CAJA DSK  */}
                                <div className="row-gap-tablet-3 --ads">
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'caja1_dsk',
                                            withoutHide: true
                                        }}
                                    />
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'caja_producto1_dsk',
                                            withoutHide: true
                                        }}
                                    />
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'caja2_dsk',
                                            withoutHide: true
                                        }}
                                    />
                                </div>
                                <div data-section="breaking2">
                                    {blocksToLoad.bloque2.loaded && breaking2}
                                </div>
                                {/* BANNER CAJA 4 MOB */}
                                <>
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'caja4_mob',
                                            withoutHide: true
                                        }}
                                    />
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'middle1_tab',
                                            withoutHide: true
                                        }}
                                    />
                                </>
                                {/* BANNER CINTURON 1 */}
                                <DivBannerSSR
                                    bannerConfiguration={{
                                        slotId: 'cinturon1_dsk',
                                        withoutHide: true
                                    }}
                                />

                                <div data-section="breaking3">
                                    {blocksToLoad.bloque2.loaded && breaking3}
                                </div>
                                {blocksToLoad.bloque3.loaded && (
                                    <section className="container --promos">
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
                                    </section>
                                )}
                                {/* 3er Bloque */}
                                {blocksToLoad.bloque3.loaded && (
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
                                <>
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'caja5_mob',
                                            withoutHide: true
                                        }}
                                    />
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'cinturon2_dsk',
                                            withoutHide: true
                                        }}
                                    />
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'middle2_tab',
                                            withoutHide: true
                                        }}
                                    />
                                </>

                                <div
                                    data-section="opinion"
                                    className="container --opinion"
                                >
                                    {blocksToLoad.bloque3.loaded && opinion}
                                </div>
                                {/* BANNER  */}
                                <div className="row-gap-tablet-3 --ads">
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'caja3_dsk',
                                            withoutHide: true
                                        }}
                                    />
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'caja_producto2_dsk',
                                            withoutHide: true
                                        }}
                                    />
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'caja4_dsk',
                                            withoutHide: true
                                        }}
                                    />
                                </div>
                                {/* BANNER CAJAS TAB */}
                                <div className="row-gap-tablet-2 --ads">
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'caja3_tab',
                                            withoutHide: true
                                        }}
                                    />
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'caja4_tab',
                                            withoutHide: true
                                        }}
                                    />
                                </div>
                                <div data-section="breaking4">
                                    {blocksToLoad.bloque3.loaded && breaking4}
                                </div>
                                {/* BANNER MIDDLE 1 */}
                                <DivBannerSSR
                                    bannerConfiguration={{
                                        slotId: 'middle1_dsk',
                                        withoutHide: true
                                    }}
                                />

                                <div data-section="breaking5">
                                    {blocksToLoad.bloque3.loaded && breaking5}
                                </div>
                                <div data-section="breaking6">
                                    {blocksToLoad.bloque3.loaded && breaking6}
                                </div>
                            </div>
                            <div className="sidebar__aside hlp-tabletlm-none">
                                {/* BANNERS */}
                                <DivBannerSSR
                                    bannerConfiguration={{
                                        slotId: 'megalateral_dsk',
                                        classes: megaLateralSticky
                                    }}
                                />
                            </div>
                        </div>
                        {/* RANKING */}
                        {blocksToLoad.bloque3.loaded && (
                            <div data-section="ranking" className="ranking-ln9">
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
                            {blocksToLoad.bloque3.loaded && comercial1}
                        </div>
                        <div id="content-main-2" className="lay-sidebar">
                            {/* Cuerpo */}
                            <div className="sidebar__main">
                                {/* 4to Bloque */}
                                <div data-section="bloque2">
                                    {blocksToLoad.bloque4.loaded && bloque2}
                                </div>
                                <div data-section="comercial2">
                                    {blocksToLoad.bloque4.loaded && comercial2}
                                </div>
                                <div data-section="bloque3">
                                    {blocksToLoad.bloque4.loaded && bloque3}
                                </div>
                                <div data-section="bloque4">
                                    {blocksToLoad.bloque4.loaded && bloque4}
                                </div>
                            </div>
                            <div className="sidebar__aside hlp-tabletlm-none">
                                {/* BANNER ASIDE */}
                                {blocksToLoad.bloque4.loaded && (
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'megalateral2_dsk',
                                            classes: megaLateralSticky
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        <div id="content-main-3" className="lay-sidebar">
                            {/* Cuerpo */}
                            <div className="sidebar__main">
                                {/* 5to Bloque */}
                                <div data-section="bloque5">
                                    {blocksToLoad.bloque5.loaded && bloque5}
                                </div>
                                <div data-section="bloque6">
                                    {blocksToLoad.bloque5.loaded && bloque6}
                                </div>
                                <div data-section="bloque7">
                                    {blocksToLoad.bloque5.loaded && bloque7}
                                </div>
                                <div data-section="bloque8">
                                    {blocksToLoad.bloque5.loaded && bloque8}
                                </div>
                                {(isAdmin || outputType === 'json') && (
                                    <div>
                                        <section data-section="app-anexo-1">
                                            {appAnexo1}
                                        </section>
                                        <section data-section="app-anexo-2">
                                            {appAnexo2}
                                        </section>
                                    </div>
                                )}
                                {blocksToLoad.bloque5.loaded && (
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
                                {blocksToLoad.bloque5.loaded && (
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'megalateral3_dsk',
                                            classes: megaLateralSticky
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="lay-sidebar">
                            <div className="sidebar__main">
                                {/* ADHESION */}
                                <DivBannerSSR
                                    bannerConfiguration={{
                                        slotId: 'adhesion_dsk',
                                        classes:
                                            '--adhesion_dsk --fixed --close',
                                        hideForSubscriptor: true,
                                        closeButton: true
                                    }}
                                />
                                <DivBannerSSR
                                    bannerConfiguration={{
                                        slotId: 'adhesion_mob',
                                        classes:
                                            '--adhesion_mob --fixed --close',
                                        hideForSubscriptor: true,
                                        closeButton: true
                                    }}
                                />
                                <DivBannerSSR
                                    bannerConfiguration={{
                                        slotId: 'adhesion_tab',
                                        classes:
                                            '--adhesion_tab --fixed --close',
                                        hideForSubscriptor: true,
                                        closeButton: true
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </main>
                <Static id="StaticFooter">
                    <Footer home />
                </Static>
            </div>
            <LoadBanners blocksBanners={blocksBanners.bloque1} />
            {blocksToLoad.bloque2.loaded && (
                <LoadBanners blocksBanners={blocksBanners.bloque2} />
            )}
            {blocksToLoad.bloque3.loaded && (
                <LoadBanners blocksBanners={blocksBanners.bloque3} />
            )}
            {blocksToLoad.bloque4.loaded && (
                <LoadBanners blocksBanners={blocksBanners.bloque4} />
            )}
            {blocksToLoad.bloque5.loaded && (
                <LoadBanners blocksBanners={blocksBanners.bloque5} />
            )}
            <Metarefresh />
            <PwaModals />
        </GlobalProvider>
    );
};

LNMainHome.propTypes = {
    renderables: PropTypes.node.isRequired,
    outputType: PropTypes.string,
    isAdmin: PropTypes.bool.isRequired,
    ...homeLayoutsPropTypes
};

LNMainHome.defaultProps = {
    outputType: 'default'
};

LNMainHome.sections = pageBuilderSections;

export default Consumer(LNMainHome);
