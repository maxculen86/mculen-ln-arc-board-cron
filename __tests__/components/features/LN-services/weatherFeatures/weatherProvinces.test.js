import React from 'react';
import fusionContent from 'fusion:content';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import mockWeatherHomeChildrens from '../../../../../__mocks__/data/weather/homeChildren.json';
import WeatherProvinces from '../../../../../components/features/LN-services/weatherProvinces/default';

jest.mock('fusion:consumer', component => {
    return function(component) {
        return class extends component {
            constructor(props) {
                super(props);
                this.props = props;
            }
            fetchContent(param) {}
        };
    };
});

jest.mock('fusion:content', () => () => ({
    default: props => {
        const mockAvailableProps = {};
        return props.children(mockAvailableProps);
    },
    useContent: jest.fn(() => ({}))
}));

describe('WeatherProvince with home data', () => {
    it('Should not render in home weather', () => {
        delete global.window.location;
        global.window = Object.create(window);
        global.window.location = {
            port: '123',
            protocol: 'http:',
            hostname: 'localhost',
            url: 'www.lanacion.com.ar',
            pathname: '/clima/'
        };
        fusionContent.useContent = jest.fn(() => ({
            children: mockWeatherHomeChildrens
        }));
        const { container } = render(<WeatherProvinces />);

        expect(container).toMatchSnapshot();
    });
    it('Should render in mendoza weather', () => {
        delete global.window.location;
        global.window = Object.create(window);
        global.window.location = {
            port: '123',
            protocol: 'http:',
            hostname: 'localhost',
            url: 'www.lanacion.com.ar',
            pathname: '/clima/mendoza'
        };
        fusionContent.useContent = jest.fn(() => ({
            children: mockWeatherHomeChildrens
        }));
        const { container } = render(<WeatherProvinces />);

        expect(container).toMatchSnapshot();
    });
});
