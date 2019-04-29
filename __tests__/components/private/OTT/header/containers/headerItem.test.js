//retorno un elemento que luego busco en el container
jest.mock(
    '../../../../../../components/private/OTT/header/components/headerItem',
    () => 'mock-component'
);

//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import HeaderItemContainer from '../../../../../../components/private/OTT/header/containers/headerItem';
import testHelper from '../../../../../utils/testHelper';

describe('OTT - layout - headerItem - containers', () => {
    const child = <hijos>soy un child de frame default</hijos>;
    const items = [
        { item: 'un item de prueba 1' },
        { item: 'otra item de prueba 2' }
    ];
    const props = {
        description: 'ss',
        href: 'ss',
        data: 'ss',
        alt: 'ss'
    };
    const container = mount(
        <HeaderItemContainer {...props} children={child} />
    );

    const component = container.find('mock-component');

    it('Testeo que pase al componente las propiedades correspondientes', () => {
        testHelper.expectProps(component, props);
    });

    testHelper.testDoNotRenderChildren(container, 'hijos');
});
