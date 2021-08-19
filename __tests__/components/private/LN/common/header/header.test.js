import Consumer from 'fusion:consumer';

/* jest.mock(
    '../../../../../../components/private/LN/common/header/headerMobile',
    () => 'mocked-mobile-header'
); */
jest.mock(
    '../../../../../../components/private/LN/common/header/headerDesktop',
    () => 'mocked-desktop-header'
);
jest.mock(
    '../../../../../../components/private/LN/common/navbar',
    () => 'mocked-mobile-navbar'
);

jest.mock(
    '../../../../../../components/private/LN/common/hocs/withLoginData',
    () => Comp => props => (Comp ? <Comp {...props} /> : null)
);

jest.mock(
    '../../../../../../components/private/LN/common/desplegable',
    () => 'mocked-desplegable'
);

/* jest.mock(
    '../../../../../../components/private/common/hocs/withScreenUtils',
    () => Comp => props => (Comp ? <Comp {...props} /> : null)
); */

import React from 'react';
import { mount, render, shallow } from 'enzyme';
import TestHelper from '../../../../../utils/testHelper';
import Header from '../../../../../../components/private/LN/common/header';

const getUserLogout = () => ({
    logueado: false,
    loginData: {
        subscription: false,
        userName: 'Sin nombre'
    }
});

const siteProperties = {
    siteProperties: {
        host: 'https://www.lanacion.com.ar',
        bannerConfig: { dfp_id: '133919216' }
    }
};

/* const getUserLoginWithoutSubscription = () => ({
    logueado: true,
    loginData: {
        subscription: true,
        userName: 'Pedro Perez'
    }
});

const getUserLoginWithSubscription = () => ({
    logueado: true,
    loginData: {
        subscription: false,
        userName: 'Pedro Perez'
    }
}); */

describe('components - private - LN - common - header', () => {
    const child = <div>Soy un child</div>;
    const desktopSU = {
        device: 'desktop'
    };
    const componentDesktop = mount(
        <Header
            screenUtils={desktopSU}
            mockApi={getUserLogout()}
            {...siteProperties}
        >
            {child}
        </Header>
    );

    TestHelper.testDoNotRenderChildren(componentDesktop, 'child');

    it('Testeo que muestre el header desktop', () => {
        TestHelper.expectHTML(componentDesktop, 'mocked-desktop-header');
    });

    /* const mobileSU = {
        device: 'desktop'
    };
    const componentMobile = mount(
        <Header
            screenUtils={mobileSU}
            mockApi={getUserLogout()}
            {...siteProperties}
        >
            {child}
        </Header>
    );
    TestHelper.testDoNotRenderChildren(componentMobile, 'child');
    it('Testeo que muestre el header mobile', () => {
        expect(componentMobile.find('mocked-mobile-header')).toBeTruthy();
        expect(componentMobile.find('mocked-mobile-navbar')).toBeTruthy();
    }); */

    it('Shows user menu on the top right corner when logged in', () => {
        const componentDesktop = mount(
            <Header screenUtils={desktopSU} logueado {...siteProperties}>
                {child}
            </Header>
        );
        expect(componentDesktop.find('ul.com-desplegable')).toBeTruthy();
    });

    it("Doesn't show user menu when logged out", () => {
        const componentDesktop = mount(
            <Header screenUtils={desktopSU} {...siteProperties}>
                {child}
            </Header>
        );
        expect(componentDesktop.find('ul.com-desplegable')).toHaveLength(0);
    });

    it('Renders with subscribed user', () => {
        const componentDesktop = mount(
            <Header
                screenUtils={desktopSU}
                logueado={true}
                loginData={{
                    subscription: true,
                    userName: 'Pedro Perez'
                }}
                {...siteProperties}
            >
                {child}
            </Header>
        );

        expect(componentDesktop.props().logueado).toEqual(true);
        expect(componentDesktop.props().loginData.subscription).toEqual(true);
        expect(componentDesktop.props().loginData.userName).toEqual(
            'Pedro Perez'
        );
    });

    it('Renders without subscribed user', () => {
        const componentDesktop = mount(
            <Header
                screenUtils={desktopSU}
                logueado={true}
                loginData={{
                    subscription: false,
                    userName: 'Pedro Perez'
                }}
                {...siteProperties}
            >
                {child}
            </Header>
        );

        expect(componentDesktop.props().logueado).toEqual(true);
        expect(componentDesktop.props().loginData.subscription).toEqual(false);
        expect(componentDesktop.props().loginData.userName).toEqual(
            'Pedro Perez'
        );
    });
});
