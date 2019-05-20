jest.mock(
    '../../../../../../components/private/OTT/common/videoArticle',
    () => 'mocked-item-component'
);

import React from 'react';
import { mount } from 'enzyme';
import Component from '../../../../../../components/private/OTT/home/specialVideo/component';
import TestHelper from '../../../../../utils/testHelper';
import { content_elements } from '../../../../../../__mocks__/data/ottVideos/videosOtt.json';
import { isTSAnyKeyword } from '@babel/types';

describe('private - OTT - home - specialVideo - component', () => {
    const child = <h1>Soy un child</h1>;
    const container = mount(
        <Component videos={content_elements}>{child}</Component>
    );

    TestHelper.testDoNotRenderChildren(container, 'child');

    const components = container.find('mocked-item-component');

    const firstComponent = components.first();
    const firstVideo = content_elements[0];
    it('Testeo que le lleguen bien las propiedades al primer video', () => {
        TestHelper.expectSameValue(
            firstComponent.prop('description'),
            firstVideo.headlines.basic
        );
        TestHelper.expectSameValue(
            firstComponent.prop('href'),
            firstVideo.website_url
        );
        TestHelper.expectSameValue(firstComponent.prop('id'), firstVideo._id);
    });

    const secondVideo = content_elements[1];
    const secondComponent = components.at(1);
    it('Testeo que le lleguen bien las propiedades al segundo video', () => {
        TestHelper.expectSameValue(
            secondComponent.prop('description'),
            secondVideo.headlines.basic
        );
        TestHelper.expectSameValue(
            secondComponent.prop('href'),
            secondVideo.website_url
        );
        TestHelper.expectSameValue(secondComponent.prop('id'), secondVideo._id);
    });
});
