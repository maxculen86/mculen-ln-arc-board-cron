import React from 'react';
import { render, screen } from '@testing-library/react';
import BellButton from '../../../../../../../../components/features/foodit-global/common/Header/components/rightOptions/bellButton';

jest.mock('fusion:environment', () => ({
    SITIO_SEGURO_REGISTRACION: 'https://suscripciones.lanacion.com.ar',
    FOODIT_LOGIN_URL: 'https://foodit.lanacion.com.ar/',
    API_ENV: 'prod'
}));

describe('Components - Features - foodit-global - Common - Header - component - rightOptions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should render bell', async () => {
        const { container } = render(<BellButton />);
        screen.getByRole('button', { name: 'Abrir Notificaciones' });

        expect(container).toMatchSnapshot();
    });
});
