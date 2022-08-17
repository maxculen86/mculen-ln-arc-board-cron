import React from 'react';
import fusionContent from 'fusion:content';
import Context from 'fusion:context';
import { render } from '@testing-library/react';
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

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};
        return props.children(mockAvailableProps);
    },
    useAppContext: jest.fn(() => ({}))
}));

describe('WeatherProvince with home data', () => {
    it('Should not render in home weather', () => {
        fusionContent.useContent = jest.fn(() => ({
            children: mockWeatherHomeChildrens
        }));
        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                _id: '/clima',
                dataService: {
                    locations: [],
                    updateTime: '11:39'
                },
                name: 'Clima'
            }
        }));

        const { container } = render(<WeatherProvinces />);

        expect(container).toBeEmptyDOMElement();
        expect(container).toMatchSnapshot();
    });
    it('Should render in mendoza weather', () => {
        fusionContent.useContent = jest.fn(() => ({
            children: mockWeatherHomeChildrens
        }));
        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                _id: '/clima/mendoza',
                dataService: {
                    locations: [],
                    updateTime: '11:39'
                },
                name: 'Mendoza'
            }
        }));

        const { container } = render(<WeatherProvinces />);

        expect(container).not.toBeEmptyDOMElement();
        const provinces = container.getElementsByClassName('province');
        expect(provinces).toHaveLength(23);

        expect(container).toMatchSnapshot();
    });
});
