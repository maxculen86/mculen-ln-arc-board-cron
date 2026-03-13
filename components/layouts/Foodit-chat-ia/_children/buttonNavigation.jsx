import React from 'react';
import { Button } from '@ln/ds-common-button';
import { useAppContext } from 'fusion:context';

export function ButtonNavigation({ requestLimit }) {
    const { layout, siteProperties } = useAppContext();
    const { layoutsName = {} } = siteProperties || {};
    const isLayoutChatIa = layout === layoutsName.FooditChatIA;

    if (isLayoutChatIa && !requestLimit) return null;

    return (
        <Button
            asChild
            variant="solid"
            rounded="custom"
            className="mx-auto rounded-4 -mt-4"
        >
            <a href="/">seguir navegando por foodit</a>
        </Button>
    );
}
