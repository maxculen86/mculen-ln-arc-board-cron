import PropTypes from 'fusion:prop-types';

export const getWeatherData = weatherValue => {
    if (!weatherValue) return null;

    const { dataService: { locations = [] } = {} } = weatherValue;

    const { current_temp: temperature = '', weather: weatherInfo = {} } =
        locations.find(
            ({ location_id: locationId = '' }) =>
                locationId === 'ciudad-de-buenos-aires'
        ) || {};

    return {
        iconName: weatherInfo.id || '',
        temperature,
        place: 'Capital Federal',
        dataEvent: 'e_linkclick',
        dataSection: 'MenuLN',
        link: '/clima',
        callback: e => {
            e.preventDefault();
            window.dataLayer.push({
                event: 'e_linkclick',
                dynamic_action: 'home_ln10',
                dynamic_category: 'header_clima',
                dynamic_label: 'clima'
            });
        }
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

export const getTopicsFromCustomFields = customFields => {
    const totalCustomFieldsKeys = Object.keys(customFields).length;
    const topicKeys = [...new Array(totalCustomFieldsKeys / 2).keys()];

    return topicKeys.map((key, index) => ({
        title: customFields[`title ${key}`],
        link: customFields[`link ${key}`],
        dataEvent: 'e_linkclick',
        dataSection: 'MenuLN',
        callback: () => {
            window.dataLayer.push({
                event: 'e_linkclick',
                dynamic_action: 'home_ln10',
                dynamic_category: 'header_temas_hoy',
                dynamic_label: '{tag_description}'
            });
        }
    }));
};
