import React from 'react';
import { Button } from '@ln/contenidos-ui-button';
import useCommercialButtonReady from './hooks/useCommercialButtonReady';

function CommercialBannerCloseButton({ slotId, onClose }) {
    const isCommercialButtonReady = useCommercialButtonReady(slotId);

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
