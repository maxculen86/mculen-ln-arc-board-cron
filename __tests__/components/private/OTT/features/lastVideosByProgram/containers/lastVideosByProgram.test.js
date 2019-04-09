import Consumer from 'fusion:consumer';

jest.mock(
    '../../../../../../../components/private/OTT/features/LastVideosByProgram/components/LastVideosByProgram',
    () => 'mock-component'
);

import React from 'react';
import { mount } from 'enzyme';
import LastVideosByProgramContainer from '../../../../../../../components/private/OTT/features/LastVideosByProgram/containers/lastVideosByProgram';
import get from 'lodash.get';
import testHelper from '../../../../../../utils/testHelper';
import videos from '../../../../../../../__mocks__/data/videos/lastVideosfrom0size12sectionterapia-noticias.json';

describe('private - common - containers - button', () => {
    const sectionId = 'terapia-noticias';
    it('Testeo que recba los videos', () => {
        const container = mount(
            <LastVideosByProgramContainer sectionId={sectionId} />
        );
        const instance = container.instance();
        const component = container.find('mock-component');
        const elems = get(videos, 'content_elements', null);

        testHelper.expectProp(component, 'videos', elems);
        testHelper.expectSameValue(component.prop('videos').length, 4);
    });
});
