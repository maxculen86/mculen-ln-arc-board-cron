import React from 'react';
import { drawerManager } from '@ln/ds-common-drawer';
import Button from '../../../../../../ui/ln/button/default';
import IconSprite from '../../../../../../ui/ln/icon/default';
import { DRAWERS_ID } from '../../../../utils/constants';
import { addEventToDataLayerV2 } from '../../../../../../../private/LN/common/utils/addEventToDataLayer';

function SectionButton() {
    return (
        <Button
            iconLeft={<IconSprite name="menu" />}
            variant="ghost"
            color="secondary"
            onClick={() => {
                drawerManager.show(DRAWERS_ID.SECTIONS);
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
