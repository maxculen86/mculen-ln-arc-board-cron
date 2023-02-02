import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import PreHeader from '../../../../../components/features/LN-common/preHeader/default';
import {
    setWeatherData,
    getTopicsFromCustomFields
} from '../../../../../components/features/LN-common/preHeader/_helper';

jest.mock(
    '../../../../../components/features/LN-common/preHeader/_helper',
    () => ({
        setWeatherData: jest.fn(),
        setTopicsCustomFields: jest.fn(),
        getTopicsFromCustomFields: jest.fn()
    })
);

describe('Components - Features - LN-Common - PreHeader', () => {
    const mock = {
        weather: {
            icon: 'sun',
            temperature: '24.5',
            place: 'Capital Federal',
            dataEvent: 'e_linkclick',
            dataSection: 'MenuLN',
            link: '/clima',
            callback: jest.fn()
        },
        topics: [
            {
                title: 'First topic',
                link: '/first-topic',
                dataEvent: 'e_linkclick',
                dataSection: 'MenuLN',
                callback: jest.fn()
            },
            {
                title: 'Second topic',
                link: '/second-topic',
                dataEvent: 'e_linkclick',
                dataSection: 'MenuLN',
                callback: jest.fn()
            },
            {
                title: 'Third topic',
                link: '/third-topic',
                dataEvent: 'e_linkclick',
                dataSection: 'MenuLN',
                callback: jest.fn()
            }
        ]
    };

    test('should renders weather data', () => {
        setWeatherData.mockImplementation(() => mock.weather);
        getTopicsFromCustomFields.mockImplementation(() => []);

        const { container, getByText } = render(<PreHeader />);

        const weatherLink = container.querySelector('.ln-link');
        const weatherIcon = container.querySelector('.ln-icon');
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

    test('should executes callbacks when some elements are clicked', () => {
        setWeatherData.mockImplementation(() => mock.weather);
        getTopicsFromCustomFields.mockImplementation(() => mock.topics);

        const { container, getByText } = render(<PreHeader />);
        const weatherLink = container.querySelector('.ln-link');

        fireEvent.click(weatherLink);
        expect(mock.weather.callback).toHaveBeenCalledTimes(1);

        mock.topics.forEach(topic => {
            const topicAnchor = getByText(topic.title);

            fireEvent.click(topicAnchor);
            expect(topic.callback).toHaveBeenCalledTimes(1);
        });
    });
});
