import { useMemo, useState } from 'react';
import { useAppContext } from 'fusion:context';
import { SITE_FOODIT } from 'fusion:environment';
import getQueryParamValue from '../../../../private/common/utils/getQueryParamValue';
import { getQueryForFilters } from '../_helpers';
import useFilterState from './useFilter';
import useFetchSearchResults from './useFetchSearchResults';
import usePagination from './useSearchPagination';

const useFilterManager = () => {
    const { requestUri } = useAppContext();

    const { filters, applyFilter, removeFilters, appliedFilters } =
        useFilterState({});
    const { getNextPage, resetPage, page } = usePagination();
    const queryUrl = getQueryParamValue(
        'query',
        `${SITE_FOODIT}/${requestUri}`
    );

    const concatFilters = useMemo(() => getQueryForFilters(filters), [filters]);

    const [sort, setSort] = useState('relevance');

    // queryly buscador si no hay nada no mostrar el empty ...sino mostrar nada vacio ...solo blanco (no mostrar componente)

    const { loading, data } = useFetchSearchResults({
        queryUrl,
        filters: concatFilters,
        page,
        sort
    });

    return {
        data,
        filters,
        loading,
        query: queryUrl,
        applyFilter,
        getNextPage,
        resetPage,
        removeFilters,
        appliedFilters,
        sort,
        setSort
    };
};

export default useFilterManager;
