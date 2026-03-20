import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import Header from '../../features/LN-10-global/header/default';
import Footer from '../../private/LN10/footer';
import GlobalProvider from '../../private/common/context/globalContext';
import { GlobalProviderAcu } from '../../private/LN/acumulado/context/globalContextAcu';
import get from '../../private/common/utils/get';
import AdsStrategySelector from '../../features/LN/common/adsManager/components/adsStrategySelector';
import PwaModal from '../../features/LN-10-global/pwaModal/default';
import { homeLayoutsPropTypes } from '../../private/common/utils/propTypesHelper';
import pageBuilderSections from '../config/LN-Home_Sports-PageBuilder.config.json';
import InitControlGroup from '../helpers/initCtrlGrp';

function LNSportsHome(props) {
    const {
        children: [
            bannerMegatop,
            stickyMobile,
            cabezal,
            apertura,
            cuerpo,
            aside
        ],
        globalContent
    } = props;
    const acumuladoGeneral = get(globalContent, 'acumuladoGeneral', {});
    const acumuladoColor = get(globalContent, 'acumuladoColor', {});
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
                {bannerMegatop}
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
                                <Static id="staticApertura" htmlOnly>
                                    {apertura}
                                </Static>
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
                <AdsStrategySelector />
                <PwaModal />
                <InitControlGroup />
            </GlobalProviderAcu>
        </GlobalProvider>
    );
}

LNSportsHome.propTypes = {
    ...homeLayoutsPropTypes
};

LNSportsHome.sections = pageBuilderSections;

export default Consumer(LNSportsHome);
