import React from 'react';
import Consumer from 'fusion:consumer';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import AcuTitle from '../private/LN/acumulado/acumuladoTitle';
import BannerCaja1 from '../private/LN/acumulado/bannerCaja1';
import BannerCaja2 from '../private/LN/acumulado/bannerCaja2';
import BannerCabezal from '../private/LN/acumulado/bannerCabezal';
import BannerSticky from '../private/LN/acumulado/bannerSticky';
import BreadcrumbSection from '../private/LN/acumulado/breadcrumbs/breadcrumbSection';

import '../../resources/dist/css/ln/base.css';
import '../../resources/dist/css/ln/layouts/layout.css';
import '../../resources/dist/css/ln/layouts/grid.css';
import '../../resources/dist/css/ln/pages/acu.css';
import '../../resources/dist/css/ln/components/ordered.css';
import '../../resources/dist/css/ln/components/unordered.css';

const layoutItems = ['Apertura', 'Links', 'Notas', 'Aside'];

const LNAcumuladoLayout = ({ globalContent, children, siteProperties }) => (
    <div id="wrapper">
        <Header />
        <main>
            <BannerCabezal />
            <BannerSticky />
            <div id="content-main" className="lay-sidebar">
                <div className="sidebar__main">
                    <div className="row">
                        <BreadcrumbSection
                            sectionId={globalContent._id}
                            host={siteProperties.shareConfig.host}
                        />
                    </div>
                    <div className="row">
                        <AcuTitle
                            title={globalContent.name}
                            children={globalContent.children}
                            isPrimarySecton={
                                globalContent._id.split('/').splice(1)
                                    .length === 1
                            }
                        />
                        {/* LUGAR PARA UN ANEXO */}
                        {children[0]}
                    </div>
                    <div className="row">
                        {/* LINKS DE NAVEGACION */}
                        {children[1]}
                    </div>
                    {/* NOTAS */}
                    {children[2]}
                </div>
                <div className="sidebar__aside hlp-tablet-none">
                    <BannerCaja1 />
                    {/* RANKING DE NOTAS */}
                    {children[3]}
                    <BannerCaja2 />
                </div>
            </div>
        </main>
        <Footer />
    </div>
);

LNAcumuladoLayout.sections = layoutItems;

export default Consumer(LNAcumuladoLayout);
