import React from 'react';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Bell } from '@ln/contenidos-ui-assets';

export const BellButton = () => {
    return (
        <Button title="Campanita" className="campanita none">
            <Icon size={24}>
                <Bell />
            </Icon>
        </Button>
    );
};
