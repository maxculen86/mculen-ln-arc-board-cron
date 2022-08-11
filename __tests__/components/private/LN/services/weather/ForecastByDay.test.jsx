import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ForecastByDay from '../../../../../../components/private/LN/services/weather/ForecastByDay';

describe('Components - private - services - weather - ForecastByDay =>', () => {
    const data = {
        morning: {
            humidity: 80,
            rain_prob: 80,
            temperature: 80,
            weather: {
                description: 'sun',
                id: 'sun'
            },
            wind: {
                direction: 'NO',
                speed: 9
            }
        },
        afternoon: {
            humidity: 80,
            rain_prob: 80,
            temperature: 80,
            weather: {
                description: 'sun',
                id: 'sun'
            },
            wind: {
                direction: 'NO',
                speed: 9
            }
        },
        night: {
            humidity: 80,
            rain_prob: 80,
            temperature: 80,
            weather: {
                description: 'sun',
                id: 'sun'
            },
            wind: {
                direction: 'NO',
                speed: 9
            }
        },
        date: '2022-08-10T16:36:55.426Z'
    };

    it('Test when date is today ', () => {
        const expectedClass = 'extend-forecast';
        const today = 'hoy';
        const section = 'Mendoza';
        const { container } = render(
            <ForecastByDay data={data} index={0} section={section} />
        );

        expect(container).toMatchSnapshot();
        expect(container.getElementsByClassName(expectedClass).length).toBe(1);
        expect(container.innerHTML.includes(today)).toBe(true);
    });

    it('Test when date is tomorrow ', () => {
        const expectedClass = 'extend-forecast';
        const today = 'mañana';
        const section = 'Mendoza';
        const { container } = render(
            <ForecastByDay data={data} index={1} section={section} />
        );
        expect(container).toMatchSnapshot();
        expect(container.getElementsByClassName(expectedClass).length).toBe(1);
        expect(container.innerHTML.includes(today)).toBe(true);
    });

    it('Test forecast by day - morning - afternoon - night ', () => {
        const expectedClassContainer = 'extend-forecast';
        const expectedClassCard = 'forecast-card';
        const section = 'Mendoza';
        const { container } = render(
            <ForecastByDay data={data} index={1} section={section} />
        );
        expect(container).toMatchSnapshot();
        expect(
            container.getElementsByClassName(expectedClassContainer).length
        ).toBe(1);
        expect(
            container.innerHTML.includes(
                '<h2 class="com-text --font-bold">Mañana</h2>'
            )
        ).toBe(true);
        expect(
            container.innerHTML.includes(
                '<h2 class="com-text --font-bold">Tarde</h2>'
            )
        ).toBe(true);
        expect(
            container.innerHTML.includes(
                '<h2 class="com-text --font-bold">Noche</h2>'
            )
        ).toBe(true);
        expect(container.getElementsByClassName(expectedClassCard).length).toBe(
            3
        );
    });

    it('Test when dont have data', () => {
        const { container } = render(<ForecastByDay index={0} />);

        expect(container.innerHTML).toBe('');
    });
});
