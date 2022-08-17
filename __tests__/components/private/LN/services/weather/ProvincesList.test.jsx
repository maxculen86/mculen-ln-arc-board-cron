import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Context from 'fusion:context';
import ProvincesList from '../../../../../../components/private/LN/services/weather/ProvincesList';
import weatherHome from '../../../../../../__mocks__/data/weather/weatherHome.json';

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
    '../../../../../../components/private/common/staticValidation',
    () => 'mock-static-validation'
);

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};
        return props.children(mockAvailableProps);
    },
    useAppContext: jest.fn(() => ({}))
}));

describe('Components - private - services - weather - ProvincesList =>', () => {
    it('Test provinces list when provinces data is correct and have id', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                dataService: weatherHome
            }
        }));
        const modHeaderSectionClass = 'mod-headersection  --line';
        const expectedClass = 'province-list';
        const provinces = [
            {
                _id: 1,
                name: 'mendoza'
            },
            {
                _id: 2,
                name: 'mendoza'
            },
            {
                _id: 3,
                name: 'mendoza'
            },
            {
                _id: 4,
                name: 'mendoza'
            }
        ];
        const { container } = render(<ProvincesList provinces={provinces} />);
        expect(container).toMatchSnapshot();
        expect(
            container.getElementsByClassName(modHeaderSectionClass).length
        ).toBe(1);
        expect(
            container.innerHTML.includes(
                '<h3 class="com-title --l">Provincias</h3>'
            )
        ).toBe(true);
        expect(container.innerHTML.includes('<a href=')).toBe(true);
        expect(container.getElementsByClassName(expectedClass).length).toBe(1);
        expect(container.getElementsByClassName('com-link').length).toBe(4);
        expect(
            container.getElementsByClassName('com-text --font-bold --md').length
        ).toBe(4);
    });

    it('Test when id props is invalid ', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                dataService: weatherHome
            }
        }));
        const modHeaderSectionClass = 'mod-headersection  --line';
        const expectedClass = 'province-list';
        const provinces = [
            {
                id: 1,
                name: 'mendoza'
            },
            {
                id: 2,
                name: 'mendoza'
            },
            {
                id: 3,
                name: 'mendoza'
            },
            {
                id: 4,
                name: 'mendoza'
            }
        ];
        const { container } = render(<ProvincesList provinces={provinces} />);
        expect(container).toMatchSnapshot();
        expect(
            container.getElementsByClassName(modHeaderSectionClass).length
        ).toBe(1);
        expect(
            container.innerHTML.includes(
                '<h3 class="com-title --l">Provincias</h3>'
            )
        ).toBe(true);
        expect(container.innerHTML.includes('<a href=')).toBe(false);
        expect(container.innerHTML.includes('<span class="com-text">')).toBe(
            true
        );
        expect(container.getElementsByClassName(expectedClass).length).toBe(1);
        expect(container.getElementsByClassName('com-link').length).toBe(0);
        expect(
            container.getElementsByClassName('com-text --font-bold --md').length
        ).toBe(4);
    });
    it('Test when dont have data', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                dataService: weatherHome
            }
        }));
        const provinces = [];
        const { container } = render(<ProvincesList provinces={provinces} />);
        expect(container).toMatchSnapshot();
        expect(container.innerHTML).toBe('');
    });
});
