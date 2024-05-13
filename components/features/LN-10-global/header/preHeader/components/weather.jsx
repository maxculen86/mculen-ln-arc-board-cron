import React from 'react';
import { Link } from '@ln/contenidos-ui-link';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/contenidos-ui-text';

export const Weather = ({ weatherData }) => {
    const {
        link,
        dataEvent,
        dataSection,
        place,
        temperature,
        callback,
        icon
    } = weatherData;
    console.log('TEMPERATURAAAAA:', temperature);
    return (
        <Link
            href={link}
            className="--weather mr-16"
            data-event={dataEvent}
            data-section={dataSection}
            onClick={callback}
            title="Clima"
        >
            <div className="ln-weather flex ai-center jc-start w-max text-black">
                <Text
                    className="place mr-8 text-light-800"
                    size="xs"
                    text={place}
                />
                <Icon size={16} className="mr-4">
                    {icon}
                </Icon>
                <Text size="xs" weight="bold">
                    {temperature}
                </Text>
            </div>
        </Link>
    );
};
