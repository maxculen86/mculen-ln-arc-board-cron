import React from 'react';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import get from '../../../private/common/utils/get';
import WeatherCard from '../../../private/LN/services/weather/WeatherCard';
import '../../../../resources/dist/css/ln/components/weather.css';
import IconsReferences from '../../../private/LN/services/weather/IconsReferences';

const WeatherList = () => {
    const locations = get(
        useAppContext(),
        'globalContent.dataService.locations',
        []
    );

    if (!locations.length) return null;

    return (
        <Static id="weather-list" htmlOnly>
            <div className="grid-weather-home">
                {locations.map(location => (
                    <WeatherCard key={location.location_id} data={location} />
                ))}
            </div>
            <IconsReferences />
        </Static>
    );
};

WeatherList.label = 'LN Clima Listado';

export default WeatherList;
