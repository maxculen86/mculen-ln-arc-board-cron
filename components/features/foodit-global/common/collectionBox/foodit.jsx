import React, { useState } from 'react';
import { Text } from '@ln/common-ui-text';
import { Itemcard } from '@ln/foodit-ui-itemcard';

const CollectionBox = ({
    title,
    list = [],
    button = <></>,
    onItemSelected
}) => {
    const [selectedId, setSelectedId] = useState('Todas');

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
            {button}
        </div>
    );
};

export default CollectionBox;
