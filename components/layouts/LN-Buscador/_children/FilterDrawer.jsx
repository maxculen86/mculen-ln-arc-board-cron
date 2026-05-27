import React from 'react';
import { Drawer, drawerManager } from '@ln/ds-common-drawer';
import { DRAWERS_ID } from '../../../features/LN/common/utils/constants';
import FilterBox from './FilterBox';
import Icon from '../../../features/ui/ln/icon/default';
import Button from '../../../features/ui/ln/button/default';

export default function FilterDrawer() {
    const handleDrawerClose = () => {
        drawerManager.hide(DRAWERS_ID.SEARCH);
    };

    return (
        <Drawer id={DRAWERS_ID.SEARCH} position="left">
            <Drawer.Portal>
                <div data-tw style={{ zIndex: 16001, position: 'relative' }}>
                    <Drawer.Overlay />
                    <Drawer.Content>
                        <Drawer.Header>
                            <h2 className="text-heading-sm text-base-default font-primary">
                                Filtros
                            </h2>
                            <Drawer.CloseButton
                                variant="ghost"
                                isIconOnly
                                size={24}
                                aria-label="Cerrar filtros"
                            >
                                <Icon
                                    className="text-base-default"
                                    name="close"
                                />
                            </Drawer.CloseButton>
                        </Drawer.Header>

                        <Drawer.Body>
                            <FilterBox isInDrawer />
                        </Drawer.Body>

                        <Drawer.Footer>
                            <div className="w-full flex justify-center">
                                <Button
                                    onClick={handleDrawerClose}
                                    className="w-full"
                                >
                                    Aplicar
                                </Button>
                            </div>
                        </Drawer.Footer>
                    </Drawer.Content>
                </div>
            </Drawer.Portal>
        </Drawer>
    );
}
