import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import BellButton from '../../../../../../../../components/features/foodit-global/common/Header/components/rightOptions/bellButton';

jest.mock('fusion:environment', () => ({
    SITIO_SEGURO_REGISTRACION: 'https://suscripciones.lanacion.com.ar',
    FOODIT_LOGIN_URL: 'https://foodit.lanacion.com.ar/',
    API_ENV: 'prod'
}));

jest.useFakeTimers();

describe('Components - Features - foodit-global - Common - Header - component - rightOptions', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        localStorage.clear();
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it('should render bell', async () => {
        const { container } = render(<BellButton />);
        await waitFor(() => {
            expect(
                screen.getAllByText(
                    'Aquí encontrarás todas nuestras notificaciones'
                )
            ).toHaveLength(1);
            expect(screen.getByRole('tooltip')).toHaveAttribute(
                'data-visible',
                'true'
            );
            expect(localStorage.getItem('tooltip')).toBe(null);
            expect(container).toMatchSnapshot();
        });
    });

    it('should hide tooltip after 3 seconds', async () => {
        render(<BellButton />);
        jest.advanceTimersByTime(3000);
        await waitFor(() => {
            expect(localStorage.getItem('tooltip')).toBe('hide');
        });
    });

    it('should not show tooltip if localStorage is hide', () => {
        localStorage.setItem('tooltip', 'hide');
        render(<BellButton />);
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
});
