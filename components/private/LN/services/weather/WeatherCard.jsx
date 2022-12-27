import React from 'react';
import PropTypes from 'prop-types';
import Link from '../../../common/com-link';
import Text from '../../../common/text';
import Icon from '../../../common/icon';
import { isValidNumber } from '../../../../../content/sources/utils/servicesSource/weather/weatherHelper';

const WeatherCard = ({ data } = {}) => {
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
                {idDescription && <Icon name={idDescription} />}
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
                    <Link
                        link={link}
                        title={`Ver clima en ${locationName}`}
                        textname={`Ver clima en ${locationName}`}
                    />
                </Text>
            )}
        </div>
    );
};

WeatherCard.propTypes = {
    data: PropTypes.shape({
        location_name: PropTypes.string,
        link: PropTypes.string,
        weather: PropTypes.shape({
            id: PropTypes.string,
            description: PropTypes.string
        }),
        current_temp: PropTypes.number,
        temp_min: PropTypes.number,
        temp_max: PropTypes.number
    }).isRequired
};

export default WeatherCard;
