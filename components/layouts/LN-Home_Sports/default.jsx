import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import StaticValidation from '../../private/common/staticValidation';
import Header from '../../private/LN/common/header';
import Footer from '../../private/LN/common/footer';
import GlobalProvider from '../../private/common/context/globalContext';
import '../../../resources/dist/css/ln/components/banners.css';
import { GlobalProviderAcu } from '../../private/LN/acumulado/context/globalContextAcu';
import get from '../../private/common/utils/get';
import getBannerMegatop from '../../private/common/utils/getBannerMegatop';
import LoadBannersSSR from '../../private/common/banners/LoadBannersSSR';
import PwaModals from '../../private/LN/common/pwaModals';
import { homeLayoutsPropTypes } from '../../private/common/utils/propTypesHelper';

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
    return (
        <GlobalProvider>
            <GlobalProviderAcu
                acumuladoGeneral={acumuladoGeneral}
                acumuladoColor={acumuladoColor}
                idCollectionsInPage={idCollectionsInPage}
                idCollectionApertura={idCollectionApertura}
            >
                {megatop}
                <div id="wrapper" className="acumulado deportes ">
                    <Header />
                    <main id="content">
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
                                <StaticValidation
                                    id="staticApertura"
                                    htmlOnly
                                    persistent
                                >
                                    {apertura}
                                </StaticValidation>
                                <StaticValidation
                                    id="staticCuerpo"
                                    htmlOnly
                                    persistent
                                >
                                    {cuerpo}
                                </StaticValidation>
                            </div>
                            <div className="sidebar__aside hlp-tabletlm-none">
                                {/* BANNERS, RANKING DE NOTAS */}
                                {aside}
                            </div>
                        </div>
                    </main>
                    <StaticValidation id="StaticFooter" htmlOnly persistent>
                        <Footer />
                    </StaticValidation>
                </div>
                <LoadBannersSSR />
                <PwaModals />
            </GlobalProviderAcu>
        </GlobalProvider>
    );
};

LNSportsHome.propTypes = {
    outputType: PropTypes.string.isRequired,
    tree: PropTypes.shape(PropTypes.arrayOf(PropTypes.node)).isRequired,
    isAdmin: PropTypes.bool.isRequired,
    ...homeLayoutsPropTypes
};

LNSportsHome.sections = pageBuilderSections;

export default Consumer(LNSportsHome);
