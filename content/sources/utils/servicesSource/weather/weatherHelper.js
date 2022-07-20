import get from '../../../../../components/private/common/utils/get';

export const getWeatherMetaData = (serviceItem, serviceSubItem) => {
    if (serviceSubItem)
        return get(metaDataFactory, 'ciudad', metaDataFactory.default);

    if (serviceItem)
        return get(metaDataFactory, 'provincia', metaDataFactory.default);

    return get(metaDataFactory, 'home', metaDataFactory.default);
};

const metaDataFactory = {
    home: () => {
        return {
            title:
                'Clima de hoy en Argentina, el pronóstico del tiempo en LA NACION',
            description:
                'Encontrá el pronóstico del tiempo en Argentina, condiciones climáticas, temperatura actual y pronóstico extendido del clima en Capital Federal, Buenos Aires y todo el país por el Servicio Meteorológico Nacional - LA NACION',
            headline: 'Clima de hoy en Argentina'
        };
    },
    provincia: (name = '', children = []) => {
        if (children.length > 0) {
            return {
                title: `Clima en ${name} y pronóstico del tiempo en LA NACION`,
                description: `Temperatura actual en ${name} y sus principales ciudades, el clima de ${name} por el Servicio Meteorológico Nacional - LA NACION`,
                headline: `Clima de hoy en ${name}`
            };
        }
        return {
            title: `Clima en ${name} y pronóstico del tiempo en LA NACION`,
            description: `El tiempo en ${name} encontrá el pronóstico extendido y la temperatura de hoy para ${name} del Servicio Meteorológico Nacional en LA NACION`,
            headline: `Clima de hoy en ${name}`
        };
    },
    ciudad: (name = '') => {
        return {
            title: `Clima en ${name} y pronóstico extendido en LA NACION`,
            description: `El tiempo en ${name} encontrá el pronóstico extendido y la temperatura de hoy para ${name} del Servicio Meteorológico Nacional en LA NACION`,
            headline: `Clima en ${name} hoy`
        };
    },
    default: (name = '') => {
        return {
            title: 'Clima por LA NACION',
            description: 'Clima por LA NACION',
            headline: name
        };
    }
};

export const transformWeatherHome = data => {
    if (!data.length) return data;

    return data.map((location = {}, i) => {
        const {
            location_name: locationName,
            location_id: locationId,
            temp_min: tempMin,
            temp_max: tempMax,
            weather = {}
        } = location;

        const { description, id: iconId } = weather;
        const newIcon = convertIcon(iconId);

        return {
            ...(locationName && { location_name: locationName }),
            ...(locationId && { location_id: locationId }),
            ...(tempMin && { temp_min: tempMin }),
            ...(tempMax && { temp_max: tempMax }),
            ...((description || newIcon) && {
                weather: {
                    ...(description && { description }),
                    ...(newIcon && { id: newIcon })
                }
            })
        };
    });
};

export const transformWeatherDetail = data => {
    return data.map((forecast = {}, i) => {
        const {
            date,
            early_morning: earlyMorning,
            morning,
            afternoon,
            night
        } = forecast;

        return {
            ...(date && { date }),
            ...(earlyMorning && {
                early_morning: getDaytimeData(earlyMorning)
            }),
            ...(morning && { morning: getDaytimeData(morning) }),
            ...(afternoon && { afternoon: getDaytimeData(afternoon) }),
            ...(night && { night: getDaytimeData(night) })
        };
    });
};

const getDaytimeData = (dayTime = {}) => {
    const {
        humidity,
        rain_prob_range: rain,
        temperature,
        weather = {},
        wind = {}
    } = dayTime;

    const { description: weatherDescription, id: weatherIconId } = weather;

    const { direction: windDirection, speed_range: windSpeed } = wind;

    const getHigher = array => Math.max.apply(0, array);

    const weatherIconNew = convertIcon(weatherIconId);

    return {
        ...(humidity && { humidity }),
        ...(rain && { rain_prob: getHigher(rain) }),
        ...(temperature && { temperature }),
        ...((weatherDescription || weatherIconNew) && {
            weather: {
                ...(weatherDescription && {
                    description: weatherDescription
                }),
                ...(weatherIconNew && {
                    id: weatherIconNew
                })
            }
        }),
        ...((windDirection || windSpeed) && {
            wind: {
                ...(windDirection && {
                    direction: windDirection
                }),
                ...(windSpeed && {
                    speed: getHigher(windSpeed)
                })
            }
        })
    };
};

const convertIcon = oldIcon => {
    const iconConverter = {
        19: 2,
        20: 2,
        74: 4,
        3: 1,
        5: 9,
        13: 2,
        14: 2,
        71: 4,
        77: 7,
        84: 7,
        73: 5,
        72: 5,
        93: 5,
        83: 5,
        37: 3,
        38: 3,
        61: 3,
        79: 8,
        75: 8,
        85: 8,
        80: 8,
        67: 3,
        69: 3,
        119: 3,
        43: 3,
        25: 2,
        26: 2,
        81: 6,
        76: 6,
        99: 6,
        89: 6,
        94: 8,
        88: 8,
        92: 8,
        96: 8,
        51: 11,
        118: 11
    };
    if (oldIcon && Object.keys(iconConverter).includes(oldIcon.toString()))
        return iconConverter[oldIcon];

    return null;
};
