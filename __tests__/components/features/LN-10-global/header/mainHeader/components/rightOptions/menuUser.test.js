import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { getMenuUser } from '../../../../../../../../components/features/LN-10-global/header/mainHeader/_helper';
import { useHeaderContext } from '../../../../../../../../components/features/LN-10-global/header/context';
import { MenuUser } from '../../../../../../../../components/features/LN-10-global/header/mainHeader/components/rightOptions/menuUser';

jest.mock(
    '../../../../../../../../components/features/LN-10-global/header/mainHeader/_helper',
    () => {
        return {
            getMenuUser: jest.fn(() => [
                {
                    url: 'https://www.lanacion.com.ar/mis-notas/',
                    text: 'Mis notas mock',
                    title: 'Ir a mis notas',
                    target: '_self'
                },
                {
                    url: 'https://micuenta.lanacion.com.ar/',
                    text: 'Mi cuenta',
                    title: 'Ir a mi cuenta',
                    target: '_self'
                },
                {
                    url: 'https://micuenta.lanacion.com.ar/datos-personales/',
                    text: 'Mis datos',
                    title: 'Ir a mis datos',
                    target: '_self'
                },
                {
                    url: 'https://micuenta.lanacion.com.ar/',
                    text: 'Mis suscripciones',
                    title: 'Ir a mis suscripciones',
                    target: '_self'
                },
                {
                    url: '#',
                    text: 'Cerrar sesión',
                    title: 'Cerrar sesión',
                    target: '_self',
                    callback: jest.fn()
                }
            ])
        };
    }
);

jest.mock(
    '../../../../../../../../components/features/LN-10-global/header/context',
    () => {
        return {
            useHeaderContext: jest.fn()
        };
    }
);
jest.mock('react', () => {
    const ActualReact = jest.requireActual('react');
    return {
        ...ActualReact,
        useContext: () => ({
            dispatch: jest.fn()
        })
    };
});

describe('components - features - LN-10-global - header - mainHeader - rightOptions - MenuUser', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });
    it('should return a fragment when the user is not logged in', () => {
        useHeaderContext.mockImplementationOnce(() => ({
            userType: 'unlogged'
        }));
        const { container } = render(<MenuUser />);
        expect(container).toBeEmptyDOMElement();
    });

    it('should return a fragment when menuUserData is empty', () => {
        useHeaderContext.mockImplementationOnce(() => ({
            userType: 'logged'
        }));
        getMenuUser.mockImplementationOnce(() => []);
        const { container } = render(<MenuUser />);
        expect(container).toBeEmptyDOMElement();
    });
    it('should match snapshot when userType is logged', () => {
        useHeaderContext.mockImplementationOnce(() => ({
            userType: 'logged'
        }));
        const { container } = render(<MenuUser />);
        expect(container).toMatchSnapshot();
    });
    it('should match snapshot when userType is subscribed', () => {
        useHeaderContext.mockImplementationOnce(() => ({
            userType: 'subscribed'
        }));
        const { container } = render(<MenuUser />);
        expect(container).toMatchSnapshot();
    });
});
