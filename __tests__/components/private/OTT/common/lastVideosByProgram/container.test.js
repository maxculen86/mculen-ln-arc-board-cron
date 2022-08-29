import Consumer from 'fusion:consumer';

jest.mock(
    '../../../../../../components/private/OTT/programa/lastVideosByProgram/component',
    () => 'mock-component'
);

import React from 'react';
import { mount } from 'enzyme';
import LastVideosByProgramContainer, {
    pageSize
} from '../../../../../../components/private/OTT/programa/lastVideosByProgram';
import get from '../../../../../../components/private/common/utils/get';
import testHelper from '../../../../../utils/testHelper';
import jsonConNext from '../../../../../../__mocks__/data/videos/videosConNext.json';
import jsonSinNext from '../../../../../../__mocks__/data/videos/videosSinNext.json';
import jsonSinVideos from '../../../../../../__mocks__/data/videos/sinVideosEncontrados.json';

describe('private - OTT - feature - LastVideosByPrograms con next', () => {
    let container = mount(
        <LastVideosByProgramContainer sectionId={'connext'} />
    );
    let component = container.find('mock-component');

    let videosDelMock = component.prop('videos');
    let videosDelMockLength = videosDelMock.length;

    let jsonElements = get(jsonConNext, 'content_elements', null);

    it('Testeo que reciba los videos', () => {
        testHelper.expectSameValue(videosDelMock, jsonElements);
    });

    it('Testeo que reciba los la cantidad correcta de videos', () => {
        testHelper.expectSameValue(videosDelMockLength, 4);
    });

    it('chequeo que muestre el boton next', () => {
        testHelper.expectProp(component, 'hasNext', true);
    });

    it('Testeo boton next', () => {
        let from = container.instance().state.from;
        container.instance().nextPage();
        testHelper.expectSameValue(
            from + pageSize,
            container.instance().state.from
        );
    });
});

describe('private - OTT - feature - LastVideosByPrograms sin next', () => {
    let container = mount(
        <LastVideosByProgramContainer
            sectionId={'sinnext'}
            doFetch={(r, f) => {}}
        />
    );
    let component = container.find('mock-component');

    let videosDelMock = component.prop('videos');
    let videosDelMockLength = videosDelMock.length;

    let jsonElements = get(jsonSinNext, 'content_elements', null);

    it('Testeo que reciba los videos', () => {
        testHelper.expectSameValue(videosDelMock, jsonElements);
    });

    it('Testeo que reciba los la cantidad correcta de videos', () => {
        testHelper.expectSameValue(videosDelMockLength, 4);
    });

    it('chequeo que NO muestre el boton next', () => {
        testHelper.expectProp(component, 'hasNext', false);
    });
});

describe('private - OTT - feature - LastVideosByPrograms sin VIDEOS', () => {
    let container = mount(
        <LastVideosByProgramContainer sectionId={'sinvideos'} />
    );
    let component = container.find('mock-component');

    let videosDelMock = component.prop('videos');
    let videosDelMockLength = videosDelMock.length;

    let jsonElements = get(jsonSinVideos, 'content_elements', null);

    it('Testeo que reciba los videos', () => {
        testHelper.expectSameValue(videosDelMock, jsonElements);
    });

    it('Testeo que NO reciba videos', () => {
        testHelper.expectSameValue(videosDelMockLength, 0);
    });
});

//TODO: testear que tenga next
//TODO: testear que no tenga next
//TODO: testear que no dibuje si el json no trae nada
//TODO: testear cached y fetched por separado (?)
//TODO: testear que se pasen los videos al mock en todos los casos anteriores y sean los correctos
