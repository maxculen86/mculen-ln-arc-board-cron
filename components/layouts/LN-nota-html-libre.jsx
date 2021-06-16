import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Header from '../private/LN/common/header';
import PageBuilderMessage from '../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import HtmlLibre from '../private/LN/nota/cuerpo/htmlLibre';
import LoginProvider from '../private/LN/common/context/loginContext';

import '../../resources/dist/css/ln/base.css'; // chequear para sacar base porque se repite estilo
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

import '../../resources/dist/css/ln/modules/mod-banner.css';
import '../../resources/dist/css/ln/components/com-banner.css';
import '../../resources/dist/css/ln/components/com-button.css';
// import '../../resources/dist/css/ln/components/colecciones.css';
// import '../../resources/dist/css/ln/components/carta-lectores.css';

/* Se debe importar para AMP */
// import '../../resources/dist/css/ln/components/nav-amp.css';

/* Se debe importar por layouts */
import '../../resources/dist/css/ln/components/banners.css';

/* Se debe dejar último los helpers */
import '../../resources/dist/css/ln/base/helpers.css';

import GlobalProvider from '../private/common/context/globalContext';
import { CommentsProvider } from '../private/common/context/commentsContext';
import LoadBanners from '../private/common/banners/LoadBanners';
import getBannerMegatop from '../private/common/utils/getBannerMegatop';

const lnNotaNoticia = ({
    children: [bannerMegatop, bottom, bottomTercera],
    outputType,
    tree,
    isAdmin
}) => {
    const amp = outputType === 'amp' ? 'amp' : '';

    return (
        <GlobalProvider>
            <LoginProvider>
                <CommentsProvider>
                    {/* Banner Megatop */}
                    {getBannerMegatop(bannerMegatop, amp, tree, isAdmin)}

                    <div id="wrapper" className={`nota noticia ${amp}`}>
                        <Header />
                        <main style={{ paddingTop: '0px' }}>
                            <div
                                className="lay --apertura"
                                style={{ maxWidth: '100%', padding: '0rem' }}
                            >
                                <div className="row">
                                    <div className="col-12">
                                        {/* Html libre */}
                                        <HtmlLibre />
                                    </div>
                                </div>
                            </div>

                            <div className="lay-sidebar">
                                <div className="sidebar__main">
                                    {/* Bottom */}
                                    {bottom}
                                </div>
                                <div className="sidebar__aside">
                                    {/* Bottom-Tercera */}
                                    {bottomTercera}
                                </div>
                            </div>
                        </main>
                    </div>
                    <LoadBanners />
                </CommentsProvider>
            </LoginProvider>
        </GlobalProvider>
    );
};

lnNotaNoticia.sections = ['Banner-Megatop', 'Bottom', 'Bottom-Tercera'];

lnNotaNoticia.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    outputType: PropTypes.string.isRequired,
    tree: PropTypes.arrayOf(PropTypes.node).isRequired,
    isAdmin: PropTypes.bool.isRequired
};

export default Consumer(lnNotaNoticia);
