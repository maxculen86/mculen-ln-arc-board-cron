import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import get from '../../../private/common/utils/get';
import ForecastByDay from '../../../private/LN/services/weather/ForecastByDay';
import IconsReferences from '../../../private/LN/services/weather/IconsReferences';
import '../../../../resources/dist/css/ln/components/weather.css';

const WeatherForecast = ({ id: featureId }) => {
    const { globalContent = {} } = useAppContext() || {};
    const forecast = get(globalContent, 'dataService.forecast', []);
    const sectionName = get(globalContent, 'name', '');
    const icons = [
        { id: 'sun', description: 'soleado' },
        { id: 'sun', description: 'soleado' },
        { id: 'sun', description: 'soleado' },
        { id: 'sun', description: 'soleado' }
    ];

    if (!forecast.length) return null;

    return (
        <>
            <h2>{`Pronóstico del tiempo extendido para ${sectionName}`}</h2>
            {forecast.map((day, index) => (
                <ForecastByDay
                    key={day.date}
                    data={day}
                    section={sectionName}
                    index={index}
                />
            ))}
            <IconsReferences icons={icons} />
        </>
    );
};

WeatherForecast.label = 'LN Clima Pronostico';

WeatherForecast.propTypes = { id: PropTypes.string.isRequired };

export default WeatherForecast;
