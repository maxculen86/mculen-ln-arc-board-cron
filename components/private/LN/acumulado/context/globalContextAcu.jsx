import React, { useReducer } from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';

const GlobalContext = React.createContext([{}, () => {}]);

const reducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const getCollectionsInPage = (idCollectionsInPage = []) => {
    const listOfCollections = [];
    idCollectionsInPage.forEach(id => {
        const collectionsProps = {
            id,
            size: 20,
            website: 'la-nacion-ar',
            imageConfig: 'l'
        };
        const collect = useContent({
            source: 'collectionsSource',
            query: collectionsProps,
            transform: response => {
                return {
                    idCollection: id,
                    articles: response ? response.content_elements : []
                };
            }
        });
        listOfCollections.push(collect);
    });
    return listOfCollections;
};

const GlobalProviderAcu = props => {
    const {
        acumuladoGeneral,
        acumuladoColor,
        articlesInCollection,
        idCollectionsInPage,
        children
    } = props;

    const collectionsInPage = getCollectionsInPage(idCollectionsInPage);
    const [state, dispatch] = useReducer(reducer, {
        acumuladoGeneral,
        acumuladoColor,
        articlesInCollection,
        collectionsInPage
    });

    return (
        <GlobalContext.Provider value={[state, dispatch]}>
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
    }).isRequired,
    articlesInCollection: PropTypes.arrayOf(PropTypes.object).isRequired
};

export { GlobalContext, GlobalProviderAcu };
