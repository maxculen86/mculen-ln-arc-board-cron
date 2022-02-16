import Consumer from 'fusion:consumer';
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import ComTitle from '../private/common/com-title';
import GlobalProvider from '../private/common/context/globalContext';
import PwaModals from '../private/LN/common/pwaModals';
import insertTitleAndDescrition from '../private/common/utils/lnBuscadorHelper';
import '../../resources/dist/css/ln/pages/buscador.css';

const lnBuscador = ({ children, metaValue }) => {
    let searchResults = '';
    if (typeof window !== 'undefined') {
        const urlSerachParams =
            new URLSearchParams(window.location.search) || {};
        searchResults = urlSerachParams ? urlSerachParams.get('query') : '';
        insertTitleAndDescrition(
            searchResults,
            metaValue('title'),
            metaValue('description')
        );
    }

    return (
        <GlobalProvider>
            <div id="wrapper" className="buscador">
                <Header />
                <main id="content">
                    <div className="lay">
                        <ComTitle
                            tag="h1"
                            content={`Estos son los resultados que encontramos para la búsqueda que realizaste de: ${searchResults}`}
                            size="--xl"
                        />
                        {children[0]}
                    </div>
                </main>
                <Static id="StaticFooter">
                    <Footer />
                </Static>
            </div>
            <PwaModals />
        </GlobalProvider>
    );
};

const pageBuilderSections = ['Cuerpo'];

lnBuscador.sections = pageBuilderSections;
lnBuscador.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    metaValue: PropTypes.func.isRequired
};

export default Consumer(lnBuscador);
