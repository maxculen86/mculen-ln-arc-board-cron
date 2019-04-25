//retorno un elemento que luego busco en el container
jest.mock(
    '../../../../../components/private/common/components/iosButton',
    () => 'mock-component'
);

//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import testHelper from '../../../../utils/testHelper';
import IosButtonContainer from '../../../../../components/private/common/containers/iosButton';

describe('private - common - containers - iosButton', () => {
    const child = '<hijo>un texto como children</hijo>';
    const props = {
        className: 'icon-ios',
        id: 'pie-apple'
    };
    const container = mount(<IosButtonContainer {...props} children={child} />);
    const component = container.find('mock-component');

    it('Testeo que existe el mock', () => {
        testHelper.expectSameValue(component.length, 1);
    });

    // testHelper.testToRenderChildrenAsText(component, child )
    testHelper.testDoNotRenderChildren(component, 'hijo');
});
