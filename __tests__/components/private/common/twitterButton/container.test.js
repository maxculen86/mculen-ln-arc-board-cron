//retorno un elemento que luego busco en el container
jest.mock(
    '../../../../../components/private/common/twitterButton/component',
    () => 'mock-component'
);

//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import testHelper from '../../../../utils/testHelper';
import TwitterButtonContainer from '../../../../../components/private/common/twitterButton/container';

describe('private - common - containers - twitterButton', () => {
    const child = '<hijo>un texto como children</hijo>';
    const props = {
        className: 'icon-twitter',
        id: 'pie-twitter'
    };
    const container = mount(
        <TwitterButtonContainer {...props} children={child} />
    );
    const component = container.find('mock-component');

    it('Testeo que existe el mock', () => {
        testHelper.expectSameValue(component.length, 1);
    });

    // testHelper.testToRenderChildrenAsText(component, child )
    testHelper.testDoNotRenderChildren(component, 'hijo');
});
