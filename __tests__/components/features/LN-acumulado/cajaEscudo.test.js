// Importaciones necesarias
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CajaEscudo from '../../../../components/features/LN-acumulado/cajaEscudo';
import SHIELD_DATA from '../../../../__mocks__/data/shields/shields';

// Mock de useContent
jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

// Mock del componente ModShield
jest.mock(
    '../../../../components/private/common/mod-shield',
    () => ({ data, title }) => <div data-testid="mod-shield">{title}</div>
);

describe('Features - LN-acumulado - Caja Escudo Feature', () => {
    describe('with a valid response', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should render ModShield component with correctly props', () => {
            require('fusion:content').useContent.mockImplementation(
                () => SHIELD_DATA
            );

            render(<CajaEscudo />);

            const modShieldComponent = screen.getByTestId('mod-shield');
            expect(modShieldComponent).toHaveTextContent(SHIELD_DATA.title);
        });
    });
});
