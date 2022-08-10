import React from 'react';
import Context from 'fusion:context';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherList from '../../../../../components/features/LN-services/weatherList/default';
import weatherHome from '../../../../../__mocks__/data/weather/weatherHome.json';
import weatherMendoza from '../../../../../__mocks__/data/weather/mendozaProvince.json';

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

jest.mock(
    '../../../../../components/private/common/staticValidation',
    () => 'mock-static-validation'
);

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};
        return props.children(mockAvailableProps);
    },
    useAppContext: jest.fn(() => ({}))
}));

describe('Components- Features - WeatherList - default.jsx - test', () => {
    describe('WeatherList with home data', () => {
        it('Should render all the provinces in the right order', () => {
            Context.useAppContext = jest.fn(() => ({
                globalContent: {
                    dataService: weatherHome
                }
            }));
            const { container } = render(<WeatherList />);
            const cards = container.getElementsByTagName('h2');

            expect(container).toMatchSnapshot();
            expect(cards.length).toBe(23);
            Object.values(cards).forEach((title, i) => {
                const text = title.innerHTML;
                expect(text).toBe(provinceOrder[i]);
            });
        });
    });

    describe('WeatherList with province w/ cities', () => {
        it('Should render the cities in alphabetical order', () => {
            Context.useAppContext = jest.fn(() => ({
                globalContent: {
                    dataService: weatherMendoza
                }
            }));

            const { container, debug } = render(<WeatherList />);
            debug();
            const cards = container.getElementsByTagName('h2');

            expect(container).toMatchSnapshot();
            expect(cards.length).toBe(3);
            Object.values(cards).forEach((title, i) => {
                const text = title.innerHTML;
                expect(text).toBe(mendozaCitiesOrder[i]);
            });
        });
    });
});

const provinceOrder = {
    0: 'Ciudad de Buenos Aires',
    1: 'San Fernando del Valle de Catamarca',
    2: 'Resistencia',
    3: 'Rawson',
    4: 'Córdoba',
    5: 'Corrientes',
    6: 'Paraná',
    7: 'Formosa',
    8: 'San Salvador de Jujuy',
    9: 'Santa Rosa',
    10: 'La Rioja',
    11: 'Mendoza',
    12: 'Posadas',
    13: 'Neuquén',
    14: 'Viedma',
    15: 'Salta',
    16: 'San Juan',
    17: 'San Luis',
    18: 'Río Gallegos',
    19: 'Santa Fe',
    20: 'Santiago del Estero',
    21: 'Ushuaia',
    22: 'San Miguel de Tucumán'
};

const mendozaCitiesOrder = {
    0: 'Malargüe',
    1: 'Mendoza',
    2: 'San Rafael'
};
