import React from 'react';
import { useContent } from 'fusion:content';
import PropTypes from 'fusion:prop-types';
import '../../../../resources/dist/css/ln/components/weather.css';
import ProvincesList from '../../../private/LN/services/weather/ProvincesList';

const WeatherProvinces = ({ id: featureId }) => {
    const parseQueryString = window && window.location;
    const { pathname = '' } = parseQueryString;
    const data = useContent({
        source: 'sectionSource',
        query: {
            id: '/clima'
        }
    });
    const { children: provinces = [] } = data || {};

    if (!provinces.length || pathname === '/clima/') return null;

    return <ProvincesList provinces={provinces} />;
};

WeatherProvinces.label = 'LN Clima Provincias';

WeatherProvinces.propTypes = { id: PropTypes.string.isRequired };

export default WeatherProvinces;
