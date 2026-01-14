import React from 'react';
import { Drawer } from '@ln/ds-common-drawer';
import { DRAWERS_ID } from '../utils/constants';

// TODO: Implementar drawer de secciones, esperando definicion de diseño/producto y sumar test.
function MockItems({ quantity = 1 }) {
    return (
        <div className="flex flex-col gap-16">
            {Array.from({ length: quantity }, (_, i) => ({
                id: `mock-${Date.now()}-${i}-${Math.random()}`
            })).map(item => (
                <div
                    key={item.id}
                    className="w-full bg-secondary-default h-75"
                />
            ))}
        </div>
    );
}

function DrawerSections() {
    return (
        <Drawer id={DRAWERS_ID.SECTIONS} position="left">
            <Drawer.Portal>
                <div data-tw>
                    <Drawer.Overlay />
                    <Drawer.Content>
                        <Drawer.Header>
                            <h2>Titulo Drawer</h2>
                            <Drawer.CloseButton isIconOnly size={32}>
                                X
                            </Drawer.CloseButton>
                        </Drawer.Header>
                        <Drawer.Body>
                            <MockItems quantity={10} />
                        </Drawer.Body>
                        <Drawer.Footer>
                            Footer
                            <MockItems quantity={1} />
                        </Drawer.Footer>
                    </Drawer.Content>
                </div>
            </Drawer.Portal>
        </Drawer>
    );
}

export default DrawerSections;
