import React, { useEffect, useState } from 'react';
import { API_ENV, API_KEY_MINIWALL } from 'fusion:environment';
import MiniWall from '@ln/mini-paywall';
import { useIdleTask } from '@ln/utility-hooks';
import {
    addToCartEvent,
    errorProps,
    getControlGroupV3Value,
    paywallViewEvent,
    trackPageEvent
} from './_helper';
import { getAuthTokens } from '../../../../private/common/auth/helper/loginHelper';

function FooditMiniWall() {
    const [accessTokenValidated, setAccessTokenValidated] = useState('');
    const [stylesLoaded, setStylesLoaded] = useState(false);

    useIdleTask(() => {
        const loadStyles = async () => {
            try {
                await import(
                    '../../../../../resources/packages/css/@ln/mini-paywall/dist/index.css'
                );
                await import('./styles-deferred.css');
                setStylesLoaded(true);
            } catch (e) {
                console.error('Error cargando estilos del miniwall:', e);
                setStylesLoaded(true);
            }
        };

        loadStyles();
    }, []);

    useEffect(() => {
        const loadToken = async () => {
            try {
                const { accessTokenValidated: accessToken } =
                    await getAuthTokens();
                setAccessTokenValidated(accessToken);
            } catch (err) {
                console.error(
                    'Error al obtener tokens - foodit miniwall:',
                    err
                );
            }
        };
        loadToken();
    }, [accessTokenValidated]);

    const environment = {
        sandbox: 'QA',
        prod: 'PROD'
    };

    const segment = getControlGroupV3Value();

    if (!stylesLoaded) {
        return null;
    }

    return (
        <MiniWall
            environment={environment[API_ENV] || 'DEV'}
            site="foodit"
            APIKey={API_KEY_MINIWALL}
            onAddToCartEvent={addToCartEvent}
            onPaywallViewEvent={paywallViewEvent}
            onTrackPageEvent={trackPageEvent}
            accessToken={accessTokenValidated}
            segment={segment}
            errorMsg={errorProps}
            redirectButtonURL="https://conocenos.foodit.com.ar/"
        />
    );
}

export default FooditMiniWall;
