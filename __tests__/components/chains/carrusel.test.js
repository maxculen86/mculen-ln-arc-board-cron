jest.mock(
    '../../../components/private/common/containers/carousell',
    () => 'mock-component'
);

import React from 'react';
import { mount } from 'enzyme';
import Carrusel from '../../../components/chains/carrusel';
import testHelper from '../../utils/testHelper';

describe('chains - carrusel', () => {
    const childrenText = 'childrenText de test';
    const title = 'ultimos videos';
    const cf = { title: title };
    const component = mount(
        <Carrusel customFields={cf}>{childrenText}</Carrusel>
    );
    const carousel = component.find('mock-component');

    it('Testeo que se dibuje el carousel mockeado', () => {
        testHelper.expectSameValue(carousel.length, 1);
    });
    testHelper.testToRenderChildrenAsText(carousel, childrenText);
});
