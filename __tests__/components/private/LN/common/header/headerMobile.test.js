import React from 'react';
import { mount } from 'enzyme';
import HeaderMobile from '../../../../../../components/private/LN/common/header/headerMobile';

let component;

const props = {
    loginData: {
        subscription: false,
        userName: 'Jhon Doe',
        goToLoginUrl: jest.fn()
    }
};

beforeEach(() => {
    component = mount(<HeaderMobile {...props} />);
});

afterEach(() => {
    component.unmount();
});

describe('HeaderMobile', () => {
    it('Renders without crashing', () => {
        expect(component.exists('.header-mobile')).toBe(true);
    });

    it('Displays subscription button smoothly', () => {
        const button = component.find('a').last();
        expect(button.text()).toMatch('Suscribite');
    });
});
