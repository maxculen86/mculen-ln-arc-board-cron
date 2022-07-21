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

    const getHigher = array => Math.max.apply(0, array);
    const windSpeed = getHigher(get(wind, 'speed_range', []));
    const parsedWindDir = wind.direction || '-';
    const rain = getHigher(rainRange);

    return (
        <div className="forecast-card">
            <div className="labeled">
                <Text tag="h2" weight="bold">
                    {title}
                </Text>
                <Text size="--fivexs" weight="light" extraClass="description">
                    {weather.description ? weather.description : '-'}
                </Text>
            </div>
            <div className="icon-content">
                <Icon name="snow-cloudy" />
                <Text weight="bold" size="--xl">
                    {temperature ? `${temperature}ºc` : '-'}
                </Text>
            </div>
            <div className="detail-province-icons">
                <div className="box-icon-text">
                    <Icon name="cloudy" />
                    <Text weight="light">
                        {humidity ? `${humidity}%` : '-'}
                    </Text>
                </div>
                <div className="box-icon-text">
                    <Icon name="windy" />
                    <Text weight="light">
                        {parsedWindDir && windSpeed
                            ? `${parsedWindDir} ${windSpeed}Km/h`
                            : '-'}
                    </Text>
                </div>
                <div className="box-icon-text">
                    <Icon name="rain" />
                    <Text weight="light">{rain ? `${rain}%` : '-'}</Text>
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
