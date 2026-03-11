import { useState, useCallback } from 'react';

const updateFilters = (currentFilters, nameFilter, category) => {
    const filterListByGroup = currentFilters[category] || [];
    return {
        ...currentFilters,
        [category]: filterListByGroup.includes(nameFilter)
            ? filterListByGroup // Si el filtro ya existe, no se agregaría
            : [...filterListByGroup, nameFilter] // Si no, se agrega
    };
};

const formatFilters = filtersObj => {
    const result = [];

    Object.keys(filtersObj).forEach(group => {
        filtersObj[group].forEach(value => {
            result.push({ group, value });
        });
    });

    return result;
};

function useFilterState(initialFilters = {}) {
    const [filters, setFilters] = useState(initialFilters);

    const applyFilter = useCallback(({ nameFilter = '', category = '' }) => {
        setFilters(prevFilters =>
            updateFilters(prevFilters, nameFilter, category)
        );
    }, []);

    const removeFilters = useCallback(
        ({ nameFilter = '', category = '', removeAll = false }) => {
            if (removeAll) {
                setFilters({});
            } else {
                setFilters(prevFilters => {
                    const updatedFilters = { ...prevFilters };
                    if (updatedFilters[category]?.length === 1) {
                        delete updatedFilters[category];
                    } else if (updatedFilters[category]) {
                        updatedFilters[category] = updatedFilters[
                            category
                        ].filter(filter => filter !== nameFilter);
                    }
                    return updatedFilters;
                });
            }
        },
        []
    );

    return {
        filters,
        applyFilter,
        removeFilters,
        appliedFilters: formatFilters(filters)
    };
}

export default useFilterState;
