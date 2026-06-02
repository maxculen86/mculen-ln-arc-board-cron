import Consumer from 'fusion:consumer';
import React from 'react';
import Header from '../features/LN-10-global/header/default';
import Footer from '../private/LN10/footer';
import ComTitle from '../private/common/com-title';
import GlobalProvider from '../private/common/context/globalContext';
import PwaModal from '../features/LN-10-global/pwaModal/default';
import createTagsTitleAndMetas from '../private/common/utils/lnBuscadorHelper';
import getQueryParamValue from '../private/common/utils/getQueryParamValue';
import InitControlGroup from './helpers/initCtrlGrp';
import '../../resources/dist/css/ln/pages/buscador.css';

function lnBuscador({
    children,
    metaValue,
    siteProperties: { description } = {}
}) {
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
            <div id="wrapper" className="wrapper --top-fixed buscador">
                <Header />
                <main id="content" className="--header-fixed-margin">
                    <div className="lay">
                        <ComTitle
                            tag="h1"
                            content={`Estos son los resultados que encontramos para la búsqueda que realizaste de: ${searchResults}`}
                            size="--threexl"
                            weight="--font-extra"
                        />
                        {children[0]}
                    </div>
                </main>
                <div className="footer-container --no-app">
                    <Footer />
                </div>
            </div>
            <PwaModal />
            <InitControlGroup />
        </GlobalProvider>
    );
}

const pageBuilderSections = ['Cuerpo'];

lnBuscador.sections = pageBuilderSections;

export default Consumer(lnBuscador);
