import React from 'react';
import { NavBar } from '../../../../../../components/features/LN-10-global/header/navBar/default';
import { useHeaderContext } from '../../../../../../components/features/LN-10-global/header/context';
import { render } from '@testing-library/react';
import useTermica from '../../../../../../components/private/common/hooks/useTermica';
import '@testing-library/jest-dom/extend-expect';

jest.mock(
    '../../../../../../components/features/LN-10-global/header/context',
    () => {
        return {
            useHeaderContext: jest.fn()
        };
    }
);
jest.mock('../../../../../../components/private/common/hooks/useTermica', () =>
    jest.fn()
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

    useTermica.mockImplementation(() => true);
    useHeaderContext.mockImplementation(() => ({
        isHome: true,
        userType: 'subscribed',
        isSubscribed: true
    }));
    it('should render "Mis notas" button when user is subscribed', () => {
        const { getByText } = render(<NavBar />);

        expect(getByText('Mis Notas')).toBeInTheDocument();
    });

    it('should render Club LN button when user is not subscribed', () => {
        useHeaderContext.mockImplementation(() => ({
            isHome: false,
            userType: 'unlogged',
            isSubscribed: false
        }));
        const { getByText } = render(<NavBar />);

        expect(getByText('Club LN')).toBeInTheDocument();
    });
    it('should render "Home, "Sections" and "Profile" button regardless of the userType', () => {
        useHeaderContext.mockImplementation(() => ({
            isHome: false,
            userType: 'subscribed',
            isSubscribed: true
        }));
        const { getByText } = render(<NavBar />);

        expect(getByText('Inicio')).toBeInTheDocument();
        expect(getByText('Secciones')).toBeInTheDocument();
        expect(getByText('Perfil')).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        useHeaderContext.mockImplementation(() => ({
            isHome: false,
            userType: 'subscribed',
            isSubscribed: true
        }));
        const { container } = render(<NavBar />);
        expect(container).toMatchSnapshot();
    });
});
