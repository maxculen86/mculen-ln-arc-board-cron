/* eslint-disable func-names */
import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import { getSectionStyle } from '../private/common/utils/sectionUtils';
import LoginProvider from '../private/LN/common/context/loginContext';

import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';

// import '../../resources/dist/css/ln/base.css';
// import '../../resources/dist/css/ln/layouts/grid.css';
// import '../../resources/dist/css/ln/layouts/layout.css';

// // TODO, REVISAR ESTOS ESTILOS MAS ADELANTE. EN ALGUNOS LADOS FUNCIONAN EN
// // EL COMPONENTE Y EN OTROS NO

// import '../../resources/dist/css/ln/components/button.css';
// import '../../resources/dist/css/ln/components/date.css';
// import '../../resources/dist/css/ln/components/tag.css';
// import '../../resources/dist/css/ln/components/author.css';
// import '../../resources/dist/css/ln/components/lead.css';
// import '../../resources/dist/css/ln/components/com-ordered.css';
// import '../../resources/dist/css/ln/components/com-unordered.css';
// import '../../resources/dist/css/ln/components/input.css';
// import '../../resources/dist/css/ln/modules/newsletter.css';
// import '../../resources/dist/css/ln/components/blockquote.css';
// import '../../resources/dist/css/ln/components/text.css';
// import '../../resources/dist/css/ln/components/link.css';
// import '../../resources/dist/css/ln/components/subtitle.css';
// import '../../resources/dist/css/ln/components/slider.css';
// import '../../resources/dist/css/ln/components/epigraph.css';
// import '../../resources/dist/css/ln/components/appointment.css';
// import '../../resources/dist/css/ln/components/colecciones.css';
// import '../../resources/dist/css/ln/components/carta-lectores.css';
// import '../../resources/dist/css/ln/components/banners.css';
// import '../../resources/dist/css/ln/base/helpers.css';

// /* Se debe importar para AMP */
// // import '../../resources/dist/css/ln/components/nav-amp.css';

// /* Se debe dejar último los helpers */
// import '../../resources/dist/css/ln/base/helpers.css';

import '../../resources/dist/css/ln/pages/recipe.css';

import GlobalProvider from '../private/common/context/globalContext';
import { CommentsProvider } from '../private/common/context/commentsContext';
import LoadBanners from '../private/common/banners/LoadBanners';

const pageBuilderSections = [
    'Pre-Titulo',
    'Titulo',
    'Apertura',
    'Left-Cuerpo',
    'Pos-Apertura',
    'Cuerpo',
    'Tercera',
    'Newsletter',
    'Bottom',
    'Bottom-Tercera'
];

class LNNotaReceta extends Component {
    constructor(props) {
        super(props);
        const {
            props: {
                globalContent: {
                    taxonomy: { sections }
                }
            }
        } = this;

        this.sectionClass = getSectionStyle(sections);
    }

    render() {
        const { children } = this.props;

        return (
            <GlobalProvider>
                <LoginProvider>
                    <CommentsProvider>
                        <div id="wrapper" className="nota">
                            <Header />
                            <main>
                                {/* Pre-Titulo: Banners */}
                                {children[0]}
                                <div
                                    className={`lay col-12 ${this
                                        .sectionClass &&
                                        this.sectionClass.class}`}
                                >
                                    {/* TODO: confirmar */}
                                    <header className="row titulo">
                                        <div className="col-12">
                                            {/* Titulo (breadcrumb, logo+titulo) */}
                                            {children[1]}
                                        </div>
                                    </header>
                                    {/* Apertura */}
                                    {children[2]}
                                </div>

                                <div className="lay-sidebar">
                                    {/* Cuerpo */}
                                    <div className="sidebar__main">
                                        <section className="cuerpo__nota">
                                            <div className="row">
                                                <div className="col-12 col-desksm-1">
                                                    {/* hlp-mobile-show */}
                                                    {/* Left-Cuerpo Shared */}
                                                    {children[3]}
                                                </div>
                                                <div className="col-deskxl-10 offset-deskxl-1 col-desksm-11">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            {/* Pos-Apertura */}
                                                            {children[4]}
                                                        </div>
                                                    </div>
                                                    {children[5]}
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                    {/* Tercera */}
                                    <div className="sidebar__aside hlp-desklm-none">
                                        {children[6]}
                                    </div>
                                </div>

                                {/* TODO: revisar clases del newsLetter Full-Break */}
                                {/* {children[7]} */}

                                {/* Newsletter */}
                                <div className="lay">{children[7]}</div>

                                <div className="lay-sidebar">
                                    <div className="sidebar__main">
                                        {/* Bottom */}
                                        {children[8]}
                                    </div>
                                    <div className="sidebar__aside">
                                        {/* Bottom-Tercera */}
                                        {children[9]}
                                    </div>
                                </div>
                            </main>
                            <Static id="StaticFooter">
                                <Footer />
                            </Static>
                        </div>
                        <LoadBanners />
                    </CommentsProvider>
                </LoginProvider>
            </GlobalProvider>
        );
    }
}

LNNotaReceta.propTypes = {
    children: PropTypes.arrayOf(PropTypes.object).isRequired,
    globalContent: PropTypes.shape({
        taxonomy: PropTypes.shape({
            sections: PropTypes.arrayOf(
                PropTypes.shape({
                    additional_properties: PropTypes.shape({
                        original: PropTypes.shape({
                            style: PropTypes.shape({
                                section_class: PropTypes.string
                            })
                        })
                    })
                })
            )
        }).isRequired
    }).isRequired
};

LNNotaReceta.sections = pageBuilderSections;

export default Consumer(LNNotaReceta);
