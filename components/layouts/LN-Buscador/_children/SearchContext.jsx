import React, { createContext, useMemo } from 'react';
import useFilterManager from '../hooks/useFilterManager';

export const SearchContext = createContext();

export default function SearchContextProvider({ children }) {
    const {
        data,
        filters,
        loading,
        query,
        applyFilter,
        getNextPage,
        resetPage,
        removeFilters,
        appliedFilters,
        sort,
        setSort,
        dateRange,
        setDateRange
    } = useFilterManager();

    const contextValue = useMemo(
        () => ({
            data,
            filters,
            loading,
            query,
            applyFilter,
            getNextPage,
            resetPage,
            removeFilters,
            appliedFilters,
            sort,
            setSort,
            dateRange,
            setDateRange
        }),
        [
            data,
            filters,
            loading,
            query,
            applyFilter,
            getNextPage,
            resetPage,
            removeFilters,
            appliedFilters,
            sort,
            setSort,
            dateRange,
            setDateRange
        ]
    );

    return (
        <SearchContext.Provider value={contextValue}>
            {children}
        </SearchContext.Provider>
    );
}
