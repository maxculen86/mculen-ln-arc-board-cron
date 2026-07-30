import React from 'react';

import PageViewDataLayer from '../../features/foodit-global/common/dataLayer/pageView';
import AcusPageView from '../../features/foodit-global/common/dataLayer/acusPageVIew';
import AutogestionPageView from '../../features/foodit-global/common/dataLayer/autogestionPageView';
import ChefsPageView from '../../features/foodit-global/common/dataLayer/chefsPageView';
import EjesHomePageView from '../../features/foodit-global/common/dataLayer/ejesHomePageView';
import ChatIaPageView from '../../features/foodit-global/common/dataLayer/chatIaPageView';
import DataLayerOrigin from '../../features/foodit-global/common/dataLayer/origin';

const config = {
    foodit: {
        'Foodit-home': PageViewDataLayer,
        'Foodit-ficha-receta': PageViewDataLayer,
        'Foodit-recipe-paywall': PageViewDataLayer,
        'Foodit-ficha-nota': PageViewDataLayer,
        'Foodit-note-paywall': PageViewDataLayer,
        'Foodit-chef': PageViewDataLayer,
        'Foodit-compras': AutogestionPageView,
        'Foodit-recetario': AutogestionPageView,
        'Foodit-menu-semanal': AutogestionPageView,
        'Foodit-acumulado': AcusPageView,
        'Foodit-buscador': AcusPageView,
        'Foodit-acumulado-chef': ChefsPageView,
        'Foodit-subcategorias': EjesHomePageView,
        'Foodit-chat-ia': ChatIaPageView
    }
};

function dataLayerIndex(props) {
    const { arcSite, layout } = props;

    const sitio = config[arcSite];
    if (!sitio) return null;

    const DataLayer = sitio[layout];
    if (!DataLayer) return null;

    return (
        <>
            {arcSite === 'foodit' && <DataLayerOrigin />}
            <DataLayer {...props} />
        </>
    );
}

export default dataLayerIndex;
