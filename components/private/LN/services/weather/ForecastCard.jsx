import React from 'react';
import PropTypes from 'prop-types';
import get from '../../../common/utils/get';

const ForecastByDay = ({ id, title, data }) => {
    console.log(
        '🚀 ~ file: ForecastByDay.jsx ~ line 6 ~ ForecastByDay ~ data',
        data
    );
    const {
        humidity,
        rain_prob_range: rainRange = [],
        temperature,
        weather,
        wind
    } = data;

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

    const getHigher = array => Math.max.apply(0, array);
    const windSpeed = getHigher(get(wind, 'speed_range', []));
    const parsedWindDir = windDirections[wind.direction] || '';
    const rain = getHigher(rainRange);

    return (
        <div style={{ padding: '10px' }}>
            <p>{title}</p>
            <p>{`Temp promedio: ${temperature} º C`}</p>
            <p>{`Icono nº: ${weather.id}`}</p>
            <p>{`Descripcion: ${weather.description}`}</p>
            <p>{`Humedad promedio: ${humidity}`}</p>
            <p>{`Viento: ${parsedWindDir} ${windSpeed} Km/h`}</p>
            <p>{`Precipitaciones: ${rain}`}</p>
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
