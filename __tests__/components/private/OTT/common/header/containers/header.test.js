//retorno un elemento que luego busco en el container
jest.mock(
    '../../../../../../../components/private/OTT/common/header/component',
    () => 'mock-component'
);

//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import HeaderContainer from '../../../../../../../components/private/OTT/common/header/container';
import testHelper from '../../../../../../utils/testHelper';

describe('OTT - layout - header - containers', () => {
    const child = <hijos>soy un child de frame default</hijos>;
    const items = [
        { item: 'un item de prueba 1' },
        { item: 'otra item de prueba 2' }
    ];
    const container = mount(<HeaderContainer items={items} children={child} />);

    const component = container.find('mock-component');

    it('Testeo que pase al componente los items recibidos por el container', () => {
        testHelper.expectProp(component, 'items', items);
    });
    testHelper.testDoNotRenderChildren(container, 'hijos');
});
