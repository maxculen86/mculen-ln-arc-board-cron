import React from 'react';
import PropTypes from 'fusion:prop-types';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
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
// import '../../resources/dist/css/ln/modules/newsletter.css';
import '../../resources/dist/css/ln/components/blockquote.css';
// import '../../resources/dist/css/ln/components/text.css';
import '../../resources/dist/css/ln/components/link.css';
import '../../resources/dist/css/ln/components/subtitle.css';
import '../../resources/dist/css/ln/components/slider.css';
import '../../resources/dist/css/ln/components/epigraph.css';
import '../../resources/dist/css/ln/components/appointment.css';
import '../../resources/dist/css/ln/components/opinion-author.css';

import '../../resources/dist/css/ln/modules/mod-banner.css';
import '../../resources/dist/css/ln/components/com-banner.css';
import '../../resources/dist/css/ln/components/com-button.css';
import '../../resources/dist/css/ln/components/com-flia.css';
// import '../../resources/dist/css/ln/components/colecciones.css';
// import '../../resources/dist/css/ln/components/carta-lectores.css';

/* Se debe importar para AMP */
// import '../../resources/dist/css/ln/components/nav-amp.css';

/* Se debe importar por layouts */
import '../../resources/dist/css/ln/components/banners.css';

/* Se debe dejar último los helpers */
import '../../resources/dist/css/ln/base/helpers.css';

import '../../resources/dist/css/ln/pages/magazine.css';

import GlobalProvider from '../private/common/context/globalContext';

const lnBuscador = ({ children }) => {
    return (
        <GlobalProvider>
            <LoginProvider>
                <div id="wrapper" className="nota">
                    <Header />
                    <main>
                        <div className="lay">
                            <div className="row">
                                <div className="col-12"> {children[0]} </div>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </LoginProvider>
        </GlobalProvider>
    );
};

const pageBuilderSections = ['Cuerpo'];

lnBuscador.sections = pageBuilderSections;

lnBuscador.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default lnBuscador;
