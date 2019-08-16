import React from 'react';
import { mount } from 'enzyme';
import TestHelper from '../../../../../utils/testHelper';
import Header from '../../../../../../components/private/LN/common/header/headerBase';
import Item from '../../../../../../components/private/LN/common/navBar/item';

describe('components - private - LN - common - header - headerBase', () => {
    const child = <div>Soy un child</div>;
    const id = 'pruebaId';
    const className = 'pruebaClass';
    const component = mount(
        <Header id={id} className={className}>
            {child}
        </Header>
    );

    TestHelper.testToRenderChildrenAsText(component, 'Soy un child');

    it('pruebo que dibuje las propiedades que le paso', () => {
        TestHelper.expectProp(component, 'id', id);
        TestHelper.expectProp(component, 'className', className);
    });
});
