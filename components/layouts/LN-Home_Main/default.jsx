/* eslint-disable react/require-default-props */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import StaticValidation from '../../private/common/staticValidation';
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
import Ranking from '../../features/LN-common/ranking/default';
import SubHeader from '../../features/LN-common/subHeader';
import pageBuilderSections from '../config/LN-PageBuilder.config.json';
import TagsListFeature from '../../features/LN-acumulado/tagList';
import CajaPromo from '../../features/LN-common/cajaPromo/default';
import DivBannerSSR from '../../private/common/banners/DivBannerSSR';
import { getScriptForComercial } from '../../private/common/banners/bannersRules';
import PwaModals from '../../private/LN/common/pwaModals';
import { homeLayoutsPropTypes } from '../../private/common/utils/propTypesHelper';
import {
    productClickFromServer,
    createObservers
} from '../../private/common/utils/viewability';
import createBannersIntersectionObserver from '../../private/common/banners/createBannersIntersectionObserver';

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
        <>
            <div className="container --ads">
                <DivBannerSSR
                    bannerConfiguration={{
                        slotId: 'cabezal_dsk',
                        classes: '--dark',
                        isStatic: true
                    }}
                />
                <DivBannerSSR
                    bannerConfiguration={{
                        slotId: 'cabezal_tab',
                        classes: '--dark',
                        isStatic: true
                    }}
                />
            </div>
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
        bloque2: { loaded: true, loadPercent: 25 },
        bloque3: { loaded: true, loadPercent: 70 },
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

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
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

        createObservers();
        createBannersIntersectionObserver();

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
            <>
                <DivBannerSSR
                    bannerConfiguration={{
                        slotId: '1x1_dsk',
                        hideForSubscriptor: true,
                        isStatic: true
                    }}
                />
                <DivBannerSSR
                    bannerConfiguration={{
                        slotId: '1x1_mob',
                        hideForSubscriptor: true,
                        isStatic: true
                    }}
                />
            </>
            {/* COMERCIAL */}
            <DivBannerSSR
                bannerConfiguration={{
                    slotId: 'comercial_dsk',
                    classes: '--comercial hlp-none',
                    closeButton: true,
                    isStatic: true
                }}
            />
            {getScriptForComercial('comercial_dsk')}
            <DivBannerSSR
                bannerConfiguration={{
                    slotId: 'comercial_mob',
                    classes: '--comercial hlp-none',
                    closeButton: true,
                    isStatic: true
                }}
            />
            {getScriptForComercial('comercial_mob')}

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
                    <DivBannerSSR
                        bannerConfiguration={{
                            slotId: 'sticky2_mob',
                            classes: '--sticky2_mob --sticky',
                            isStatic: true
                        }}
                    />

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
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'caja1_mob',
                                            withoutHide: true,
                                            isStatic: true
                                        }}
                                    />

                                    {apertura2}
                                </div>

                                {/* 2ndo Bloque */}

                                {/* BANNER BILLBOARD */}
                                <DivBannerSSR
                                    bannerConfiguration={{
                                        slotId: 'billboard_dsk',
                                        withoutHide: true,
                                        isStatic: true,
                                        lazyClass: 'lazy'
                                    }}
                                />

                                {/* BANNER CAJA 2 MOB */}
                                <DivBannerSSR
                                    bannerConfiguration={{
                                        slotId: 'caja2_mob',
                                        withoutHide: true,
                                        isStatic: true,
                                        lazyClass: 'lazy'
                                    }}
                                />

                                <section data-section="multimedia">
                                    {multimedia}
                                </section>

                                <section
                                    data-section="anexo2"
                                    data-block-name="h_anexo-2"
                                    data-diagramacion-id="9999"
                                    data-is-block="true"
                                >
                                    {anexo2}
                                </section>

                                <div data-section="breaking1">{breaking1}</div>
                                {/* BANNER CAJA 3 MOB */}
                                <>
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'caja3_mob',
                                            withoutHide: true,
                                            isStatic: true,
                                            lazyClass: 'lazy'
                                        }}
                                    />
                                    <div className="row-gap-tablet-2 --ads">
                                        <DivBannerSSR
                                            bannerConfiguration={{
                                                slotId: 'caja1_tab',
                                                withoutHide: true,
                                                isStatic: true,
                                                lazyClass: 'lazy'
                                            }}
                                        />
                                        <DivBannerSSR
                                            bannerConfiguration={{
                                                slotId: 'caja2_tab',
                                                withoutHide: true,
                                                isStatic: true,
                                                lazyClass: 'lazy'
                                            }}
                                        />
                                    </div>
                                </>
                                {/* BANNER CAJA DSK  */}
                                <div className="row-gap-tablet-3 --ads">
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'caja1_dsk',
                                            withoutHide: true,
                                            isStatic: true,
                                            lazyClass: 'lazy'
                                        }}
                                    />
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'caja_producto1_dsk',
                                            withoutHide: true,
                                            isStatic: true,
                                            lazyClass: 'lazy'
                                        }}
                                    />
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'caja2_dsk',
                                            withoutHide: true,
                                            isStatic: true,
                                            lazyClass: 'lazy'
                                        }}
                                    />
                                </div>
                                <div data-section="breaking2">{breaking2}</div>
                                {/* BANNER CAJA 4 MOB */}
                                <>
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'caja4_mob',
                                            withoutHide: true,
                                            isStatic: true,
                                            lazyClass: 'lazy'
                                        }}
                                    />
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'middle1_tab',
                                            withoutHide: true,
                                            isStatic: true,
                                            lazyClass: 'lazy'
                                        }}
                                    />
                                </>
                                {/* BANNER CINTURON 1 */}
                                <DivBannerSSR
                                    bannerConfiguration={{
                                        slotId: 'cinturon1_dsk',
                                        withoutHide: true,
                                        isStatic: true,
                                        lazyClass: 'lazy'
                                    }}
                                />

                                <div data-section="breaking3">{breaking3}</div>

                                {/* 3er Bloque */}

                                {
                                    <section className="container --promos">
                                        <div className="row-gap-tablet-2">
                                            <CajaPromo
                                                customFields={{
                                                    text:
                                                        'Casas, departamentos, inversiones y más',
                                                    link:
                                                        'https://www.lanacion.com.ar/propiedades/',
                                                    logoName: 'propiedades'
                                                }}
                                            />
                                            <CajaPromo
                                                customFields={{
                                                    text:
                                                        'Agricultura, ganadería, tecnologías y más',
                                                    link:
                                                        'https://www.lanacion.com.ar/economia/campo/',
                                                    logoName: 'campo'
                                                }}
                                            />
                                            <CajaPromo
                                                customFields={{
                                                    text:
                                                        'Vida sana, nutrición, descanso y más',
                                                    link:
                                                        'https://www.lanacion.com.ar/salud/',
                                                    logoName: 'salud'
                                                }}
                                            />
                                            <CajaPromo
                                                customFields={{
                                                    text:
                                                        'Tendencias, test drives, eléctricos y más',
                                                    link:
                                                        'https://www.lanacion.com.ar/autos/',
                                                    logoName: 'autos'
                                                }}
                                            />
                                        </div>
                                    </section>
                                }
                                {
                                    <section
                                        data-section="anexo3"
                                        data-block-name="h_anexo-3"
                                        data-diagramacion-id="9999"
                                        data-is-block="true"
                                    >
                                        {anexo3}
                                    </section>
                                }

                                {/* BANNER CAJA 5 MOB - BANNER CINTURON 2 - BANNER MIDDLE 2 */}
                                <>
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'caja5_mob',
                                            withoutHide: true,
                                            isStatic: true,
                                            lazyClass: 'lazy'
                                        }}
                                    />
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'cinturon2_dsk',
                                            withoutHide: true,
                                            isStatic: true,
                                            lazyClass: 'lazy'
                                        }}
                                    />
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'middle2_tab',
                                            withoutHide: true,
                                            isStatic: true,
                                            lazyClass: 'lazy'
                                        }}
                                    />
                                </>

                                <div
                                    data-section="opinion"
                                    className="container --opinion"
                                >
                                    {opinion}
                                </div>
                                {/* BANNER  */}
                                <div className="row-gap-tablet-3 --ads">
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'caja3_dsk',
                                            withoutHide: true,
                                            isStatic: true,
                                            lazyClass: 'lazy'
                                        }}
                                    />
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'caja_producto2_dsk',
                                            withoutHide: true,
                                            isStatic: true,
                                            lazyClass: 'lazy'
                                        }}
                                    />
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'caja4_dsk',
                                            withoutHide: true,
                                            isStatic: true,
                                            lazyClass: 'lazy'
                                        }}
                                    />
                                </div>
                                {/* BANNER CAJAS TAB */}
                                <div className="row-gap-tablet-2 --ads">
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'caja3_tab',
                                            withoutHide: true,
                                            isStatic: true,
                                            lazyClass: 'lazy'
                                        }}
                                    />
                                    <DivBannerSSR
                                        bannerConfiguration={{
                                            slotId: 'caja4_tab',
                                            withoutHide: true,
                                            isStatic: true,
                                            lazyClass: 'lazy'
                                        }}
                                    />
                                </div>
                                <div data-section="breaking4">{breaking4}</div>
                                <div data-section="breaking5">{breaking5}</div>
                                <div data-section="breaking6">{breaking6}</div>
                            </div>
                            <div className="sidebar__aside hlp-tabletlm-none">
                                {/* BANNERS */}
                                <DivBannerSSR
                                    bannerConfiguration={{
                                        slotId: 'megalateral_dsk',
                                        classes: megaLateralSticky,
                                        isStatic: true
                                    }}
                                />
                            </div>
                        </div>
                        <DivBannerSSR
                            bannerConfiguration={{
                                slotId: 'parallax_mob',
                                withoutHide: true,
                                isStatic: true,
                                lazyClass: 'lazy'
                            }}
                        />
                        <DivBannerSSR
                            bannerConfiguration={{
                                slotId: 'parallax_dsk',
                                withoutHide: true,
                                isStatic: true,
                                lazyClass: 'lazy'
                            }}
                        />
                        {/* RANKING */}
                        {
                            <div data-section="ranking" className="lay">
                                <Ranking {...props} id="rankingHome" isBlock3 />
                            </div>
                        }
                        <div className="lay" data-section="comercial1">
                            {comercial1}
                        </div>

                        {/* 4to Bloque */}

                        <div id="content-main-2" className="lay-sidebar">
                            {/* Cuerpo */}
                            <div className="sidebar__main">
                                {/* 4to Bloque */}
                                <div id="bloque2" data-section="bloque2">
                                    {blocksToLoad.bloque4.loaded && bloque2}
                                </div>
                                <div id="comercial2" data-section="comercial2">
                                    {blocksToLoad.bloque4.loaded && comercial2}
                                </div>
                                <div id="bloque3" data-section="bloque3">
                                    {blocksToLoad.bloque4.loaded && bloque3}
                                </div>
                                <div id="bloque4" data-section="bloque4">
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
                                    <Ranking {...props} id="inverse-home" />
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
                                        closeButton: true,
                                        isStatic: true
                                    }}
                                />
                                <DivBannerSSR
                                    bannerConfiguration={{
                                        slotId: 'adhesion_mob',
                                        classes:
                                            '--adhesion_mob --fixed --close',
                                        hideForSubscriptor: true,
                                        closeButton: true,
                                        isStatic: true
                                    }}
                                />
                                <DivBannerSSR
                                    bannerConfiguration={{
                                        slotId: 'adhesion_tab',
                                        classes:
                                            '--adhesion_tab --fixed --close',
                                        hideForSubscriptor: true,
                                        closeButton: true,
                                        isStatic: true
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </main>
                <StaticValidation id="StaticFooter" htmlOnly persistent>
                    <Footer home />
                </StaticValidation>
            </div>
            <LoadBanners blocksBanners={blocksBanners.bloque1} />
            {blocksToLoad.bloque4.loaded && (
                <LoadBanners blocksBanners={blocksBanners.bloque4} />
            )}
            {blocksToLoad.bloque5.loaded && (
                <LoadBanners blocksBanners={blocksBanners.bloque5} />
            )}
            <Metarefresh />
            <PwaModals />
            {productClickFromServer()}
        </GlobalProvider>
    );
};

LNMainHome.propTypes = {
    renderables: PropTypes.arrayOf(PropTypes.node),
    outputType: PropTypes.string,
    isAdmin: PropTypes.bool,
    ...homeLayoutsPropTypes
};

LNMainHome.sections = pageBuilderSections;

export default Consumer(LNMainHome);
