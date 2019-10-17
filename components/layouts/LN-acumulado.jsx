import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';

import '../../resources/dist/css/ln/base.css';
import '../../resources/dist/css/ln/layouts/layout.css';
import '../../resources/dist/css/ln/layouts/grid.css';
import '../../resources/dist/css/ln/pages/acu.css';
import '../../resources/dist/css/ln/components/ordered.css';
import '../../resources/dist/css/ln/components/unordered.css';

import '../../resources/dist/css/ln/pages/acu-revista.css';

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
        return (
            <div id="wrapper" className="acu-revista ohlala">
                <Header />
                <main>
                    {/* BANNERS: CABEZAL Y STICKY */}
                    {this.props.children[0]}
                    <div className="row mod-opening-revista with-hl">
                        <section className="lay">
                            <div className="anexo">ANEXO 100%</div>
                        </section>
                        <section className="lay">
                            <div className="com-share">
                                <a href="https://www.facebook.com/ohlalarevista/" target="_blank" rel="noreferrer noopener"><i class="icon-facebook"></i></a>
                                <a href="https://twitter.com/RevistaOhlala/" target="_blank" rel="noreferrer noopener"><i class="icon-twitter"></i></a>
                                <a href="https://www.instagram.com/ohlalarevista/" target="_blank" rel="noreferrer noopener"><i class="icon-instagram"></i></a>
                            </div>
                            <div className="logo">
                                <i className="logo-ohlala"></i>
                            </div>
                            <div className="links">
                                <a className="com-link" href=" ">Cocina healthy</a>
                                <a className="com-link" href=" ">OHLALÁ! Viaja</a>
                                <a className="com-link" href=" ">Project planner</a>
                                <a className="com-link" href=" ">Fábrica OHLALÁ!</a>
                                <a className="com-link" href=" ">OHLALÁ! Fest</a>
                            </div>
                        </section>
                    </div>
                    <div className="lay highlights">
                        <section className="row-gap-tablet-2 row-gap-deskxl-2">
                            <article className="mod-caja-nota --border w-100-mobile">
                                <section className="cont-figure">
                                    <a className="figure">
                                        <picture className="content-pic picture"></picture>
                                    </a>
                                </section>
                                <div className="mod-caja-nota__descrip">
                                    <h2 className="com-title-acu">
                                        <a href="#">Headline- basic - 2-test</a>
                                    </h2>
                                    <h4 className="com-date">25 de Diciembre de 2019</h4>
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
                                        <a href="#">Headline- basic - 2-test</a>
                                    </h2>
                                    <h4 className="com-date">25 de Diciembre de 2019</h4>
                                </div>
                            </article>
                        </section>
                    </div>

                    <div id="content-main" className="lay-sidebar">
                        <div className="sidebar__main">
                            <div className="row">
                                {/* BREADCRUMB */}
                                {this.props.children[1]}
                            </div>
                            <div className="row">
                                <div className="anexo">ANEXO 100%</div>
                                {/* LUGAR PARA UN ANEXO Y TITULO */}
                                {this.props.children[2]}
                            </div>
                            <div className="row">
                                {/* LINKS DE NAVEGACION */}
                                {this.props.children[3]}
                            </div>
                            {/* NOTAS */}
                            {this.props.children[4]}
                        </div>
                        <div className="sidebar__aside hlp-tablet-none">
                            {/* RANKING DE NOTAS */}
                            {this.props.children[5]}
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
