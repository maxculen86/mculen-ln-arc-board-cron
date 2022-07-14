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

    return (
        <div className="weather-card">
            <Link link="#" title={`Ir a clima en ${locationName}`}>
                <Text tag="h2" weight="bold">
                    {locationName}
                </Text>
            </Link>
            <div className="icon">
                <Icon name="windy" size="--xl" />
                <p>{idDescription}</p>
                <Text tag="p" weight="light">
                    {description}
                </Text>
            </div>
            <div className="temperature">
                <Text>
                    <Text tag="p" weight="bold" size="--xl">
                        {`${minTemp} ºC`}
                    </Text>
                    Min
                </Text>
                <Text>
                    <Text tag="p" weight="bold" size="--xl">
                        {`${maxTemp} ºC`}
                    </Text>
                    Max
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
