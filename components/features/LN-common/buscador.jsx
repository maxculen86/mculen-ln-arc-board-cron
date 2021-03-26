import React from 'react';

const Buscador = () => {
    return (
        <>
            <article id="nota" className="floatFix">
                <div id="queryly_advanced_container">
                    <div id="faceteddata" />

                    <div id="resultdata" />
                </div>
            </article>

            <script
                src="https://code.jquery.com/jquery-3.5.1.min.js"
                integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
                crossOrigin="anonymous"
            />

            <script src="//www.queryly.com/js/queryly.v4.js" />
            <script
                defer
                type="text/javascript"
                dangerouslySetInnerHTML={{
                    __html:
                        "queryly.init('8075c0c1c4c44847', document.querySelectorAll('#fusion-app'));"
                }}
            />

            <script
                defer
                src="https://www.queryly.com/js/lanacion-advanced-search.js"
            />
        </>
    );
};

Buscador.label = 'LN-Common-Buscador';

export default Buscador;
