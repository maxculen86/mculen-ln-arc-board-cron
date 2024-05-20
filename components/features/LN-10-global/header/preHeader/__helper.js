import optionsIcons from '../../../../private/LN/services/weather/optionsIcons';

export const setWeatherData = weatherValue => {
    if (!weatherValue) return null;

    const { dataService: { locations = [] } = {} } = weatherValue;

    const { current_temp: temperature = '', weather: weatherInfo = {} } =
        locations.find(
            ({ location_id: locationId = '' }) =>
                locationId === 'ciudad-de-buenos-aires'
        ) || {};

    return {
        icon: optionsIcons[weatherInfo.id] || optionsIcons.sun,
        temperature: temperature ? `${temperature}º` : '',
        place: 'Capital Federal',
        dataEvent: 'e_linkclick',
        dataSection: 'MenuLN',
        link: '/clima/'
    };
};
