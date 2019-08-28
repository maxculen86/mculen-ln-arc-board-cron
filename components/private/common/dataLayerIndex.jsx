import React from 'react';

import NotaDataLayer from '../LN/nota/dataLayer';

const config = {
    OTT: {},
    'la-nacion-ar': {
        'LN-nota-receta': NotaDataLayer
    }
};

export default props => {
    const { arcSite, layout } = props;

    const sitio = config[arcSite];
    if (!sitio) return null;

    const DataLayer = sitio[layout];

    if (!DataLayer) return null;
    return <DataLayer {...props} />;
};
