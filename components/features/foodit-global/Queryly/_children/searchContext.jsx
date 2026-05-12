import React, { createContext } from 'react';
import { useAppContext } from 'fusion:context';
import useFilterManager from '../hooks/useFilterManager';
import get from '../../../../private/common/utils/get';
import EmptyState from '../../common/emptyState/foodit';

export const SearchContext = createContext();

export default function QuerylyContext({ children, dynamicQuery }) {
    const result = useFilterManager({ dynamicQuery });
    const articlesGrid = get(result, 'data.articlesGrid', []);
    const loading = get(result, 'loading', false);
    const { layout, siteProperties } = useAppContext();
    const { layoutsName = {} } = siteProperties || {};
    const isLayoutBuscador = layout === layoutsName.FooditBuscador;

    return (
        <SearchContext.Provider value={result}>
            {!loading && !articlesGrid.length && isLayoutBuscador ? (
                <EmptyState
                    variant="search-engine"
                    className="search-bar-area flex flex-column ai-center"
                    direction="column"
                />
            ) : (
                children
            )}
        </SearchContext.Provider>
    );
}
