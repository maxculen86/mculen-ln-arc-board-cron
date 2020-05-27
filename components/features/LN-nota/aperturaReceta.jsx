import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import AperturaRecetaComponent from '../../private/LN/nota/apertura/AperturaReceta/aperturaReceta';

const aperturaReceta = props => {
    const { id: featureId } = props;
    return (
        <Static id={featureId}>
            <AperturaRecetaComponent {...props} />
        </Static>
    );
};

aperturaReceta.label = 'LN-Nota-AperturaReceta';

export default Consumer(aperturaReceta);
