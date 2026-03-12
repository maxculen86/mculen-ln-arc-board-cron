import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/common-ui-text';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

export function ErrorMessage({ message = '' }) {
    if (!message) return null;

    return (
        <div className="flex gap-8 text-danger-600 text-12 roboto roboto-regular">
            <Icon size={16}>
                <IconSprite name="danger" fill="#99151D" />
            </Icon>
            <Text className="text-12">{message}</Text>
        </div>
    );
}
