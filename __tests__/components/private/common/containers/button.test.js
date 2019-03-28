
//retorno un elemento que luego busco en el container
jest.mock('../../../../../components/private/common/components/button',
    () => 'mock-component');

//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import testHelper from '../../../../utils/testHelper'
import ButtonContainer from '../../../../../components/private/common/containers/button'

describe('private - common - containers - button', () => {
    const child = "un texto como children"
    const props = {
        a: 'a',
        b: 'b',
        c: { d:'d', e:'e' }
    }
    const container = mount(
        <ButtonContainer
            {...props}
            children={child}
        />
    )
    const component = container.find('mock-component')

    it('Testeo que pase al componente los items recibidos por el container', () => {
        // expect(component.prop('a')).toEqual(props.a)
        // expect(component.prop('b')).toEqual(props.b)
        // expect(component.prop('c')).toEqual(props.c)
        testHelper.expectProps(component, props)
    });

    testHelper.testToRenderChildrenAsText(component, child )
});