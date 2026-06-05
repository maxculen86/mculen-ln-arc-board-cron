import React, { useContext } from 'react';
import { Skeleton } from '@ln/ds-common-skeleton';
import FiltersGroup from './FiltersGroup';
import PopularChips from './PopularChips';
import { SearchContext } from './SearchContext';
import { checkStateCheckbox } from '../_helpers';
import Divider from '../../../features/ui/ln/divider/default';
import { AppliedFilters } from './AppliedFilters';
import FormDate from './FormDate';

const today = new Date().toISOString().split('T')[0];

export default function FilterBox({ isInDrawer = false }) {
    const {
        data: { listFilters = [], articlesGrid = [] } = {},
        loading,
        applyFilter = () => {},
        removeFilters = () => {},
        appliedFilters = [],
        resetPage = () => {},
        filters,
        dateRange,
        setDateRange
    } = useContext(SearchContext);

    const handleStartDateChange = e => {
        resetPage();
        setDateRange(prev => ({ ...prev, startDate: e.target.value }));
    };

    const handleEndDateChange = e => {
        resetPage();
        setDateRange(prev => ({ ...prev, endDate: e.target.value }));
    };

    if (!loading && articlesGrid.length === 0) return null;

    const appliedWithLabels = appliedFilters.map(item => {
        const matchedChild = listFilters
            .flatMap(list => list.childrens)
            .find(child => child.key === item.value);

        return matchedChild
            ? {
                  ...item,
                  displayValue: matchedChild.label || matchedChild.key,
                  count: matchedChild.value
              }
            : item;
    });

    const appliedKeys = new Set(appliedFilters.map(f => f.value));
    const filteredLists = listFilters.map(listado => ({
        ...listado,
        childrens: listado.childrens.filter(
            child => !appliedKeys.has(child.key)
        )
    }));

    return (
        <aside
            aria-label="Filtros de búsqueda"
            className={isInDrawer ? 'flex' : 'hidden xl:flex xl:col-span-4'}
        >
            {loading ? (
                <Skeleton className="w-full h-700" />
            ) : (
                <article className="flex flex-col gap-24 w-full">
                    <h2 className="hidden xl:flex text-subheading-sm font-primary font-semibold">
                        Filtros
                    </h2>

                    {appliedFilters.length > 0 && (
                        <AppliedFilters
                            appliedWithLabels={appliedWithLabels}
                            resetPage={resetPage}
                            removeFilters={removeFilters}
                            isInDrawer={isInDrawer}
                        />
                    )}

                    <PopularChips />
                    <Divider color="muted" />

                    <div className="flex flex-col gap-12">
                        <p className="font-secondary text-body-sm font-bold">
                            Rango de fecha
                        </p>
                        <FormDate
                            label="Seleccionar fecha de inicio"
                            value={dateRange.startDate}
                            onChange={handleStartDateChange}
                            max={today}
                        />
                        <FormDate
                            label="Seleccionar fecha final"
                            value={dateRange.endDate}
                            onChange={handleEndDateChange}
                            max={today}
                        />
                    </div>

                    <Divider color="muted" />

                    {filteredLists
                        .filter(item => item.group !== 'pubDate')
                        .sort((a, b) => {
                            const order = { creator: 1, section: 2 };
                            const aOrder = order[a.group] || 999;
                            const bOrder = order[b.group] || 999;
                            return aOrder - bOrder;
                        })
                        .map((item, i) => {
                            const { name, group, childrens = [] } = item || {};

                            return (
                                childrens.length > 0 && (
                                    <FiltersGroup
                                        key={`${name}-${group}`}
                                        applyFilter={applyFilter}
                                        category={name}
                                        group={group}
                                        listFilters={checkStateCheckbox({
                                            checkboxes: childrens,
                                            group,
                                            filters
                                        })}
                                        resetPage={resetPage}
                                        removeFilters={removeFilters}
                                        isFirst={i === 0}
                                    />
                                )
                            );
                        })}
                </article>
            )}
        </aside>
    );
}
