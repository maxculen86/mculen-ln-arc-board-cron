import Consumer from 'fusion:consumer';

jest.mock(
    '../../../../../../../components/private/OTT/features/lastVideosByProgram/components/lastVideosByProgram',
    () => 'mock-component'
);

import React from 'react';
import { mount } from 'enzyme';
import LastVideosByProgramContainer from '../../../../../../../components/private/OTT/features/lastVideosByProgram/containers/lastVideosByProgram';
import get from 'lodash.get';
import testHelper from '../../../../../../utils/testHelper';
import jsonVideos from '../../../../../../../__mocks__/data/videos/lastVideosfrom0size12sectionterapia-noticias.json';

describe('private - common - containers - button', () => {
    const sectionId = 'terapia-noticias';
    const container = mount(
        <LastVideosByProgramContainer sectionId={sectionId} />
    );
    const component = container.find('mock-component');

    const videosDelMock = component.prop('videos');
    const videosDelMockLength = videosDelMock.length;

    const jsonElements = get(jsonVideos, 'content_elements', null);

    it('Testeo que reciba los videos', () => {
        testHelper.expectSameValue(videosDelMock, jsonElements);
    });

    it('Testeo que reciba los la cantidad correcta de videos', () => {
        testHelper.expectSameValue(videosDelMockLength, 4);
    });

    //TODO: testear que tenga next
    //TODO: testear que no tenga next
    //TODO: testear que no dibuje si el json no trae nada
    //TODO: testear cached y fetched por separado (?)
    //TODO: testear que se pasen los videos al mock en todos los casos anteriores y sean los correctos
});
