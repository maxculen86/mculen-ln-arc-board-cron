import React from 'react';
import Consumer from 'fusion:consumer';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import WikiAuthor from '../private/LN/acumulado/author/wikiAuthor';
import BannerCaja1 from '../private/LN/acumulado/bannerCaja1';
import BannerCaja2 from '../private/LN/acumulado/bannerCaja2';
import BannerCabezal from '../private/LN/acumulado/bannerCabezal';
import BannerSticky from '../private/LN/acumulado/bannerSticky';
import BreadCrumbAutor from '../private/LN/acumulado/breadcrumbs/breadcrumbAutor';

import '../../resources/dist/css/ln/base.css';
import '../../resources/dist/css/ln/layouts/layout.css';
import '../../resources/dist/css/ln/layouts/grid.css';
import '../../resources/dist/css/ln/pages/acu.css';

const layoutItems = ['Apertura', 'Links', 'Notas', 'Aside'];

const LNAcumuladoAuthorLayout = props => {
    const { globalContent, siteProperties } = props;
    const { byline, image, _id, longBio, twitter } = globalContent;
    return (
        <div id="wrapper">
            <Header />
            <main>
                <BannerCabezal />
                <BannerSticky />
                <div id="content-main" className="lay-sidebar">
                    <div className="sidebar__main">
                        <div className="row">
                            <BreadCrumbAutor
                                author={globalContent}
                                host={siteProperties.shareConfig.host}
                            />
                        </div>
                        <div className="row">
                            <WikiAuthor
                                name={byline}
                                imgSrc={image}
                                url={`/autor/${_id}`}
                                bio={longBio}
                                twitter={twitter}
                            />
                        </div>
                        <div className="row">
                            {/* LINKS DE NAVEGACION */}
                            {props.children[1]}
                        </div>
                        {/* NOTAS */}
                        {props.children[2]}
                    </div>
                    <div className="sidebar__aside">
                        <BannerCaja1 />
                        {/* RANKING DE NOTAS */}
                        {props.children[3]}
                        <BannerCaja2 />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

LNAcumuladoAuthorLayout.sections = layoutItems;

export default Consumer(LNAcumuladoAuthorLayout);
