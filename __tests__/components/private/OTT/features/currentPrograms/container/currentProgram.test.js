//retorno un elemento que luego busco en el container
jest.mock('../../../../../../../components/private/OTT/features/currentPrograms/components/currentPrograms',
    () => 'mock-component');

//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import testHelper from '../../../../../../utils/testHelper'
import CurrentProgramsContainer from '../../../../../../../components/private/OTT/features/currentPrograms/containers/currentPrograms';    

describe('OTT - layout - currentPrograms - containers', () => {

    const child = <hijos>soy un child de frame default</hijos>
    const items = [
        {item: 'un item de prueba 1'},
        {item: 'otra item de prueba 2'}]

    const container = mount(
        <CurrentProgramsContainer
            items={items}
            children={child}
        />
    )

    const component = container.find('mock-component')

    it('Testeo que pase al componente los items recibidos por el container', () => {
        expect(component.prop('items')).toEqual(items)
        testHelper.expectProp(component, 'items', items)
    });

    testHelper.testNoRenderChildren(container, 'hijos')

})
