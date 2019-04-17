import Consumer from 'fusion:consumer';

jest.mock(
    '../../../../../../../components/private/LN/home/common/components/storiesBox',
    () => 'mocked-component'
);

import React from 'react';
import { mount } from 'enzyme';
import TestHelper from '../../../../../../utils/testHelper';
import StoriesBox from '../../../../../../../components/private/LN/home/common/containers/storiesBox';

describe('private - LN - home - common - containers - storiesBox', () => {
    const articlesCf = [];
    const ARTICLES_COUNT = 6;
    for (let i = 0; i < ARTICLES_COUNT; i++) {
        articlesCf.push({
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
        });
    }

    const child = <label>soy un child</label>;
    const container = mount(
        <StoriesBox articles={articlesCf}>{child}</StoriesBox>
    );

    TestHelper.testDoNotRenderChildren(container, 'child');

    const component = container.find('mocked-component');

    it('Testeo que la cantidad de children pasados al subcomponente correspondan', () => {
        TestHelper.expectSameValue(
            component.prop('children').length,
            ARTICLES_COUNT
        );
    });
});
