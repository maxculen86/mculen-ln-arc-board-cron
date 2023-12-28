import React from 'react';
import DrawerContainer from '../DrawerContainer/foodit';
import { Button } from '@ln/foodit-ui-button';
import { toggleDrawer } from '@ln/common-ui-drawer';

const DrawerRecetario = () => {
    return (
        <DrawerContainer
            drawerId="drawer-recetario"
            position="bottom"
            title="Elegir colecciones"
        >
            {/* TODO: Falta el componente Select de frontend */}
            <select>
                <option>Colección 1</option>
                <option>Colección 2</option>
                <option>Colección 3</option>
                <option>Colección 4</option>
            </select>
            <Button
                title="Aplicar"
                variant="secondary"
                fullWidth
                onClick={() => toggleDrawer({ id: 'drawer-recetario' })} // TODO: agregar lógica
            >
                Aplicar
            </Button>
        </DrawerContainer>
    );
};

export default DrawerRecetario;
