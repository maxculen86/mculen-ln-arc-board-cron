import React, { createContext } from 'react';
import useFilterManager from '../hooks/useFilterManager';
import get from '../../../private/common/utils/get';
import EmptyState from '../../../features/foodit-global/common/emptyState/foodit';

export const SearchContext = createContext();

export default function QuerylyContext({ children }) {
    const result = useFilterManager();
    const articlesGrid = get(result, 'data.articlesGrid', []);
    const loading = get(result, 'loading', false);

    return (
        <SearchContext.Provider value={result}>
            {!loading && !articlesGrid.length ? (
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
