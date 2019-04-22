//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import testHelper from '../../../../utils/testHelper';
import ButtonComponent from '../../../../../components/private/common/components/button';

describe('private - common - component - button', () => {
    const child = 'un texto como children';
    const props = {
        a: 'a',
        b: 'b',
        c: { d: 'd', e: 'e' }
    };
    const container = mount(<ButtonComponent {...props} children={child} />);
    const button = container.find('button');

    it('Testeo que pase al componente los items recibidos por el container', () => {
        testHelper.expectProps(button, props);
    });

    testHelper.testToRenderChildrenAsText(button, child);

    it('Testeo que solo dibuje un button', () => {
        testHelper.expectSameValue(button.length, 1);
    });
});
