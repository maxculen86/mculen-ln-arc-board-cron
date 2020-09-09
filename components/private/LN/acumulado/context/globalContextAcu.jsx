import React, { useState } from 'react';
import PropTypes from 'fusion:prop-types';

const GlobalContext = React.createContext([{}, () => {}]);

const GlobalProviderAcu = props => {
    const { acumuladoGeneral, acumuladoColor, children } = props;
    const [state, setState] = useState({
        acumuladoGeneral,
        acumuladoColor,
        articlesInCollection: []
    });

    return (
        <GlobalContext.Provider value={[state, setState]}>
            {children}
        </GlobalContext.Provider>
    );
};

GlobalProviderAcu.propTypes = {
    children: PropTypes.node.isRequired,
    acumuladoGeneral: PropTypes.shape({
        tipo_acumulado: PropTypes.string,
        hierarchy_navigation: PropTypes.string,
        hide_banner: PropTypes.string,
        cantidad_notas: PropTypes.string,
        id_collection_promo_items: PropTypes.string
    }).isRequired,
    acumuladoColor: PropTypes.shape({
        header_class_name: PropTypes.string,
        background_color: PropTypes.string,
        navigation_color: PropTypes.string,
        navigation_color_tags: PropTypes.string,
        id_logo_image: PropTypes.string
    }).isRequired
};

export { GlobalContext, GlobalProviderAcu };
