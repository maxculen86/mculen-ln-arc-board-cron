//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import testHelper from '../../../../utils/testHelper';
import NavComponent from '../../../../../components/private/common/components/nav';

describe('private - common - component - nav', () => {
    const child = 'un texto como children';
    const props = {
        a: 'a',
        b: 'b',
        c: { d: 'd', e: 'e' }
    };
    const container = mount(<NavComponent {...props} children={child} />);
    const nav = container.find('nav');

    it('Testeo que pase al componente los items recibidos por el container', () => {
        testHelper.expectProps(nav, props);
    });

    testHelper.testToRenderChildrenAsText(nav, child);

    it('Testeo que solo dibuje un nav', () => {
        testHelper.expectSameValue(nav.length, 1);
    });
});
