import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import AperturaRecetaComponent from '../../private/LN/nota/apertura/AperturaReceta/aperturaReceta';

// Static component: debe tener un id UNICO en la pagina
const aperturaReceta = props => {
    return <AperturaRecetaComponent {...props} />;
};

aperturaReceta.label = 'LN-Nota-AperturaReceta';

export default Consumer(aperturaReceta);
