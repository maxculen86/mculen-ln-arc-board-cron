import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import get from '../../../private/common/utils/get';
import ForecastByDay from '../../../private/LN/services/weather/ForecastByDay';

const WeatherForecast = ({ id: featureId }) => {
    const { globalContent = {} } = useAppContext() || {};
    const forecast = get(globalContent, 'dataService.forecast', []);
    const sectionName = get(globalContent, 'name', '');

    if (!forecast.length) return null;

    return (
        <>
            {forecast.map((day, index) => (
                <ForecastByDay
                    key={day.date}
                    data={day}
                    section={sectionName}
                    index={index}
                />
            ))}
        </>
    );
};

WeatherForecast.label = 'LN Clima Pronostico';

WeatherForecast.propTypes = { id: PropTypes.string.isRequired };

export default WeatherForecast;
