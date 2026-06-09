import { useMemo, useEffect, useRef, useState } from 'react';
import { useAppContext } from 'fusion:context';
import { SITE_LANACION } from 'fusion:environment';
import getQueryParamValue from '../../../private/common/utils/getQueryParamValue';
import {
    getQueryForFilters,
    parseInitialFiltersFromUrl,
    buildFilterUrlParams
} from '../_helpers';
import useFilterState from './useFilter';
import useFetchSearchResults from './useFetchSearchResults';
import usePagination from './useSearchPagination';

const useFilterManager = () => {
    const { requestUri } = useAppContext();

    const fullUrl = `${SITE_LANACION}/${requestUri}`;
    const queryUrl = getQueryParamValue('query', fullUrl);
    const fkeyParam = getQueryParamValue('fkey', fullUrl);
    const fvalParam = getQueryParamValue('fval', fullUrl);
    const initialFilters = parseInitialFiltersFromUrl(fkeyParam, fvalParam);

    const { filters, applyFilter, removeFilters, appliedFilters } =
        useFilterState(initialFilters);
    const { getNextPage, resetPage, page } = usePagination();
    const concatFilters = useMemo(() => getQueryForFilters(filters), [filters]);

    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        if (typeof window === 'undefined') return;
        const url = new URL(window.location.href);
        const { fkey, fval } = buildFilterUrlParams(filters);
        if (fkey && fval) {
            url.searchParams.set('fkey', fkey);
            url.searchParams.set('fval', fval);
        } else {
            url.searchParams.delete('fkey');
            url.searchParams.delete('fval');
        }
        window.history.replaceState(null, '', url.toString());
    }, [filters]);

    const [sort, setSort] = useState('relevance');
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

    const { loading, data } = useFetchSearchResults({
        queryUrl,
        filters: concatFilters,
        page,
        sort,
        dateRange
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
        setSort,
        dateRange,
        setDateRange
    };
};

export default useFilterManager;
