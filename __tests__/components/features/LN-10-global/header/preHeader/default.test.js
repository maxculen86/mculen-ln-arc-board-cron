import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import PreHeaderLN from '../../../../../../components/features/LN-10-global/header/preHeader/default';
import { setWeatherData } from '../../../../../../components/features/LN-10-global/header/preHeader/__helper';
import { EventsHelper } from '../../../../../../src/statics/common/js/eventsHelper';
import preHeaderEventLogResult from '../../../../../../__mocks__/data/preHeader/preHeaderEventLogResult.json';
import IconSprite from '../../../../../../components/features/private-global/common/iconSprite/IconSprite';
import preHeader from '../../../../../../components/features/LN-10-global/header/preHeader/preHeader.json';
import useTermica from '../../../../../../components/private/common/hooks/useTermica';
import { useContent } from 'fusion:content';

jest.mock('fusion:context', () => ({
    useAppContext: () => {
        return { contextPath: 'pf', deployment: () => {} };
    }
}));

jest.mock(
    '../../../../../../components/features/LN-10-global/header/preHeader/__helper',
    () => ({
        setWeatherData: jest.fn()
    })
);

jest.mock('../../../../../../components/private/common/hooks/useTermica');

describe('Components - Features - LN-10-global - header - preHeader - default', () => {
    global.window.dataLayer = [];
    afterAll(() => {
        jest.clearAllMocks();
    });

    const mock = {
        weather: {
            icon: <IconSprite name="sun" critical />,
            temperature: '24.5',
            place: 'Capital Federal',
            dataEvent: 'e_linkclick',
            dataSection: 'MenuLN',
            link: '/clima'
        },
        brands: [
            {
                title: 'CLUB LN',
                link: 'https://club.lanacion.com.ar/',
                dataEvent: 'e_linkclick',
                dataSection: 'MenuLN',
                icon: 'clubLnDefault'
            },
            {
                title: 'LN+ EN VIVO',
                link: 'https://lnmas.lanacion.com.ar/',
                dataEvent: 'e_linkclick',
                dataSection: 'MenuLN',
                icon: 'lnMas'
            },
            {
                title: 'FOODIT',
                link: 'https://foodit.lanacion.com.ar/',
                dataEvent: 'e_linkclick',
                dataSection: 'MenuLN',
                icon: 'foodit'
            },
            {
                title: 'CANCHALLENA',
                link: 'https://canchallena.lanacion.com.ar/',
                dataEvent: 'e_linkclick',
                dataSection: 'MenuLN',
                icon: 'canchallena'
            },
            {
                title: 'BONVIVIR',
                link: 'https://bonvivir.com/',
                dataEvent: 'e_linkclick',
                dataSection: 'MenuLN',
                icon: 'bonvivir'
            },
            {
                title: 'LN 104.9 + Música',
                link: 'https://masmusica.lanacion.com.ar/',
                dataEvent: 'e_linkclick',
                dataSection: 'MenuLN',
                icon: 'lnRadio'
            }
        ]
    };

    test('should render weather data', () => {
        setWeatherData.mockImplementation(() => mock.weather);

        const { container, getByText } = render(<PreHeaderLN />);

        const weatherLink = container.querySelector('.ln-link');
        const weatherIcon = container.querySelector('.icon');
        const weatherPlace = container.querySelector('.place');

        expect(weatherLink.getAttribute('href')).toEqual(mock.weather.link);
        expect(weatherIcon).toBeInTheDocument();
        expect(weatherPlace.textContent).toEqual(mock.weather.place);
        expect(getByText(mock.weather.temperature)).toBeInTheDocument();
    });

    test('If termica is off shouldnt call source and render preHeader without weather', () => {
        useTermica.mockReturnValue(false);
        setWeatherData.mockImplementation(() => {});

        const { container } = render(<PreHeaderLN />);

        const ulElement = screen.getByRole('list');
        const liElements = ulElement.querySelectorAll('li');
        const climaLink = screen.queryByRole('link', { name: /clima/i });

        expect(container).toMatchSnapshot();
        expect(useContent).toHaveBeenCalledWith(
            expect.objectContaining({
                source: null
            })
        );
        expect(liElements.length).toBe(6);
        expect(climaLink).not.toBeInTheDocument();
    });

    test('should render preHeader without when temperature is empty', () => {
        useTermica.mockReturnValue(false);
        setWeatherData.mockImplementation(() => ({
            ...mock.weather,
            temperature: ''
        }));

        const { container } = render(<PreHeaderLN />);

        const ulElement = screen.getByRole('list');
        const liElements = ulElement.querySelectorAll('li');
        const climaLink = screen.queryByRole('link', { name: /clima/i });

        expect(container).toMatchSnapshot();
        expect(useContent).toHaveBeenCalledWith(
            expect.objectContaining({
                source: null
            })
        );
        expect(liElements.length).toBe(6);
        expect(climaLink).not.toBeInTheDocument();
    });

    test('should render brands data', () => {
        setWeatherData.mockImplementation(() => mock.weather);
        const { getByText } = render(<PreHeaderLN />);

        preHeader.forEach(brand => {
            const brandAnchor = getByText(brand.title);

            expect(brandAnchor).toBeInTheDocument();
            expect(brandAnchor.getAttribute('href')).toEqual(brand.link);
        });
    });

    test('should match snapshot of PreHeader', () => {
        setWeatherData.mockImplementation(() => mock.weather);

        const { container } = render(<PreHeaderLN />);
        const preHeader = container.querySelector('.ln-pre-header');

        expect(preHeader).toMatchSnapshot();
    });

    test('should register in dataLayer the click events of each link', async () => {
        setWeatherData.mockImplementation(() => mock.weather);

        let eventsHelper = new EventsHelper();

        render(<PreHeaderLN />);
        eventsHelper.setEventsWeather();
        eventsHelper.setEventsBrands();
        const links = screen.getAllByRole('link');
        links.forEach(link => link.click());
        await waitFor(() => {
            expect(window.dataLayer).toEqual(preHeaderEventLogResult);
        });
    });
});
