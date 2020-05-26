import React from 'react';
/**
 * Global mock for a fusion:consumer when running
 * unit tests of anything using a consumer HOC.
 *
 * In order to use this mock you must do
 * `import Consumer from 'fusion:consumer';`
 * at the top of your unit test file, this will
 * trigger jest to mock the Consumer import below
 * */

jest.mock('fusion:consumer', component => {
    return function(component) {
        const siteProperties = { host: 'https://www.lanacion.com.ar' };
        return props => (
            <component {...props} siteProperties={siteProperties} />
        );
    };
});
