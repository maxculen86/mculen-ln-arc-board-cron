jest.mock(
    '../../../../components/private/common/com-title',
    () => 'mock-com-title'
);

jest.mock(
    '../../../../components/private/common/com-link',
    () => 'mock-com-link'
);

jest.mock(
    '../../../../components/private/common/com-image',
    () => 'mock-com-image'
);

import React from 'react';
import ModDolar from '../../../../components/private/common/mod-dolar';
import ComTitle from '../../../../components/private/common/com-title';
import ComLink from '../../../../components/private/common/com-link';
import ComImage from '../../../../components/private/common/com-image';
import API_RESPONSE from '../../../../__mocks__/data/apiDolar/apiDolar';

import { shallow, mount, render } from 'enzyme';

describe('Private - Common - ModDolar =>', () => {
    describe('with empty data list ', () => {
        const wrapper1 = shallow(<ModDolar />);
        const wrapper2 = shallow(<ModDolar data={[]} />);

        expect(wrapper1.html() && wrapper2.html()).toBeNull();
    });
});

describe('with data list', () => {
    const { data, imageUrl } = API_RESPONSE;
    const wrapper = shallow(<ModDolar {...API_RESPONSE} />);
    const result = wrapper.first();
    const ulTag = result.find('ul');
    const liTags = result.find('li');
    const strongTag = result.find('strong');
    const titleComponent = result.find('mock-com-title');
    const linkComponent = result.find('mock-com-link');

    it('should render ul tag with "mod-dolar" className with 4 li tags', () => {
        const { className } = ulTag.props();
        expect(ulTag.exists()).toBeTruthy();
        expect(liTags.length).toBe(4);
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
                    expect(titleComponent.prop('size')).toBe('--xs');
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
