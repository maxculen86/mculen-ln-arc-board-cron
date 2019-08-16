jest.mock(
    '../../../../../../components/private/LN/common/header/headerMobile',
    () => 'mocked-mobile-header'
);
jest.mock(
    '../../../../../../components/private/LN/common/header/headerDesktop',
    () => 'mocked-desktop-header'
);
jest.mock(
    '../../../../../../components/private/LN/common/navBar',
    () => 'mocked-mobile-navbar'
);

import React from 'react';
import { mount } from 'enzyme';
import TestHelper from '../../../../../utils/testHelper';
import Header from '../../../../../../components/private/LN/common/header';

describe('components - private - LN - common - header', () => {
    const child = <div>Soy un child</div>;
    const componentDesktop = mount(<Header isMobile={false}>{child}</Header>);

    TestHelper.testDoNotRenderChildren(componentDesktop, 'child');

    it('Testeo que muestre el header desktop', () => {
        TestHelper.expectHTML(componentDesktop, 'mocked-desktop-header');
    });

    const componentMobile = mount(<Header isMobile={true}>{child}</Header>);
    TestHelper.testDoNotRenderChildren(componentMobile, 'child');
    it('Testeo que muestre el header mobile', () => {
        TestHelper.expectHTML(componentMobile, 'mocked-mobile-header');
        TestHelper.expectHTML(componentMobile, 'mocked-mobile-navbar');
    });
});
