import React, { useMemo, useState } from 'react';
import { useWindowSize } from '@ln/hooks';
import { useDrawer } from '@ln/common-ui-drawer';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import { DRAWER } from '../../features/foodit-global/common/DrawerContainer/constants';
import QuerylySearch from '../../features/foodit-global/Queryly/foodit';
import ChatIaFoodit from './_children/ChatFoodit';
import { useNavigationData } from '../../features/foodit-global/common/Header/hooks/useNavigationData';
import { BannersFoodit } from '../../features/foodit-global/Banners/foodit';

export default function FooditChatIA() {
    const [searchQuery, setSearchQuery] = useState('');
    const { toggleDrawer } = useDrawer({ id: DRAWER.BUSCADOR });
    const { width } = useWindowSize();
    const isMobile = useMemo(() => width !== 0 && width < 1280, [width]);
    const { termicasData = {} } = useNavigationData();

    const hideChatIa = termicasData?.hide_chat_ia_foodit === 'true';

    return (
        <BaseLayout>
            {BannersFoodit.modal_1x1()}
            {!hideChatIa && (
                <ChatIaFoodit onSearchTermChange={setSearchQuery} />
            )}
            <QuerylySearch
                isMobile={isMobile}
                toggleDrawer={toggleDrawer}
                query={searchQuery}
            />
        </BaseLayout>
    );
}

FooditChatIA.sections = ['Bloque-1'];
