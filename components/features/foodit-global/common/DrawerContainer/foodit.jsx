import React from 'react';
import { Drawer, toggleDrawer } from '@ln/common-ui-drawer';
import { Text } from '@ln/common-ui-text';
import classNames from 'classnames';
import { Closebutton } from '@ln/common-ui-closebutton';

export const DrawerContainer = ({
    drawerId,
    position,
    bodyClassName,
    children,
    title
}) => {
    const handleClose = () => toggleDrawer({ id: drawerId });

    return (
        <Drawer
            id={drawerId}
            position={position}
            className="max-w-520_md bg-light-1 gap-16 p-16 p-24_md p-32_lg shadow-down-md transition-regular"
            overlayClasses="z-15"
            handleClose={handleClose}
        >
            <Drawer.Header
                className={
                    title
                        ? 'flex jc-between border border-bottom border-thin border-light-100 pb-16'
                        : ''
                }
            >
                {title && <Text className="roboto-bold text-24">{title}</Text>}
                <Closebutton
                    title="Cerrar menú"
                    className="ml-auto"
                    onClick={handleClose}
                />
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
};

export default DrawerContainer;
