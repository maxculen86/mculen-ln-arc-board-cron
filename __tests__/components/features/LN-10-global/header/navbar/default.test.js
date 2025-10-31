import React from 'react';
import { NavBar } from '../../../../../../components/features/LN-10-global/header/navBar/default';
import { useHeaderContext } from '../../../../../../components/features/LN-10-global/header/context';
import { render } from '@testing-library/react';
import useTermica from '../../../../../../components/private/common/hooks/useTermica';
import '@testing-library/jest-dom';

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
        MY_ACCOUNT_URL: 'https://micuenta.lanacion.com.ar'
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
        isSubscribed: true,
        toggleDesplegable: jest.fn()
    }));

    it('should render "Home, "Sections", "Profile", "Club LN", "Foodit" buttons regardless of the userType', () => {
        useHeaderContext.mockImplementation(() => ({
            isHome: false,
            userType: 'subscribed',
            isSubscribed: true
        }));
        const { getByText } = render(<NavBar />);

        expect(getByText('Inicio')).toBeInTheDocument();
        expect(getByText('Secciones')).toBeInTheDocument();
        expect(getByText('Foodit')).toBeInTheDocument();
        expect(getByText('Club LN')).toBeInTheDocument();
        expect(getByText('Mi cuenta')).toBeInTheDocument();
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
