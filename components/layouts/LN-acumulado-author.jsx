import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import AcuTitle from '../private/LN/acumulado/acumuladoTitle';
import BannerCaja1 from '../private/LN/acumulado/bannerCaja1';
import BannerCaja2 from '../private/LN/acumulado/bannerCaja2';
import BannerCabezal from '../private/LN/acumulado/bannerCabezal';

import '../../resources/dist/css/ln/base.css';
import '../../resources/dist/css/ln/layouts/layout.css';
import '../../resources/dist/css/ln/layouts/grid.css';
import '../../resources/dist/css/ln/pages/acu.css';

const layoutItems = ['Apertura', 'Links', 'Notas', 'Aside'];

class LNAcumuladoAuthorLayout extends Component {
    render() {
        return (
            <div id="wrap">
                <Header />
                <main>
                    <BannerCabezal />
                    <div className="lay-sidebar">
                        <div className="sidebar__main">
                            <div className="row">
                                <div>WikiAuthor</div>
                                {/* TODO: Crear componente 
                                    <WikiAuthor /> */}
                            </div>
                            <div className="row">
                                {/* LINKS DE NAVEGACION */}
                                {this.props.children[1]}
                            </div>
                            <section className="row-gap-tablet-2 row-gap-deskxl-3 hlp-degrade">
                                {/* NOTAS */}
                                {this.props.children[2]}
                            </section>
                        </div>
                        <div className="sidebar__aside">
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
