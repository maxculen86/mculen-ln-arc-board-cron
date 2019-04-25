//retorno un elemento que luego busco en el container
jest.mock(
    '../../../../../components/private/common/components/instagramButton',
    () => 'mock-component'
);

//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import testHelper from '../../../../utils/testHelper';
import InstagramButtonContainer from '../../../../../components/private/common/containers/instagramButton';

describe('private - common - containers - instagramButton', () => {
    const child = '<hijo>un texto como children</hijo>';
    const props = {
        className: 'icon-instagram',
        id: 'pie-instagram'
    };
    const container = mount(
        <InstagramButtonContainer {...props} children={child} />
    );
    const component = container.find('mock-component');

    it('Testeo que existe el mock', () => {
        testHelper.expectSameValue(component.length, 1);
    });

    // testHelper.testToRenderChildrenAsText(component, child )
    testHelper.testDoNotRenderChildren(component, 'hijo');
});
