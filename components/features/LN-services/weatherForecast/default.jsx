import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import get from '../../../private/common/utils/get';
import ForecastByDay from '../../../private/LN/services/weather/ForecastByDay';
import IconsReferences from '../../../private/LN/services/weather/IconsReferences';
import '../../../../resources/dist/css/ln/components/weather.css';
import Text from '../../../private/common/text';

const WeatherForecast = ({ id: featureId }) => {
    const { globalContent = {} } = useAppContext() || {};
    const forecast = get(globalContent, 'dataService.forecast', []);
    const sectionName = get(globalContent, 'name', '');
    const icons = [
        { id: 'sun', description: 'soleado' },
        { id: 'windy', description: 'ventoso' },
        { id: 'snow-cloudy', description: 'tormenta nieve' },
        { id: 'windy', description: 'ventoso' },
        { id: 'snow-cloudy', description: 'tormenta nieve' },
        { id: 'rain', description: 'lluvioso' }
    ];

    if (!forecast.length) return null;

    return (
        <>
            <Text tag="h2" size="--l">
                {`Pronóstico del tiempo extendido para ${sectionName}`}
            </Text>
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
