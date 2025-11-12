/* eslint-disable react/no-danger */
import React from 'react';
import { DATADOME_CLIENT_KEY } from 'fusion:environment';

function Datadome() {
    return (
        <>
            <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                    __html: `window.ddjskey = "${DATADOME_CLIENT_KEY}"; window.ddoptions = {
                        challengeLanguage: 'es',
                        ajaxListenerPath: [{ host: 'lanacion.com.ar' }, { path: '/api' }],
                        withCredentials: true
                    };`
                }}
            />
            <script src="https://js.datadome.co/tags.js" async />
        </>
    );
}

export default Datadome;
