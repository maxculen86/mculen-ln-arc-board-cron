import React from 'react';
import { Close } from '@ln/recetas-ui-assets';
import { Button } from '@ln/common-ui-button';
import { Drawer, toggleDrawer } from '@ln/common-ui-drawer';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/common-ui-text';

const DrawerMenu = () => {
    const drawerId = 'drawer-menu';
    // TODO: falta definir contenidos del drawer, reemplazar en linea 36
    return (
        <Drawer
            id={drawerId}
            position="left"
            className="max-w-520_md bg-light-1 gap-16 p-16 p-24_md p-32_lg shadow-down-md transition-regular rounded-top-right-24 rounded-bottom-right-24"
            overlayClasses="z-10"
            handleClose={() => toggleDrawer({ id: drawerId })}
        >
            <Drawer.Header>
                <Text className="text-xl text-2xl_md">
                    <strong>Categorías</strong>
                </Text>
                <Button
                    title="Cerrar menú"
                    className="ml-auto"
                    onClick={() => toggleDrawer({ id: drawerId })}
                >
                    <Icon size={24} color="dark">
                        <Close />
                    </Icon>
                </Button>
            </Drawer.Header>
            <hr />
            <Drawer.Body className="foodit-scrollbar">
                <ul>
                    {Array(50)
                        .fill({})
                        .map((_, i) => (
                            <li key={i}>{i}</li>
                        ))}
                </ul>
            </Drawer.Body>
        </Drawer>
    );
};

export default DrawerMenu;
