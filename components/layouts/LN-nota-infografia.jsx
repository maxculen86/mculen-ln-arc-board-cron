import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';

// import '../../resources/dist/css/ln/base.css'; // chequear para sacar base porque se repite estilo
// import '../../resources/dist/css/ln/base/reset.css';
// import '../../resources/dist/css/ln/base/types.css';
// import '../../resources/dist/css/ln/pages/recipe.css';
// import '../../resources/dist/css/ln/layouts/grid.css';
// import '../../resources/dist/css/ln/layouts/layout.css';
// import '../../resources/dist/css/ln/modules/header-desktop.css';
// import '../../resources/dist/css/ln/modules/header-mobile.css';

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
// import '../../resources/dist/css/ln/components/opinion-author.css';

// import '../../resources/dist/css/ln/modules/mod-banner.css';
// import '../../resources/dist/css/ln/components/com-banner.css';
// import '../../resources/dist/css/ln/components/com-button.css';
// // import '../../resources/dist/css/ln/components/colecciones.css';
// // import '../../resources/dist/css/ln/components/carta-lectores.css';

// /* Se debe importar para AMP */
// // import '../../resources/dist/css/ln/components/nav-amp.css';

// /* Se debe importar por layouts */
// import '../../resources/dist/css/ln/components/banners.css';

// /* Se debe dejar último los helpers */
// import '../../resources/dist/css/ln/base/helpers.css';

// import '../../resources/dist/css/ln/pages/magazine.css';

import GlobalProvider from '../private/common/context/globalContext';
import { CommentsProvider } from '../private/common/context/commentsContext';
import { getSectionLogo } from '../private/common/utils/sectionUtils';
import getBannerMegatop from '../private/common/utils/getBannerMegatop';
import LoadBannersSSR from '../private/common/banners/LoadBannersSSR';

const lnNotaInfografia = ({
    children,
    outputType,
    tree,
    isAdmin,
    globalContent: {
        taxonomy: { sections },
        distributor: { name }
    },
    layout
}) => {
    const amp = outputType === 'amp' ? 'amp' : '';
    const bannerMegatop = getBannerMegatop(children[0], amp, tree, isAdmin);
    const logo = getSectionLogo(sections, layout, name);
    const magazine = logo ? logo.logoName : '';
    return (
        <GlobalProvider>
            <CommentsProvider>
                {/* Banner MEGATOP */}
                {bannerMegatop}
                {/* Banner MEGATOP */}

                <div id="wrapper" className={`nota --info ${magazine} ${amp}`}>
                    {/* TODO: sacar */}
                    {/* <script src="https://d328y0m0mtvzqc.cloudfront.net/prod/powaBoot.js" /> */}
                    <Header />
                    <main>
                        {children[1]}
                        <div className="lay --apertura">
                            <div className="row">
                                <div className="col-12">
                                    {/* Titulo (breadcrumb, logo+titulo) */}
                                    {children[2]}
                                </div>
                            </div>
                        </div>
                        <div className="lay-sidebar">
                            {/* Cuerpo */}
                            <div className="sidebar__main">
                                <div className="row">
                                    <div className="col-12 ">
                                        {/* Bajada y autor fecha más apertura */}
                                        {children[3]}

                                        {/* <div className="opinion-autor row">
                                    <section id="" className="cont-figure">
                                        <div className="figure">
                                            <picture className="content-pic picture">
                                                <img
                                                    src="https://bucket1.glanacion.com/anexos/fotos/12/2089212w82.png"
                                                    alt=""
                                                    className="content-img"
                                                />
                                            </picture>
                                        </div>
                                    </section>
                                    <div className="opinion-calc">
                                        <h1 className="link hlp-bold">
                                            <a href="">Bruno Pittón</a>
                                        </h1>
                                        <label>PARA LA NACION</label>
                                    </div>
                                </div> */}
                                    </div>
                                </div>
                                <section className="cuerpo__nota">
                                    <div className="row">
                                        <div className="col-12 col-desksm-1">
                                            {/* hlp-mobile-show */}
                                            {/* Left-Cuerpo Shared */}
                                            {children[4]}
                                        </div>
                                        <div className="col-deskxl-10 offset-deskxl-1 col-desksm-11">
                                            <div className="row">
                                                <div className="col-12">
                                                    {/* Pos-Apertura */}
                                                    {children[5]}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            {/* Tercera */}
                            <div className="sidebar__aside hlp-tabletlm-none">
                                {children[6]}
                            </div>
                        </div>
                        {/* Newsletter */}
                        <div className="lay">{children[8]}</div>
                        <div className="lay-sidebar">
                            <div className="sidebar__main">
                                {/* Bottom */}
                                {children[9]}
                            </div>
                            <div className="sidebar__aside hlp-tabletlm-none">
                                {/* Bottom-Tercera */}
                                {children[10]}
                            </div>
                        </div>
                    </main>
                    <Static id="StaticFooter">
                        <Footer />
                    </Static>
                </div>
                <LoadBannersSSR />
            </CommentsProvider>
        </GlobalProvider>
    );
};

const pageBuilderSections = [
    'Banner-Megatop',
    'Pre-Titulo',
    'Titulo',
    'Apertura',
    'Left-Cuerpo',
    'Cuerpo',
    'Tercera',
    'Pos-Cuerpo',
    'Newsletter',
    'Bottom',
    'Bottom-Tercera'
];

lnNotaInfografia.sections = pageBuilderSections;

lnNotaInfografia.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    outputType: PropTypes.string.isRequired,
    tree: PropTypes.arrayOf(PropTypes.node).isRequired,
    isAdmin: PropTypes.bool.isRequired,
    globalContent: PropTypes.shape({
        taxonomy: PropTypes.shape({
            sections: PropTypes.shape({
                _id: PropTypes.string
            })
        }),
        distributor: PropTypes.shape({
            name: PropTypes.string
        })
    }).isRequired,
    layout: PropTypes.string.isRequired
};

export default Consumer(lnNotaInfografia);
