import React from 'react';
import Button from '../../../ui/ln/button/default';
import Icon from '../../../ui/ln/icon/default';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';

function ShareButton({ onClick }) {
    return (
        <Button
            id="btnshare"
            isIconOnly
            title="Compartir"
            variant="outline"
            color="secondary"
            onClick={() => {
                onClick();
                addEventToDataLayerV2({
                    event: 'e_linkclick',
                    action: 'toolbar',
                    category: 'nota',
                    label: 'compartir'
                });
            }}
        >
            <Icon name="reply" />
        </Button>
    );
}

export default ShareButton;
