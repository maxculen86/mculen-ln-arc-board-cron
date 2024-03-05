import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import StaticContent from '../../private/common/staticContent';
import Header from '../../features/LN-10-global/header/default';
import Footer from '../../private/LN10/footer';
import GlobalProvider from '../../private/common/context/globalContext';
import '../../../resources/dist/css/ln/components/banners.css';
import { GlobalProviderAcu } from '../../private/LN/acumulado/context/globalContextAcu';
import get from '../../private/common/utils/get';
import getBannerMegatop from '../../private/common/utils/getBannerMegatop';
import LoadBannersSSR from '../../private/common/banners/LoadBannersSSR';
import PwaModals from '../../private/LN/common/pwaModals';
import { homeLayoutsPropTypes } from '../../private/common/utils/propTypesHelper';
import pageBuilderSections from '../config/LN-Home_Sports-PageBuilder.config.json';

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
                <div
                    id="wrapper"
                    className="wrapper --top-fixed acumulado deportes"
                >
                    <Header />
                    <main id="content" className="--header-fixed-margin">
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
                                <StaticContent id="staticApertura">
                                    {apertura}
                                </StaticContent>
                                {cuerpo}
                            </div>
                            <div className="sidebar__aside hlp-tabletlm-none">
                                {/* BANNERS, RANKING DE NOTAS */}
                                {aside}
                            </div>
                        </div>
                    </main>
                    <div className="footer-container --no-app">
                        <Footer />
                    </div>
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
