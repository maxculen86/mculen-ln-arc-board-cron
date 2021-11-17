import React from 'react';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';

import '../../resources/dist/css/ln/pages/buscador.css';

import GlobalProvider from '../private/common/context/globalContext';

const lnBuscador = ({ children }) => {
    return (
        <GlobalProvider>
            <div id="wrapper" className="buscador">
                <Header />
                <main id="content">
                    <div className="lay">{children[0]}</div>
                </main>
                <Static id="StaticFooter">
                    <Footer />
                </Static>
            </div>
        </GlobalProvider>
    );
};

const pageBuilderSections = ['Cuerpo'];

lnBuscador.sections = pageBuilderSections;

lnBuscador.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default lnBuscador;
