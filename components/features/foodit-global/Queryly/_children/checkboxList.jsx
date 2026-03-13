import React from 'react';
import { Skeleton } from '@ln/common-ui-skeleton';
import CheckBoxHeader from './checkboxHeader';
import CheckBoxAccordion from './checkboxAccordion';
import { transformedFilterNames } from '../_helpers';

function CheckBoxList({
    listFilters = [],
    applyFilter,
    removeFilters,
    group,
    resetPage
}) {
    const handleCheckBox = (event, facetedKey) => {
        const isChecked = event.target.checked;
        const { name } = event.target;

        const paramsFilters = {
            nameFilter: transformedFilterNames(name),
            category: facetedKey || group
        };
        resetPage();
        if (isChecked) {
            applyFilter(paramsFilters);
        } else {
            removeFilters(paramsFilters);
        }
    };

    const getFilterItems = qty => {
        const filterItemList = [];
        for (let i = 0; i < qty; i += 1) {
            filterItemList.push(
                <div className="flex gap-8">
                    <Skeleton width={20} height={20} />
                    <Skeleton width={115} height={20} />
                </div>
            );
        }
        return filterItemList;
    };

    return listFilters.length > 0 ? (
        <>
            <CheckBoxHeader
                checkboxes={listFilters.slice(0, 3)}
                handleCheckBox={handleCheckBox}
            />
            {listFilters.length > 3 && (
                <CheckBoxAccordion
                    checkboxes={listFilters.slice(3)}
                    handleCheckBox={handleCheckBox}
                />
            )}
        </>
    ) : (
        <div className="filterItems flex flex-column gap-8">
            {group === 'subtype' ? getFilterItems(2) : getFilterItems(3)}
        </div>
    );
}

export default CheckBoxList;
