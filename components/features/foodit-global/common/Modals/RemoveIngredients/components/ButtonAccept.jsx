import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import { getToastMessages } from '../helpers/messagesConfig';

export const ButtonAccept = ({
    type,
    displayName = '',
    close = () => null,
    clickAction
}) => {
    const { title = '', description = '' } = getToastMessages(type);

    const handleClick = async () => {
        close();

        const { status } = await clickAction();
        if (status === '200')
            window.LN.observable.publish('addToast', {
                variant: 'success',
                title,
                message: `${displayName} ${description}`
            });
        else
            window.LN.observable.publish('addToast', {
                variant: 'danger',
                title,
                message: `No se ah podido eliminar lista de ingredientes`
            });
    };

    return (
        <Button title="Aceptar" fullWidth onClick={handleClick}>
            Aceptar
        </Button>
    );
};
