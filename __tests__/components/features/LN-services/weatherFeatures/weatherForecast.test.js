import React from 'react';
import Context from 'fusion:context';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherForecast from '../../../../../components/features/LN-services/weatherForecast/default';
import mendozaCiudad from '../../../../../__mocks__/data/weather/mendozaCiudad.json';

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

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};
        return props.children(mockAvailableProps);
    },
    useAppContext: jest.fn(() => ({}))
}));

Context.useAppContext = jest.fn(() => ({
    globalContent: {
        dataService: {
            forecast: mendozaCiudad,
            updateTime: '11:39'
        },
        name: 'Mendoza'
    }
}));

describe('Components- Features - WeatherForecast - default.jsx - test', () => {
    const { container } = render(<WeatherForecast id="QWERTYUIOP" />);
    const weekForecast = container.getElementsByClassName('extend-forecast');
    const forecastTitles = container.getElementsByTagName('strong');

    it('Should render the extended weather of mendoza', () => {
        expect(container).toMatchSnapshot();
        expect(weekForecast.length).toBe(7);
        expect(forecastTitles.length).toBe(7);
        Object.values(forecastTitles).forEach((title, i) => {
            expect(title.innerHTML).toBe(expectedTitles[i]);
        });
    });
});

const expectedTitles = {
    0: ' Mendoza hoy',
    1: ' Mendoza mañana',
    2: ' Mendoza el sábado',
    3: ' Mendoza el domingo',
    4: ' Mendoza el lunes',
    5: ' Mendoza el martes',
    6: ' Mendoza el miércoles'
};
