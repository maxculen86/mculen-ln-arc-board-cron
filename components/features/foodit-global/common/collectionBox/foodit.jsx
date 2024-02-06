import React from 'react';
import { Text } from '@ln/common-ui-text';
import { Itemcard } from '@ln/foodit-ui-itemcard';

const CollectionBox = ({ title, list = [], button = <></> }) => {
    return (
        <div className="flex flex-column gap-24">
            <Text className="prumo prumo-light text-24">{title}</Text>
            <ol className="flex flex-column gap-16">
                {list.map(({ text, quantity, id }) => (
                    <Itemcard
                        key={id}
                        level={1}
                        text={text}
                        type="button" //TODO: en caso de ser link, type="link"
                        selected={false} // TODO: booleano en true para cambiar estilos
                        onClick={() => null} // TODO: agregar lógica
                    />
                ))}
            </ol>
            {button}
        </div>
    );
};

export default CollectionBox;
