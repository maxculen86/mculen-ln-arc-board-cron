//retorno un elemento que luego busco en el container
jest.mock(
    '../../../../../components/private/common/button',
    () => 'mock-component'
);

//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import testHelper from '../../../../utils/testHelper';
import RssButtonComponents from '../../../../../components/private/common/rssButton/component';

describe('private - common - component - rssButton', () => {
    const child = '<hijo>un texto como children</hijo>';
    const props = {
        className: 'icon-rss',
        id: 'pie-rss'
    };
    const container = mount(<RssButtonComponents children={child} />);
    const component = container.find('mock-component');

    it('Testeo que existe el mock', () => {
        testHelper.expectSameValue(component.length, 1);
    });

    it('Testeo que pase al componente los items recibidos por el container', () => {
        testHelper.expectProps(component, props);
    });

    it('Testeo que no muestre mas de las props que tiene que mostrar', () => {
        testHelper.expectSameValue(Object.keys(component.props()).length, 2);
    });

    testHelper.testDoNotRenderChildren(component, 'hijo');
});
