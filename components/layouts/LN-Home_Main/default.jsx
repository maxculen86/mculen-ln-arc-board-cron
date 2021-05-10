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

const BannerWrapper = React.memo(
    ({ children }) => children,
    (prevProps, nextProps) => prevProps.load === nextProps.load
);
BannerWrapper.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'updateAll': {
            const newState = updateBlocks(state, action.payload);
            return newState;
        }
        case 'update':
            if (state[action.payload]) return state;
            return {
                ...state,
                [action.payload]: true
            };
        default:
            throw new Error();
    }
};

const updateBlocks = (blocks, lastBlock) => {
    const b = blocks;
    if (!lastBlock) return blocks;
    const number = lastBlock.slice(-1);
    Object.keys(blocks).forEach(key => {
        if (key.slice(-1) <= number) b[key] = true;
    });
    return blocks;
};

/**
 * TODO: Hacer dinamica la siguiente configuracion para distintos tamaños de viewport
 */
const sectionsWithBlocks = {
    apertura: 'bloque2',
    anexo2: 'bloque2',
    breaking1: 'bloque2',
    breaking2: 'bloque3',
    breaking3: 'bloque3',
    anexo3: 'bloque3',
    opinion: 'bloque3',
    breaking4: 'bloque3',
    breaking5: 'bloque3',
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

/* const blocksBanners = {
    bloque1: [
        {
            slotGroup: 'acumuladoHome',
            desktop: 'caja1_dsk',
            tablet: 'caja1_tab'
        },
        {
            slotGroup: 'acumuladoHome',
            desktop: 'caja2_dsk'
        },
        {
            slotGroup: 'acumuladoHome',
            desktop: 'caja3_dsk'
        }
    ],
    bloque2: []
};

{blocksToLoad.bloque2 && (
    <div className="row-gap-tablet-3 --ads">
        <BannerWrapper
            load={blocksToLoad.bloque2}
        >
            <BannerRefactor
                customFields={{
                    group: 'acumulado',
                    desktop: 'caja1_dsk'
                }}
            />
            <BannerRefactor
                customFields={{
                    group: 'acumulado',
                    desktop: 'caja2_dsk'
                }}
            />
            <BannerRefactor
                customFields={{
                    group: 'acumulado',
                    desktop: 'caja3_dsk'
                }}
            />
        </BannerWrapper>
    </div>
)} */

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
        isAdmin
    } = props;
    // const megatop = getBannerMegatop(bannerMegatop, outputType, tree, isAdmin);

    const [blocksToLoad, dispatch] = useReducer(reducer, {
        bloque1: true,
        bloque2: isAdmin,
        bloque3: isAdmin,
        bloque4: isAdmin,
        bloque5: isAdmin
    });

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

    // First load
    useEffect(() => {
        const handleScroll = throttle((e, dataSections) => {
            // const scrollPercentRounded = getScrollPercent();
            sessionStorage.setItem('homePosition', window.pageYOffset);
            const scrollTop = get(e, 'target.scrollingElement.scrollTop', 0);
            const sectionVisible = getSectionVisible(scrollTop, dataSections);
            if (!sectionVisible) return;

            sessionStorage.setItem('lastBlock', sectionVisible);
            const blockToLoad = sectionsWithBlocks[sectionVisible];
            dispatch({ type: 'update', payload: blockToLoad });
        }, 25);

        const dataSections = document.querySelectorAll('[data-section]');
        window.addEventListener('scroll', e => handleScroll(e, dataSections));
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // First Load
    useEffect(() => {
        const lastSectionSaw = sessionStorage.getItem('lastBlock');
        const lastScrollPosition = sessionStorage.getItem('homePosition');
        if (!lastSectionSaw || !lastScrollPosition) return;
        const lastBlockSaw = sectionsWithBlocks[lastSectionSaw];
        // const newStatusBlocks = updateBlocks(blocksToLoad, lastBlockSaw);
        dispatch({ type: 'updateAll', payload: lastBlockSaw });
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
                    {anticipo}
                    {anexo1}
                    {bomba}
                    <main>
                        {/* {stickyMobile} */}
                        <div className="row --top">
                            {/* <div className="lay">{preApertura}</div> */}
                        </div>
                        <div id="content-main" className="lay-sidebar">
                            {/* Cuerpo */}
                            <div className="sidebar__main">
                                {/* 1er Bloque */}
                                <div data-section="apertura">{apertura}</div>

                                {blocksToLoad.bloque2 && anexo2}
                                <div data-section="breaking1">
                                    {blocksToLoad.bloque2 && breaking1}
                                </div>
                                {/* BANNER  */}
                                <div data-section="breaking2">
                                    {blocksToLoad.bloque2 && breaking2}
                                </div>
                                {/* BANNER */}
                                {blocksToLoad.bloque2 && (
                                    <div className="row-gap-tablet-3 --ads">
                                        {/* <BannerWrapper
                                            load={blocksToLoad.bloque2}
                                        >
                                            <BannerRefactor
                                                customFields={{
                                                    group: 'acumulado',
                                                    desktop: 'caja1_dsk'
                                                }}
                                            />
                                            <BannerRefactor
                                                customFields={{
                                                    group: 'acumulado',
                                                    desktop: 'caja2_dsk'
                                                }}
                                            />
                                            <BannerRefactor
                                                customFields={{
                                                    group: 'acumulado',
                                                    desktop: 'caja3_dsk'
                                                }}
                                            />
                                        </BannerWrapper> */}
                                    </div>
                                )}
                                <div data-section="breaking3">
                                    {blocksToLoad.bloque2 && breaking3}
                                </div>
                                {/* 2do Bloque */}
                                {blocksToLoad.bloque3 && anexo3}
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
                            </div>
                            <div className="sidebar__aside hlp-tabletlm-none">
                                {/* BANNERS, RANKING DE NOTAS */}
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
    outputType: PropTypes.string.isRequired,
    tree: PropTypes.shape(PropTypes.arrayOf(PropTypes.node)).isRequired,
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
