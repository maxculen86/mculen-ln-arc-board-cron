import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherCard from '../../../../../../components/private/LN/services/weather/WeatherCard';

describe('Components - private - services - weather - WeatherCard =>', () => {
    const expectedClass = 'weather-card';
    const classBoxIcon = 'box-icon';

    it('Test when have complete data', () => {
        const data = {
            location_name: 'mendoza',
            weather: { id: 'sun', description: 'sun' },
            current_temp: '29',
            temp_min: '25',
            temp_max: '25',
            link: 'www.com'
        };
        const { container } = render(<WeatherCard data={data} />);
        expect(container).toMatchSnapshot();
        expect(container.getElementsByClassName(expectedClass).length).toBe(1);
        expect(
            container.innerHTML.includes(
                '<a href="www.com" title="Ver clima en mendoza" class="com-link"><h2 class="com-text --font-bold --2xs">mendoza</h2></a>'
            )
        ).toBe(true);
        expect(
            container.innerHTML.includes(
                '<p class="description --font-light --fivexs">sun</p>'
            )
        ).toBe(true);
        expect(container.getElementsByClassName(classBoxIcon).length).toBe(1);
        expect(
            container.innerHTML.includes(
                '<p class="com-text --font-bold --twoxl">29<span class="com-text --m">ºc</span></p>'
            )
        ).toBe(true);
        expect(container.getElementsByClassName('com-text --5xs').length).toBe(
            2
        );
        expect(
            container.getElementsByClassName('com-text --font-bold --4xs')
                .length
        ).toBe(2);
        expect(container.innerHTML.includes('25º')).toBe(true);
        expect(container.innerHTML.includes('>-<')).toBe(false);
        expect(
            container.innerHTML.includes(
                '<a href="www.com" title="Ver clima en mendoza" class="com-link">Ver clima en mendoza</a>'
            )
        ).toBe(true);
    });

    it('Test when dont have min or max temperature ', () => {
        const data = {
            location_name: 'mendoza',
            weather: { id: 'sun', description: 'sun' },
            current_temp: '29',
            temp_min: '25',
            temp_max: '',
            link: 'www.com'
        };
        const { container } = render(<WeatherCard data={data} />);
        expect(container).toMatchSnapshot();
        expect(container.getElementsByClassName(expectedClass).length).toBe(1);
        expect(
            container.innerHTML.includes(
                '<a href="www.com" title="Ver clima en mendoza" class="com-link"><h2 class="com-text --font-bold --2xs">mendoza</h2></a>'
            )
        ).toBe(true);
        expect(
            container.innerHTML.includes(
                '<p class="description --font-light --fivexs">sun</p>'
            )
        ).toBe(true);
        expect(container.getElementsByClassName(classBoxIcon).length).toBe(1);
        expect(
            container.innerHTML.includes(
                '<p class="com-text --font-bold --twoxl">29<span class="com-text --m">ºc</span></p>'
            )
        ).toBe(true);
        expect(container.getElementsByClassName('com-text --5xs').length).toBe(
            2
        );
        expect(
            container.getElementsByClassName('com-text --font-bold --4xs')
                .length
        ).toBe(2);
        expect(container.innerHTML.includes('25º')).toBe(true);
        expect(container.innerHTML.includes('>-<')).toBe(true);
        expect(
            container.innerHTML.includes(
                '<a href="www.com" title="Ver clima en mendoza" class="com-link">Ver clima en mendoza</a>'
            )
        ).toBe(true);
    });

    it('Test when dont have min and max temperature and dont have link', () => {
        const data = {
            location_name: 'mendoza',
            weather: { id: 'sun', description: 'sun' },
            current_temp: '29',
            temp_min: '',
            temp_max: '',
            link: ''
        };
        const { container } = render(<WeatherCard data={data} />);
        expect(container).toMatchSnapshot();
        expect(container.getElementsByClassName(expectedClass).length).toBe(1);
        expect(
            container.innerHTML.includes(
                '<span class="com-text"><h2 class="com-text --font-bold --2xs">mendoza</h2></span>'
            )
        ).toBe(true);
        expect(
            container.innerHTML.includes(
                '<p class="description --font-light --fivexs">sun</p>'
            )
        ).toBe(true);
        expect(container.getElementsByClassName(classBoxIcon).length).toBe(1);
        expect(
            container.innerHTML.includes(
                '<p class="com-text --font-bold --twoxl">29<span class="com-text --m">ºc</span></p>'
            )
        ).toBe(true);
        expect(container.getElementsByClassName('com-text --5xs').length).toBe(
            2
        );
        expect(
            container.getElementsByClassName('com-text --font-bold --4xs')
                .length
        ).toBe(2);
        expect(container.innerHTML.includes('25º')).toBe(false);
        expect(container.innerHTML.includes('>-<')).toBe(true);
        expect(
            container.innerHTML.includes(
                '<a href="www.com" title="Ver clima en mendoza" class="com-link">Ver clima en mendoza</a>'
            )
        ).toBe(false);
    });

    it('Test when dont have Icon name', () => {
        const data = {
            location_name: 'mendoza',
            weather: { id: '', description: '' },
            current_temp: '25',
            temp_min: '18',
            temp_max: '18',
            link: 'www.www'
        };
        const { container } = render(<WeatherCard data={data} />);
        expect(container).toMatchSnapshot();
        expect(container.getElementsByClassName(classBoxIcon).length).toBe(1);
        expect(container.innerHTML.includes('<i class="com-icon')).toBe(false);
        expect(
            container.innerHTML.includes(
                '<p class="com-text --font-bold --twoxl">25<span class="com-text --m">ºc</span></p>'
            )
        ).toBe(true);
    });

    it('Test when dont have location name', () => {
        const data = {
            location_name: '',
            weather: { id: '', description: '' },
            current_temp: '',
            temp_min: '',
            temp_max: '',
            link: ''
        };
        const { container } = render(<WeatherCard data={data} />);

        expect(container).toMatchSnapshot();
        expect(container.innerHTML).toBe('');
    });
});
