import React from 'react';
import { Link } from '@ln/contenidos-ui-link';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/contenidos-ui-text';

function Weather({ weatherData }) {
    const { link, dataEvent, dataSection, place, temperature, icon } =
        weatherData ?? {};

    if ((weatherData && Object.keys(weatherData).length === 0) || !temperature)
        return null;

    return (
        <Link
            href={link}
            className="--weather mr-16 pr-16 border border-right border-thin border-neutral-light-200"
            data-event={dataEvent}
            data-section={dataSection}
            title="Clima"
        >
            <div className="ln-weather flex ai-center jc-start w-max text-black">
                <Text className="place mr-8 text-light-800 text-14">
                    {place}
                </Text>
                <Icon size={16} className="mr-4">
                    {icon}
                </Icon>
                <Text className="text-14 font-bold">{temperature}</Text>
            </div>
        </Link>
    );
}

export default Weather;
