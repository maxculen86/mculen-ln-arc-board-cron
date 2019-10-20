import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import HeaderRevista from '../private/LN/acumulado/cabezalRevista';

import '../../resources/dist/css/ln/base.css';
import '../../resources/dist/css/ln/layouts/layout.css';
import '../../resources/dist/css/ln/layouts/grid.css';
import '../../resources/dist/css/ln/pages/acu.css';
import '../../resources/dist/css/ln/components/ordered.css';
import '../../resources/dist/css/ln/components/unordered.css';

// import '../../resources/dist/css/ln/pages/acu-revista.css';

const layoutItems = [
    'Pre-Apertura',
    'Breadcrumb',
    'Apertura',
    'Links',
    'Notas',
    'Aside'
];

class LNAcumuladoLayout extends Component {
    render() {
        const { children } = this.props;
        return (
            <div id="wrapper" className="acu-revista ohlala">
                <Header />
                <main>
                    {/* CABEZAL REVISTA Y BANNERS: CABEZAL Y STICKY */}
                    {children[0]}
                    <HeaderRevista />
                    <div className="row highlights">
                        <div className="lay">
                            <section className="row-gap-tablet-2 row-gap-deskxl-2">
                                <article className="mod-caja-nota --border w-100-mobile">
                                    <section className="cont-figure">
                                        <a className="figure">
                                            <picture className="content-pic picture"></picture>
                                        </a>
                                    </section>
                                    <div className="mod-caja-nota__descrip">
                                        <h2 className="com-title-acu">
                                            <a href="#">
                                                Headline- basic - 2-test
                                            </a>
                                        </h2>
                                        <h4 className="com-date">
                                            25 de Diciembre de 2019
                                        </h4>
                                    </div>
                                </article>
                                <article className="mod-caja-nota --border w-100-mobile">
                                    <section className="cont-figure">
                                        <a className="figure">
                                            <picture className="content-pic picture"></picture>
                                        </a>
                                    </section>
                                    <div className="mod-caja-nota__descrip">
                                        <h2 className="com-title-acu">
                                            <a href="#">
                                                Headline- basic - 2-test
                                            </a>
                                        </h2>
                                        <h4 className="com-date">
                                            25 de Diciembre de 2019
                                        </h4>
                                    </div>
                                </article>
                            </section>
                        </div>
                    </div>
                    <div id="content-main" className="lay-sidebar">
                        <div className="sidebar__main">
                            <div className="row">
                                {/* BREADCRUMB */}
                                {children[1]}
                            </div>
                            <div className="row">
                                <div className="com-anexo">ANEXO 100%</div>
                                {/* LUGAR PARA UN ANEXO Y TITULO */}
                                {children[2]}
                            </div>
                            <div className="row">
                                {/* LINKS DE NAVEGACION */}
                                {children[3]}
                            </div>
                            {/* NOTAS */}
                            {children[4]}
                        </div>
                        <div className="sidebar__aside hlp-tablet-none">
                            {/* RANKING DE NOTAS */}
                            {children[5]}
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
