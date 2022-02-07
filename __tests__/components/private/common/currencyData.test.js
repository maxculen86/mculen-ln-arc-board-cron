import React from 'react';
import Consumer from 'fusion:consumer';
import { shallow, render, mount } from 'enzyme';
import CurrencyData from '../../../../components/private/common/currencyData/CurrencyData';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('private - common - currencyData', () => {
    let props = {
        outputType: 'default',
        siteProperties: {},
        contextPath: '/pf',
        deployment: () => '$LATEST',
        sourceName: 'dbna',
        title: 'Dólar hoy',
        purchaseValue: '104,75',
        saleValue: '110,75'
    };
    describe('Currency data render with dbna props', () => {
        const component = render(<CurrencyData {...props} />);

        it('Should return dbna data', () => {
            expect(component).toBeDefined();
            expect(component.html()).toContain('dolar-hoy');
            expect(component.find('a.com-link')).toBeTruthy();
            expect(component.find('h2.dolar-title')).toBeTruthy();
            expect(component).toMatchSnapshot();
        });
    });
    describe('Currency data render with dblue props', () => {
        props.sourceName = 'dblue';
        const component = render(<CurrencyData {...props} />);

        it('Should return dblue data', () => {
            expect(component).toBeDefined();
            expect(component.html()).toContain('dolar-blue');
            expect(component.find('a.com-link')).toBeTruthy();
            expect(component.find('h2.dolar-title')).toBeTruthy();
            expect(component).toMatchSnapshot();
        });
    });
    describe('Currency data render with info props', () => {
        const propsTwo = {
            outputType: 'default',
            siteProperties: {},
            contextPath: '/pf',
            deployment: () => '$LATEST',
            urlBrand: 'http://www.mock.com/image.jpeg'
        };
        const component = render(<CurrencyData {...propsTwo} />);

        it('Should return information data', () => {
            expect(component).toBeDefined();
            expect(component.html()).not.toContain('dolar-blue');

            expect(component.find('a.provider-data')).toBeTruthy();
            expect(component).toContain('https://www.invertironline.com/');

            expect(component).toMatchSnapshot();
        });
    });
});
