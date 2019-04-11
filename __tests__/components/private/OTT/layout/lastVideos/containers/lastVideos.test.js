import Consumer from 'fusion:consumer';
import get from 'lodash.get';

jest.mock('../../../../../../../components/private/OTT/layouts/lastVideos/components/lastVideos',
    () => 'mock-component'
);

import React from 'react';
import { mount } from 'enzyme';
import LastVideosContainer from '../../../../../../../components/private/OTT/layouts/lastVideos/containers/lastVideos';
import testHelper from '../../../../../../utils/testHelper';
import jsonConVideos from '../../../../../../../__mocks__/data/videos/ultimosVideos.json';

describe('private - OTT - container - LastVideos', () => {
    let container = mount(
        <LastVideosContainer/>
    );
    
    let component = container.find('mock-component');

    let videosDelMock = component.prop('videos');
    let videosDelMockLength = videosDelMock.length;

    let jsonElements = get(jsonConVideos, 'content_elements', null);

    it('Testeo que reciba los videos', () => {
        testHelper.expectSameValue(videosDelMock, jsonElements);
    });

    it('Testeo que reciba los la cantidad correcta de videos', () => {
        testHelper.expectSameValue(videosDelMockLength, 4);
    });
});