jest.mock(
    '../../../../../../../components/private/LN/home/common/components/sectionTitle',
    () => 'mocked-title'
);

import React from 'react';
import { mount } from 'enzyme';
import TestHelper from '../../../../../../utils/testHelper';
import StoriesBox from '../../../../../../../components/private/LN/home/common/components/storiesBox';

describe('private - LN - home - common - components - storiesBox', () => {
    const child = 'soy un child';
    const component = mount(<StoriesBox>{child}</StoriesBox>);

    TestHelper.testToRenderChildrenAsText(component, child);

    const titleComponent = component.find('mocked-title');
    const expectedTitle = 'Historias';
    it('Testeo que el titulo del subcomponente title sea historias', () => {
        TestHelper.expectProp(titleComponent, 'title', expectedTitle);
    });

    const tagSection = '<section';
    it('Testeo que contenga un section', () => {
        TestHelper.expectHTML(component, tagSection);
    });
});
