import React from 'react';
import PropTypes from 'prop-types';
import get from '../../../common/utils/get';
import Text from '../../../common/text';
import Icon from '../../../common/icon';

const ForecastByDay = ({ id, title, data }) => {
    const {
        humidity,
        rain_prob_range: rainRange = [],
        temperature,
        weather,
        wind
    } = data;

    // const windDirections = {
    //     N: 'Norte',
    //     S: 'Sur',
    //     E: 'Este',
    //     O: 'Oeste',
    //     NO: 'Noroeste',
    //     NE: 'Noreste',
    //     SE: 'Sudeste',
    //     SO: 'Sudoeste'
    // };

    const getHigher = array => Math.max.apply(0, array);
    const windSpeed = getHigher(get(wind, 'speed_range', []));
    // const parsedWindDir = windDirections[wind.direction] || '';
    const rain = getHigher(rainRange);

    return (
        <div className="forecast-card">
            <div className="labeled">
                <Text tag="h2" weight="bold">
                    {title}
                </Text>
                <Text tag="p" weight="bold" size="--xl">
                    {`${temperature} º C`}
                </Text>
            </div>
            <div className="icon">
                <Icon name="snow-cloudy" />
                <Text tag="p" weight="light">
                    {weather.description}
                </Text>
            </div>
            <div className="detail-province-icons">
                <div className="box-icon-text">
                    <Icon name="cloudy" size="--xl" />
                    <Text tag="p" weight="light">
                        {`${humidity} %`}
                    </Text>
                </div>
                <div className="box-icon-text">
                    <Icon name="windy" size="--xl" />
                    <Text tag="p" weight="light">
                        {`${windSpeed} Km/h`}
                    </Text>
                </div>
                <div className="box-icon-text">
                    <Icon name="rain" size="--xl" />
                    <Text tag="p" weight="light">
                        {`${rain} %`}
                    </Text>
                </div>
            </div>
        </div>
    );
};

ForecastByDay.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
        humidity: PropTypes.number,
        rain_prob_range: PropTypes.arrayOf(PropTypes.number),
        temperature: PropTypes.number,
        weather: PropTypes.shape({
            id: PropTypes.number,
            description: PropTypes.string
        }),
        wind: PropTypes.shape({
            direction: PropTypes.string,
            speed_range: PropTypes.arrayOf(PropTypes.number)
        })
    }).isRequired
};

ForecastByDay.defaultProps = {
    id: ''
};

export default ForecastByDay;
