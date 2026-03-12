import React, { useState } from 'react';
import { Button } from '@ln/foodit-ui-button';
import { useDrawer } from '@ln/common-ui-drawer';
import { Select } from '@ln/common-ui-select';
import { Itemcard } from '@ln/foodit-ui-itemcard';
import { DRAWER } from '../DrawerContainer/constants';
import DrawerContainer from '../DrawerContainer/foodit';

function DrawerRecetario({ onItemSelected, summaryList = [] }) {
    if (!summaryList.length) return null;

    const [selectedId, setSelectedId] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState(null);

    const { toggleDrawer } = useDrawer({ id: DRAWER.RECETARIO });

    const onSelect = ({ value }) => {
        const { quantity, id } = value;
        setSelectedId(id);
        setSelectedQuantity(quantity);
    };

    const handleApplyFilters = () => {
        toggleDrawer();
        if (onItemSelected)
            onItemSelected({ id: selectedId, quantity: selectedQuantity });

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <DrawerContainer
            drawerId={DRAWER.RECETARIO}
            position="bottom"
            title="Elegir colección"
        >
            <Select
                label="Colección"
                className="mt-8"
                openClassName="border-secondary-positive"
                hoverClassName="border-accent-lechuga__hover"
                listClassName="foodit-scrollbar shadow-down-lg bg-white px-16 pb-16 rounden-4"
                onChange={onSelect}
                floatingLabelProps={{
                    className: 'bg-white'
                }}
            >
                {summaryList.map(({ id, text, quantity }) => (
                    <Select.Options
                        key={id}
                        value={{ id, quantity }}
                        label={text}
                        quantity={quantity}
                        // TODO FRONT: Para evitar el disable de la regla de eslint se debera modificar la librería Select (common) para soportar children sin romper los estilos actuales del ItemCard.
                        // eslint-disable-next-line react/no-unstable-nested-components
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
                disabled={!selectedId}
            >
                Aplicar
            </Button>
        </DrawerContainer>
    );
}

export default DrawerRecetario;
