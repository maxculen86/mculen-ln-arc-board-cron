import React from 'react';
import { Button } from '@ln/foodit-ui-button';

export const ButtonCancel = ({ close = () => null }) => {
    return (
        <Button
            title="Cancelar"
            variant="secondary"
            fullWidth
            onClick={() => close()}
        >
            Cancelar
        </Button>
    );
};
