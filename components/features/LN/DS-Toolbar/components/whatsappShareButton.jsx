import React from 'react';
import config from '../../../../../properties/sites/la-nacion-ar';
import Button from '../../../ui/ln/button/default';
import Icon from '../../../ui/ln/icon/default';
import { shareWhatsAppDesktop } from '../../../../private/LN/common/utils/shareHelper';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';

function WhatsappShareButton({ requestUri, title }) {
    return (
        <div className="max-md:hidden">
            <Button
                id="btnwhatsappshare"
                title="Compartir WhatsApp"
                isIconOnly
                variant="ghost"
                color="black"
                onClick={() => {
                    shareWhatsAppDesktop(requestUri, config.host);
                    addEventToDataLayerV2({
                        event: 'share_note',
                        title,
                        rest: { tags: 'whatsapp' }
                    });
                }}
            >
                <Icon name="whatsapp" />
            </Button>
        </div>
    );
}

export default WhatsappShareButton;
