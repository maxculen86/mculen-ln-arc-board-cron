import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import MainHeaderLN from '../../../../../../components/features/LN-10-global/header/mainHeader/default';
import Context from 'fusion:context';

jest.mock('react', () => {
    const ActualReact = jest.requireActual('react');
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
jest.mock('fusion:environment', () => {
    return {
        SITE_LANACION: 'https://www.lanacion.com.ar',
        MY_ACCOUNT_URL: 'https://micuenta.lanacion.com.ar'
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

describe('components - features - LN-10-global - header - mainHeader - default', () => {
    Context.useAppContext = jest.fn(() => ({
        deployment: jest.fn()
    }));

    it('should render successfully', () => {
        const { baseElement } = render(<MainHeaderLN />);
        expect(baseElement).toBeTruthy();
    });

    it('should match snapshot', () => {
        const { container } = render(<MainHeaderLN />);
        expect(container).toMatchSnapshot();
    });
});
