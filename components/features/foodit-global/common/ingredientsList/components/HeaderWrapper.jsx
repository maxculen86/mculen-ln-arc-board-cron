import React from 'react';
import { Accordion } from '@ln/common-ui-accordion';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';

export function HeaderWrapper({ ...props }) {
    return (
        <Accordion.Header icon={<IconSprite name="arrow-down" />}>
            <div className="flex-grow-1 order-1" {...props} />
        </Accordion.Header>
    );
}
