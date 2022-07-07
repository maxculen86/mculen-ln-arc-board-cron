import React from 'react';
import PropTypes from 'prop-types';
// import get from '../../../common/utils/get';

const WeatherCard = ({ id, data }) => {
    console.log(
        '🚀 ~ file: WeatherCard.jsx ~ line 6 ~ WeatherCard ~ data',
        data
    );
    const {
        location_name: locationName,
        weather: { id: idDescription, description } = {},
        temp_min: minTemp,
        temp_max: maxTemp
    } = data;
    return (
        <div style={{ padding: '10px' }}>
            <h2>{`Nombre: ${locationName}`}</h2>
            <p>{`Icono nº: ${idDescription}`}</p>
            <p>{`Descripcion: ${description}`}</p>
            <p>{`Min temp: ${minTemp} º C`}</p>
            <p>{`Max temp: ${maxTemp} º C`}</p>
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
