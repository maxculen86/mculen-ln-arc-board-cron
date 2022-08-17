import React from 'react';
import PropTypes from 'prop-types';
import Link from '../../../common/com-link';
import Text from '../../../common/text';
import Icon from '../../../common/icon';

const WeatherCard = ({ _id, data }) => {
    const {
        location_name: locationName,
        weather: { id: idDescription, description } = {},
        current_temp: currentTemp,
        temp_min: minTemp,
        temp_max: maxTemp,
        link
    } = data;

    if (!locationName) return null;

    const defaultValue = (condition, value) =>
        condition || condition === 0 ? value : '-';

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
                    {defaultValue(currentTemp, currentTemp)}
                    <Text size="--m">ºc</Text>
                </Text>
            </div>
            <div className="temperature">
                <Text size="--5xs">Mín:</Text>
                <Text weight="bold" size="--4xs">
                    {defaultValue(minTemp, `${minTemp}º`)}
                </Text>
                <Text size="--5xs">Máx:</Text>
                <Text weight="bold" size="--4xs">
                    {defaultValue(maxTemp, `${maxTemp}º`)}
                </Text>
            </div>
            <Text tag="h3" size="5xs">
                {link && (
                    <Text tag="h3" size="5xs">
                        <Link
                            link={link}
                            title={`Ver clima en ${locationName}`}
                            textname={`Ver clima en ${locationName}`}
                        />
                    </Text>
                )}
            </Text>
        </div>
    );
};

WeatherCard.propTypes = {
    _id: PropTypes.string,
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

WeatherCard.defaultProps = {
    _id: ''
};

export default WeatherCard;
