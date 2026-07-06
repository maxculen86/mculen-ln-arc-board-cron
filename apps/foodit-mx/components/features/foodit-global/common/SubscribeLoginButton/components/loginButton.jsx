import React from 'react';
import { Button } from '@ln/foodit-ui-button';

export function LoginButton({
    classNameButtons,
    buttonLogginText,
    handleLoginClick,
    loginClassName
}) {
    return (
        <Button
            data-test-id="button-login"
            className={classNameButtons}
            title={buttonLogginText}
            variant="link"
            data-variant="link"
            onClick={handleLoginClick}
        >
            <span className={loginClassName}>{buttonLogginText}</span>
        </Button>
    );
}
