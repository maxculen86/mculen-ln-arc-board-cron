jest.mock(
    '../../../../../../components/private/OTT/ficha/videoTab/video',
    () => 'mocked-video-component'
);

jest.mock(
    '../../../../../../components/private/OTT/ficha/videoTab/videoInfo',
    () => 'mocked-video-info-component'
);

import React from 'react';
import { mount } from 'enzyme';
import Component from '../../../../../../components/private/OTT/ficha/videoTab/component';
import TestHelper from '../../../../../utils/testHelper';
import dateHelper from '../../../../../../components/private/OTT/common/utils/dateHelper';
import globalContent from '../../../../../../__mocks__/data/videos/globalContentPgmCampo';

describe('private - OTT - ficha - component', () => {
    const child = <h1>Soy un child</h1>;
    const props = {
        title: globalContent.headlines.basic,
        date: dateHelper.getVideoDateFormat(globalContent.publish_date),
        videoId: globalContent._id,
        analytics: []
    };
    const container = mount(<Component {...props}>{child}</Component>);

    TestHelper.testDoNotRenderChildren(container, 'child');

    const videoComponent = container.find('mocked-video-component');

    it('Testeo que se le pasen bien el id al video', () => {
        TestHelper.expectSameValue(
            videoComponent.prop('videoId'),
            container.prop('videoId')
        );
    });

    const videoInfoComponent = container.find('mocked-video-info-component');

    it('Testeo que video info reciba bien las props', () => {
        TestHelper.expectSameValue(
            videoInfoComponent.prop('title'),
            container.prop('title')
        );
        TestHelper.expectSameValue(
            videoInfoComponent.prop('date'),
            container.prop('date')
        );
    });
});
