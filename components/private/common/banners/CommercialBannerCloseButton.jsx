import React from 'react';
import { useAppContext } from 'fusion:context';
import { Button } from '@ln/contenidos-ui-button';
import shouldDelayCommercialBannerCloseButton from './helpers/shouldDelayCommercialBannerCloseButton';
import useCommercialButtonReady from './hooks/useCommercialButtonReady';

function CommercialBannerCloseButton({ slotId, onClose }) {
    const { requestUri = '' } = useAppContext();
    const shouldDelayCommercialButton = shouldDelayCommercialBannerCloseButton({
        slotId,
        requestUri
    });
    const isCommercialButtonReady = useCommercialButtonReady(
        shouldDelayCommercialButton
    );

    return (
        <Button
            onClick={onClose}
            variant="primary"
            dataEvent="LinkClick"
            dataSection="Comercial-home"
            id={`${slotId}_btnCloseAd`}
            label="CERRAR"
            disabled={!isCommercialButtonReady}
        />
    );
}

export default CommercialBannerCloseButton;
