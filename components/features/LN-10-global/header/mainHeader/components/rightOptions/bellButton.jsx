import React from 'react';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../../../private-global/common/iconSprite/IconSprite';

export const BellButton = () => {
    return (
        <Button title="Campanita" className="campanita none">
            <Icon size={24}>
                <IconSprite name="bell" critical />
            </Icon>
        </Button>
    );
};
