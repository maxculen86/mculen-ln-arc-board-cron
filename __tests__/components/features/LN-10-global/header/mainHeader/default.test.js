import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import MainHeaderLN from '../../../../../../components/features/LN-10-global/header/mainHeader/default';

jest.mock(
    '../../../../../../components/features/LN-10-global/header/context',
    () => ({
        useHeaderContext: jest.fn(() => ({
            wrapperMainHeaderClassNames: 'wrapper-class',
            mainHeaderClassNames: 'main-header-class',
            mainHeaderContentClassNames: 'content-class',
            centerOptionsClassNames: 'center-options-class',
            loading: false,
            negative: false,
            userType: 'unlogged',
            userName: '',
            userEmail: '',
            userLastName: '',
            isHome: false,
            sticky: false,
            goToLoginUrl: jest.fn()
        })),
        HeaderContext: {},
        HeaderProvider: ({ children }) => children
    })
);

jest.mock('fusion:environment', () => {
    return {
        SITE_LANACION: 'https://www.lanacion.com.ar',
        MY_ACCOUNT_URL: 'https://micuenta.lanacion.com.ar',
        LOGIN_URL:
            'https://ingresar.lanacion.com.ar/login/ingresar/D/1/?callback='
    };
});

const intersectionObserverMock = () => ({
    observe: () => null
});
window.IntersectionObserver = jest
    .fn()
    .mockImplementation(intersectionObserverMock);

jest.mock(
    '../../../../../../components/features/LN-10-global/header/mainHeader/_helper',
    () => ({
        ...jest.requireActual(
            '../../../../../../components/features/LN-10-global/header/mainHeader/_helper'
        ),
        setDesplegableData: jest.fn(),
        logoCallback: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/private/common/scriptManager/MainHeaderEventsScript',
    () => {
        return jest.fn(() => <div id="mock-main-header-events-script" />);
    }
);

jest.mock(
    '../../../../../../components/features/LN-10-global/header/mainHeader/components/rightOptions/bellButton',
    () => {
        return jest.fn(() => <div id="mock-bell-button" />);
    }
);

jest.mock(
    '../../../../../../components/features/LN-10-global/header/mainHeader/components/SearchLN',
    () => {
        return jest.fn(() => <div id="mock-search-ln" />);
    }
);

describe('components - features - LN-10-global - header - mainHeader - default', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<MainHeaderLN />);
        expect(baseElement).toBeTruthy();
    });

    it('should match snapshot', () => {
        const { container } = render(<MainHeaderLN />);
        expect(container).toMatchSnapshot();
    });
});
