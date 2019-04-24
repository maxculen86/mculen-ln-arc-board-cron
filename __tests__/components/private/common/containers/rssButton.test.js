//retorno un elemento que luego busco en el container
jest.mock(
    '../../../../../components/private/common/components/rssButton',
    () => 'mock-component'
);

//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import testHelper from '../../../../utils/testHelper';
import RssButtonContainer from '../../../../../components/private/common/containers/rssButton';

describe('private - common - containers - rssButton', () => {
    const child = '<hijo>un texto como children</hijo>';
    const props = {
        className: 'icon-rss',
        id: 'pie-rss'
    };
    const container = mount(<RssButtonContainer {...props} children={child} />);
    const component = container.find('mock-component');

    it('Testeo que existe el mock', () => {
        testHelper.expectSameValue(component.length, 1);
    });

    // testHelper.testToRenderChildrenAsText(component, child )
    testHelper.testDoNotRenderChildren(component, 'hijo');
});
