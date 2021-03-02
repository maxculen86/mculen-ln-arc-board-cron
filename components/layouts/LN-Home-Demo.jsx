import React, { useEffect, useState } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import LoginProvider from '../private/LN/common/context/loginContext';
import GlobalProvider from '../private/common/context/globalContext';

// import '../../resources/dist/css/ln/base.css';
// import '../../resources/dist/css/ln/layouts/layout.css';
// import '../../resources/dist/css/ln/layouts/grid.css';
// import '../../resources/dist/css/ln/pages/acu.css';
// import '../../resources/dist/css/ln/components/com-ordered.css';
// import '../../resources/dist/css/ln/components/com-unordered.css';
// import '../../resources/dist/css/ln/components/hour.css';
import '../../resources/dist/css/ln/components/banners.css';
import { GlobalProviderAcu } from '../private/LN/acumulado/context/globalContextAcu';
import get from '../private/common/utils/get';
import getBannerMegatop from '../private/common/utils/getBannerMegatop';
import BannerRefactor from '../features/LN-common/bannerRefactor';

const pageBuilderSections = [
    'Banner-Megatop',
    'Sticky-Mobile',
    'Pre-Apertura',
    'Apertura',
    'Anexo-2',
    'Breaking-1',
    'Breaking-2',
    'Breaking-3',
    'Anexo-3',
    'Opinion',
    'Breaking-4',
    'Breaking-5',
    'Comercial-1',
    'Bloque-2',
    'Comercial-2',
    'Bloque-3',
    'Bloque-4',
    'Bloque-5',
    'Bloque-6',
    'Bloque-7',
    'Bloque-8',
    'Aside'
];

const formatText = str => {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
};

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

const isInViewport = element => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

const updateBlocks = (blocks, lastBlock) => {
    if (!lastBlock) return blocks;
    const number = lastBlock.slice(-1);
    Object.keys(blocks).forEach(key => {
        if (key.slice(-1) <= number) blocks[key] = true;
    });
    return blocks;
};

const sectionsWithBlocks = {
    anexo2: 'bloque2',
    breaking1: 'bloque2',
    breaking2: 'bloque2',
    breaking3: 'bloque3',
    anexo3: 'bloque3',
    opinion: 'bloque3',
    breaking4: 'bloque3',
    breaking5: 'bloque3',
    comercial1: 'bloque3',
    bloque2: 'bloque4',
    comercial2: 'bloque4',
    bloque3: 'bloque4',
    bloque4: 'bloque4',
    bloque5: 'bloque5',
    bloque6: 'bloque5',
    bloque7: 'bloque5',
    bloque8: 'bloque5'
};

const CLASS_ACU_REVISTA = 'acu-revista';
const revistas = ['ohlala'];
const sections = ['economia'];

const LNAcumuladoLayout = props => {
    const {
        children: [
            bannerMegatop,
            stickyMobile,
            preApertura,
            apertura,
            anexo2,
            breaking1,
            breaking2,
            breaking3,
            anexo3,
            opinion,
            breaking4,
            breaking5,
            comercial1,
            bloque2,
            comercial2,
            bloque3,
            bloque4,
            bloque5,
            bloque6,
            bloque7,
            bloque8,
            aside
        ],
        globalContent,
        outputType,
        tree,
        isAdmin,
        renderables
    } = props;
    const { style, name = '' } = globalContent;
    const sectionStyleName =
        style && style.section_style_name ? style.section_style_name : '';
    const classRevista =
        revistas.indexOf(sectionStyleName || '') !== -1
            ? `${CLASS_ACU_REVISTA} ${sectionStyleName}`
            : '';
    const sectionClass = sections.find(sec => sec === formatText(name)) || '';
    const acumuladoGeneral = get(globalContent, 'acumuladoGeneral', {});
    const acumuladoColor = get(globalContent, 'acumuladoColor', {});
    const {
        background_color: backgroundCategory,
        navigation_color_tags: colorTags,
        header_class_name: headerDark
    } = acumuladoColor;
    const amp = outputType === 'amp' ? 'amp' : '';
    const megatop = getBannerMegatop(bannerMegatop, outputType, tree, isAdmin);
    // TODO: agregar todas las validaciones de acu color
    const COLOR_CLASS = backgroundCategory || colorTags ? '--color' : '';
    const HEADER_BACKGROUND = headerDark === 'true' ? ' --transparent' : '';
    const idCollectionApertura = get(
        globalContent,
        'acumuladoGeneral.id_collection_promo_items'
    );
    const idCollectionsInPage = get(
        globalContent,
        'acumuladoGeneral.colecciones',
        []
    );
    const OPENING_CLASS = idCollectionApertura ? '--opening' : '';

    const [viewabilityBlocks, setViewabilityBlocks] = useState({
        bloque2: false,
        bloque3: false,
        bloque4: false,
        bloque5: false
    });
    // const [modules, setModules] = useState([]);

    const getSectionVisible = (scrollParent, targetElements) => {
        let bestMatch = {};
        targetElements.forEach(domElm => {
            // check distance from top, takig scroll into account
            const delta = Math.abs(scrollParent - domElm.offsetTop);

            if (!bestMatch.sectionName)
                bestMatch = { sectionName: domElm.dataset.module, delta };

            // check which delet is closest to "0"
            if (delta < bestMatch.delta) {
                bestMatch = { sectionName: domElm.dataset.module, delta };
            }
        });

        // update state with best-fit section
        return bestMatch.sectionName;
    };

    const handleScroll = (e, modules) => {
        // const scrollPercentRounded = getScrollPercent();
        sessionStorage.setItem('homePosition', window.pageYOffset);
        const scrollTop = get(e, 'target.scrollingElement.scrollTop', 0);
        const sectionVisible = getSectionVisible(scrollTop, modules);
        if (!sectionVisible) return;

        sessionStorage.setItem('lastBlock', sectionVisible);
        const blockToLoad = sectionsWithBlocks[sectionVisible];
        setViewabilityBlocks(state => {
            return {
                ...state,
                [blockToLoad]: true
            };
        });
        /*
        if (viewabilityBlocks.bloque2 !== true) {
            const bloque2div = document.getElementById('bloque2');
            if (isInViewport(bloque2div)) {
                sessionStorage.setItem('lastBlock', 'bloque2');
                setViewabilityBlocks(state => {
                    return {
                        ...state,
                        bloque2: true
                    };
                });
            }
        }

        if (viewabilityBlocks.bloque3 !== true) {
            const bloque3div = document.getElementById('bloque3');
            if (isInViewport(bloque3div)) {
                sessionStorage.setItem('lastBlock', 'bloque3');
                setViewabilityBlocks(state => {
                    return {
                        ...state,
                        bloque3: true
                    };
                });
            }
        }

        if (viewabilityBlocks.bloque4 !== true) {
            const bloque4div = document.getElementById('bloque4');
            if (isInViewport(bloque4div)) {
                sessionStorage.setItem('lastBlock', 'bloque4');
                setViewabilityBlocks(state => {
                    return {
                        ...state,
                        bloque4: true
                    };
                });
            }
        }

        if (viewabilityBlocks.bloque5 !== true) {
            const bloque5div = document.getElementById('bloque5');
            if (isInViewport(bloque5div)) {
                sessionStorage.setItem('lastBlock', 'bloque5');
                setViewabilityBlocks(state => {
                    return {
                        ...state,
                        bloque5: true
                    };
                });
            }
        }
        */
    };
    // First load
    useEffect(() => {
        const modules = document.querySelectorAll('[data-module]');
        window.addEventListener('scroll', e => handleScroll(e, modules));
        // const modul = document.querySelectorAll('[data-module]');
        // setModules(modul);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // First Load
    useEffect(() => {
        const lastSectionSaw = sessionStorage.getItem('lastBlock');
        const lastScrollPosition = sessionStorage.getItem('homePosition');
        if (!lastSectionSaw || !lastScrollPosition) return;
        const lastBlockSaw = sectionsWithBlocks[lastSectionSaw];
        const newStatusBlocks = updateBlocks(viewabilityBlocks, lastBlockSaw);
        setViewabilityBlocks(newStatusBlocks);

        // const element = document.getElementById(lastBlockSaw);
        const element = document.querySelectorAll(`[data-module=${lastSectionSaw}]`);
        if (element && element.length === 0) return;
        const elementRect = element[0].getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const middle = absoluteElementTop - (window.innerHeight / 2);
        window.scrollTo(0, middle);

        const timer = setTimeout(
            () => window.scrollTo(0, lastScrollPosition),
            2000
        );
        return () => clearTimeout(timer);
    }, []);

    return (
        <GlobalProvider>
            <LoginProvider>
                <GlobalProviderAcu
                    acumuladoGeneral={acumuladoGeneral}
                    acumuladoColor={acumuladoColor}
                    idCollectionsInPage={idCollectionsInPage}
                    idCollectionApertura={idCollectionApertura}
                >
                    {megatop}
                    <div
                        id="wrapper"
                        className={`acumulado ${HEADER_BACKGROUND} ${COLOR_CLASS} ${classRevista} ${sectionClass} ${OPENING_CLASS} ${amp}`}
                    >
                        <Header />
                        <main>
                            {stickyMobile}
                            <div
                                className="row --top"
                                style={{ backgroundColor: backgroundCategory }}
                            >
                                <div className="lay">
                                    {/* BANNER y ANEXO */}
                                    {preApertura}
                                </div>
                            </div>
                            <div className="lay">
                                {/* APERTURA: CAJA DE DOS COLUMNAS */}
                                <div data-module='apertura'></div>
                                {apertura}
                            </div>
                            <div id="content-main" className="lay-sidebar">
                                {/* Cuerpo */}
                                <div className="sidebar__main">
                                    {/* NOTAS */}
                                    <div id='bloque2'>
                                        {viewabilityBlocks.bloque2 && anexo2}
                                        <div data-module='breaking1'>
                                            {viewabilityBlocks.bloque2 && breaking1}
                                        </div>
                                        {/* BANNER  */}
                                        {viewabilityBlocks.bloque2 && (
                                        <div class="row-gap-tablet-3 --ads">
                                            <BannerRefactor customFields={{ group: 'acumulado', desktop: 'caja1_dsk' }} />
                                            <BannerRefactor customFields={{ group: 'acumulado', desktop: 'caja2_dsk' }} />
                                            <BannerRefactor customFields={{ group: 'acumulado', desktop: 'caja3_dsk' }} />
                                        </div>
                                        )}
                                        <div data-module='breaking2'>
                                            {viewabilityBlocks.bloque2 && breaking2}
                                        </div>
                                        {/* BANNER */}
                                        <div data-module='breaking3'>
                                            {viewabilityBlocks.bloque2 && breaking3}
                                        </div>
                                    </div>

                                    <div id='bloque3'>
                                        {viewabilityBlocks.bloque3 && anexo3}
                                        <div data-module='opinion'>
                                            {viewabilityBlocks.bloque3 && opinion}
                                        </div>
                                        {/* BANNER */}
                                        {viewabilityBlocks.bloque3 && (
                                        <div class="row-gap-tablet-3 --ads">
                                            <BannerRefactor customFields={{ group: 'acumulado', desktop: 'caja4_dsk' }} />
                                            
                                        </div>
                                        )}
                                        <div data-module='breaking4'>
                                            {viewabilityBlocks.bloque3 && breaking4}
                                        </div>
                                        {/* BANNER */}
                                        <div data-module='breaking5'>
                                            {viewabilityBlocks.bloque3 && breaking5}
                                        </div>
                                        <div data-module='comercial1'>
                                            {viewabilityBlocks.bloque3 && comercial1}
                                        </div>
                                    </div>
                                    <div id='bloque4'>
                                        <div data-module='bloque2'>
                                            {viewabilityBlocks.bloque4 && bloque2}
                                        </div>
                                        <div data-module='comercial2'>
                                            {viewabilityBlocks.bloque4 && comercial2}
                                        </div>
                                        <div data-module='bloque3'>
                                            {viewabilityBlocks.bloque4 && bloque3}
                                        </div>
                                        <div data-module='bloque4'>
                                            {viewabilityBlocks.bloque4 && bloque4}
                                        </div>
                                    </div>
                                    <div id='bloque5'>
                                        <div data-module='bloque5'>
                                            {viewabilityBlocks.bloque5 && bloque5}
                                        </div>
                                        <div data-module='bloque6'>
                                            {viewabilityBlocks.bloque5 && bloque6}
                                        </div>
                                        <div data-module='bloque7'>
                                            {viewabilityBlocks.bloque5 && bloque7}
                                        </div>
                                        <div data-module='bloque8'>
                                            {viewabilityBlocks.bloque5 && bloque8}
                                        </div>
                                    </div>
                                    {/* <CargaEnBloque renderables={renderables} /> */}
                                </div>
                                <div className="sidebar__aside hlp-tablet-none">
                                    {/* BANNERS, RANKING DE NOTAS */}
                                    {aside}
                                </div>
                            </div>
                        </main>
                        <Footer />
                    </div>
                </GlobalProviderAcu>
            </LoginProvider>
        </GlobalProvider>
    );
};

LNAcumuladoLayout.propTypes = {
    children: PropTypes.node.isRequired,
    outputType: PropTypes.string.isRequired,
    tree: PropTypes.shape(PropTypes.arrayOf(PropTypes.node)),
    isAdmin: PropTypes.bool,
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

LNAcumuladoLayout.sections = pageBuilderSections;

export default Consumer(LNAcumuladoLayout);
