import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import get from '../../../private/common/utils/get';
import WeatherCard from '../../../private/LN/services/weather/WeatherCard';

const WeatherList = ({ id: featureId }) => {
    const locations = get(
        useAppContext(),
        'globalContent.dataService.locations',
        []
    );

    if (!locations.length) return null;

    return (
        <>
            {locations.map(location => (
                <WeatherCard key={location.location_id} data={location} />
            ))}
        </>
    );
};

WeatherList.label = 'LN Clima Listado';

WeatherList.propTypes = { id: PropTypes.string.isRequired };

export default WeatherList;
