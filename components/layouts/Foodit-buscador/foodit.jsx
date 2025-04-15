import React, { useMemo } from 'react';
import { useWindowSize } from '@ln/hooks';
import { useDrawer } from '@ln/common-ui-drawer';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import FilterBox from './_children/filterBox';
import ArticlesGrid from './_children/articlesGrid';
import QuerylyContext from './_children/searchContext';
import DrawerBuscador from './_children/drawerBuscador';
import { DRAWER } from '../../features/foodit-global/common/DrawerContainer/constants';
import FloatingButton from './_children/floatingButton';

export default function FooditSearch() {
    const { toggleDrawer } = useDrawer({ id: DRAWER.BUSCADOR });
    const { width } = useWindowSize();
    const isMobile = useMemo(() => width !== 0 && width < 1280, [width]);
    return (
        <BaseLayout>
            <QuerylyContext>
                <section
                    id="queryly_advanced_container"
                    className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg relative"
                >
                    {!isMobile && (
                        <aside className="lg-only col-span-4">
                            <FilterBox />
                        </aside>
                    )}
                    {isMobile && <DrawerBuscador toggleDrawer={toggleDrawer} />}

                    <ArticlesGrid />
                </section>
                <FloatingButton toggleDrawer={toggleDrawer} />
            </QuerylyContext>
        </BaseLayout>
    );
}

FooditSearch.sections = ['Bloque-1'];
