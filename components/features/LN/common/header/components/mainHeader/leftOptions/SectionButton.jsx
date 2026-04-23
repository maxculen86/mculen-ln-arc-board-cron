import React from 'react';
import Button from '../../../../../../ui/ln/button/default';
import IconSprite from '../../../../../../ui/ln/icon/default';
import { addEventToDataLayerV2 } from '../../../../../../../private/LN/common/utils/addEventToDataLayer';
import { OBSERVABLE_EVENTS } from '../../../../utils/constants';

function SectionButton() {
    return (
        <Button
            iconLeft={<IconSprite name="menu" size={24} />}
            variant="ghost"
            color="secondary"
            onClick={() => {
                window?.LN?.observable?.publish(
                    OBSERVABLE_EVENTS.TOGGLE_DESPLEGABLE,
                    {
                        show: true
                    }
                );
                addEventToDataLayerV2({
                    event: 'e_linkclick',
                    action: 'header_logo',
                    category: 'home_ln10',
                    label: 'secciones'
                });
            }}
        >
            SECCIONES
        </Button>
    );
}

export default SectionButton;
