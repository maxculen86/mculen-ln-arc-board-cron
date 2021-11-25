import React from 'react';
import ModDolar from '../../../../components/private/common/mod-dolar';
import API_RESPONSE from '../../../../__mocks__/data/apiDolar/apiDolar';
import { shallow } from 'enzyme';

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

describe('with data list', () => {
    const { data, imageUrl } = API_RESPONSE;
    const wrapper = shallow(<ModDolar {...API_RESPONSE} />);
    const result = wrapper.first();
    const ulTag = result.find('div');
    const strongTag = result.find('strong');

    it.only('should render div tag with "mod-dolar" className with 4 li tags', () => {
        const { className } = result.props();

        expect(className).toContain('mod-dolar');
    });

    it('should render 3 ComTitle components, 6 strongs and 1 ComLink component', () => {
        expect(titleComponent.length).toBe(3);
        expect(strongTag.length).toBe(5);
        expect(linkComponent.length).toBe(1);
    });

    liTags.forEach((item, index) => {
        const children = liTags.at(index).children();

        if (index === liTags.length - 1) {
            it('validate item image InvertirOnline ', () => {
                const linkComponent = children.find('mock-com-link');
                const imageComponent = children.find('mock-com-image');

                expect(linkComponent.exists()).toBeTruthy();
                expect(linkComponent.prop('target')).toBe('_blank');
                expect(linkComponent.prop('link')).toBe(
                    'https://www.invertironline.com/'
                );

                expect(imageComponent.exists()).toBeTruthy();
                expect(imageComponent.prop('src')).toBe(imageUrl);
                expect(imageComponent.prop('alt')).toBe('invertirOnline.com');
            });
        } else {
            const { title, compra, venta, sourceName } = data[index];
            const titleComponent = children.find('mock-com-title');
            const spanTags = children.find('strong');

            it(`Validate item ${sourceName} - ${title}`, () => {
                const saleValue = spanTags.at(0).prop('children')[1];

                if (sourceName === 'dccl') {
                    expect(spanTags.length).toBe(1);
                } else {
                    const buyValue = spanTags.at(1).prop('children')[1];
                    expect(titleComponent.exists()).toBeTruthy();
                    expect(titleComponent.prop('content')).toBe(title);
                    expect(titleComponent.prop('size')).toBe('--twoxs');
                    expect(titleComponent.prop('tag')).toBe('h2');
                    expect(spanTags.length).toBe(2);
                    expect(spanTags.at(0).html()).toContain(saleValue);
                    expect(spanTags.at(1).html()).toContain(buyValue);
                }
            });
        }
    });

    it('snapshot', () => {
        expect(result.render()).toMatchSnapshot();
    });
});
