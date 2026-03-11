import React, { useEffect, useState } from 'react';
import { register } from '../../../LN-10-global/pwaModal/register/serviceWorkerUtils';
import { PromoteInstallation } from '../PromoteInstallation/foodit';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';
import useGetUserConfig from '../../hooks/useGetUserConfig';

function PwaInstallPrompt({ deployment, arcSite, variant }) {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstallButton, setShowInstallButton] = useState(false);
    const { isSubscribed } = useGetUserConfig();

    useEffect(() => {
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
        showInstallButton &&
        isSubscribed && (
            <PromoteInstallation
                onClick={handleInstallClick}
                variant={variant}
            />
        )
    );
}

export default PwaInstallPrompt;
