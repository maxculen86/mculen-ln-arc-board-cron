//retorno un elemento que luego busco en el container
jest.mock(
    '../../../../../components/private/common/androidButton/component',
    () => 'mock-component'
);

//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import testHelper from '../../../../utils/testHelper';
import AndroidButtonContainer from '../../../../../components/private/common/androidButton/container';

describe('private - common - containers - androidButton', () => {
    const child = '<hijo>un texto como children</hijo>';
    const props = {
        className: 'icon-android',
        id: 'pie-android'
    };
    const container = mount(
        <AndroidButtonContainer {...props} children={child} />
    );
    const component = container.find('mock-component');

    it('Testeo que existe el mock', () => {
        testHelper.expectSameValue(component.length, 1);
    });

    // testHelper.testToRenderChildrenAsText(component, child )
    testHelper.testDoNotRenderChildren(component, 'hijo');
});
