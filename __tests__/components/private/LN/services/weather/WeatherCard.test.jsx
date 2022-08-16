import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherCard from '../../../../../../components/private/LN/services/weather/WeatherCard';

describe('Components - private - services - weather - WeatherCard =>', () => {
    const data = {
        locationName: 'mendoza',
        weather: { id: 'sun', description: 'sun' },
        currentTemp: 29,
        minTemp: 25,
        maxTemp: 25,
        link: 'www.com'
    };

    it('Test when have correct data', () => {
        const { container } = render(<WeatherCard data={data} />);
        // expect(container.innerHTML).toBe(true);
    });

    it('Test when dont have data', () => {
        const { container } = render(<WeatherCard />);
        expect(container.innerHTML).toBe('');
    });
});
