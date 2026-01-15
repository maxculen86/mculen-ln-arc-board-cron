import React from 'react';
import { LOGIN_URL } from 'fusion:environment';
import Button from '../../../../../../ui/ln/button/default';
import { useHeaderContext } from '../../../context';
import { currentUrlCallback } from './helpers';
import { USER_TYPES } from '../../../../utils/constants';

function LoginButton() {
    const { userType } = useHeaderContext();

    if (userType !== USER_TYPES.UNLOGGED) return null;
    return (
        <div className="max-lg:hidden flex">
            <Button
                variant="outline"
                color="secondary"
                title="Iniciar sesión"
                id="btningresar"
                asChild
            >
                <a
                    href={`${LOGIN_URL}${currentUrlCallback}`}
                    rel="noopener noreferrer"
                >
                    Iniciar sesión
                </a>
            </Button>
        </div>
    );
}

export default LoginButton;
