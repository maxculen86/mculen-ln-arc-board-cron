import React from 'react';
import { useAppContext } from 'fusion:context';

const Buscador = () => {
    const { contextPath, deployment } = useAppContext();
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

            <script src="https://www.queryly.com/js/queryly.v4.js" />
            <script
                id="scriptBuscadorQueryly"
                defer
                type="text/javascript"
                src={deployment(
                    `${contextPath}/resources/js/LN/scriptBuscadorQueryly.min.js`
                )}
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
