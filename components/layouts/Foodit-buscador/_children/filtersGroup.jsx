import React from 'react';
import PropTypes from 'prop-types';
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
    group,
    isLast
}) {
    const classNameContainer = cx('pb-16', {
        'border border-bottom border-thin border-light-100 mb-16': !isLast
    });

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

FiltersGroup.propTypes = {
    category: PropTypes.string,
    listFilters: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            value: PropTypes.number,
            checked: PropTypes.bool,
            facetedKey: PropTypes.string
        })
    ),
    resetPage: PropTypes.func.isRequired,
    applyFilter: PropTypes.func.isRequired,
    removeFilters: PropTypes.func.isRequired,
    group: PropTypes.string,
    isLast: PropTypes.bool.isRequired
};

FiltersGroup.defaultProps = {
    category: '',
    listFilters: [],
    group: ''
};
