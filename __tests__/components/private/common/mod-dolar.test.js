import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModDolar from '../../../../components/private/common/mod-dolar';
import API_RESPONSE from '../../../../__mocks__/data/apiDolar/apiDolar';

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar'
}));

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock(
    '../../../../components/private/common/currencyData/CurrencyData',
    () => 'mock-currencyData'
);

// describe('Private - Common - ModDolar =>', () => {
//     it('with empty data list ', () => {
//         const { container } = render(<ModDolar />);
//         expect(container).toBeEmptyDOMElement();
//     });
// });

describe('with data list', () => {
    it('should render div tag with "mod-dolar" className with 7 li tags', () => {
        const { container } = render(<ModDolar {...API_RESPONSE} />);
        const ul = container.getElementsByTagName('ul');
        const li = container.getElementsByTagName('li');
        const currencyData = container.getElementsByTagName(
            'mock-currencyData'
        );
        expect(li).toHaveLength(7);
        expect(ul[0]).toBeVisible();
        expect(currencyData).toHaveLength(7);
        // expect(screen.getByTitle('Dólar Contado con Liqui')).toBeVisible();
        expect(screen.getByTitle('Dólar blue')).toBeVisible();
        expect(screen.getByTitle('Dólar CCL')).toBeVisible();
        expect(container).toMatchSnapshot();
    });
});
