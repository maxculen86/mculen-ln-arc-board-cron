import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/common-ui-text';

export function SummaryItem({ icon, time, text }) {
    return (
        <li className="flex gap-8">
            <Icon size={24}>{icon}</Icon>
            <div className="flex gap-4">
                <Text className="roboto-bold white-space-nowrap">{time}</Text>
                <Text>{text}</Text>
            </div>
        </li>
    );
}
