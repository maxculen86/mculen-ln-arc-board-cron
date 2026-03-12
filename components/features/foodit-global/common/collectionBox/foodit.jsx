import React, { useState, useEffect } from 'react';
import { Text } from '@ln/common-ui-text';
import { Itemcard } from '@ln/foodit-ui-itemcard';

function CollectionBox({ title, list, onItemSelected, selectedItemId }) {
    const validList = Array.isArray(list) ? list : [];
    const defaultSelectedId = validList.length > 0 ? validList[0].id : 'Todas';
    const [selectedId, setSelectedId] = useState(defaultSelectedId);

    useEffect(() => {
        if (selectedItemId && selectedItemId !== selectedId) {
            setSelectedId(selectedItemId);
        }
    }, [selectedItemId, selectedId]);

    useEffect(() => {
        const selectedExists =
            validList.length > 0 &&
            validList.some(item => item.id === selectedId);

        if (!selectedExists && selectedId !== 'Todas') {
            setSelectedId('Todas');

            if (onItemSelected) {
                const todasItem = validList.find(item => item.id === 'Todas');
                if (todasItem) {
                    onItemSelected({
                        id: 'Todas',
                        quantity: todasItem.quantity
                    });
                }
            }
        }
    }, [validList, selectedId, onItemSelected]);

    const handleItemClick = (id, quantity) => {
        setSelectedId(id);
        if (onItemSelected) onItemSelected({ id, quantity });
    };

    const renderContent = () => {
        const itemsToRender = validList.map(item => {
            const { text, quantity, id } = item;

            return (
                <Itemcard
                    key={id}
                    level={1}
                    text={text}
                    type="button"
                    selected={id === selectedId}
                    onClick={() => handleItemClick(id, quantity)}
                />
            );
        });

        if (validList.length === 0) {
            itemsToRender.push(
                <Itemcard text="Todas (0)" type="button" selected disabled />
            );
        }

        return itemsToRender;
    };

    return (
        <div className="flex flex-column gap-24">
            <Text className="prumo prumo-light text-24">{title}</Text>
            <ol className="flex flex-column gap-16">{renderContent()}</ol>
        </div>
    );
}

export default CollectionBox;
