import request from 'request-promise-native';
import logger from '../../components/private/common/utils/logger';
import compose from '../../components/private/common/utils/composeFunctions';

const fetch = ({ arcSite }) => {
    const baseUrl = 'https://contenidos.lanacion.com.ar/json/pronostico';
    const codCABA = 'ARCF0009';
    const endpoint = {
        uri: `${baseUrl}/index-ciudadRef=${codCABA}`,
        json: true
    };

    const getData = async () => {
        try {
            const response = await request(endpoint);
            return {
                weather: transform(response),
                sourceName: endpoint.uri,
                source: endpoint.uri
            };
        } catch (error) {
            logger.push(
                error,
                { source: 'content/sources/weatherSource', url: endpoint.uri },
                arcSite
            );
        }
    };

    return Promise.resolve(getData());
};

const pronosticoCallbackJSON = ({ ciudades }) =>
    ciudades.find(x => x.ciudad.codigo).ciudad;

const setIconName = description => {
    const weatherIcons = {
        sun: ['Despejado'],
        'sun-cloudy': [
            'Algo nublado',
            'Parcialmente nublado',
            'Mejorando',
            'Desmejorando'
        ],
        rain: ['Lluvias', 'Llovizna y lluvia'],
        storm: ['Lluvias y tormentas'],
        snow: ['Nieve', 'Nieve y sol', 'Lluvia y nieve'],
        'rainy-cloudy': ['Lloviznas', 'Inestable con lluvia'],
        cloudy: [
            'Nubosidad en aumento',
            'Nubosidad en disminución',
            'Nubosidad variable',
            'Nublado',
            'Inestable'
        ],
        'storm-cloudy': ['Tormenta y sol'],
        windy: ['Ventoso', 'Viento blanco']
    };

    const filterIcon = arr => arr.find(x => x[1].includes(description))[0];

    return compose(filterIcon, Object.entries)(weatherIcons);
};

const transform = data => {
    const cleaned = data.trim();
    const result = eval(cleaned);
    return { ...result, icon_name: setIconName(result.icono_descripcion) };
};

export default {
    fetch,
    ttl: 120
};
