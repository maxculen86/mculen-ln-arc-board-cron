import { useEffect, useState } from 'react';

const useCommercialButtonReady = shouldDelayComercialButton => {
    const [isComercialButtonReady, setIsComercialButtonReady] = useState(
        !shouldDelayComercialButton
    );

    useEffect(() => {
        if (!shouldDelayComercialButton) {
            setIsComercialButtonReady(true);
            return undefined;
        }

        let idleCallbackId = null;
        let timeoutId = null;

        const handleEnableButton = () => setIsComercialButtonReady(true);
        const enableButtonWhenPageIsReady = () => {
            if (typeof window.requestIdleCallback === 'function') {
                idleCallbackId =
                    window.requestIdleCallback(handleEnableButton);
                return;
            }

            timeoutId = window.setTimeout(handleEnableButton, 0);
        };

        if (document.readyState === 'complete') {
            enableButtonWhenPageIsReady();
        } else {
            window.addEventListener('load', enableButtonWhenPageIsReady, {
                once: true
            });
        }

        return () => {
            window.removeEventListener('load', enableButtonWhenPageIsReady);

            if (
                idleCallbackId !== null &&
                typeof window.cancelIdleCallback === 'function'
            ) {
                window.cancelIdleCallback(idleCallbackId);
            }

            if (timeoutId !== null) {
                window.clearTimeout(timeoutId);
            }
        };
    }, [shouldDelayComercialButton]);

    return isComercialButtonReady;
};

export default useCommercialButtonReady;
