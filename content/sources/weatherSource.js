/* eslint-disable no-eval */
import logger from '../../components/private/common/utils/logger';
import compose from '../../components/private/common/utils/composeFunctions';

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
    const result = eval(cleaned); // NOSONAR
    return { ...result, icon_name: setIconName(result.icono_descripcion) };
};

const fetch = ({ arcSite }) => {
    const baseUrl = 'https://contenidos.lanacion.com.ar/json/pronostico';
    const codCABA = 'ARCF0009';
    const endpoint = `${baseUrl}/index-ciudadRef=${codCABA}`;

    const getData = async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        try {
            const response = await global.fetch(endpoint, {
                signal: controller.signal
            });
            if (!response.ok) {
                throw new Error(
                    `WeatherSource responded with ${response.status} ${response.statusText}`
                );
            }
            const payload = await response.text();
            return {
                weather: transform(payload),
                sourceName: endpoint,
                source: endpoint
            };
        } catch (error) {
            const normalizedError =
                error?.name === 'AbortError'
                    ? new Error(
                          `WeatherSource fetch aborted after due to timeout limit`
                      )
                    : error;
            return logger.push(
                normalizedError,
                { source: 'content/sources/weatherSource', url: endpoint },
                arcSite
            );
        } finally {
            clearTimeout(timeoutId);
        }
    };

    return getData();
};

export default {
    fetch,
    ttl: 120
};
