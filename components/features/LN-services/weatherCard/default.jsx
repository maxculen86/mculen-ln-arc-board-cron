import React from 'react';
import { useAppContext } from 'fusion:context';
// import PropTypes from 'fusion:prop-types';
import get from '../../../private/common/utils/get';

const WeatherCard = () => {
    const weather = get(useAppContext(), 'globalContent', []);
    console.log(
        '🚀 ~ file: default.jsx ~ line 8 ~ WeatherCard ~ weather',
        weather
    );
    return <p>Hola men!</p>;
};

WeatherCard.label = 'LN Clima';

// WeatherCard.propTypes = { id: PropTypes.string.isRequired };

export default WeatherCard;
