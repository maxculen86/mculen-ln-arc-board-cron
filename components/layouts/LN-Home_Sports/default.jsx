import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Header from '../../private/LN/common/header';
import Footer from '../../private/LN/common/footer';
import LoginProvider from '../../private/LN/common/context/loginContext';
import GlobalProvider from '../../private/common/context/globalContext';

import '../../../resources/dist/css/ln/components/banners.css';
import { GlobalProviderAcu } from '../../private/LN/acumulado/context/globalContextAcu';
import get from '../../private/common/utils/get';
import getBannerMegatop from '../../private/common/utils/getBannerMegatop';
import LoadBanners from '../../private/common/banners/LoadBanners';

const pageBuilderSections = [
    'Banner-Megatop',
    'Sticky-Mobile',
    'Cabezal',
    'Apertura',
    'Cuerpo',
    'Aside'
];

const LNSportsHome = props => {
    const {
        children: [
            bannerMegatop,
            stickyMobile,
            cabezal,
            apertura,
            cuerpo,
            aside
        ],
        globalContent,
        outputType,
        tree,
        isAdmin
    } = props;
    const acumuladoGeneral = get(globalContent, 'acumuladoGeneral', {});
    const acumuladoColor = get(globalContent, 'acumuladoColor', {});
    const {
        background_color: backgroundCategory,
        navigation_color_tags: colorTags,
        header_class_name: headerDark
    } = acumuladoColor;
    const megatop = getBannerMegatop(bannerMegatop, outputType, tree, isAdmin);
    const idCollectionApertura = get(
        globalContent,
        'acumuladoGeneral.id_collection_promo_items'
    );
    const idCollectionsInPage = get(
        globalContent,
        'acumuladoGeneral.colecciones',
        []
    );

    const HEADER_BACKGROUND = headerDark === 'true' ? ' --transparent' : '';
    const COLOR_CLASS = backgroundCategory || colorTags ? '--color' : '';
    const OPENING_CLASS = idCollectionApertura ? '--opening' : '';

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
                    <div id="wrapper" className="deportes ">
                        <Header />
                        <main>
                            {stickyMobile}
                            <div className="row --top">
                                <div className="lay">
                                    {/* BANNER y ANEXO */}
                                    {/* TITULO/LOGO Y CATEGORIAS */}
                                    {cabezal}
                                </div>
                            </div>
                            <div id="content-main" className="lay-sidebar">
                                {/* Cuerpo */}
                                <div className="sidebar__main">
                                    {/* SECCIONES */}
                                    {apertura}
                                    {cuerpo}
                                </div>
                                <div className="sidebar__aside hlp-tablet-none">
                                    {/* BANNERS, RANKING DE NOTAS */}
                                    {aside}
                                </div>
                            </div>
                        </main>
                        <Footer />
                    </div>
                    <LoadBanners />
                </GlobalProviderAcu>
            </LoginProvider>
        </GlobalProvider>
    );
};

LNSportsHome.propTypes = {
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

LNSportsHome.sections = pageBuilderSections;

export default Consumer(LNSportsHome);
