import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import { addErrorToast, addToast, TOAST } from '../../../bookmark/api/_helper';

export const ButtonAccept = ({ close = () => null, clickAction }) => {
    const handleClick = async () => {
        close();

        const { status } = await clickAction();
        if (status === '200')
            addToast({
                variant: TOAST.SUCCESS.VARIANT,
                title: TOAST.SUCCESS.TITLE,
                message: TOAST.SUCCESS.MESSAGE.DELETE_INGREDIENTS
            });
        else addErrorToast();
    };

    return (
        <Button title="Aceptar" fullWidth onClick={handleClick}>
            Aceptar
        </Button>
    );
};
