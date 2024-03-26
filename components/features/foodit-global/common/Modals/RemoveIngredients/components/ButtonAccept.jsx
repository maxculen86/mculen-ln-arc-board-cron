import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import { getToastMessages } from '../helpers/messagesConfig';

export const ButtonAccept = ({
    type,
    displayName = '',
    close = () => null,
    clickAction
}) => {
    const {
        title = '',
        description = '',
        button = undefined
    } = getToastMessages(type);

    const handleClick = () => {
        window.LN.observable.publish('addToast', {
            variant: 'success',
            title,
            message: `${displayName} ${description}`,
            ...(button && {
                buttonProps: {
                    ...button,
                    onClick: clickAction()
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
