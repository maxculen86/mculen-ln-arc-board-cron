import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import get from '../../../private/common/utils/get';
import WeatherCard from '../../../private/LN/services/weather/WeatherCard';
import '../../../../resources/dist/css/ln/components/weather.css';
import IconsReferences from '../../../private/LN/services/weather/IconsReferences';

const WeatherList = ({ id: featureId }) => {
    const locations = get(
        useAppContext(),
        'globalContent.dataService.locations',
        []
    );

    if (!locations.length) return null;

    return (
        <>
            <div className="grid-weather-home">
                {locations.map(location => (
                    <WeatherCard key={location.location_id} data={location} />
                ))}
            </div>
            <IconsReferences />
        </>
    );
};

WeatherList.label = 'LN Clima Listado';

WeatherList.propTypes = { id: PropTypes.string.isRequired };

export default WeatherList;
