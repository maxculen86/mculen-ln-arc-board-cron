import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/common-ui-text';

export function TimeItem({ icon, time, text, index, key }) {
    return (
        <li className="flex w-100" key={key}>
            {index !== 0 && <hr />}
            <div className="flex flex-column ai-center gap-24 w-100">
                <Icon size={40}>{icon}</Icon>
                <div className="flex flex-column ai-center text-center gap-8">
                    <Text className="roboto roboto-regular">{text}</Text>
                    <Text className="roboto roboto-bold">{time}</Text>
                </div>
            </div>
        </li>
    );
}
