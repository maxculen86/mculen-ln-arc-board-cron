import React from 'react';
import PropTypes from 'prop-types';
import get from '../../../common/utils/get';
import Text from '../../../common/text';
import Icon from '../../../common/icon';

const ForecastByDay = ({ id, title, data }) => {
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
                <Text tag="h2" weight="bold">
                    {title}
                </Text>
                <Text size="--fivexs" weight="light" extraClass="description">
                    {defaultValue(weather.description, weather.description)}
                </Text>
            </div>
            <div className="icon-content">
                <Icon name="snow-cloudy" />
                <Text tag="p" weight="bold" size="--xl">
                    {defaultValue(temperature, temperature)}
                    <Text size="--m">ºc</Text>
                </Text>
            </div>
            <div className="detail-province-icons">
                <div className="box-icon-text">
                    <Icon name="drop" title="Humedad" />
                    <Text weight="bold" size="--4xs">
                        {defaultValue(humidity, `${humidity}%`)}
                    </Text>
                </div>
                <div className="box-icon-text">
                    <Icon name="windy" title="Dirección del viento" />
                    <span title={`${parsedWindDir} ${windSpeed}Km/h`}>
                        {defaultValue(
                            wind.direction && windSpeed,
                            `${wind.direction} ${windSpeed}Km/h`
                        )}
                    </span>
                </div>
                <div className="box-icon-text">
                    <Icon name="rain" title="Probabilidad de lluvia" />
                    <Text weight="bold" size="--4xs">
                        {defaultValue(rainProb, `${rainProb}%`)}
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
        rain_prob: PropTypes.number,
        temperature: PropTypes.number,
        weather: PropTypes.shape({
            id: PropTypes.string,
            description: PropTypes.string
        }),
        wind: PropTypes.shape({
            direction: PropTypes.string,
            speed: PropTypes.number
        })
    }).isRequired
};

ForecastByDay.defaultProps = {
    id: ''
};

export default ForecastByDay;
