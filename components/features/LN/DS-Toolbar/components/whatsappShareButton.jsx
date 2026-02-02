import React from 'react';
import { handleWhatsappShare } from '../_helpers';
import config from '../../../../../properties/sites/la-nacion-ar';
import Button from '../../../ui/ln/button/default';
import Icon from '../../../ui/ln/icon/default';

function WhatsappShareButton({ requestUri, title }) {
    return (
        <Button
            id="btnwhatsappshare"
            title="Compartir WhatsApp"
            isIconOnly
            variant="outline"
            color="secondary"
            onClick={() =>
                handleWhatsappShare({ requestUri, title, host: config.host })
            }
        >
            <Icon name="whatsapp" />
        </Button>
    );
}

export default WhatsappShareButton;
