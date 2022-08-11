import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ForecastCard from '../../../../../../components/private/LN/services/weather/ForecastCard';

describe('Components - private - services - weather - ForecastCard =>', () => {
    const title = 'Mañana';

    it('Test when data is complete ', () => {
        const data = {
            humidity: 80,
            rain_prob: 80,
            temperature: 8,
            weather: {
                description: 'sun',
                id: 'sun'
            },
            wind: {
                direction: 'NO',
                speed: 30
            }
        };
        const { container } = render(
            <ForecastCard data={data} title={title} />
        );

        expect(container).toMatchSnapshot();
        expect(
            container.innerHTML.includes(
                '<h2 class="com-text --font-bold">Mañana</h2>'
            )
        ).toBe(true);
        expect(
            container.innerHTML.includes(
                '<p class="com-text --font-bold --xl">'
            )
        ).toBe(true);
        expect(
            container.innerHTML.includes(
                '<span class="description --font-light --fivexs">sun</span>'
            )
        ).toBe(true);
        expect(container.getElementsByClassName('forecast-card').length).toBe(
            1
        );
        expect(container.getElementsByClassName('icon-content').length).toBe(1);
        expect(container.getElementsByClassName('box-icon-text').length).toBe(
            3
        );
    });

    it('Test when data comes without humidity - rainProb - teperature ', () => {
        const title = 'Mañana';
        const data = {
            humidity: 0,
            rain_prob: 0,
            temperature: 0,
            weather: {
                description: 'sun',
                id: 'sun'
            },
            wind: {
                direction: 'NO',
                speed: 30
            }
        };
        const { container } = render(
            <ForecastCard data={data} title={title} />
        );
        expect(container).toMatchSnapshot();
        expect(
            container.innerHTML.includes(
                '<h2 class="com-text --font-bold">Mañana</h2>'
            )
        ).toBe(true);
        expect(
            container.innerHTML.includes(
                '<p class="com-text --font-bold --xl">'
            )
        ).toBe(true);
        expect(
            container.innerHTML.includes(
                '<span class="description --font-light --fivexs">sun</span>'
            )
        ).toBe(true);
        expect(container.getElementsByClassName('forecast-card').length).toBe(
            1
        );
        expect(container.getElementsByClassName('icon-content').length).toBe(1);
        expect(container.getElementsByClassName('box-icon-text').length).toBe(
            3
        );
    });

    it('Test when dont have data', () => {
        const { container } = render(<ForecastCard />);
        expect(container.innerHTML).toBe('');
    });
});
