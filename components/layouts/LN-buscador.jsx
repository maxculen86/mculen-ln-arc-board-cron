import React from 'react';
import PropTypes from 'fusion:prop-types';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import LoginProvider from '../private/LN/common/context/loginContext';

import '../../resources/dist/css/ln/base/reset.css';
import '../../resources/dist/css/ln/base/types.css';
import '../../resources/dist/css/ln/layouts/grid.css';
import '../../resources/dist/css/ln/layouts/layout.css';
import '../../resources/dist/css/ln/pages/buscador.css';

/* Se debe importar por layouts */
import '../../resources/dist/css/ln/components/banners.css';

/* Se debe dejar último los helpers */
import '../../resources/dist/css/ln/base/helpers.css';

import GlobalProvider from '../private/common/context/globalContext';

const lnBuscador = ({ children }) => {
    return (
        <GlobalProvider>
            <LoginProvider>
                <div id="wrapper" className="buscador">
                    <Header />
                    <main>
                        <div className="lay">{children[0]}</div>
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
