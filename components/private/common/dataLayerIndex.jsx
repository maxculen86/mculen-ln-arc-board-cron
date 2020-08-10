import React from 'react';
import PropTypes from 'fusion:prop-types';

import NotaDataLayer from '../LN/nota/dataLayer/dataLayer';

const config = {
    OTT: {},
    'la-nacion-ar': {
        'LN-nota-receta': NotaDataLayer,
        'LN-nota-noticia': NotaDataLayer,
        'LN-nota-storytelling': NotaDataLayer,
        'LN-nota-infografia': NotaDataLayer,
        'LN-nota-opta': NotaDataLayer
    }
};

const dataLayerIndex = props => {
    const { arcSite, layout } = props;

    const sitio = config[arcSite];
    if (!sitio) return null;

    const DataLayer = sitio[layout];

    if (!DataLayer) return null;

    return <DataLayer {...props} />;
};

dataLayerIndex.propTypes = {
    arcSite: PropTypes.string.isRequired,
    layout: PropTypes.string.isRequired
};

export default dataLayerIndex;
