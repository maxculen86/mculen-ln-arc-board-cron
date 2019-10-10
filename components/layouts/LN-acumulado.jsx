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
        const {
            globalContent: { site_topper, author_type, Payload }
        } = this.props;
        if (!site_topper && !author_type && !Payload) {
            const e = new Error('Acumulado no encontrado.');
            e.statusCode = 404;
            throw e;
        }
        return (
            <div id="wrapper">
                <Header />
                <main>
                    {/* BANNERS: CABEZAL Y STICKY */}
                    {this.props.children[0]}
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
