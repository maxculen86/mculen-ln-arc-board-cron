import React from 'react';
import { Drawer } from '@ln/common-ui-drawer';
import { Text } from '@ln/common-ui-text';
import classNames from 'classnames';

function DrawerContainer({
    drawerId,
    position,
    bodyClassName = '',
    children,
    title = ''
}) {
    return (
        <Drawer
            id={drawerId}
            position={position}
            className="max-w-520_md bg-light-1 gap-16 p-16 p-24_md p-32_lg shadow-down-md transition-regular"
            overlayClasses="z-15"
        >
            <Drawer.Header
                showCloseButton
                className={
                    title
                        ? 'flex jc-between border border-bottom border-thin border-light-100 pb-16'
                        : ''
                }
            >
                {title && (
                    <Text className="prumo prumo-semibold text-24 text-28_md">
                        {title}
                    </Text>
                )}
            </Drawer.Header>
            <Drawer.Body
                className={classNames(
                    'foodit-scrollbar flex flex-column gap-24',
                    bodyClassName
                )}
            >
                {children}
            </Drawer.Body>
        </Drawer>
    );
}

export default DrawerContainer;
