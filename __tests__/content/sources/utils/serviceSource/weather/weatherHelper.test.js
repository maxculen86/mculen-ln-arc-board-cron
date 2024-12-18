import {
    extractTime,
    getWeatherMetaData,
    transformWeatherHome,
    validateMaxTemperature,
    validateMinTemperature
} from '../../../../../../content/sources/utils/servicesSource/weather/weatherHelper';

describe('weatherHelper', () => {
    describe('getWeatherMetaData', () => {
        it('should return meta data city value from serviceSubItem', () => {
            const name = 'Barracas';
            const getMetaData = getWeatherMetaData(false, true);
            const metadata = getMetaData(name);

            expect(metadata).toEqual({
                title: `Clima en ${name} y pronóstico extendido en LA NACION`,
                subtitle: `Pronóstico del tiempo extendido para ${name}`,
                description: `El tiempo en ${name} encontrá el pronóstico extendido y la temperatura de hoy para ${name} del Servicio Meteorológico Nacional en LA NACION`,
                headline: `Clima de hoy en ${name}`,
                latestNewsTitle: `Últimas noticias del clima en ${name}`
            });
        });

        it('should return meta data province value from serviceItem without children', () => {
            const name = 'Mendoza';
            const getMetaData = getWeatherMetaData(true);
            const metadata = getMetaData(name, []);

            expect(metadata).toEqual({
                title: `Clima en ${name} y pronóstico del tiempo en LA NACION`,
                subtitle: `Pronóstico del tiempo extendido para ${name}`,
                description: `El tiempo en ${name} encontrá el pronóstico extendido y la temperatura de hoy para ${name} del Servicio Meteorológico Nacional en LA NACION`,
                headline: `Clima de hoy en ${name}`,
                latestNewsTitle: `Últimas noticias del clima en ${name}`
            });
        });

        it('should return meta data province value from serviceItem with children', () => {
            const name = 'Mendoza';
            const getMetaData = getWeatherMetaData(true);
            const metadata = getMetaData(name, [{ province: 'Mendoza' }]);

            expect(metadata).toEqual({
                title: `Clima en ${name} y pronóstico del tiempo en LA NACION`,
                description: `Temperatura actual en ${name} y sus principales ciudades, el clima de ${name} por el Servicio Meteorológico Nacional - LA NACION`,
                headline: `Clima de hoy en ${name}`,
                latestNewsTitle: `Últimas noticias del clima en ${name}`
            });
        });

        it('should return meta data home value from any item', () => {
            const getMetaData = getWeatherMetaData();
            const metadata = getMetaData();

            expect(metadata).toEqual({
                title: 'Clima de hoy en Argentina, el pronóstico del tiempo en LA NACION',
                description:
                    'Encontrá el pronóstico del tiempo en Argentina, condiciones climáticas, temperatura actual y pronóstico extendido del clima en Capital Federal,' +
                    ' Buenos Aires y todo el país por el Servicio Meteorológico Nacional - LA NACION',
                headline: 'Clima de hoy en Argentina',
                latestNewsTitle: 'Últimas noticias del clima'
            });
        });
    });

    describe('extractTime', () => {
        it('should extract the hour and minute from a valid ISO string', () => {
            expect(extractTime('2024-12-18T14:30:00Z')).toBe('14:30');
            expect(extractTime('2024-12-18T09:15:00Z')).toBe('09:15');
        });

        it('should return an empty string if no argument is passed', () => {
            expect(extractTime()).toBe('');
        });
    });

    describe('validateMinTemperature', () => {
        it('should return the value of currTemp rounded down if tempMin is greater than currTemp', () => {
            expect(validateMinTemperature(25, 24.7)).toBe(24);
            expect(validateMinTemperature(30, 29.9)).toBe(29);
        });

        it('should return tempMin if it is less than or equal to currTemp', () => {
            expect(validateMinTemperature(20, 25)).toBe(20);
            expect(validateMinTemperature(18, 18)).toBe(18);
        });
    });

    describe('validateMaxTemperature', () => {
        it('should return the ceiling value of currTemp if tempMax is less than currTemp', () => {
            expect(validateMaxTemperature(25, 25.7)).toBe(26);
            expect(validateMaxTemperature(30, 30.1)).toBe(31);
        });

        it('should return tempMax if it is greater than or equal to currTemp', () => {
            expect(validateMaxTemperature(30, 25)).toBe(30);
            expect(validateMaxTemperature(18, 18)).toBe(18);
        });
    });

    describe('transformWeatherHome', () => {
        it('should return same data empty array', () => {
            const result = transformWeatherHome([], [], '');
            expect(result).toEqual([]);
        });

        it('should return a correct transform weather ', () => {
            const expectTransformWeatherHome = [
                {
                    location_name: 'Buenos Aires',
                    location_id: 'ciudad-de-buenos-aires',
                    temp_min: 21,
                    temp_max: 29,
                    weather: {
                        description: 'Ligeramente nublado'
                    },
                    link: '/clima/buenos-aires/',
                    current_temp: 25.7
                },
                {
                    location_name: 'Catamarca',
                    location_id: 'san-fernando-del-valle-de-catamarca',
                    temp_min: 25,
                    temp_max: 32,
                    weather: { description: 'Nublado' },
                    link: '/clima/catamarca/',
                    current_temp: 25.6
                },
                {
                    location_name: 'Córdoba',
                    location_id: 'cordoba',
                    temp_min: 17,
                    temp_max: 24,
                    weather: {
                        description: 'Cubierto con tormenta débil'
                    },
                    link: '/clima/cordoba/',
                    current_temp: 17.2
                }
            ];
            const data = [
                {
                    updated: '2024-12-18T10:37:48-03:00',
                    location_name: 'Buenos Aires',
                    location_id: 'ciudad-de-buenos-aires',
                    temp_min: 21,
                    temp_max: 29,
                    current_temp: 25.7,
                    weather: {
                        description: 'Ligeramente nublado',
                        id: 'sun-cloudy'
                    }
                },
                {
                    updated: '2024-12-18T10:37:48-03:00',
                    location_name: 'Catamarca',
                    location_id: 'san-fernando-del-valle-de-catamarca',
                    temp_min: 25,
                    temp_max: 32,
                    current_temp: 25.6,
                    weather: { description: 'Nublado', id: 'cloudy' }
                },
                {
                    updated: '2024-12-18T10:37:48-03:00',
                    location_name: 'Córdoba',
                    location_id: 'cordoba',
                    temp_min: 19,
                    temp_max: 24,
                    current_temp: 17.2,
                    weather: {
                        description: 'Cubierto con tormenta débil',
                        id: 'storm-cloudy'
                    }
                }
            ];

            const children = [
                {
                    _id: '/clima/buenos-aires',
                    _website: 'la-nacion-ar',
                    name: 'Buenos Aires',
                    inactive: false,
                    node_type: 'section',
                    children: []
                },
                {
                    _id: '/clima/catamarca',
                    name: 'Catamarca',
                    _website: 'la-nacion-ar',
                    inactive: false,
                    node_type: 'section',
                    order: [Object],
                    children: []
                },
                {
                    _id: '/clima/cordoba',
                    _website: 'la-nacion-ar',
                    name: 'Córdoba',
                    inactive: false,
                    node_type: 'section',
                    children: []
                }
            ];
            const result = transformWeatherHome(data, children, '');
            expect(result).toStrictEqual(expectTransformWeatherHome);
        });
    });
});
