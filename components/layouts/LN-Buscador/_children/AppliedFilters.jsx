import { cx } from '@ln/ds-cva';
import React from 'react';
import Chip from '../../../features/ui/ln/chips/default';
import Icon from '../../../features/ui/ln/icon/default';
import Link from '../../../features/ui/ln/link/default';
import Divider from '../../../features/ui/ln/divider/default';

export function AppliedFilters({
    appliedWithLabels,
    resetPage,
    removeFilters,
    isInDrawer = false
}) {
    const classNameChips = cx(
        'flex flex-wrap gap-8 xl:bg-neutral-50 xl:p-16 rounded-4',
        isInDrawer && 'sticky top-0 z-1 bg-neutral-1'
    );

    return (
        <div className={classNameChips}>
            <div className="flex w-full justify-between pb-4">
                <p className="font-bold text-body-sm">Filtros aplicados</p>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Link asChild>
                    <button
                        type="button"
                        onClick={() => {
                            resetPage();
                            removeFilters({ removeAll: true });
                        }}
                        className="text-secondary-default hover:text-secondary-lighten uppercase font-secondary font-bold text-label-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-default focus-visible:ring-offset-1 rounded-sm"
                        aria-label="Eliminar todos los filtros"
                    >
                        eliminar todo
                    </button>
                </Link>
            </div>
            {appliedWithLabels.map(
                ({ group, value, displayValue, count } = {}) => (
                    <Chip
                        size={24}
                        key={`${group}-${value}`}
                        className="flex gap-8 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-default focus-visible:ring-offset-1"
                        variant="solid"
                        aria-label={`Eliminar filtro: ${displayValue || value}`}
                        onClick={() => {
                            resetPage();
                            removeFilters({
                                nameFilter: value,
                                category: group
                            });
                        }}
                    >
                        <span>
                            {count !== undefined
                                ? `${displayValue} (${count})`
                                : displayValue || value}
                        </span>
                        <Icon size={12} name="close" aria-hidden="true" />
                    </Chip>
                )
            )}
            <Divider className="mt-16 xl:hidden" size={2} color="muted" />
        </div>
    );
}
