/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

const core = ({ children }) => {
    if (typeof document !== 'undefined') {
        const log = new Elmahio({
            apiKey: 'e6ce19c37ca046348f6afb5a11bc3fdb',
            logId: '00f817a7-48fa-4335-b551-ca953b7342fd',
            debug: true
        });

        // log.information('Initialized');
    }

    if (typeof document === 'undefined') {
        const fecha = new Date().toISOString();
        const elmahJson = {
            application: 'ln/arc',
            detail: 'Prueba desde LN/ARC',
            hostname: 'localhost',
            title: 'Test Elmah SSR',
            titleTemplate: 'titleTemplate',
            source: 'content/source',
            statusCode: 0,
            dateTime: fecha,
            type: 'string',
            user: 'string',
            severity: 'string',
            url: 'string',
            method: 'string',
            version: 'string',
            cookies: [{ key: 'string', value: 'string' }],
            form: [{ key: 'string', value: 'string' }],
            queryString: [{ key: 'string', value: 'string' }],
            serverVariables: [{ key: 'string', value: 'string' }],
            data: [{ key: 'string', value: 'string' }]
        };

        console.log('============================');
        console.log('');
        console.log('fetch a elmah en componente');
        console.log('');
        console.log('============================');

        /*         fetch(
            'https://api.elmah.io/v3/messages/00f817a7-48fa-4335-b551-ca953b7342fd?api_key=e6ce19c37ca046348f6afb5a11bc3fdb',
            {
                method: 'POST',
                headers: {
                    accept: 'text/plain',
                    'Content-Type': 'application/json-patch+json'
                },
                body: JSON.stringify(elmahJson)
            }
        )
            .then(res => {
                console.log('elmah -> res', res);
            })
            .catch(e => {
                console.log('elmah -> error', e);
            }); */
    }

    return (
        <>
            <h2>Probando el layout</h2>
            {children}
        </>
    );
};

core.sections = ['Cuerpo'];

export default core;
