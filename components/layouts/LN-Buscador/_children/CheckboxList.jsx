import React from 'react';
import CheckboxHeader from './CheckboxHeader';
import CheckboxAccordion from './CheckboxAccordion';
import { useScrollToTopOnDesktop } from '../hooks/useScrollToTopOnDesktop';

const VISIBLE_COUNT = 5;

export default function CheckboxList({
    listFilters = [],
    applyFilter,
    removeFilters,
    group,
    resetPage
}) {
    const scrollToTopOnDesktop = useScrollToTopOnDesktop();

    const handleCheckBox = ({ key, checked }) => {
        const paramsFilters = {
            nameFilter: key,
            category: group
        };

        resetPage();
        scrollToTopOnDesktop();

        if (checked) {
            applyFilter(paramsFilters);
        } else {
            removeFilters(paramsFilters);
        }
    };

    return listFilters.length > 0 ? (
        <>
            <CheckboxHeader
                checkboxes={listFilters.slice(0, VISIBLE_COUNT)}
                handleCheckBox={handleCheckBox}
            />
            {listFilters.length > VISIBLE_COUNT && (
                <CheckboxAccordion
                    checkboxes={listFilters.slice(VISIBLE_COUNT)}
                    handleCheckBox={handleCheckBox}
                />
            )}
        </>
    ) : null;
}
