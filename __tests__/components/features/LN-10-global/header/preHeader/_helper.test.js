import React from 'react';
import { setWeatherData } from '../../../../../../components/features/LN-10-global/header/preHeader/__helper';
import IconSprite from '../../../../../../components/features/private-global/common/iconSprite/IconSprite';

jest.mock('../../../../../../components/private/common/hooks/useTermica', () =>
    jest.fn()
);

describe('Features - LN-10-global - header - preHeader - Helper =>', () => {
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
        },
        customFields: {
            'title 0': 'First Topic',
            'link 0': 'https://www.lanacion.com.ar/'
        },
        customFieldsMultipleTopics: {
            'title 0': 'First Topic',
            'link 0': 'https://www.lanacion.com.ar/first/',
            'title 1': 'Second Topic',
            'link 1': 'https://www.lanacion.com.ar/second/',
            'title 2': 'Third Topic',
            'link 2': 'https://www.lanacion.com.ar/third/'
        }
    };

    describe('Helper - getWeatherInfo', () => {
        it('should return an object with specific data', () => {
            const { weather } = mock;
            const weatherData = setWeatherData(weather);
            const currentLocation = weather.dataService.locations[0];

            expect(Object.keys(weatherData)).toEqual([
                'icon',
                'temperature',
                'place',
                'dataEvent',
                'dataSection',
                'link'
            ]);
            expect(weatherData.temperature).toEqual(
                `${currentLocation.current_temp}º`
            );
            expect(weatherData.icon).toEqual(
                <IconSprite name="sunCloudy" critical />
            );
        });

        it('should return null when weatherValue is undefined', () => {
            const weatherData = setWeatherData();
            expect(weatherData).toBeNull();
        });
    });
});
