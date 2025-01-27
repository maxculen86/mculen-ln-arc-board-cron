import React from 'react';
import PropTypes from 'fusion:prop-types';

import NotaDataLayer from '../LN/nota/dataLayer/dataLayer';
import HomeDataLayer from '../LN/home/dataLayer/dataLayerHome';
import PageViewDataLayer from '../../features/foodit-global/common/dataLayer/pageView';
import AcusPageView from '../../features/foodit-global/common/dataLayer/acusPageVIew';
import AutogestionPageView from '../../features/foodit-global/common/dataLayer/autogestionPageView';
import ChefsPageView from '../../features/foodit-global/common/dataLayer/chefsPageView';

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
        'Foodit-recipe-paywall': PageViewDataLayer,
        'Foodit-ficha-nota': PageViewDataLayer,
        'Foodit-chef': PageViewDataLayer,
        'Foodit-compras': AutogestionPageView,
        'Foodit-recetario': AutogestionPageView,
        'Foodit-acumulado': AcusPageView,
        'Foodit-buscador': AcusPageView,
        'Foodit-acumulado-chef': ChefsPageView
    }
};

function dataLayerIndex(props) {
    const { arcSite, layout, globalContent: { _id: id = '' } = {} } = props;

    const sitio = config[arcSite];
    if (!sitio) return null;

    if (arcSite === 'foodit' && id === '/tema') return null;

    const DataLayer = sitio[layout];

    if (!DataLayer) return null;

    return <DataLayer {...props} />;
}

dataLayerIndex.propTypes = {
    arcSite: PropTypes.string.isRequired,
    layout: PropTypes.string.isRequired
};

export default dataLayerIndex;
