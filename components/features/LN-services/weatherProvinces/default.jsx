import React from 'react';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import '../../../../resources/dist/css/ln/components/weather.css';
import ProvincesList from '../../../private/LN/services/weather/ProvincesList';

function WeatherProvinces() {
    const { globalContent = {} } = useAppContext() || {};
    const { _id: sectionId = '' } = globalContent;

    const data = useContent({
        source: 'sectionSource',
        query: {
            id: '/clima'
        },
        filter: `{
            children {
                _id
                name
            }
        }`
    });
    const { children: provinces = [] } = data || {};

    if (!provinces.length || sectionId === '/clima') return null;

    return <ProvincesList provinces={provinces} />;
}

WeatherProvinces.label = 'LN Clima Provincias';
WeatherProvinces.lazy = true;

export default WeatherProvinces;
