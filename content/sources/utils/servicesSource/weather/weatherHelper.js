/* eslint-disable no-underscore-dangle */
import get from '../../../../../components/private/common/utils/get';
import homeUrls from './_config';

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
            headline: `Clima de hoy en ${name}`
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

const getSectionLink = (service, sections, location) => {
    if (service) {
        const sectionLink =
            sections.find(e => {
                const { name = '' } = e;

                return name === location;
            }) || {};
        const { _id: url = '' } = sectionLink;
        return url;
    }
    return homeUrls[location];
};

export const extractTime = (isoString = '') => {
    const splitString = isoString.split('T');
    const time = splitString.pop() || '';
    const cleanTime = time.split('-') || [];
    return cleanTime[0] || '';
};

export const getHomeUpdateTime = (data = {}) => {
    const { locations = [] } = data;
    const { updated = '' } = locations.find(loc => {
        return loc && loc.updated;
    });
    return extractTime(updated);
};

const reorderLocations = (endpointData, children, serviceItem) => {
    if (!serviceItem) return endpointData;
    const reorder = children.reduce((acc, loc) => {
        const province = endpointData.find(e => {
            return e.location_name === loc.name;
        });

        province && acc.push(province);

        return acc;
    }, []);

    return reorder;
};

export const transformWeatherHome = (data, children, serviceItem) => {
    if (!data.length) return data;

    const orderedLocations = reorderLocations(data, children, serviceItem);

    return orderedLocations.map((location = {}, i) => {
        const {
            location_name: locationName,
            location_id: locationId,
            temp_min: tempMin,
            temp_max: tempMax,
            weather = {},
            current_temp: currentTemp
        } = location;

        const sectionId = getSectionLink(serviceItem, children, locationName);

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
            }),
            ...(sectionId && { link: sectionId }),
            ...(currentTemp && { current_temp: currentTemp })
        };
    });
};

export const transformWeatherDetail = data => {
    return data.map((forecast = {}, i) => {
        const { date, morning, afternoon, night } = forecast;

        return {
            ...(date && { date }),
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
        19: 'sun-cloudy',
        20: 'sun-cloudy',
        74: 'rainy-cloudy',
        3: 'sun',
        5: 'clear-night',
        13: 'sun-cloudy',
        14: 'sun-cloudy',
        71: 'rainy-cloudy',
        77: 'snow-cloudy',
        84: 'snow-cloudy',
        73: 'rain',
        72: 'rain',
        93: 'rain',
        83: 'rain',
        37: 'cloudy',
        38: 'cloudy',
        61: 'cloudy',
        79: 'snow',
        75: 'snow',
        85: 'snow',
        80: 'snow',
        67: 'cloudy',
        69: 'cloudy',
        119: 'cloudy',
        43: 'cloudy',
        25: 'sun-cloudy',
        26: 'sun-cloudy',
        81: 'storm-cloudy',
        76: 'storm-cloudy',
        99: 'storm-cloudy',
        89: 'storm-cloudy',
        94: 'snow',
        88: 'snow',
        92: 'snow',
        96: 'snow',
        51: 'windy',
        118: 'windy'
    };
    if (oldIcon && Object.keys(iconConverter).includes(oldIcon.toString()))
        return iconConverter[oldIcon];

    return null;
};
