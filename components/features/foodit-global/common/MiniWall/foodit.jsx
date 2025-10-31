import React from 'react';
import { API_ENV, API_KEY_MINIWALL } from 'fusion:environment';
import { useIdleTask } from '@ln/utility-hooks';
import MiniWall from '@ln/mini-paywall';
import {
    addToCartEvent,
    errorProps,
    paywallViewEvent,
    trackPageEvent
} from './_helper';

function FooditMiniWall() {
    useIdleTask(() => {
        import(
            '../../../../../resources/packages/css/@ln/mini-paywall/dist/index.css'
        );
        import('./styles-deferred.css');
    });
    const environment = {
        sandbox: 'QA',
        prod: 'PROD'
    };

    return (
        <MiniWall
            environment={environment[API_ENV] || 'DEV'}
            site="foodit"
            APIKey={API_KEY_MINIWALL}
            onAddToCartEvent={addToCartEvent}
            onPaywallViewEvent={paywallViewEvent}
            onTrackPageEvent={trackPageEvent}
            errorMsg={errorProps}
            redirectButtonURL="https://conocenos.foodit.com.ar/"
        />
    );
}

export default FooditMiniWall;
