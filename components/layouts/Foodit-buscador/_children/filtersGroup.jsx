import React from 'react';
import { Accordion } from '@ln/common-ui-accordion';
import { cx } from '@ln/cva';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';
import CheckBoxList from './checkboxList';

export default function FiltersGroup({
    category = '',
    listFilters = [],
    applyFilter,
    removeFilters,
    resetPage,
    group = '',
    isFirst
}) {
    const classNameContainer = cx(
        !isFirst
            ? 'border border-top border-thin border-light-100 pt-16 mb-16'
            : 'pb-16'
    );

    return (
        <Accordion visible>
            <section
                id="main_ingredients_filter"
                className={classNameContainer}
            >
                <div className="flex ai-center cursor-pointer roboto roboto-bold text-12 mb-16">
                    <Accordion.Header icon={<IconSprite name="arrow-down" />}>
                        <span>{category.toUpperCase()}</span>
                    </Accordion.Header>
                </div>
                <Accordion.Body>
                    <ul className="flex flex-column gap-8 roboto roboto-regular text-16">
                        <CheckBoxList
                            resetPage={resetPage}
                            listFilters={listFilters}
                            applyFilter={applyFilter}
                            removeFilters={removeFilters}
                            group={group}
                        />
                    </ul>
                </Accordion.Body>
            </section>
        </Accordion>
    );
}
