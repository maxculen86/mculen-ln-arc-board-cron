import PropTypes from 'fusion:prop-types';

export const setWeatherData = weatherValue => {
    if (!weatherValue) return null;

    const { dataService: { locations = [] } = {} } = weatherValue;

    const { current_temp: temperature = '', weather: weatherInfo = {} } =
        locations.find(
            ({ location_id: locationId = '' }) =>
                locationId === 'ciudad-de-buenos-aires'
        ) || {};

    const options = {
        sun: 'sun',
        'clear-night': 'clearNight',
        windy: 'windy',
        'sun-cloudy': 'sunCloudy',
        cloudy: 'cloudy',
        'rainy-cloudy': 'rainyCloudy',
        rain: 'rain',
        'storm-cloudy': 'stormCloudy',
        storm: 'storm',
        'snow-cloudy': 'snowCloudy',
        snow: 'snow'
    };

    return {
        icon: options[weatherInfo.id] || options.sun,
        temperature: temperature ? `${temperature}º` : '',
        place: 'Capital Federal',
        dataEvent: 'e_linkclick',
        dataSection: 'MenuLN',
        link: '/clima'
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
