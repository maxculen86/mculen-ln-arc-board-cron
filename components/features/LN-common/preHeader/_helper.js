import PropTypes from 'fusion:prop-types';
import addEventToDataLayer from '../../../private/LN/common/utils/addEventToDataLayer';

export const setWeatherData = weatherValue => {
    if (!weatherValue) return null;

    const { dataService: { locations = [] } = {} } = weatherValue;

    const { current_temp: temperature = '' } =
        locations.find(
            ({ location_id: locationId = '' }) =>
                locationId === 'ciudad-de-buenos-aires'
        ) || {};

    return {
        icon: 'sun',
        temperature,
        place: 'Capital Federal',
        dataEvent: 'e_linkclick',
        dataSection: 'MenuLN',
        link: '/clima',
        callback: e => {
            addEventToDataLayer({
                event: 'e_linkclick',
                action: 'home_ln10',
                category: 'header_clima',
                label: 'clima'
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

export const getTopicsFromCustomFields = (customFields = {}) => {
    const totalCustomFieldsKeys = Object.keys(customFields).length;
    const topicKeys = [...new Array(totalCustomFieldsKeys / 2).keys()];

    return topicKeys.map(key => ({
        title: customFields[`title ${key}`],
        link: customFields[`link ${key}`],
        dataEvent: 'e_linkclick',
        dataSection: 'MenuLN',
        callback: e => {
            addEventToDataLayer({
                event: 'e_linkclick',
                action: 'home_ln10',
                category: 'header_temas_hoy',
                label: customFields[`title ${key}`]
            });
        }
    }));
};
