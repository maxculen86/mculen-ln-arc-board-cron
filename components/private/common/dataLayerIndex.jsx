import React from 'react';
import PropTypes from 'fusion:prop-types';

import NotaDataLayer from '../LN/nota/dataLayer/dataLayer';
import HomeDataLayer from '../LN/home/dataLayer/dataLayerHome';
import PageViewDataLayer from '../../features/foodit-global/common/dataLayer/pageView';
import AcusPageView from '../../features/foodit-global/common/dataLayer/acusPageVIew';

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
        'LN-nota-video': NotaDataLayer,
        'LN-Home_Sports': HomeDataLayer,
        'LN-Home_Main': HomeDataLayer,
        'LN10-Home_Main': HomeDataLayer
    },
    foodit: {
        'Foodit-home': PageViewDataLayer,
        'Foodit-ficha-receta': PageViewDataLayer,
        'Foodit-ficha-nota': PageViewDataLayer,
        'Foodit-chef': PageViewDataLayer,
        'Foodit-compras': PageViewDataLayer,
        'Foodit-recetario': PageViewDataLayer,
        'Foodit-acumulado': AcusPageView,
        'Foodit-acumulado-chef': AcusPageView
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
