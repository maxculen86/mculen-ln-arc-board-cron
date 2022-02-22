import Consumer from 'fusion:consumer';
import React from 'react';
import PropTypes from 'fusion:prop-types';
import StaticValidation from '../private/common/staticValidation';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import ComTitle from '../private/common/com-title';
import GlobalProvider from '../private/common/context/globalContext';
import PwaModals from '../private/LN/common/pwaModals';
import createTagsTitleAndMetas from '../private/common/utils/lnBuscadorHelper';
import getQueryParamValue from '../private/common/utils/getQueryParamValue';
import '../../resources/dist/css/ln/pages/buscador.css';

const lnBuscador = ({
    children,
    metaValue,
    siteProperties: { description } = {}
}) => {
    let searchResults = '';

    if (typeof window !== 'undefined') {
        searchResults = getQueryParamValue('query', window.location.href);
        createTagsTitleAndMetas(
            metaValue('description') || description,
            window.location.href,
            searchResults
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
                <StaticValidation id="StaticFooter" htmlOnly persistent>
                    <Footer />
                </StaticValidation>
            </div>
            <PwaModals />
        </GlobalProvider>
    );
};

const pageBuilderSections = ['Cuerpo'];

lnBuscador.sections = pageBuilderSections;
lnBuscador.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    metaValue: PropTypes.func.isRequired,
    siteProperties: PropTypes.isRequired
};

export default Consumer(lnBuscador);
