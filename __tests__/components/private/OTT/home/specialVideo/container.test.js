import Consumer from 'fusion:consumer';

jest.mock(
    '../../../../../../components/private/OTT/home/specialVideo/component',
    () => 'mocked-list-component'
);

import React from 'react';
import { mount } from 'enzyme';
import Container from '../../../../../../components/private/OTT/home/specialVideo/container';
import TestHelper from '../../../../../utils/testHelper';

describe('private - OTT - home - specialVideo - container', () => {
    const child = <h1>Soy un child</h1>;

    const videoIds = ['videosOtt'];

    const container = mount(<Container videoIds={videoIds}>{child}</Container>);
    TestHelper.testDoNotRenderChildren(container, 'child');
    const component = container.find('mocked-list-component');

    it('Testeo que los videos sean y que las props sean iguales', () => {
        const videos = component.prop('videos');
        TestHelper.expectSameValue(videos.length, 2);
        const firstVideo = videos[0];
        TestHelper.expectSameValue(
            firstVideo.headlines.basic,
            'Expo Nampo 2 title'
        );
        TestHelper.expectSameValue(
            firstVideo.subheadlines.basic,
            'texto blurb'
        );
        TestHelper.expectSameValue(
            firstVideo.canonical_url,
            '/video/expo-nampo-2-title-vid8fe39f3'
        );
    });
});
