import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/foodit-ui-button';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';

export function ClearButton({ show, onClear }) {
    if (!show) return null;

    return (
        <Button
            data-test-id="button-header-search"
            title="Borrar"
            iconOnly
            variant="link"
            className="px-12 py-8"
            onClick={onClear}
        >
            <Icon size={24}>
                <IconSprite name="close" />
            </Icon>
        </Button>
    );
}
