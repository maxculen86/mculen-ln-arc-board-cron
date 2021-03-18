import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Header from '../../private/LN/common/header';
import Footer from '../../private/LN/common/footer';
import LoginProvider from '../../private/LN/common/context/loginContext';
import GlobalProvider from '../../private/common/context/globalContext';

import '../../../resources/dist/css/ln/components/banners.css';
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
        outputType,
        tree,
        isAdmin
    } = props;
    const megatop = getBannerMegatop(bannerMegatop, outputType, tree, isAdmin);

    return (
        <GlobalProvider>
            <LoginProvider>
                {megatop}
                <div id="wrapper" className="deportes ">
                    <Header />
                    <main>
                        {stickyMobile}
                        <div className="row --top">
                            <div className="lay">
                                {/* BANNER, ANEXO, TITULO, LOGO, CATEGORIAS */}
                                {cabezal}
                            </div>
                        </div>
                        <div id="content-main" className="lay-sidebar">
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
