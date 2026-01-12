import React from 'react';
import { useContent } from 'fusion:content';
import { Divider } from '@ln/ds-common-divider';
import Link from '../../../../../../ui/ln/link/default';
import IconSprite from '../../../../../../ui/ln/icon/default';
import useTermica from '../../../../../../../private/common/hooks/useTermica';
import subHeaderFilter from '../../../../../../../../content/filters/LN/home/subHeaderFilter';
import getWeatherData from '../helpers/getWeatherData';

function Weather() {
    const weatherValue = useTermica('weather');

    const weather =
        useContent({
            source: weatherValue ? 'servicesSource' : null,
            query: {
                id: '/clima',
                service: 'clima'
            },
            staticMode: true,
            filter: subHeaderFilter
        }) ?? {};

    const weatherData = getWeatherData(weather);

    const { link, dataEvent, dataSection, place, temperature, iconName } =
        weatherData ?? {};

    if ((weatherData && Object.keys(weatherData).length === 0) || !temperature)
        return null;

    return (
        <>
            <Link
                href={link}
                data-event={dataEvent}
                data-section={dataSection}
                weight="regular"
                color="base"
                title="Clima"
            >
                <div className="text-14 inline-flex items-center">
                    <span className="mr-8">{place}</span>
                    <IconSprite size={16} name={iconName} className="mr-4" />
                    <span className="font-bold">{temperature}</span>
                </div>
            </Link>
            <Divider direction="vertical" />
        </>
    );
}

export default Weather;
