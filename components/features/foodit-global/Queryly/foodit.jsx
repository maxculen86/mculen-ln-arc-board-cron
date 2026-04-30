import React from 'react';
import { useAppContext } from 'fusion:context';
import ArticlesGrid from './_children/articlesGrid';
import DrawerBuscador from './_children/drawerBuscador';
import FilterBox from './_children/filterBox';
import FloatingButton from './_children/floatingButton';
import QuerylyContext from './_children/searchContext';

function QuerylySearch({ isMobile, toggleDrawer, query }) {
    const { layout, siteProperties } = useAppContext();
    const { layoutsName = {} } = siteProperties || {};
    const isLayoutChatIa = layout === layoutsName.FooditChatIA;

    return (
        <QuerylyContext dynamicQuery={query}>
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
            {!isLayoutChatIa && <FloatingButton toggleDrawer={toggleDrawer} />}
        </QuerylyContext>
    );
}

export default QuerylySearch;
