import React from 'react';
import PropTypes from 'prop-types';
import get from '../../../common/utils/get';
import Text from '../../../common/text';
import Icon from '../../../common/icon';

const ForecastByDay = ({ id, title, data }) => {
    const { humidity, rain_prob: rainProb, temperature, weather, wind } = data;

    const windSpeed = get(wind, 'speed', '-');
    const parsedWindDir = wind.direction || '';

    const defaultValue = (condition, value) => (condition ? value : '-');

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
                <Icon name="snow-cloudy" title="clima hoy" />
                <Text tag="p" weight="bold" size="--xl">
                    {defaultValue(temperature, temperature)}
                    <Text size="--m">ºc</Text>
                </Text>
            </div>
            <div className="detail-province-icons">
                <div className="box-icon-text">
                    <Icon name="cloudy" title="Humedad" />
                    <Text weight="light">
                        {defaultValue(humidity, `${humidity}%`)}
                    </Text>
                </div>
                <div className="box-icon-text">
                    <Icon name="windy" title="Direccion del viento" />
                    <Text weight="light">
                        {defaultValue(
                            parsedWindDir && windSpeed,
                            `${parsedWindDir} ${windSpeed}Km/h`
                        )}
                    </Text>
                </div>
                <div className="box-icon-text">
                    <Icon name="rain" title="Probabilidad lluvia" />
                    <Text weight="light">
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
            id: PropTypes.number,
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
