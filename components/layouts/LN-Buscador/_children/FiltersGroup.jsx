import React from 'react';
import CheckboxList from './CheckboxList';
import Divider from '../../../features/ui/ln/divider/default';
import Accordion from '../../../features/ui/ln/accordion/default';

export default function FiltersGroup({
    category = '',
    listFilters = [],
    applyFilter,
    removeFilters,
    resetPage,
    group,
    isFirst
}) {
    const categoryLabel =
        category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

    return (
        <>
            <Accordion
                className="w-full flex flex-col gap-12"
                defaultOpenItems={[category]}
            >
                <Accordion.Item value={category}>
                    <Accordion.Header>
                        <span className="text-body-sm text-base-default font-bold">
                            {categoryLabel}
                        </span>
                    </Accordion.Header>
                    <Accordion.Content>
                        <CheckboxList
                            resetPage={resetPage}
                            listFilters={listFilters}
                            applyFilter={applyFilter}
                            removeFilters={removeFilters}
                            group={group}
                        />
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
            {isFirst ? <Divider /> : null}
        </>
    );
}
