import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import MainHeader from '../../../../../components/private/LN10/mainHeader/';
import { logoCallback } from '../../../../../components/private/LN10/mainHeader/_helper';
import Context from 'fusion:context';

jest.mock('react', () => {
    const ActualReact = require.requireActual('react');
    return {
        ...ActualReact,
        useContext: () => ({
            state: {
                loginData: {
                    subscription: true
                }
            },
            dispatch: jest.fn()
        })
    };
});

const intersectionObserverMock = () => ({
    observe: () => null
});
window.IntersectionObserver = jest
    .fn()
    .mockImplementation(intersectionObserverMock);

jest.mock('../../../../../components/private/LN10/mainHeader/_helper', () => ({
    ...jest.requireActual(
        '../../../../../components/private/LN10/mainHeader/_helper'
    ),
    setDesplegableData: jest.fn(),
    logoCallback: jest.fn()
}));

jest.mock(
    '../../../../../components/private/LN/common/utils/contextHelper',
    () => ({
        getLoginData: jest.fn(),
        isLoggedIn: jest.fn()
    })
);

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};
        return props.children(mockAvailableProps);
    }
}));

jest.mock(
    '../../../../../components/private/common/scriptManager/MainHeaderEventsScript',
    () => {
        return jest.fn(() => <div id="mock-main-header-events-script" />);
    }
);

describe('Private - LN10 - MainHeader', () => {
    Context.useAppContext = jest.fn(() => ({}));

    test('should renders with empty state', () => {
        expect(render(<MainHeader />)).toBeTruthy();
    });

    test('should renders with LN logo', () => {
        const { container } = render(<MainHeader userType="logged" />);
        const logo = container.querySelector('.logo-header');

        fireEvent.click(logo);

        expect(logo).toBeInTheDocument();
        expect(logoCallback).toHaveBeenCalledTimes(1);
    });

    test('should have logo banner header', () => {
        const { container } = render(<MainHeader userType="logged" />);

        const banners = [
            '#logo_header_dsk',
            '#logo_header_dsk_sticky',
            '#logo_header_mob',
            '#logo_header_tab'
        ];

        banners.forEach(banner => {
            expect(container.querySelector(banner)).toBeInTheDocument();
        });
    });
});
