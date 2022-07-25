import React from 'react';
import PropTypes from 'prop-types';
import Link from '../../../common/com-link';
import Text from '../../../common/text';
import Icon from '../../../common/icon';

// import get from '../../../common/utils/get';

const WeatherCard = ({ id, data }) => {
    const {
        location_name: locationName,
        weather: { id: idDescription, description } = {},
        temp_min: minTemp,
        temp_max: maxTemp
    } = data;

    const defaultValue = (condition, value) => (condition ? value : '-');

    return (
        <div className="weather-card">
            <div>
                <Link link="#" title={`Ir a clima en ${locationName}`}>
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
                <Icon name="windy" />
                <Text tag="p" weight="bold" size="--twoxl">
                    {defaultValue(idDescription, idDescription)}
                    <Text size="--m">ºc</Text>
                </Text>
            </div>
            <div className="temperature">
                <Text size="--5xs">Máx:</Text>
                <Text weight="bold" size="--4xs">
                    {defaultValue(minTemp, `${minTemp}º`)}
                </Text>
                <Text size="--5xs">Mín:</Text>
                <Text weight="bold" size="--4xs">
                    {defaultValue(maxTemp, `${maxTemp}º`)}
                </Text>
            </div>
            <Text tag="h3" size="5xs">
                <Link
                    link="#"
                    title={`Ir a clima en ${locationName}`}
                    textname={`Ver clima en ${locationName}`}
                />
            </Text>
        </div>
    );
};

WeatherCard.propTypes = {
    id: PropTypes.string,
    data: PropTypes.shape({
        location_name: PropTypes.string,
        weather: PropTypes.shape({
            id: PropTypes.number,
            description: PropTypes.string
        }),
        temp_min: PropTypes.number,
        temp_max: PropTypes.number
    }).isRequired
};

WeatherCard.defaultProps = {
    id: ''
};

export default WeatherCard;
