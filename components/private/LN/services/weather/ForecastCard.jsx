import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import get from '../../../common/utils/get';
import Text from '../../../common/text';
import optionsIcons from './optionsIcons';

function ForecastByDay({ title, data }) {
    if ([title, data].some(e => e === undefined)) return null;
    const { humidity, rain_prob: rainProb, temperature, weather, wind } = data;

    const windSpeed = get(wind, 'speed', '-');
    const windDirections = {
        N: 'Norte',
        S: 'Sur',
        E: 'Este',
        O: 'Oeste',
        NO: 'Noroeste',
        NE: 'Noreste',
        SE: 'Sudeste',
        SO: 'Sudoeste'
    };
    const parsedWindDir = windDirections[wind.direction] || '';
    const defaultValue = (condition, value) =>
        condition || condition === 0 ? value : '-';

    return (
        <div className="forecast-card">
            <div className="labeled">
                <Text tag="h4" weight="bold">
                    {title}
                </Text>
                <Text size="--fivexs" weight="light" extraClass="description">
                    {defaultValue(weather.description, weather.description)}
                </Text>
            </div>
            <div className="icon-content">
                <Icon size={48} className="mr-16">
                    {optionsIcons[weather.id] || optionsIcons.sun}
                </Icon>
                <Text tag="p" weight="bold" size="--xl">
                    {defaultValue(temperature, temperature)}
                    <Text size="--m">ºc</Text>
                </Text>
            </div>
            <div className="detail-province-icons">
                <div className="box-icon-text">
                    <Icon title="Humedad" size={24} className="mb-4">
                        {optionsIcons.drop}
                    </Icon>
                    <Text weight="bold" size="--4xs">
                        {defaultValue(humidity, `${humidity}%`)}
                    </Text>
                </div>
                <div className="box-icon-text">
                    <Icon
                        title="Dirección del viento"
                        size={24}
                        className="mb-4"
                    >
                        {optionsIcons.windy}
                    </Icon>
                    <span title={`${parsedWindDir} ${windSpeed}Km/h`}>
                        {defaultValue(
                            wind.direction && windSpeed,
                            `${wind.direction} ${windSpeed}Km/h`
                        )}
                    </span>
                </div>
                <div className="box-icon-text">
                    <Icon
                        title="Probabilidad de lluvia"
                        size={24}
                        className="mb-4"
                    >
                        {optionsIcons.rain}
                    </Icon>
                    <Text weight="bold" size="--4xs">
                        {defaultValue(rainProb, `${rainProb}%`)}
                    </Text>
                </div>
            </div>
        </div>
    );
}

export default ForecastByDay;
