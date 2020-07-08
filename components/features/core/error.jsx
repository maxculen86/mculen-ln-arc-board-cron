import React, { useEffect } from 'react';
import request from 'request-promise-native';

function error() {
    useEffect(() => {
        // throw new Error('Probando elmah');
    });

    return <h3>Sin errores</h3>;
}

error.label = 'Error test';

export default error;
