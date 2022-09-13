/* eslint-disable no-underscore-dangle */
import get from '../../../../../components/private/common/utils/get';
import addForwardSlash from '../../../../../components/private/LN/common/utils/addForwardSlash';
import removeAccents from '../../../../../components/private/common/utils/removeAccents';

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
                'Encontrá el pronóstico del tiempo en Argentina, condiciones climáticas, temperatura actual y pronóstico extendido del clima en Capital Federal,' +
                ' Buenos Aires y todo el país por el Servicio Meteorológico Nacional - LA NACION',
            headline: 'Clima de hoy en Argentina',
            latestNewsTitle: 'Últimas noticias del clima'
        };
    },
    provincia: (name = '', children = []) => {
        if (children.length > 0) {
            return {
                title: `Clima en ${name} y pronóstico del tiempo en LA NACION`,
                description: `Temperatura actual en ${name} y sus principales ciudades, el clima de ${name} por el Servicio Meteorológico Nacional - LA NACION`,
                headline: `Clima de hoy en ${name}`,
                latestNewsTitle: `Últimas noticias del clima en ${name}`
            };
        }
        return {
            title: `Clima en ${name} y pronóstico del tiempo en LA NACION`,
            subtitle: `Pronóstico del tiempo extendido para ${name}`,
            description: `El tiempo en ${name} encontrá el pronóstico extendido y la temperatura de hoy para ${name} del Servicio Meteorológico Nacional en LA NACION`,
            headline: `Clima de hoy en ${name}`,
            latestNewsTitle: `Últimas noticias del clima en ${name}`
        };
    },
    ciudad: (name = '') => {
        return {
            title: `Clima en ${name} y pronóstico extendido en LA NACION`,
            subtitle: `Pronóstico del tiempo extendido para ${name}`,
            description: `El tiempo en ${name} encontrá el pronóstico extendido y la temperatura de hoy para ${name} del Servicio Meteorológico Nacional en LA NACION`,
            headline: `Clima de hoy en ${name}`,
            latestNewsTitle: `Últimas noticias del clima en ${name}`
        };
    },
    default: (name = '') => {
        return {
            title: 'Clima por LA NACION',
            description: 'Clima por LA NACION',
            headline: name,
            latestNewsTitle: `Últimas noticias del clima`
        };
    }
};

const eliminateDecimals = (number = undefined) => {
    return number && Math.floor(number);
};

const getSectionLink = (sections, location) => {
    const sectionLink =
        sections.find(e => {
            const { name = '' } = e;

            return removeAccents(name) === removeAccents(location);
        }) || {};
    const { _id: url = '' } = sectionLink;

    if (url) return addForwardSlash(url);
    return null;
};

export const extractTime = (isoString = '') => {
    return isoString.slice(11, 16);
};

const reorderLocations = (endpointData, children = [], serviceItem = '') => {
    if (!serviceItem) return endpointData;

    return children.reduce((acc, loc = {}) => {
        const province = endpointData.find(e => {
            return removeAccents(e.location_name) === removeAccents(loc.name);
        });

        province && acc.push(province);

        return acc;
    }, []);
};

export const transformWeatherHome = (data, children, serviceItem) => {
    if (!data.length) return data;

    const orderedLocations = reorderLocations(data, children, serviceItem);

    return orderedLocations.map(location => {
        const {
            location_name: locationName,
            location_id: locationId,
            temp_min: tempMin,
            temp_max: tempMax,
            weather = {},
            current_temp: currentTemp
        } = location || {};

        const sectionId = getSectionLink(children, locationName);

        const { description, id: iconId } = weather;
        const newIcon = convertIcon(iconId);

        return {
            ...(locationName && { location_name: locationName }),
            ...(locationId && { location_id: locationId }),
            ...((tempMin || tempMin === 0) && {
                temp_min:
                    tempMin > currentTemp
                        ? eliminateDecimals(currentTemp)
                        : tempMin
            }),
            ...((tempMax || tempMax === 0) && {
                temp_max:
                    tempMax < currentTemp
                        ? eliminateDecimals(currentTemp)
                        : tempMax
            }),
            ...((description || newIcon) && {
                weather: {
                    ...(description && { description }),
                    ...(newIcon && { id: newIcon })
                }
            }),
            ...(sectionId && { link: sectionId }),
            ...((currentTemp || currentTemp === 0) && {
                current_temp: currentTemp
            })
        };
    });
};

export const transformWeatherDetail = data => {
    return data.map(forecast => {
        const { date, morning, afternoon, night } = forecast || {};

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
        ...((humidity || humidity === 0) && { humidity }),
        ...((rain || rain === 0) && {
            rain_prob: getHigher(rain)
        }),
        ...((temperature || temperature === 0) && {
            temperature
        }),
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
    const sunCloudy = 'sun-cloudy';
    const rainyCloudy = 'rainy-cloudy';
    const snow = 'snow';
    const rain = 'rain';
    const cloudy = 'cloudy';
    const stormCloudy = 'storm-cloudy';
    const snowCloudy = 'snow-cloudy';
    const windy = 'windy';

    const iconConverter = {
        19: sunCloudy,
        20: sunCloudy,
        74: rainyCloudy,
        3: 'sun',
        5: 'clear-night',
        13: sunCloudy,
        14: sunCloudy,
        71: rainyCloudy,
        77: snowCloudy,
        84: snowCloudy,
        73: rain,
        72: rain,
        93: rain,
        83: rain,
        37: cloudy,
        38: cloudy,
        61: cloudy,
        79: snow,
        75: snow,
        85: snow,
        80: snow,
        67: cloudy,
        69: cloudy,
        119: cloudy,
        43: cloudy,
        25: sunCloudy,
        26: sunCloudy,
        81: stormCloudy,
        76: stormCloudy,
        99: stormCloudy,
        89: 'storm',
        94: snow,
        88: snow,
        92: snow,
        96: snow,
        51: windy,
        118: windy
    };
    if (oldIcon && Object.keys(iconConverter).includes(oldIcon.toString()))
        return iconConverter[oldIcon];

    return null;
};
