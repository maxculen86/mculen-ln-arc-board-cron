import get from '../../../../../components/private/common/utils/get';

const getWeatherMetaData = (serviceItem, serviceSubItem) => {
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

export default getWeatherMetaData;
