import React, { useState, useEffect } from 'react';
import { Text } from '@ln/common-ui-text';
import { Itemcard } from '@ln/foodit-ui-itemcard';
import PropTypes from 'prop-types';

function CollectionBox({ title, list = [], onItemSelected, selectedItemId }) {
    const defaultSelectedId = list.length ? list[0].id : 'Todas';
    const [selectedId, setSelectedId] = useState(defaultSelectedId);

    useEffect(() => {
        if (selectedItemId && selectedItemId !== selectedId) {
            setSelectedId(selectedItemId);
        }
    }, [selectedItemId, selectedId]);

    useEffect(() => {
        const selectedExists = list.some(item => item.id === selectedId);

        if (!selectedExists && selectedId !== 'Todas') {
            setSelectedId('Todas');
            if (onItemSelected) {
                const todasItem = list.find(item => item.id === 'Todas');
                if (todasItem) {
                    onItemSelected({
                        id: 'Todas',
                        quantity: todasItem.quantity
                    });
                }
            }
        }
    }, [list, selectedId, onItemSelected]);

    const handleItemClick = (id, quantity) => {
        setSelectedId(id);
        if (onItemSelected) onItemSelected({ id, quantity });
    };

    return (
        <div className="flex flex-column gap-24">
            <Text className="prumo prumo-light text-24">{title}</Text>
            <ol className="flex flex-column gap-16">
                {list.length ? (
                    list.map(({ text, quantity, id }) => (
                        <Itemcard
                            key={id}
                            level={1}
                            text={text}
                            type="button"
                            selected={id === selectedId}
                            onClick={() => handleItemClick(id, quantity)}
                        />
                    ))
                ) : (
                    <Itemcard
                        text="Todas (0)"
                        type="button"
                        selected
                        disabled
                    />
                )}
            </ol>
        </div>
    );
}

CollectionBox.propTypes = {
    title: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired
        })
    ).isRequired,
    onItemSelected: PropTypes.func.isRequired,
    selectedItemId: PropTypes.string.isRequired
};

export default CollectionBox;
