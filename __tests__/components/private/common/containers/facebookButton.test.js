//retorno un elemento que luego busco en el container
jest.mock(
    '../../../../../components/private/common/components/facebookButton',
    () => 'mock-component'
);

//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import testHelper from '../../../../utils/testHelper';
import FacebookButtonContainer from '../../../../../components/private/common/containers/facebookButton';

describe('private - common - containers - facebookButton', () => {
    const child = '<hijo>un texto como children</hijo>';
    const props = {
        className: 'icon-facebook',
        id: 'pie-facebook'
    };
    const container = mount(
        <FacebookButtonContainer {...props} children={child} />
    );
    const component = container.find('mock-component');

    it('Testeo que existe el mock', () => {
        testHelper.expectSameValue(component.length, 1);
    });

    // testHelper.testToRenderChildrenAsText(component, child )
    testHelper.testDoNotRenderChildren(component, 'hijo');
});
