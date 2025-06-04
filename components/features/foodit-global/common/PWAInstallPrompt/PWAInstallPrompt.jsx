import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { register } from '../../../LN-10-global/pwaModal/register/serviceWorkerUtils';
import { PromoteInstallation } from '../PromoteInstallation/foodit';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';

function PwaInstallPrompt({ deployment, arcSite, variant }) {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstallButton, setShowInstallButton] = useState(false);
    /*     const [showIosTip, setShowIosTip] = useState(false); */

    useEffect(() => {
        /*    const { userAgent } = window.navigator;
        const isIosDevice = /iPhone|iPad|iPod/i.test(userAgent);
        const isInStandaloneMode =
            'standalone' in window.navigator && window.navigator.standalone;

        if (isIosDevice && !isInStandaloneMode) {
            setShowIosTip(true);
        }
 */
        const handler = e => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstallButton(true);
        };

        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(() => {
                setDeferredPrompt(null);
                setShowInstallButton(false);
            });
        }

        if ('serviceWorker' in navigator) {
            register({ deployment, arcSite });
        }
        addEventToDataLayerV2({
            event: 'e_linkclick',
            category: 'interaction',
            label: 'PWA',
            action: 'download_app'
        });
    };

    return (
        <>
            {showInstallButton && (
                <PromoteInstallation
                    onClick={handleInstallClick}
                    variant={variant}
                />
            )}

            {/*   {showIosTip && (
                TODO: se deja  comentada toda la funcionalidad para implementacion futura de un componente
                que indique instrucciones para iOS
            )} */}
        </>
    );
}

PwaInstallPrompt.propTypes = {
    deployment: PropTypes.string.isRequired,
    arcSite: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired
};

export default PwaInstallPrompt;
