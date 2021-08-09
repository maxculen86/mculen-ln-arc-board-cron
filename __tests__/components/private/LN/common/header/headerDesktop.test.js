import React from 'react';
import { mount } from 'enzyme';
import HeaderDesktop from '../../../../../../components/private/LN/common/header/headerDesktop';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock(
    '../../../../../../components/private/common/banners/DivBanner',
    () => 'div-banner-mock'
);
jest.mock('../../../../../../components/private/common/banners/LoadBanners');

let component;

const props = {
    logueado: true,
    loginData: {
        subscription: false,
        userName: 'Jhon Doe',
        goToLoginUrl: jest.fn()
    },
    goToLogout: jest.fn(),
    toglleDesplegable: jest.fn(),
    host: ''
};

beforeEach(() => {
    component = mount(<HeaderDesktop {...props} />);
});

afterEach(() => {
    component.unmount();
});

describe('HeaderDesktop', () => {
    it('Renders without crashing', () => {
        expect(component.exists('.header')).toBe(true);
    });

    it('Displays subscription status flawlessly', () => {
        expect(component.find('.com-usuario__valueSuscrib').text()).toMatch(
            'Sin suscripción digital'
        );
    });

    it('Calls its logout function gracefully', () => {
        const menu = component.find('ul.com-desplegable');
        const logout = menu.find('a').last();
        logout.simulate('mousedown');
        expect(props.goToLogout).toHaveBeenCalled();
    });

    it('Call its login function smoothly', () => {
        component = mount(
            <HeaderDesktop {...{ ...props, ...{ logueado: false } }} />
        );
        const login = component.find('button');
        login.at(2).simulate('click');
        expect(props.loginData.goToLoginUrl).toHaveBeenCalled();
    });
});
