import React from 'react';
import PropTypes from 'fusion:prop-types';

import NotaDataLayer from '../LN/nota/dataLayer/dataLayer';
import HomeDataLayer from '../LN/home/dataLayer/dataLayerHome';

const config = {
    OTT: {},
    'la-nacion-ar': {
        'LN-nota-receta': NotaDataLayer,
        'LN-nota-noticia': NotaDataLayer,
        'LN-nota-storytelling': NotaDataLayer,
        'LN-nota-infografia': NotaDataLayer,
        'LN-nota-html-libre': NotaDataLayer,
        'LN-nota-foto-al-100': NotaDataLayer,
        'LN-nota-opta': NotaDataLayer,
        'LN-Home_Sports': HomeDataLayer,
        'LN-Home_Main': HomeDataLayer
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
