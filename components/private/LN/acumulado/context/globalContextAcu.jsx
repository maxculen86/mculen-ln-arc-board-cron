/* eslint-disable react/require-default-props */
import React, { useReducer } from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import isAnyGrilla1 from '../../../common/utils/isAnyGrilla1';
import get from '../../../common/utils/get';

const GlobalContext = React.createContext([]);

const reducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const getDiagramationsCollectionInPage = (renderables = [], id = '') => {
    const chain = renderables.find(element => {
        const type = get(element, 'type', '');
        const idCollection = get(
            element,
            'props.customFields.idCollection',
            ''
        );
        return type === 'Ln_Caja_Collection' && idCollection === id;
    });

    return get(chain, 'props.customFields.layout', '');
};

const getCollectionsInPage = (idCollectionsInPage = []) => {
    const { renderables = [] } = useAppContext();
    const listOfCollections = [];
    idCollectionsInPage.forEach(id => {
        const collectionsProps = {
            id: id && id.trim(),
            size: 20,
            website: 'la-nacion-ar',
            diagramation: getDiagramationsCollectionInPage(renderables, id),
            imageConfig: isAnyGrilla1(renderables, id) ? 'l' : 'newBoxArticles'
        };

        const collect = useContent({
            source: id ? 'collectionsSource' : null,
            query: collectionsProps,
            filter,
            transform: response => ({
                idCollection: id,
                articles: response ? response.content_elements : []
            })
        });

        listOfCollections.push(collect);
    });

    return listOfCollections;
};

const getCollectionApertura = id => {
    if (!id) return [];

    const collectionsProps = {
        id: id && id.trim(),
        size: 2,
        website: 'la-nacion-ar',
        imageConfig: 'newAperturaAcu'
    };

    return useContent({
        source: id ? 'collectionsSource' : null,
        query: collectionsProps,
        staticMode: true,
        filter,
        transform: response => (response ? response.content_elements : [])
    });
};

function GlobalProviderAcu(props) {
    const {
        acumuladoGeneral,
        acumuladoColor,
        idCollectionsInPage,
        idCollectionApertura,
        children
    } = props;

    const articlesInCollection = getCollectionApertura(idCollectionApertura);
    const collectionsInPage = getCollectionsInPage(idCollectionsInPage);
    const [state, dispatch] = useReducer(reducer, {
        acumuladoGeneral,
        acumuladoColor,
        articlesInCollection,
        collectionsInPage
    });

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <GlobalContext.Provider value={[state, dispatch]}>
            {children}
        </GlobalContext.Provider>
    );
}

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
    idCollectionsInPage: PropTypes.arrayOf(PropTypes.string).isRequired,
    idCollectionApertura: PropTypes.string
};

export { GlobalContext, GlobalProviderAcu };
