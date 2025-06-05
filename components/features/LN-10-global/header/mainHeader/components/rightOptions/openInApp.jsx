import React from 'react';
import { Button } from '@ln/contenidos-ui-button';
import { getTypeOfDevice } from '@ln/hooks';
import { useAppContext } from 'fusion:context';
import { SITE_LANACION } from 'fusion:environment';
import { isAndroid } from './_helper';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../../../../private/common/auth/helper/loginHelper';

export function OpenInApp() {
    const { globalContent, layout } = useAppContext();
    const currentUrl = globalContent?.canonical_url || '';
    const device = getTypeOfDevice({ breakpoints: { sm: 768 } });
    const isMobileDevice = device === 'mobile';
    const subscription = isSubscribed(SUBSCRIBED_HELPER.LN);
    const isHomeLayout = layout === 'LN10-Home_Main';

    if (!isMobileDevice || !isAndroid() || !subscription || isHomeLayout) {
        return null;
    }

    const getAppLink = (path = '') => {
        const rawUrl = SITE_LANACION + path;
        const encodedUrl = encodeURIComponent(rawUrl);
        const returnUrl = `intent://handle?url=${encodedUrl}#Intent;scheme=lanacion;package=app.lanacion.activity;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dapp.lanacion.activity;end`;
        return returnUrl;
    };

    const handleClick = () => {
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'e_linkclick',
                dynamic_action: 'abrir_app',
                dynamic_category: 'header',
                dynamic_label: 'android'
            });
        }
    };

    return (
        <Button
            href={getAppLink(currentUrl)}
            title="Abrir en app"
            variant="secondary"
            id="btnabrirenapp"
            onClick={handleClick}
        >
            ABRIR EN APP
        </Button>
    );
}

export default OpenInApp;
