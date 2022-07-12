import React from 'react';
import { useContent } from 'fusion:content';
import PropTypes from 'fusion:prop-types';
import '../../../../resources/dist/css/ln/components/weather.css';
// import get from '../../../private/common/utils/get';

const WeatherProvinces = ({ id: featureId }) => {
    const data = useContent({
        source: 'sectionSource',
        query: {
            id: '/clima'
        }
    });
    const { children: provinces = [] } = data || {};

    const listToShow = provinces.map(province => province.name).join(', ');

    if (!provinces.length) return null;

    return (
        <>
            <h3>Listado de provincias:</h3>
            <p>{listToShow}</p>
        </>
    );
};

WeatherProvinces.label = 'LN Clima Provincias';

WeatherProvinces.propTypes = { id: PropTypes.string.isRequired };

export default WeatherProvinces;
