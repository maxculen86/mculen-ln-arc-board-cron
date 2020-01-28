import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import SeguirLeyendo from '../../private/LN/nota/seguirLeyendo';

const seguirLeyendo = props => {
    return (
        <Static id="LN-Nota-SeguirLeyendo">
            <h4 className="com-subtitle_list">Seguir Leyendo:</h4>
            <SeguirLeyendo {...props} />
        </Static>
    );
};

seguirLeyendo.label = 'LN-Nota-SeguirLeyendo';

export default Consumer(seguirLeyendo);
