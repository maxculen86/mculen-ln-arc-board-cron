import React, { useState } from 'react';
import DrawerContainer from '../DrawerContainer/foodit';
import { Button } from '@ln/foodit-ui-button';
import { toggleDrawer } from '@ln/common-ui-drawer';
import { Select } from '@ln/common-ui-select';
import { Itemcard } from '@ln/foodit-ui-itemcard';

const DrawerRecetario = ({ onItemSelected, summaryList = [] }) => {
    if (!summaryList.length) return <></>;

    const [selectedId, setSelectedId] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState(null);

    const onSelect = ({ label, value }) => {
        const { quantity, id } = value;
        setSelectedId(id);
        setSelectedQuantity(quantity);
    };

    const handleApplyFilters = () => {
        toggleDrawer({ id: 'drawer-recetario' });
        if (onItemSelected)
            onItemSelected({ id: selectedId, quantity: selectedQuantity });
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
