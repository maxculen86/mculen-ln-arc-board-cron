import React from 'react';
import { render, screen } from '@testing-library/react';
import BarrierRequiresSubscription from '../../../../../../components/features/LN/common/barrierRequiresSubscription/default';

jest.mock('fusion:environment', () => ({
    LOGIN_URL: 'https://login.lanacion.com.ar/',
    SITIO_SEGURO_REGISTRACION: 'https://suscripciones.lanacion.com.ar',
    MY_ACCOUNT_URL: 'https://micuenta.lanacion.com.ar'
}));

jest.mock('fusion:context', () => ({
    useAppContext: () => ({
        contextPath: '/test',
        deployment: 'dev'
    })
}));

jest.mock(
    '../../../../../../components/private/common/utils/getAssetsPath.js',
    () => {
        return jest.fn(() => () => () => '/test/modal-suscriptores.webp');
    }
);

describe('BarrierRequiresSubscription', () => {
    const closeBarrier = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should not render when isOpen is false', () => {
        const { container } = render(
            <BarrierRequiresSubscription
                isOpen={false}
                isLogged={false}
                closeBarrier={closeBarrier}
            />
        );
        expect(container.firstChild).toBeNull();
    });

    it('should render with default message when message prop is not provided', () => {
        render(
            <BarrierRequiresSubscription
                isOpen={true}
                isLogged={false}
                closeBarrier={closeBarrier}
            />
        );
        expect(
            screen.getByText(
                'Para realizar esta acción adquirí una suscripción'
            )
        ).toBeInTheDocument();
    });

    it('should render with custom message when message prop is provided', () => {
        const customMessage = 'Para escuchar las notas, necesitás suscribirte';
        render(
            <BarrierRequiresSubscription
                isOpen={true}
                isLogged={false}
                closeBarrier={closeBarrier}
                message={customMessage}
            />
        );
        expect(screen.getByText(customMessage)).toBeInTheDocument();
    });

    it('should render unlogged footer content when isLogged is false', () => {
        render(
            <BarrierRequiresSubscription
                isOpen={true}
                isLogged={false}
                closeBarrier={closeBarrier}
            />
        );
        expect(screen.getByText('¿Ya sos suscriptor?')).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: /Iniciar sesión/i })
        ).toBeInTheDocument();
    });

    it('should render logged footer content when isLogged is true', () => {
        render(
            <BarrierRequiresSubscription
                isOpen={true}
                isLogged={true}
                closeBarrier={closeBarrier}
            />
        );
        expect(
            screen.getByText('¿Tenés Club LA NACION Black o Premium?')
        ).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: /Vincular credencial/i })
        ).toBeInTheDocument();
    });

    it('should have correct subscription button link', () => {
        render(
            <BarrierRequiresSubscription
                isOpen={true}
                isLogged={false}
                closeBarrier={closeBarrier}
            />
        );
        expect(
            screen.getByRole('link', { name: /SUSCRIBITE AHORA/i })
        ).toHaveAttribute(
            'href',
            'https://suscripciones.lanacion.com.ar/ln/suscribirme?cv=670&fc=744&callback='
        );
    });

    it('should have correct footer link for unlogged users', () => {
        render(
            <BarrierRequiresSubscription
                isOpen={true}
                isLogged={false}
                closeBarrier={closeBarrier}
            />
        );
        expect(
            screen.getByRole('link', { name: /Iniciar sesión/i })
        ).toHaveAttribute('href', 'https://login.lanacion.com.ar/');
    });

    it('should have correct footer link for logged users', () => {
        render(
            <BarrierRequiresSubscription
                isOpen={true}
                isLogged={true}
                closeBarrier={closeBarrier}
            />
        );
        expect(
            screen.getByRole('link', { name: /Vincular credencial/i })
        ).toHaveAttribute(
            'href',
            'https://micuenta.lanacion.com.ar/vincular-credencial/'
        );
    });

    it('should render different messages based on context', () => {
        const { rerender } = render(
            <BarrierRequiresSubscription
                isOpen={true}
                isLogged={false}
                closeBarrier={closeBarrier}
                message="Para escuchar las notas, necesitás suscribirte"
            />
        );
        expect(
            screen.getByText('Para escuchar las notas, necesitás suscribirte')
        ).toBeInTheDocument();

        rerender(
            <BarrierRequiresSubscription
                isOpen={true}
                isLogged={false}
                closeBarrier={closeBarrier}
                message="Para guardar tus notas, necesitás suscribirte"
            />
        );
        expect(
            screen.getByText('Para guardar tus notas, necesitás suscribirte')
        ).toBeInTheDocument();
        expect(
            screen.queryByText('Para escuchar las notas, necesitás suscribirte')
        ).not.toBeInTheDocument();
    });
});
