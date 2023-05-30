import PropTypes from 'fusion:prop-types';
import React from 'react';
import {
    ClearNight,
    Cloudy,
    Rain,
    RainyCloudy,
    Snow,
    SnowCloudy,
    Storm,
    StormCloudy,
    Sun,
    SunCloudy,
    Windy
} from '@ln/contenidos-ui-assets';

export const setWeatherData = weatherValue => {
    if (!weatherValue) return null;

    const { dataService: { locations = [] } = {} } = weatherValue;

    const { current_temp: temperature = '', weather: weatherInfo = {} } =
        locations.find(
            ({ location_id: locationId = '' }) =>
                locationId === 'ciudad-de-buenos-aires'
        ) || {};

    const options = {
        sun: <Sun />,
        'clear-night': <ClearNight />,
        windy: <Windy />,
        'sun-cloudy': <SunCloudy />,
        cloudy: <Cloudy />,
        'rainy-cloudy': <RainyCloudy />,
        rain: <Rain />,
        'storm-cloudy': <StormCloudy />,
        storm: <Storm />,
        'snow-cloudy': <SnowCloudy />,
        snow: <Snow />
    };

    return {
        icon: options[weatherInfo.id] || options.sun,
        temperature: temperature ? `${temperature}º` : '',
        place: 'Capital Federal',
        dataEvent: 'e_linkclick',
        dataSection: 'MenuLN',
        link: '/clima/'
    };
};

export const setTopicsCustomFields = (maxTopics = 7) => {
    const iterator = [...new Array(maxTopics).keys()];

    return iterator.reduce((customFields, next) => {
        const group = `Tema ${next + 1}`;

        return {
            ...customFields,
            [`title ${next}`]: PropTypes.string.isRequired.tag({
                label: 'Título',
                group
            }),
            [`link ${next}`]: PropTypes.string.isRequired.tag({
                label: 'Link',
                group
            })
        };
    }, {});
};

export const getTopicsFromCustomFields = (customFields = {}) => {
    const totalCustomFieldsKeys = Object.keys(customFields).length;
    const topicKeys = [...new Array(totalCustomFieldsKeys / 2).keys()];

    return topicKeys
        .map(key => ({
            title: customFields[`title ${key}`],
            link: customFields[`link ${key}`],
            dataEvent: 'e_linkclick',
            dataSection: 'MenuLN'
        }))
        .filter(topic => topic.title && topic.link);
};
