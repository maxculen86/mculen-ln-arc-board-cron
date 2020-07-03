/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

const core = ({ children }) => {
    if (typeof document !== 'undefined') {
        const log = new Elmahio({
            apiKey: 'e6ce19c37ca046348f6afb5a11bc3fdb',
            logId: 'ae9f7b57-424b-46d9-9a9e-c20b8383956d',
            debug: true
        });

        log.information('Initialized');
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
