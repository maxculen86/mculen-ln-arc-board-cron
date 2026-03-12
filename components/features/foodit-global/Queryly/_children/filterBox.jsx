import React, { useContext } from 'react';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { cx } from '@ln/cva';
import { useAppContext } from 'fusion:context';
import FiltersGroup from './filtersGroup';
import { SearchContext } from './searchContext';
import Chips from './chips';
import { SkeletonFaceteddata } from '../../common/skeletons/Buscador/faceteddata';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { transformedFilterNames, checkStateCheckbox } from '../_helpers';

export default function FilterBox({ toggleDrawer }) {
    const {
        data: { listFilters = [] } = {},
        loading,
        applyFilter = () => {},
        removeFilters = () => {},
        appliedFilters = [],
        resetPage = () => {},
        filters
    } = useContext(SearchContext);

    const classNameChips = cx(
        `flex flex-wrap gap-8 pb-0_lg ${appliedFilters.length > 0 ? 'pb-24' : ''}`
    );
    const { layout, siteProperties } = useAppContext();
    const { layoutsName = {} } = siteProperties || {};
    const isLayoutChatIa = layout === layoutsName.FooditChatIA;
    const aplicatedWithValues = appliedFilters.map(item => {
        const matchedChild = listFilters
            .flatMap(list => list.childrens)
            .find(child => child.key === item.value);

        return matchedChild
            ? { ...item, key: matchedChild.key, value: matchedChild.value }
            : item;
    });

    const filtradosKeys = new Set(
        appliedFilters.map(filtrado => filtrado.value)
    );
    const result = listFilters.map(listado => ({
        ...listado,
        childrens: listado.childrens.filter(
            child => !filtradosKeys.has(child.key)
        )
    }));

    const hasFilterOptions = listFilters?.some(
        f => (f?.childrens?.length ?? f?.children?.length ?? 0) > 0
    );

    if (!loading && !hasFilterOptions && isLayoutChatIa) return null;

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
                        <div className={classNameChips}>
                            {aplicatedWithValues.map(
                                ({ group, key, value } = {}) => (
                                    <Chips
                                        key={`${group}-${key}`}
                                        text={`${transformedFilterNames(key)} (${value})`}
                                        actionClick={() => {
                                            resetPage();
                                            removeFilters({
                                                nameFilter: key,
                                                category: group
                                            });
                                        }}
                                    />
                                )
                            )}
                        </div>
                        {appliedFilters.length > 0 && (
                            <div className="flex jc-center lg-only py-24_lg">
                                <Button
                                    fullWidth
                                    variant="secondary"
                                    onClick={() => {
                                        resetPage();
                                        removeFilters({ removeAll: true });
                                    }}
                                >
                                    <Icon size={16}>
                                        <IconSprite name="delete" />
                                    </Icon>
                                    Limpiar filtros
                                </Button>
                            </div>
                        )}

                        {listFilters.length
                            ? result.map((item, i) => {
                                  const {
                                      name,
                                      group,
                                      childrens = []
                                  } = item || {};
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
                                              appliedFilters={appliedFilters}
                                              isFirst={i === 0}
                                          />
                                      )
                                  );
                              })
                            : null}
                    </div>
                )}
                <div className="flex gap-18 lg-none mt-auto sticky bottom-0 bg-light-1 border border-top border-thin border-light-100 pt-16">
                    <Button
                        fullWidth
                        variant="secondary"
                        onClick={() => removeFilters({ removeAll: true })}
                        disabled={appliedFilters.length === 0}
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
