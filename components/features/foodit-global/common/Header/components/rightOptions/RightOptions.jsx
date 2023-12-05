import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import RenderUserOptions from './RenderUserOptions';

export const RightOptions = props => {
    const { buttonLogginText, buttonSubscribeText } = props;

    return (
        <>
            {buttonSubscribeText && (
                <Button title="Suscribite" variant="accent" className="lg-only">
                    {buttonSubscribeText}
                </Button>
            )}
            {buttonLogginText && (
                <Button
                    variant="link"
                    title="Iniciar sesión"
                    className="lg-only"
                >
                    {buttonLogginText}
                </Button>
            )}
            <RenderUserOptions {...props} />
        </>
    );
};
