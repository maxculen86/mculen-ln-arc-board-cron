// TODO: aplicar validacion en el source para evitar este mapeo de nombres y garantizar compatibilidad con Weather actual.
const iconNameMap = {
    sun: 'sun',
    'clear-night': 'moon-clear',
    windy: 'windy',
    'sun-cloudy': 'sun-cloudy',
    cloudy: 'cloudy',
    'rainy-cloudy': 'drizzle',
    rain: 'heavy-showers',
    'storm-cloudy': 'thunderstorms',
    storm: 'flashlight',
    'snow-cloudy': 'snowy',
    snow: 'snowy'
};

function getWeatherData(weatherValue) {
    if (!weatherValue) return null;

    const { dataService: { locations = [] } = {} } = weatherValue;

    const { current_temp: temperature = '', weather: weatherInfo = {} } =
        locations.find(
            ({ location_id: locationId = '' }) =>
                locationId === 'ciudad-de-buenos-aires'
        ) || {};

    return {
        iconName: iconNameMap[weatherInfo.id] || iconNameMap.sun,
        temperature: temperature ? `${temperature}º` : '',
        place: 'Capital Federal',
        dataEvent: 'e_linkclick',
        dataSection: 'MenuLN',
        link: '/clima/'
    };
}

export default getWeatherData;
