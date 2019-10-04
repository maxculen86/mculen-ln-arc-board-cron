import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import AcuTitle from '../private/LN/acumulado/acumuladoTitle';
import BannerCaja1 from '../private/LN/acumulado/bannerCaja1';
import BannerCaja2 from '../private/LN/acumulado/bannerCaja2';
import BannerCabezal from '../private/LN/acumulado/bannerCabezal';
import BreadcrumbTag from '../private/LN/acumulado/breadcrumbs/breadcrumbTag';

import '../../resources/dist/css/ln/base.css';
import '../../resources/dist/css/ln/layouts/layout.css';
import '../../resources/dist/css/ln/layouts/grid.css';
import '../../resources/dist/css/ln/pages/acu.css';
import '../../resources/dist/css/ln/components/ordered.css';
import '../../resources/dist/css/ln/components/unordered.css';

const layoutItems = ['Apertura', 'Links', 'Notas', 'Aside'];

class LNAcumuladoLayout extends Component {
    render() {
        const { globalContent, siteProperties } = this.props;
        if (!globalContent.Payload || !globalContent.Payload.items.length)
            throw new Error('tag no encontrado');

        const tag = globalContent.Payload.items[0];
        return (
            <div id="wrap">
                <Header />
                <main>
                    <BannerCabezal />
                    <div id="content-main" className="lay-sidebar">
                        <div className="sidebar__main">
                            <div className="row">
                                <BreadcrumbTag
                                    tag={tag}
                                    host={siteProperties.shareConfig.host}
                                />
                            </div>
                            <div className="row">
                                <AcuTitle title={tag.name} />
                                {/* LUGAR PARA UN ANEXO */}
                                {this.props.children[0]}
                            </div>
                            <div className="row">
                                {/* LINKS DE NAVEGACION */}
                                {this.props.children[1]}
                            </div>
                            {/* NOTAS */}
                            {this.props.children[2]}
                        </div>
                        <div className="sidebar__aside hlp-tablet-none">
                            <BannerCaja1 />
                            {/* RANKING DE NOTAS */}
                            {this.props.children[3]}
                            <BannerCaja2 />
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}

LNAcumuladoLayout.sections = layoutItems;

export default Consumer(LNAcumuladoLayout);
