import React from 'react';
import { mount } from 'enzyme';
import TestHelper from '../../../../../utils/testHelper';
import Button from '../../../../../../components/private/LN/acumulado/botonVerMasNotas';

describe('Components - private - LN - acumulado - button', () => {
    const child = <div>Soy un child</div>;
    const onClickHandler = () => {};
    const name = 'acumulado';
    const component = mount(
        <Button name={name} onClickHandler={onClickHandler}>
            {child}
        </Button>
    );

    TestHelper.testDoNotRenderChildren(component, 'child');

    it('Le paso props y espero que las reciba bien', () => {
        TestHelper.expectProp(component, 'name', name);
        TestHelper.expectProp(component, 'onClickHandler', onClickHandler);
    });
});
