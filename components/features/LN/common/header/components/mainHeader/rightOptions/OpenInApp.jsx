import React from 'react';
import { useAppContext } from 'fusion:context';
import { SITE_LANACION } from 'fusion:environment';
import { getTypeOfDevice } from '@ln/hooks';
import Button from '../../../../../../ui/ln/button/default';
import { useHeaderContext } from '../../../context';
import { USER_TYPES } from '../../../../utils/constants';
import isSSR from '../../../../../../../private/LN/common/utils/isSSR';
import { addEventToDataLayerV2 } from '../../../../../../../private/LN/common/utils/addEventToDataLayer';

const isAndroid = () => {
    if (isSSR()) return false;
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /android/.test(userAgent);
};

function OpenInApp() {
    const { globalContent } = useAppContext();
    const { canonical_url: currentUrl = '' } = globalContent || {};

    // TODO: ajustar variante negativa cuando este dark-theme implementado en el DS.

    const { userType } = useHeaderContext();

    const device = getTypeOfDevice({ breakpoints: { sm: 768 } });
    const isMobileDevice = device === 'mobile';

    const isSubscribed = userType === USER_TYPES.SUBSCRIBED;

    const getAppLink = (path = '') => {
        const rawUrl = SITE_LANACION + path;
        const encodedUrl = encodeURIComponent(rawUrl);
        return `intent://handle?url=${encodedUrl}#Intent;scheme=lanacion;package=app.lanacion.activity;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dapp.lanacion.activity;end`;
    };

    if (!isMobileDevice || !isAndroid() || !isSubscribed) {
        return null;
    }

    return (
        <div className="md:hidden">
            <Button
                href={getAppLink(currentUrl)}
                title="Abrir en app"
                variant="outline"
                color="black"
                id="btnabrirenapp"
                asChild
                onClick={() => {
                    addEventToDataLayerV2({
                        event: 'e_linkclick',
                        action: 'abrir_app',
                        category: 'header',
                        label: 'android'
                    });
                }}
            >
                <a href={getAppLink(currentUrl)}>ABRIR EN APP</a>
            </Button>
        </div>
    );
}
export default OpenInApp;
