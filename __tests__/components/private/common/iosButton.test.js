import React from 'react';
import { mount } from 'enzyme';
import Component from '../../../../components/private/common/iosButton';
import TestHelper from '../../../utils/testHelper';

describe('private - common - iosButton', () => {
    const child = <h1>Soy un child</h1>;
    const onClick = () => {
        console.log('asd');
    };
    const component = mount(<Component onClick={onClick}>{child}</Component>);

    TestHelper.testDoNotRenderChildren(component, 'child');

    it('testeo que el evento onClick sea el mismo que le pase', () => {
        TestHelper.expectSameValue(component.prop('onClick'), onClick);
    });
});
