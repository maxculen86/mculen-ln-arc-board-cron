import React from 'react';
import Consumer from 'fusion:consumer';
import AperturaRecetaComponent from '../../private/LN/nota/apertura/AperturaReceta/aperturaReceta';

const aperturaReceta = props => (
    <div>
        <AperturaRecetaComponent {...props} />
    </div>
);

aperturaReceta.label = 'LN-Nota-AperturaReceta';

export default Consumer(aperturaReceta);
