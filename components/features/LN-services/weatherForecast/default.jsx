import React from 'react';
import Static from 'fusion:static';
import { useAppContext } from 'fusion:context';
import get from '../../../private/common/utils/get';
import ForecastByDay from '../../../private/LN/services/weather/ForecastByDay';
import IconsReferences from '../../../private/LN/services/weather/IconsReferences';
import '../../../../resources/dist/css/ln/components/weather.css';

function WeatherForecast({ id: _featureId }) {
    const { globalContent = {} } = useAppContext() || {};
    const forecast = get(globalContent, 'dataService.forecast', []);
    const sectionName = get(globalContent, 'name', '');

    if (!forecast.length) return null;

    return (
        <Static id={_featureId}>
            {forecast.map((day, index) => (
                <ForecastByDay
                    key={day.date}
                    data={day}
                    section={sectionName}
                    index={index}
                />
            ))}
            <IconsReferences />
        </Static>
    );
}
WeatherForecast.label = 'LN Clima Pronostico';

export default WeatherForecast;
