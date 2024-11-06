import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BarrierRequiresSubscription from '../../../../../../components/features/LN-10-global/common/barrierRequiresSubscription/default';
import CONFIG from '../../../../../../components/private/common/barrier/_config';

jest.mock(
    '../../../../../../components/private/common/barrier/_config',
    () => ({
        'exclusive-ln': {
            title: 'Para realizar esta acción adquirí una <strong> suscripción.</strong>',
            buttons: {
                label: 'suscribirme',
                style: '--tertiary',
                link: 'https://suscripciones.lanacion.com.ar/suscribirme?cv=670&fc=744&callback='
            },
            unLogged: {
                text: '¿Ya sos suscriptor?',
                textLink: 'Iniciar sesión',
                href: 'https://login.lanacion.com.ar/'
            },
            logged: {
                text: '¿Tenés Club LA NACION Black o Premium?',
                textLink: 'Vincular credencial',
                href: 'https://checkout.lanacion.com.ar/suscripcion/C/111/?cv=670&fc=744&productCategory=Voluntario&callback='
            }
        }
    })
);

describe('BarrierRequiresSubscription', () => {
    const redirectCallback = '?referrer=homepage';

    beforeAll(() => {
        global.open = jest.fn();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('renders title and subtitle correctly', () => {
        render(
            <BarrierRequiresSubscription
                redirectCallback={redirectCallback}
                isLogged={false}
            />
        );

        expect(
            screen.getByText('Para realizar esta acción adquirí una')
        ).toBeInTheDocument();
        expect(screen.getByText('suscripción.')).toBeInTheDocument();
    });

    it('displays unlogged message when user is not logged in', () => {
        render(
            <BarrierRequiresSubscription
                redirectCallback={redirectCallback}
                isLogged={false}
            />
        );

        expect(screen.getByText('¿Ya sos suscriptor?')).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: /Iniciar sesión/i })
        ).toHaveAttribute(
            'href',
            'https://login.lanacion.com.ar/?referrer=homepage'
        );
    });

    it('displays logged message when user is logged in', () => {
        render(
            <BarrierRequiresSubscription
                redirectCallback={redirectCallback}
                isLogged={true}
            />
        );

        expect(
            screen.getByText('¿Tenés Club LA NACION Black o Premium?')
        ).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: /Vincular credencial/i })
        ).toHaveAttribute(
            'href',
            'https://checkout.lanacion.com.ar/suscripcion/C/111/?cv=670&fc=744&productCategory=Voluntario&callback=?referrer=homepage'
        );
    });

    it('redirects to the subscription link when button is clicked', () => {
        render(
            <BarrierRequiresSubscription
                redirectCallback={redirectCallback}
                isLogged={false}
            />
        );

        const button = screen.getByRole('button', { name: /suscribirme/i });
        fireEvent.click(button);

        expect(global.open).toHaveBeenCalledWith(
            'https://suscripciones.lanacion.com.ar/suscribirme?cv=670&fc=744&callback=?referrer=homepage',
            '_self'
        );
    });
});
