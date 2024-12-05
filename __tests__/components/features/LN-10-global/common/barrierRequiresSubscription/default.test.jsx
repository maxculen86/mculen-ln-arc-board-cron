import React from 'react';
import { render, screen } from '@testing-library/react';
import BarrierRequiresSubscription from '../../../../../../components/features/LN-10-global/common/barrierRequiresSubscription/default';

jest.mock(
    '../../../../../../components/features/LN-10-global/common/barrierRequiresSubscription/_config',
    () => ({
        title: 'Para realizar esta acción adquirí una suscripción.',
        button: {
            label: 'suscribirme',
            style: '--tertiary',
            href: 'https://suscripciones.lanacion.com.ar/suscribirme?cv=670&fc=744&callback='
        },
        unLogged: {
            text: '¿Ya sos suscriptor?',
            textLink: 'Iniciar sesión',
            href: 'https://login.lanacion.com.ar/?callback='
        },
        logged: {
            text: '¿Tenés Club LA NACION Black o Premium?',
            textLink: 'Vincular credencial',
            href: 'https://checkout.lanacion.com.ar/suscripcion/C/111/?cv=670&fc=744&productCategory=Voluntario&callback='
        }
    })
);

describe('BarrierRequiresSubscription', () => {
    const closeBarrier = jest.fn();
    const btoaMockString = 'aHR0cDovL2xvY2FsaG9zdC8=';

    global.btoa = jest.fn(() => btoaMockString);

    const suscripcionesUrl = `https://suscripciones.lanacion.com.ar/suscribirme?cv=670&fc=744&callback=${btoaMockString}`;
    const loginUrl = `https://login.lanacion.com.ar/?callback=${btoaMockString}`;
    const vincularCredencialUrl = `https://checkout.lanacion.com.ar/suscripcion/C/111/?cv=670&fc=744&productCategory=Voluntario&callback=${btoaMockString}`;

    it('should render title correctly', () => {
        render(
            <BarrierRequiresSubscription
                isLogged={false}
                closeBarrier={closeBarrier}
            />
        );
        const title = screen.getByText(
            'Para realizar esta acción adquirí una suscripción.'
        );
        expect(title).toBeInTheDocument();
    });

    it('should redirects to the subscription link when link is clicked', () => {
        render(
            <BarrierRequiresSubscription
                isLogged={false}
                closeBarrier={closeBarrier}
            />
        );

        const suscribirmeLink = screen.getByRole('link', {
            name: /suscribirme/i
        });

        expect(suscribirmeLink).toHaveAttribute('href', suscripcionesUrl);
    });

    it('should render unlogged message and link when user is not logged in', () => {
        render(
            <BarrierRequiresSubscription
                isLogged={false}
                closeBarrier={closeBarrier}
            />
        );

        const unLoggedMessage = screen.getByText('¿Ya sos suscriptor?');
        const unLoggedLink = screen.getByRole('link', {
            name: /Iniciar sesión/i
        });

        expect(unLoggedMessage).toBeInTheDocument();
        expect(unLoggedLink).toHaveAttribute('href', loginUrl);
    });

    it('should render logged message when user is logged in, and show href correctly', () => {
        render(
            <BarrierRequiresSubscription
                isLogged={true}
                closeBarrier={closeBarrier}
            />
        );
        const loggedMessage = screen.getByText(
            '¿Tenés Club LA NACION Black o Premium?'
        );
        const linkVincularCredencial = screen.getByRole('link', {
            name: /Vincular credencial/i
        });

        expect(loggedMessage).toBeInTheDocument();
        expect(linkVincularCredencial).toHaveAttribute(
            'href',
            vincularCredencialUrl
        );
    });

    it('should match snapshot logged', () => {
        const { container } = render(
            <BarrierRequiresSubscription
                isLogged={true}
                closeBarrier={closeBarrier}
            />
        );
        expect(container).toMatchSnapshot();
    });

    it('should match snapshot unlogged', () => {
        const { container } = render(
            <BarrierRequiresSubscription
                isLogged={true}
                closeBarrier={closeBarrier}
            />
        );
        expect(container).toMatchSnapshot();
    });
});
