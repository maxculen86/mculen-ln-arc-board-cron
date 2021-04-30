// React
import React from 'react';

// Fusion
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';

// Private Components
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import AperturaStorytelling from '../private/LN/nota/apertura/AperturaStorytelling';
import PageBuilderMessage from '../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import LoginProvider from '../private/LN/common/context/loginContext';

// Styles
// ***** INICIO PREGUNTAR A DARO
import '../../resources/dist/css/ln/base.css'; // chequear para sacar base porque se repite estilo
// ***** FIN PREGUNTAR A DARO

import '../../resources/dist/css/ln/base/reset.css';
import '../../resources/dist/css/ln/base/types.css';
import '../../resources/dist/css/ln/pages/recipe.css';
import '../../resources/dist/css/ln/layouts/grid.css';
import '../../resources/dist/css/ln/layouts/layout.css';
import '../../resources/dist/css/ln/modules/header-desktop.css';
import '../../resources/dist/css/ln/modules/header-mobile.css';

// TODO, REVISAR ESTOS ESTILOS MAS ADELANTE. EN ALGUNOS LADOS FUNCIONAN EN
// EL COMPONENTE Y EN OTROS NO
import '../../resources/dist/css/ln/components/button.css';
import '../../resources/dist/css/ln/components/date.css';
import '../../resources/dist/css/ln/components/tag.css';
import '../../resources/dist/css/ln/components/author.css';
import '../../resources/dist/css/ln/components/lead.css';
import '../../resources/dist/css/ln/components/com-ordered.css';
import '../../resources/dist/css/ln/components/com-unordered.css';
import '../../resources/dist/css/ln/components/input.css';
import '../../resources/dist/css/ln/modules/newsletter.css';
import '../../resources/dist/css/ln/components/blockquote.css';
import '../../resources/dist/css/ln/components/text.css';
import '../../resources/dist/css/ln/components/link.css';
import '../../resources/dist/css/ln/components/subtitle.css';
import '../../resources/dist/css/ln/components/slider.css';
import '../../resources/dist/css/ln/components/epigraph.css';
import '../../resources/dist/css/ln/components/appointment.css';
import '../../resources/dist/css/ln/components/opinion-author.css';

import '../../resources/dist/css/ln/components/colecciones.css';
import '../../resources/dist/css/ln/components/carta-lectores.css';
import '../../resources/dist/css/ln/pages/storytelling.css';
// import '../../resources/dist/css/ln/modules/mod-opening.css';

import '../../resources/dist/css/ln/modules/mod-banner.css';
import '../../resources/dist/css/ln/components/com-banner.css';
import '../../resources/dist/css/ln/components/com-button.css';

/* Se debe importar por layouts */
import '../../resources/dist/css/ln/components/banners.css';

/* Se debe dejar último los helpers */
import '../../resources/dist/css/ln/base/helpers.css';

import '../../resources/dist/css/ln/pages/magazine.css';

import GlobalProvider from '../private/common/context/globalContext';
import { CommentsProvider } from '../private/common/context/commentsContext';
import { getSectionLogo } from '../private/common/utils/sectionUtils';
import LoadBanners from '../private/common/banners/LoadBanners';
import getBannerMegatop from '../private/common/utils/getBannerMegatop';

const lnNotaStorytelling = ({
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
            <LoginProvider>
                <CommentsProvider>
                    {/* Banner MEGATOP */}
                    {bannerMegatop}

                    <div
                        id="wrapper"
                        className={`nota ${magazine} --storytelling --transparent ${amp}`}
                    >
                        <Header />
                        <main>
                            <AperturaStorytelling />
                            <div className="lay-sidebar">
                                <div className="sidebar__main">
                                    <section className="cuerpo__nota">
                                        <div className="row">
                                            <div className="col-12 col-desksm-1">
                                                {/* // ***** INICIO PREGUNTAR A DARO */}
                                                {/* hlp-mobile-show */}
                                                {/* // ***** FIN PREGUNTAR A DARO */}
                                                {/* Left-Cuerpo Shared */}
                                                {children[1]}
                                            </div>
                                            <div className="col-deskxl-10 offset-deskxl-1 col-desksm-11">
                                                <div className="row">
                                                    <div className="col-12">
                                                        {/* Cuerpo */}
                                                        {children[2]}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                {/* Tercera */}
                                <div className="sidebar__aside hlp-tabletlm-none">
                                    {children[3]}
                                </div>
                            </div>
                            {/* Newsletter */}
                            <div className="lay">{children[4]}</div>
                            <div className="lay-sidebar">
                                <div className="sidebar__main">
                                    {/* Bottom */}
                                    {children[5]}
                                </div>
                                <div className="sidebar__aside hlp-tabletlm-none">
                                    {/* Bottom-Tercera */}
                                    {children[6]}
                                </div>
                            </div>
                        </main>
                        <Footer />
                    </div>
                    <LoadBanners />
                </CommentsProvider>
            </LoginProvider>
        </GlobalProvider>
    );
};

const pageBuilderSections = [
    'Banner-Megatop',
    'Left-Cuerpo',
    'Cuerpo',
    'Tercera',
    'Newsletter',
    'Bottom',
    'Bottom-Tercera'
];

lnNotaStorytelling.sections = pageBuilderSections;

lnNotaStorytelling.propTypes = {
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

export default Consumer(lnNotaStorytelling);
