jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock(
    '../../../../components/private/common/currencyData/CurrencyData',
    () => 'mock-currencyData'
);

import React from 'react';
import Consumer from 'fusion:consumer';
import ModDolar from '../../../../components/private/common/mod-dolar';
import CurrencyData from '../../../../components/private/common/currencyData/CurrencyData';
import API_RESPONSE from '../../../../__mocks__/data/apiDolar/apiDolar';
import { shallow } from 'enzyme';

describe('Private - Common - ModDolar =>', () => {
    it('with empty data list ', () => {
        const wrapper1 = shallow(<ModDolar />);
        const wrapper2 = shallow(<ModDolar data={[]} />);

        expect(wrapper1.html()).toBeNull();
        expect(wrapper2.html()).toBeNull();
    });
});

describe('with data list', () => {
    const wrapper = shallow(<ModDolar {...API_RESPONSE} />);
    const result = wrapper.first();
    const ulTag = result.find('ul');
    const liTags = result.find('li');

    it('should render div tag with "mod-dolar" className with 4 li tags', () => {
        const { className } = ulTag.props();
        expect(ulTag.exists()).toBeTruthy();
        expect(liTags.length).toBe(4);
        expect(className).toContain('mod-dolar');
    });

    liTags.forEach((item, index) => {
        const child = liTags.at(index).children();
        const currencyDataComponent = child.find('mock-currencyData');
        it('Validate each item has currencyData component', () => {
            expect(currencyDataComponent.exists()).toBeTruthy();
        });
        if (currencyDataComponent.prop('purchasevalue')) {
            expect(currencyDataComponent.prop('purchasevalue')).not.toBe('');
        }
        if (currencyDataComponent.prop('salevalue')) {
            expect(currencyDataComponent.prop('salevalue')).not.toBe('');
        }
        if (currencyDataComponent.prop('sourcename')) {
            expect(currencyDataComponent.prop('sourcename')).not.toBe('');
        }
        if (currencyDataComponent.prop('urlBrand')) {
            it('check urlBrand', () => {
                expect(currencyDataComponent.prop('urlBrand')).toBe(
                    'https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/Lzu3CsxaJkufzPN4fOxQjod_yik=/314x0/filters:quality(100)/especiales.lanacion.com.ar/LN/dolar/anexo-dolar/logo-invertir.png'
                );
            });
        }
    });

    it('snapshot', () => {
        expect(result.render()).toMatchSnapshot();
    });
});
