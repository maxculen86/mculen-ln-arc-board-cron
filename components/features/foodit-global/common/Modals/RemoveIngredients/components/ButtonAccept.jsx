import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import { addErrorToast, addToast, TOAST } from '../../../bookmark/api/_helper';

export function ButtonAccept({ close = () => null, clickAction, title }) {
    const handleClick = async () => {
        close();

        const { status } = await clickAction();
        if (status === '200')
            addToast({
                variant: TOAST.SUCCESS.VARIANT,
                title: TOAST.SUCCESS.TITLE,
                message: `Receta ${title} ${TOAST.SUCCESS.MESSAGE.DELETE_INGREDIENTS}`
            });
        else addErrorToast();
    };

    return (
        <Button title="Aceptar" fullWidth onClick={handleClick}>
            Aceptar
        </Button>
    );
}
