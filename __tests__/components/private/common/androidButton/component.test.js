//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import testHelper from '../../../../utils/testHelper';
import AndroidButtonComponents from '../../../../../components/private/common/androidButton';

describe('private - common - component - androidButton', () => {
    const child = '<hijo>un texto como children</hijo>';
    const func = () => 'res';
    const props = {
        className: 'icon-android',
        id: 'pie-android',
        onClick: func
    };
    const container = mount(
        <AndroidButtonComponents children={child} onClick={func} />
    );
    const component = container.find('button');

    it('Testeo que existe el mock', () => {
        testHelper.expectSameValue(component.length, 1);
    });

    it('Testeo que pase al componente los items recibidos por el container', () => {
        testHelper.expectProps(component, props);
    });

    it('Testeo que no muestre mas de las props que tiene que mostrar', () => {
        testHelper.expectSameValue(Object.keys(component.props()).length, 4);
    });

    testHelper.testDoNotRenderChildren(component, 'hijo');
});
