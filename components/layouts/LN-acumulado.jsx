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
            <div id="wrapper acu-revista ohlala">
                <Header />
                <main>
                    {/* BANNERS: CABEZAL Y STICKY */}
                    {this.props.children[0]}
                    <div className="row mod-opening-revista">
                        <section className="lay">
                            <div className="com-share">
                                <div className="share-left">
                                    <button href="" className="icon-facebook"></button>
                                    <button href="" className="icon-twitter"></button>
                                    <button href="" className="icon-instagram"></button>
                                </div>
                            </div>
                            <div className="logo hlp-text-center hlp-marginBottom-desk-40">
                                <i className="logo-ohlala hlp-marginBottom-desk-10"></i>
                            </div>
                            <div className="hlp-text-center hlp-marginBottom-40">
                                <a className="com-link" href=" ">Cocina healthy</a>
                                <a className="com-link" href=" ">OHLALÁ! Viaja</a>
                                <a className="com-link" href=" ">Project planner</a>
                                <a className="com-link" href=" ">Fábrica OHLALÁ!</a>
                                <a className="com-link" href=" ">OHLALÁ! Fest</a>
                            </div>
                        </section>
                    </div>
                    <div id="content-main" className="lay-sidebar">
                        <div className="sidebar__main">
                            <div className="row">
                                {/* BREADCRUMB */}
                                {this.props.children[1]}
                            </div>
                            <div className="row">
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
