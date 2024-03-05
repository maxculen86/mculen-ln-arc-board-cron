import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import { getToastMessages } from '../helpers/messagesConfig';

export const ButtonAccept = ({
    type, // Puede ser 'recipe' o 'ingredient'
    displayName = '',
    close = () => null
}) => {
    const {
        title = '',
        description = '',
        button = undefined
    } = getToastMessages(type);

    const handleClick = () => {
        // TODO: agregar función para eliminar la receta o el ingrediente
        window.LN.observable.publish('addToast', {
            variant: 'success',
            title,
            message: `${displayName} ${description}`,
            ...(button && {
                buttonProps: {
                    ...button,
                    onClick: () => console.log('deshacer')
                }
            })
        });
        close();
    };

    return (
        <Button title="Aceptar" fullWidth onClick={handleClick}>
            Aceptar
        </Button>
    );
};
