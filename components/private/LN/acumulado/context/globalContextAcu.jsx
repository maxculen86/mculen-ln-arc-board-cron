import React, { useReducer } from 'react';
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

export { GlobalContext, GlobalProviderAcu };
