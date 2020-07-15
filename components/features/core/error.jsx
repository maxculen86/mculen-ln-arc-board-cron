import React, { useEffect } from 'react';

function error() {
    useEffect(() => {
        // throw new Error('Probando elmah');
    });

    return <h3>Sin errores</h3>;
}

error.label = 'Error test';

export default error;
