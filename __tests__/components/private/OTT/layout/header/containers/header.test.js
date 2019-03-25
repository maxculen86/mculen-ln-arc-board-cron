
//retorno un elemento que luego busco en el container
jest.mock('../../../../../../../components/private/OTT/layout/header/components/header',
    () => 'mock-component');

//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import HeaderContainer from '../../../../../../../components/private/OTT/layout/header/containers/header';

describe('OTT - layout - header - containers', () => {
    const child = <div>soy un child de frame default</div>
    const items = [
        {item: 'un item de prueba 1'},
        {item: 'otra item de prueba 2'}]
    const container = mount(
        <HeaderContainer
            items={items}
        />
    )
    const component = container.find('mock-component')

    it('Testeo que pase al componente los items recibidos por el container', () => {
        expect(component.prop('items')).toEqual(items)
    });
});