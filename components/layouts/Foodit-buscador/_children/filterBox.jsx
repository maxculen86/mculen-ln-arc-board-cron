import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import FiltersGroup from './filtersGroup';
import { SearchContext } from './searchContext';
import Chips from './chips';
import { SkeletonFaceteddata } from '../../../features/foodit-global/common/skeletons/Buscador/faceteddata';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';
import { transformedFilterNames, checkStateCheckbox } from '../_helpers';

export default function FilterBox({ toggleDrawer }) {
    const {
        data: { listFilters = [] } = {},
        loading,
        applyFilter = () => {},
        removeFilters = () => {},
        appliedFilters = [],
        filters
    } = useContext(SearchContext);

    return (
        <aside
            id="container-faceteddata"
            className="col-span-8 col-span-4_lg p-32_lg bg-positive_lg h-100"
        >
            <div
                id="drawer-faceted-data"
                className="flex flex-column  h-100 pr-16 pr-0_lg transition-regular"
            >
                {loading ? (
                    <SkeletonFaceteddata />
                ) : (
                    <div id="faceteddata">
                        <div className="flex jc-between text-24 pb-24_lg">
                            <span className="prumo prumo-light lg-only">
                                Filtros
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-8 pb-24 pb-0_lg">
                            {appliedFilters.map(({ group, value } = {}) => (
                                <Chips
                                    key={`${group}-${value}`}
                                    text={transformedFilterNames(value)}
                                    actionClick={() =>
                                        removeFilters({
                                            nameFilter: value,
                                            category: group
                                        })
                                    }
                                />
                            ))}
                        </div>
                        {appliedFilters.length > 0 && (
                            <div className="flex jc-center lg-only py-24_lg">
                                <Button
                                    fullWidth
                                    variant="secondary"
                                    onClick={() =>
                                        removeFilters({ removeAll: true })
                                    }
                                >
                                    <Icon size={16}>
                                        <IconSprite name="delete" />
                                    </Icon>
                                    Limpiar filtros
                                </Button>
                            </div>
                        )}

                        {listFilters.length
                            ? listFilters.map(
                                  ({ name, group, childrens = [] } = {}) =>
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
                                              removeFilters={removeFilters}
                                              appliedFilters={appliedFilters}
                                          />
                                      )
                              )
                            : null}
                    </div>
                )}
                <div className="flex gap-18 lg-none mt-auto">
                    <Button
                        fullWidth
                        variant="secondary"
                        onClick={() => removeFilters({ removeAll: true })}
                    >
                        Limpiar
                    </Button>
                    <Button fullWidth variant="primary" onClick={toggleDrawer}>
                        Cerrar
                    </Button>
                </div>
            </div>
        </aside>
    );
}

FilterBox.propTypes = {
    toggleDrawer: PropTypes.func.isRequired
};
