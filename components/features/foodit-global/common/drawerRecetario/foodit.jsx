import React, { useState } from 'react';
import DrawerContainer from '../DrawerContainer/foodit';
import { Button } from '@ln/foodit-ui-button';
import { toggleDrawer } from '@ln/common-ui-drawer';
import { Select } from '@ln/common-ui-select';
import { Itemcard } from '@ln/foodit-ui-itemcard';

const mockList = [
    { id: 'todas', text: 'Todas', quantity: 6 },
    { id: 'dulces', text: 'Dulces', quantity: 3 },
    { id: 'saladas', text: 'Saladas', quantity: 2 },
    { id: 'postres', text: 'Postres', quantity: 1 },
    { id: 'otro', text: 'Otro', quantity: 0 }
];

const DrawerRecetario = () => {
    const [selectedId, setSelectedId] = useState('');

    // TODO: eliminar el mock cuando se lea la data
    const list = mockList;

    const onSelect = ({ label, value }) => {
        // TODO: agregar funcionalidad
        setSelectedId(value);
        console.log(value, label);
    };
    const handleApplyFilters = () => {
        // TODO: agregar funcionalidad para aplicar filtros
        toggleDrawer({ id: 'drawer-recetario' });
    };

    return (
        <DrawerContainer
            drawerId="drawer-recetario"
            position="bottom"
            title="Elegir colección"
        >
            <Select
                label="Colección"
                className="mt-8"
                openClassName="border-secondary-positive"
                hoverClassName="border-accent-lechuga__hover"
                listClassName="foodit-scrollbar shadow-down-lg"
                onChange={onSelect}
            >
                {list.map(({ id, text }) => (
                    <Select.Options
                        key={id}
                        value={id}
                        label={text}
                        as={props => (
                            <Itemcard
                                type="button"
                                selected={id === selectedId}
                                {...props}
                            />
                        )}
                    />
                ))}
            </Select>
            <Button
                className="mt-auto"
                title="Aplicar"
                variant="secondary"
                fullWidth
                onClick={handleApplyFilters}
            >
                Aplicar
            </Button>
        </DrawerContainer>
    );
};

export default DrawerRecetario;
