jest.mock(
    '../../../../../../components/private/LN/common/header/headerMobile',
    () => 'mocked-mobile-header'
);
jest.mock(
    '../../../../../../components/private/LN/common/header/headerDesktop',
    () => 'mocked-desktop-header'
);
jest.mock(
    '../../../../../../components/private/LN/common/navbar',
    () => 'mocked-mobile-navbar'
);

import React from 'react';
import { mount } from 'enzyme';
import TestHelper from '../../../../../utils/testHelper';
import Header from '../../../../../../components/private/LN/common/header';

const getUserLogout = () => ({
    logueado: false,
    loginData: {
        subscription: false,
        userName: 'Sin nombre'
    }
});
/* 
const getUserLoginWhitoutSubscription = () => ({
    logueado: true,
    loginData: {
        subscription: true,
        userName: 'Pedro Perez'
    }
});

const getUserLoginWhitSubscription = () => ({
    logueado: true,
    loginData: {
        subscription: false,
        userName: 'Pedro Perez'
    }
});
 */
describe('components - private - LN - common - header', () => {
    const child = <div>Soy un child</div>;
    const desktopSU = {
        device: 'desktop'
    };
    const componentDesktop = mount(
        <Header screenUtils={desktopSU} mockApi={getUserLogout()}>
            {child}
        </Header>
    );

    TestHelper.testDoNotRenderChildren(componentDesktop, 'child');

    it('Testeo que muestre el header desktop', () => {
        TestHelper.expectHTML(componentDesktop, 'mocked-desktop-header');
    });

    const mobileSU = {
        device: 'desktop'
    };
    const componentMobile = mount(
        <Header screenUtils={mobileSU} mockApi={getUserLogout()}>
            {child}
        </Header>
    );
    TestHelper.testDoNotRenderChildren(componentMobile, 'child');
    it('Testeo que muestre el header mobile', () => {
        expect(componentMobile.find('mocked-mobile-header')).toBeTruthy();
        expect(componentMobile.find('mocked-mobile-navbar')).toBeTruthy();
    });
});
