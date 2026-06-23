import React from 'react';
import { drawerManager } from '@ln/ds-common-drawer';
import { Dropdown } from '@ln/ds-common-dropdown';
import { cx } from '@ln/ds-cva';
import Icon from '../../../features/ui/ln/icon/default';
import Divider from '../../../features/ui/ln/divider/default';
import { DRAWERS_ID } from '../../../features/LN/common/utils/constants';
import Link from '../../../features/ui/ln/link/default';

const SORT_OPTIONS = [
    { value: 'relevance', label: 'RELEVANCIA' },
    { value: 'date', label: 'ACTUALES' }
];

function DataTwWrapper({ children }) {
    return <div data-tw>{children}</div>;
}

export default function SearchHeader({
    total,
    query,
    selectedSort,
    onSortChange,
    activeFilterCount = 0
}) {
    const currentSortLabel =
        SORT_OPTIONS.find(o => o.value === selectedSort)?.label || 'RELEVANCIA';

    const classNameFilters = cx(
        'xl:hidden flex items-center',
        activeFilterCount > 0 ? 'gap-12' : 'gap-8'
    );

    return (
        <div className="flex flex-col gap-24 text-secondary-default md:flex-row md:items-center md:justify-between pt-24">
            <div
                id="results_count"
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="min-w-0 flex-1"
            >
                <p className="text-body-sm font-secondary font-bold">
                    {total} resultados encontrados de: {query}
                </p>
            </div>

            <div className="flex shrink-0 items-center gap-8 text-label-sm text-primary-default">
                <div className={classNameFilters}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link asChild>
                        <button
                            type="button"
                            onClick={() => {
                                drawerManager.show(DRAWERS_ID.SEARCH);
                            }}
                            className="flex items-center gap-4 text-secondary-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-default focus-visible:ring-offset-1 rounded-sm"
                            aria-label={
                                activeFilterCount > 0
                                    ? `Abrir filtros, ${activeFilterCount} activos`
                                    : 'Abrir filtros'
                            }
                            data-mobile-filter
                        >
                            <Icon
                                className="text-secondary-default"
                                size={16}
                                name="equalizer"
                            />
                            <div className="text-label-sm font-bold relative">
                                <span className="text-secondary-default">
                                    FILTROS
                                </span>
                                {activeFilterCount > 0 && (
                                    <span
                                        aria-hidden="true"
                                        style={{ fontStyle: 'normal' }}
                                        className="w-14 h-14 flex items-center justify-center font-bold text-small-md -top-[10px] -right-[10px] absolute rounded-circle bg-error-dark text-neutral-1"
                                    >
                                        {activeFilterCount}
                                    </span>
                                )}
                            </div>
                        </button>
                    </Link>
                    <Divider color="black" direction="vertical" />
                </div>
                <div className="flex items-center gap-8 text-secondary-default">
                    <p id="sort-label" className="text-body-sm">
                        Ordenar por:
                    </p>

                    <div>
                        <Dropdown
                            placement="bottom-end"
                            arrow
                            className="text-label-sm bg-neutral-1"
                            border
                            contentRole="listbox"
                            aria-labelledby="sort-label"
                        >
                            <Dropdown.Trigger
                                aria-labelledby="sort-label"
                                className="flex items-center gap-4 text-label-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-default focus-visible:ring-offset-1 rounded-sm"
                            >
                                {currentSortLabel}
                                <Icon
                                    size={16}
                                    name="arrow-down"
                                    aria-hidden="true"
                                />
                            </Dropdown.Trigger>
                            <Dropdown.Content
                                customWrapper={DataTwWrapper}
                                customWidth
                                className="w-209"
                            >
                                {SORT_OPTIONS.map((option, i) => (
                                    <React.Fragment key={option.value}>
                                        <Dropdown.Item
                                            style={{ fontSize: '12px' }}
                                            className="text-label-sm px-8 py-8"
                                            onSelect={() =>
                                                onSortChange(option.value)
                                            }
                                            active={
                                                selectedSort === option.value
                                            }
                                            aria-selected={
                                                selectedSort === option.value
                                            }
                                            color="neutral"
                                        >
                                            {option.label}
                                        </Dropdown.Item>

                                        {i < SORT_OPTIONS.length - 1 && (
                                            <Divider
                                                className="bg-neutral-200"
                                                color="custom"
                                            />
                                        )}
                                    </React.Fragment>
                                ))}
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    );
}
