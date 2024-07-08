import React from 'react';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import Static from 'fusion:static';
import { useAppContext } from 'fusion:context';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../features/private-global/common/iconSprite/IconSprite';
import { SkeletonResultdata } from '../../features/foodit-global/common/skeletons/Buscador/resultdata';
import { SkeletonFaceteddata } from '../../features/foodit-global/common/skeletons/Buscador/faceteddata';

export default function FooditSearch() {
    const { contextPath, deployment } = useAppContext();

    return (
        <BaseLayout>
            <Static id="foodit-queryly-search">
                <div
                    id="queryly_advanced_container"
                    className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg relative"
                >
                    <Button
                        id="btn-toggle-filter"
                        iconOnly
                        size={{ sm: 32, md: 40 }}
                        variant="secondary"
                        className="filterbar lg-none absolute right-0"
                    >
                        <Icon size={16}>
                            <IconSprite name="filter" />
                        </Icon>
                    </Button>

                    {/* TODO: Falta transition para el drawer */}
                    <div
                        id="container-faceteddata"
                        className="faceteddata col-span-8 col-span-4_lg p-32_lg bg-positive_lg"
                    >
                        <div
                            id="overlay-drawer-container"
                            className="overlay-drawer-faceteddata flex flex-column"
                        >
                            <div
                                id="drawer-faceted-data"
                                className="drawer-faceteddata flex flex-column p-16 p-24_md transition-regular"
                            >
                                <div
                                    id="faceteddata"
                                    className="flex-column roboto"
                                >
                                    <SkeletonFaceteddata />
                                </div>
                                <div
                                    id="actionbar"
                                    className="jc-center w-100 gap-18 border border-top border-thin border-light-100 text-center bg-light-1 mt-16 pt-16"
                                    style={{
                                        display: 'none'
                                    }}
                                >
                                    <Button
                                        id="btn-delete-filter"
                                        variant="secondary"
                                        size={40}
                                        className="flex-grow-1"
                                    >
                                        LIMPIAR
                                    </Button>
                                    <Button
                                        id="btn-close-filter"
                                        onClick={() =>
                                            searchPage.toggleFilter()
                                        }
                                        className="flex-grow-1"
                                    >
                                        CERRAR
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* TODO: Pasar tags filtrados que aparecen en el resultdata al faceteddata */}
                    <div
                        id="resultdata"
                        style={{ display: 'flex', flexDirection: 'column' }}
                        className="col-span-8  col-span-12_md col-span-12_lg"
                    >
                        <SkeletonResultdata />
                        <Button
                            variant="primary"
                            className="fixed bottom-16 z-5 shadow-down-2xs left-50 -ml-55 lg-none"
                        >
                            <Icon size={16}>
                                <IconSprite fill="#FEFEFE" name="filter" />
                            </Icon>
                            Filtros
                        </Button>
                    </div>
                </div>

                <script src="https://www.queryly.com/js/queryly.v4.js"></script>

                <script
                    id="scriptBuscadorQuerylyFoodit"
                    data-empty-state={deployment(
                        `${contextPath}/resources/images/empty-state-recetario.webp`
                    )}
                    data-timer-icon={deployment(
                        `${contextPath}/resources/images/foodit-sprite-default.svg#timer`
                    )}
                    type="text/javascript"
                    src={deployment(
                        `${contextPath}/resources/js/FOODIT/fooditScriptBuscadorQueryly.js`
                    )}
                />
            </Static>
        </BaseLayout>
    );
}

const pageBuilderSections = ['Cuerpo'];

FooditSearch.sections = pageBuilderSections;
