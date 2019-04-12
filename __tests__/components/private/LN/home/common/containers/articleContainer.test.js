import Consumer from 'fusion:consumer';

jest.mock(
    '../../../../../../../components/private/LN/home/common/components/article',
    () => 'mocked-component'
);

import React from 'react';
import { mount } from 'enzyme';
import ArticleContainer from '../../../../../../../components/private/LN/home/common/containers/article';
import TestHelper from '../../../../../../utils/testHelper';

describe('private - LN - home - common - containers - article', () => {
    const cf = {
        id: 'conTagDeRS',
        url: '',
        teaser: 'volanta de prueba',
        subheader: '',
        homeTitle: 'titulo home',
        marquee: 'marquesina',
        articleMark: '<Ninguna>',
        isExclusive: 'false',
        size: 'M',
        position: '1'
    };
    const child = <label>soy un child</label>;
    const container = mount(
        <ArticleContainer {...cf}>{child}</ArticleContainer>
    );
    it('Testeo que dibuje las propiedades correctas', () => {
        expect(container.props()).toEqual({ ...cf, children: child });
    });

    TestHelper.testDoNotRenderChildren(container, 'child');

    const component = container.find('mocked-component');

    it('Testeo que el homeTitle le gane al title', () => {
        TestHelper.expectProp(component, 'title', cf.homeTitle);
    });

    it('Testeo que el tagname sea rolling stone', () => {
        TestHelper.expectProp(component, 'tagName', 'Rolling Stone');
    });
});
