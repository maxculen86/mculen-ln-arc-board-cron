import React from 'react';
import Consumer from 'fusion:consumer';
import CurrencyData from '../../../../components/private/common/currencyData/CurrencyData';
import { render } from 'enzyme';

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
jest.mock('../../../../components/private/common/text', () => 'mock-Text');

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

describe('Common private currencyData - with dbna', () => {
    const wrapper = render(<CurrencyData {...props} />);
    const result = wrapper.first();
    const children = result.children();
    const linkComponent = children[0];
    const paragraph = children[1];
    const textComponent = linkComponent.children[0];
    it('Check com-link component', () => {
        console.log(wrapper.html());
        expect(linkComponent).toBeTruthy();
        expect(linkComponent.attribs.link).toBe(
            'https://www.lanacion.com.ar/dolar-hoy/'
        );
        expect(linkComponent.attribs.classcondition).toBe(
            'link-container-currency-data'
        );
        expect(linkComponent.attribs.title).toBe('Dólar hoy');
    });
    it('Check text component', () => {
        expect(textComponent).toBeTruthy;
        expect(textComponent.name).toBe('mock-text');
        expect(textComponent.attribs.size).toBe('--fourxs');
        expect(textComponent.attribs.text).toBe('Dólar hoy');
        expect(textComponent.attribs.extraclass).toBe('dolar-title');
    });
    it('Check paragraph', () => {
        expect(paragraph.children.length).toBe(4);
        expect(paragraph.children[1].children[0].data).toBe('$104,25');
    });
    it('CurrencyData snapshot', () => {
        expect(result).toMatchSnapshot();
    });
});

describe('Currency data - with dblue', () => {
    props.sourceName = 'dblue';
    props.link = 'https://www.lanacion.com.ar/tema/dolar-blue-tid67294/';
    props.title = 'Dólar blue';
    const wrapper = render(<CurrencyData {...props} />);
    const result = wrapper.first();
    const children = result.children();
    const linkComponent = children[0];
    it('Should return dblue link and text', () => {
        expect(linkComponent).toBeTruthy();
        expect(linkComponent.attribs.link).toBe(
            'https://www.lanacion.com.ar/tema/dolar-blue-tid67294/'
        );
        expect(linkComponent.attribs.classcondition).toBe(
            'link-container-currency-data'
        );
        expect(linkComponent.attribs.title).toBe('Dólar blue');
    });
});
