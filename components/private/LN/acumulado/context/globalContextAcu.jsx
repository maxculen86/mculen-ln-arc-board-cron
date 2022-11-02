/* eslint-disable react/require-default-props */
import React, { useReducer } from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import isAnyGrilla1 from '../../../common/utils/isAnyGrilla1';
import checkHydrateOnly from '../../common/utils/checkHydrateOnly';

const GlobalContext = React.createContext([{}, () => {}]);

const reducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const getCollectionsInPage = (idCollectionsInPage = []) => {
    const { renderables = [] } = useAppContext();
    const listOfCollections = [];
    idCollectionsInPage.forEach(id => {
        const collectionsProps = {
            id: id && id.trim(),
            size: 20,
            website: 'la-nacion-ar',
            imageConfig: isAnyGrilla1(renderables) ? 'l' : 'm'
        };

        const collect =
            id &&
            useContent({
                source: 'collectionsSource',
                query: collectionsProps,
                filter,
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

const getCollectionApertura = id => {
    const {
        globalContent: { node_type: nodeType }
    } = useAppContext();

    const hasHydrateOnly = checkHydrateOnly({ nodeType });

    const collectionsProps = {
        id: id && id.trim(),
        size: 2,
        website: 'la-nacion-ar',
        imageConfig: 'aperturaAcu'
    };
    return (
        id &&
        useContent({
            source: 'collectionsSource',
            staticMode: hasHydrateOnly,
            query: collectionsProps,
            filter,
            transform: response => {
                return response ? response.content_elements : [];
            }
        })
    );
};

const GlobalProviderAcu = props => {
    const {
        acumuladoGeneral,
        acumuladoColor,
        idCollectionsInPage,
        idCollectionApertura,
        children
    } = props;
    const articlesInCollection = idCollectionApertura
        ? getCollectionApertura(idCollectionApertura)
        : [];

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
    idCollectionsInPage: PropTypes.arrayOf(PropTypes.string).isRequired,
    idCollectionApertura: PropTypes.string
};

export { GlobalContext, GlobalProviderAcu };
