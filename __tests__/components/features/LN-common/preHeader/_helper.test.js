import {
    getWeatherData,
    setTopicsCustomFields,
    getTopicsFromCustomFields
} from '../../../../../components/features/LN-common/preHeader/_helper';

jest.mock('../../../../../components/private/common/hooks/useTermica', () =>
    jest.fn()
);

describe('Private - Feature - PreHeader - Helper =>', () => {
    const mock = {
        weather: {
            dataService: {
                locations: [
                    {
                        current_temp: 26.9,
                        location_id: 'ciudad-de-buenos-aires',
                        location_name: 'Buenos Aires',
                        weather: {
                            id: 'sun-cloudy'
                        }
                    },
                    {
                        current_temp: 33.2,
                        location_id: 'san-fernando-del-valle-de-catamarca',
                        location_name: 'Catamarca',
                        weather: {
                            id: 'sun-cloudy'
                        }
                    }
                ]
            }
        }
    };

    describe('Helper - getWeatherInfo', () => {
        it('should returns an object with specific data', () => {
            const { weather } = mock;
            const weatherData = getWeatherData(weather);
            const currentLocation = weather.dataService.locations[0];

            expect(Object.keys(weatherData)).toEqual([
                'iconName',
                'temperature',
                'place',
                'dataEvent',
                'dataSection',
                'link',
                'callback'
            ]);
            expect(weatherData.temperature).toEqual(
                currentLocation.current_temp
            );
            expect(weatherData.iconName).toEqual(currentLocation.weather.id);
        });

        it('should returns null when weatherData is undefined', () => {
            const weatherData = getWeatherData();
            expect(weatherData).toBeNull();
        });
    });
});
