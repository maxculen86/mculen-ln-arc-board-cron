import React from 'react';
import { render, screen } from '@testing-library/react';
import LinkedSummaryCardSmall from 'features/LN-nota/bodyCards/components/LinkedSummaryCardSmall';

const createCardData = configOverrides => ({
    embed: {
        config: {
            cardNumber: 1,
            title: 'Título de prueba',
            description: 'Descripción de la card',
            buttonText: 'Ver más',
            cardId: 'card-1',
            ...configOverrides
        }
    }
});

describe('LinkedSummaryCardSmall', () => {
    it('applies the card color provided by the power-up', () => {
        const color = '#7267C3';
        render(
            <LinkedSummaryCardSmall
                data={createCardData({ cardColor: color })}
                variant="collapsed"
            />
        );

        expect(screen.getByTestId('linked-card')).toHaveStyle(
            `border-top-color: ${color}`
        );
    });

    it('uses default color when no cardColor is provided', () => {
        render(
            <LinkedSummaryCardSmall
                data={createCardData({})}
                variant="collapsed"
            />
        );
        const card = screen.getByTestId('linked-card');
        expect(card).toHaveStyle('border-top-color: #000000');
    });

    it('renders the provided content', () => {
        render(
            <LinkedSummaryCardSmall
                data={createCardData({ cardColor: '#008561' })}
                variant="collapsed"
            />
        );

        expect(screen.getByText('Título de prueba')).toBeInTheDocument();
        expect(screen.getByText('Descripción de la card')).toBeInTheDocument();
        expect(screen.getByText('Ver más')).toBeInTheDocument();
    });
});
