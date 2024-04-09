import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PreHeader from '../../../../../components/features/LN-common/preHeader/default';
import {
    setWeatherData,
    getTopicsFromCustomFields
} from '../../../../../components/features/LN-common/preHeader/_helper';
import {
    setEventsTopics,
    setEventsWeather
} from '../../../../../components/private/common/utils/eventsHelper';
import preHeaderEventLogResult from '../../../../../__mocks__/data/preHeader/preHeaderEventLogResult.json';
import IconSprite from '../../../../../components/features/private-global/common/iconSprite/IconSprite';
import useSiteServices from '../../../../../components/features/LN-10-global/hooks/useSiteServices';
import siteServicesMock from '../../../../../__mocks__/data/siteServices/siteServices.json';

jest.mock(
    '../../../../../components/features/LN-10-global/hooks/useSiteServices',
    () => jest.fn()
);

jest.mock('fusion:context', () => ({
    useAppContext: () => {
        return { contextPath: 'pf', deployment: () => {} };
    }
}));

jest.mock(
    '../../../../../components/features/LN-common/preHeader/_helper',
    () => ({
        setWeatherData: jest.fn(),
        setTopicsCustomFields: jest.fn(),
        getTopicsFromCustomFields: jest.fn()
    })
);

useSiteServices.mockImplementation(() => {
    return siteServicesMock;
});

describe('Components - Features - LN-Common - PreHeader', () => {
    global.window.dataLayer = [];

    const mock = {
        weather: {
            icon: <IconSprite name="sun" critical />,
            temperature: '24.5',
            place: 'Capital Federal',
            dataEvent: 'e_linkclick',
            dataSection: 'MenuLN',
            link: '/clima'
        },
        topics: [
            {
                title: 'First topic',
                link: '/first-topic',
                dataEvent: 'e_linkclick',
                dataSection: 'MenuLN'
            },
            {
                title: 'Second topic',
                link: '/second-topic',
                dataEvent: 'e_linkclick',
                dataSection: 'MenuLN'
            },
            {
                title: 'Third topic',
                link: '/third-topic',
                dataEvent: 'e_linkclick',
                dataSection: 'MenuLN'
            }
        ]
    };

    test('should renders weather data', () => {
        setWeatherData.mockImplementation(() => mock.weather);
        getTopicsFromCustomFields.mockImplementation(() => []);

        const { container, getByText } = render(<PreHeader />);

        const weatherLink = container.querySelector('.ln-link');
        const weatherIcon = container.querySelector('.icon');
        const weatherPlace = container.querySelector('.place');

        expect(weatherLink.getAttribute('href')).toEqual(mock.weather.link);
        expect(weatherIcon).toBeInTheDocument();
        expect(weatherPlace.textContent).toEqual(mock.weather.place);
        expect(getByText(mock.weather.temperature)).toBeInTheDocument();
    });

    test('should renders topics data', () => {
        setWeatherData.mockImplementation(() => mock.weather);
        getTopicsFromCustomFields.mockImplementation(() => mock.topics);

        const { container, getByText } = render(<PreHeader />);

        mock.topics.forEach(topic => {
            const topicAnchor = getByText(topic.title);

            expect(topicAnchor).toBeInTheDocument();
            expect(topicAnchor.getAttribute('href')).toEqual(topic.link);
        });
    });

    test('should match snapshot of PreHeader', () => {
        setWeatherData.mockImplementation(() => mock.weather);
        getTopicsFromCustomFields.mockImplementation(() => mock.topics);

        const { container } = render(<PreHeader />);
        const preHeader = container.querySelector('.ln-pre-header');

        expect(preHeader).toMatchSnapshot();
    });

    test('should register in dataLayer the click events of each link', () => {
        setWeatherData.mockImplementation(() => mock.weather);
        getTopicsFromCustomFields.mockImplementation(() => mock.topics);

        render(<PreHeader />);
        setEventsWeather();
        setEventsTopics();
        const links = screen.getAllByRole('link');
        links.forEach(link => link.click());
        expect(window.dataLayer).toEqual(preHeaderEventLogResult);
    });
});
