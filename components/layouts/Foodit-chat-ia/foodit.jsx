import React, { useMemo } from 'react';
import { useWindowSize } from '@ln/hooks';
import { useDrawer } from '@ln/common-ui-drawer';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import { DRAWER } from '../../features/foodit-global/common/DrawerContainer/constants';
import QuerylySearch from '../../features/foodit-global/Queryly/foodit';
import ChatIaFoodit from './_children/ChatFoodit';
import { useNavigationData } from '../../features/foodit-global/common/Header/hooks/useNavigationData';

export default function FooditChatIA() {
    const { toggleDrawer } = useDrawer({ id: DRAWER.BUSCADOR });
    const { width } = useWindowSize();
    const isMobile = useMemo(() => width !== 0 && width < 1280, [width]);
    const { termicasData = {} } = useNavigationData();

    const hideChatIa = termicasData?.hide_chat_ia_foodit === 'true';

    return (
        <BaseLayout>
            {!hideChatIa && <ChatIaFoodit />}
            <QuerylySearch isMobile={isMobile} toggleDrawer={toggleDrawer} />
        </BaseLayout>
    );
}

FooditChatIA.sections = ['Bloque-1'];
