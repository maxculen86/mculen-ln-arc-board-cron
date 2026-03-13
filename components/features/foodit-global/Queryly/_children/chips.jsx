import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

export default function Chips({ text = '', actionClick = () => {} }) {
    return (
        <div className="flex flex-wrap row-gap-16">
            <Button
                onClick={actionClick}
                className="button-nota"
                style={{ padding: '8px 12px' }}
            >
                <span className="capitalize roboto roboto-bold text-14">
                    {text}
                </span>
                <Icon size={12}>
                    <IconSprite name="close" />
                </Icon>
            </Button>
        </div>
    );
}
