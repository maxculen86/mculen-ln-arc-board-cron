import React, { useMemo } from 'react';
import { Button } from '@ln/foodit-ui-button';
import { useWindowSize } from '@ln/hooks';
import { Icon } from '@ln/common-ui-icon';
import { useDrawer } from '@ln/common-ui-drawer';
import IconSprite from '../../features/private-global/common/iconSprite/IconSprite';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import FilterBox from './_children/filterBox';
import ArticlesGrid from './_children/articlesGrid';
import QuerylyContext from './_children/searchContext';
import DrawerBuscador from './_children/drawerBuscador';
import { DRAWER } from '../../features/foodit-global/common/DrawerContainer/constants';

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
                    <Button
                        onClick={toggleDrawer}
                        id="btn-toggle-filter"
                        iconOnly
                        size={{ sm: 32, md: 40 }}
                        variant="secondary"
                        className="lg-none absolute right-0"
                    >
                        <Icon size={16}>
                            <IconSprite name="filter" />
                        </Icon>
                    </Button>
                    {isMobile && <DrawerBuscador toggleDrawer={toggleDrawer} />}

                    <ArticlesGrid />
                </section>
            </QuerylyContext>
        </BaseLayout>
    );
}
