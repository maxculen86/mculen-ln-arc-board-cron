import React from 'react';
import { NavBar } from '../../../../../../components/features/LN-10-global/header/navBar/default';
import { useHeaderContext } from '../../../../../../components/features/LN-10-global/header/context';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

jest.mock(
    '../../../../../../components/features/LN-10-global/header/context',
    () => {
        return {
            useHeaderContext: jest.fn()
        };
    }
);
jest.mock('fusion:environment', () => {
    return {
        SITE_LANACION: 'https://www.lanacion.com.ar',
        SITIO_SEGURO_REGISTRACION: 'https://suscripciones.lanacion.com.ar',
        MY_ACCOUNT_URL: 'https://myaccount.lanacion.com.ar'
    };
});

describe('components - features - LN-10-global - header - navbar', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });
    it('should render "Mis notas" button when user is subscribed', () => {
        useHeaderContext.mockImplementationOnce(() => ({
            isHome: true,
            userType: 'subscribed'
        }));

        const { getByText } = render(<NavBar />);

        expect(getByText('Mis Notas')).toBeInTheDocument();
    });

    it('should render Club LN button when user is not subscribed', () => {
        useHeaderContext.mockImplementationOnce(() => ({
            isHome: false,
            userType: 'unlogged'
        }));
        const { getByText } = render(<NavBar />);

        expect(getByText('Club LN')).toBeInTheDocument();
    });
    it('should render "Home, "Sections" and "Profile" button regardless of the userType', () => {
        useHeaderContext.mockImplementationOnce(() => ({
            isHome: false,
            userType: 'subscribed'
        }));
        const { getByText } = render(<NavBar />);

        expect(getByText('Inicio')).toBeInTheDocument();
        expect(getByText('Secciones')).toBeInTheDocument();
        expect(getByText('Perfil')).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        useHeaderContext.mockImplementationOnce(() => ({
            isHome: false,
            userType: 'subscribed'
        }));
        const { container } = render(<NavBar />);
        expect(container).toMatchSnapshot();
    });
});
