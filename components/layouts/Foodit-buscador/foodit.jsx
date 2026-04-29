import React, { useMemo } from 'react';
import { useWindowSize } from '@ln/hooks';
import { useDrawer } from '@ln/common-ui-drawer';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import { DRAWER } from '../../features/foodit-global/common/DrawerContainer/constants';
import QuerylySearch from '../../features/foodit-global/Queryly/foodit';
import { BannersFoodit } from '../../features/foodit-global/Banners/foodit';

export default function FooditSearch() {
    const { toggleDrawer } = useDrawer({ id: DRAWER.BUSCADOR });
    const { width } = useWindowSize();
    const isMobile = useMemo(() => width !== 0 && width < 1280, [width]);
    return (
        <BaseLayout>
            {BannersFoodit.modal_1x1()}
            <QuerylySearch toggleDrawer={toggleDrawer} isMobile={isMobile} />
        </BaseLayout>
    );
}

FooditSearch.sections = ['Bloque-1'];
