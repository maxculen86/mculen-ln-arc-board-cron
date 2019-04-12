import Consumer from 'fusion:consumer';

jest.mock(
    '../../../../components/private/LN/home/common/containers/storiesBox',
    () => 'mocked-component'
);

import React from 'react';
import { mount } from 'enzyme';
import TestHelper from '../../../utils/testHelper';
import Historias from '../../../../components/features/LN-home/Historias';

describe('features - LN-home - Historias', () => {
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
            isExclusive: 'false'
        });
    }
    const cf = {
        hidden: false,
        articles: articlesCf
    };
    const child = <label>soy un child</label>;
    const feature = mount(<Historias customFields={cf}>{child}</Historias>);

    TestHelper.testDoNotRenderChildren(feature, 'child');

    const container = feature.find('mocked-component');
    it('Testeo que le lleguen los articles al container', () => {
        TestHelper.expectSameValue(
            container.prop('articles').length,
            ARTICLES_COUNT
        );
    });

    const cf2 = {
        hidden: true,
        articles: articlesCf
    };

    const featureHidden = mount(<Historias customFields={cf2} />);
    const containerHidden = featureHidden.find('mocked-component');
    it('Testeo que con hidden en true no se dibuje el container', () => {
        TestHelper.expectSameValue(containerHidden.length, 0);
    });
});
