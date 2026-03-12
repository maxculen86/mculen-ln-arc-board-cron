import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import optionsIcons from './optionsIcons';
import Link from '../../../common/com-link';
import Text from '../../../common/text';
import { isValidNumber } from '../../../common/utils/dataValidation';

function WeatherCard({ data } = {}) {
    const {
        location_name: locationName,
        weather: { id: idDescription, description } = {},
        current_temp: currentTemp,
        temp_min: minTemp,
        temp_max: maxTemp,
        link
    } = data;

    if (!locationName) return null;

    return (
        <div className="weather-card">
            <div>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Link link={link} title={`Ver clima en ${locationName}`}>
                    <Text tag="h2" size="--2xs" weight="bold">
                        {locationName}
                    </Text>
                </Link>
                <Text
                    tag="p"
                    size="5xs"
                    weight="light"
                    extraClass="description"
                >
                    {description}
                </Text>
            </div>
            <div className="box-icon">
                {idDescription && (
                    <Icon size={48}>{optionsIcons[idDescription]}</Icon>
                )}
                <Text tag="p" weight="bold" size="--twoxl">
                    {isValidNumber(currentTemp) ? currentTemp : '-'}
                    <Text size="--m">ºc</Text>
                </Text>
            </div>
            {isValidNumber(minTemp) && isValidNumber(maxTemp) && (
                <div className="temperature">
                    <Text size="--5xs">Mín:</Text>
                    <Text weight="bold" size="--4xs">
                        {`${minTemp}º`}
                    </Text>
                    <Text size="--5xs">Máx:</Text>
                    <Text weight="bold" size="--4xs">
                        {`${maxTemp}º`}
                    </Text>
                </div>
            )}
            {link && (
                <Text tag="h3" size="5xs">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link
                        link={link}
                        title={`Ver clima en ${locationName}`}
                        textname={`Ver clima en ${locationName}`}
                    />
                </Text>
            )}
        </div>
    );
}

export default WeatherCard;
