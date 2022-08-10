import React from 'react';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import '../../../../resources/dist/css/ln/components/weather.css';
import ProvincesList from '../../../private/LN/services/weather/ProvincesList';

const WeatherProvinces = ({ id: _featureId }) => {
    const { globalContent = {} } = useAppContext() || {};
    const { _id: sectionId = '' } = globalContent;

    const data = useContent({
        source: 'sectionSource',
        query: {
            id: '/clima'
        }
    });
    const { children: provinces = [] } = data || {};

    if (!provinces.length || sectionId === '/clima') return null;

    return <ProvincesList provinces={provinces} />;
};

WeatherProvinces.label = 'LN Clima Provincias';

WeatherProvinces.propTypes = { id: PropTypes.string.isRequired };

export default WeatherProvinces;
