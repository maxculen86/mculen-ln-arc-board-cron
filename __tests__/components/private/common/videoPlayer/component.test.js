import React from 'react';
import { mount } from 'enzyme';
import Component from '../../../../../components/private/common/videoPlayer/component';
import video from '../../../../../__mocks__/data/videos/videoParaPlayer';
import TestHelper from '../../../../utils/testHelper';

describe('private - common - videoPlayer - component', () => {
    const child = <h1>Soy un child</h1>;
    const component = mount(<Component {...video}>{child}</Component>);

    TestHelper.testDoNotRenderChildren(component, 'child');

    it('Testeo que se carguen bien las props', () => {
        TestHelper.expectSameValue(
            component.prop('videoId'),
            video.globalContent._id
        );

        TestHelper.expectSameValue(
            component.prop('loadVideoOnInit'),
            video.loadVideoOnInit
        );
        TestHelper.expectSameValue(
            component.prop('enableAds'),
            video.enableAds
        );
    });
});
