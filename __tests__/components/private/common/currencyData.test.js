import React from 'react';
import CurrencyData from '../../../../components/private/common/currencyData/CurrencyData';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock(
    '../../../../components/private/common/com-link',
    () => 'mock-com-link'
);

jest.mock(
    '../../../../components/private/common/com-image',
    () => 'mock-com-image'
);
jest.mock('../../../../components/private/common/text', () => 'mock-text');

describe('Common private currencyData - with dbna', () => {
    const props = {
        outputType: 'default',
        contextPath: '/pf',
        title: 'Dólar hoy',
        link: 'https://www.lanacion.com.ar/dolar-hoy/',
        purchaseValue: '104,25',
        saleValue: '110,25',
        sourceName: 'dbna',
        informationAlt: 'BYMA',
        providedAlt: 'InvertirOnline'
    };
    it('Check com-link component', () => {
        const { container } = render(<CurrencyData {...props} />);

        const linkComponent = container.querySelector('mock-com-link');

        expect(linkComponent).toBeTruthy();
        expect(linkComponent.getAttribute('link')).toBe(props.link);
        expect(linkComponent.getAttribute('title')).toBe(props.title);
    });
    it('Check text component', () => {
        const { container } = render(<CurrencyData {...props} />);

        const textComponent = container.querySelector('mock-text');

        expect(textComponent).toBeTruthy;
        expect(textComponent.getAttribute('size')).toBe('--fourxs');
        expect(textComponent.getAttribute('text')).toBe('Dólar hoy');
        expect(textComponent.getAttribute('extraclass')).toBe('dolar-title');
    });
    it('Check paragraph', () => {
        render(<CurrencyData {...props} />);

        expect(screen.getByText(`$${props.purchaseValue}`));
        expect(screen.getByText(`$${props.saleValue}`));
    });
    it('CurrencyData snapshot', () => {
        const { container } = render(<CurrencyData {...props} />);

        expect(container).toMatchSnapshot();
    });
});

describe('Currency data - with dblue', () => {
    const properties = {
        sourceName: 'dblue',
        link: 'https://www.lanacion.com.ar/tema/dolar-blue-tid67294/',
        title: 'Dólar blue'
    };
    it('Should return dblue link and text', () => {
        const { container } = render(<CurrencyData {...properties} />);

        const linkComponent = container.querySelector('mock-com-link');

        expect(linkComponent).toBeTruthy();
        expect(linkComponent.getAttribute('link')).toBe(properties.link);
        expect(linkComponent.getAttribute('title')).toBe(properties.title);
        expect(linkComponent.getAttribute('classCondition')).toBe(
            'link-container-currency-data'
        );
    });
});
