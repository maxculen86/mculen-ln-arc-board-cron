import React from 'react';
import { render, screen } from '@testing-library/react';
import LinkedSummaryCardSmall from 'features/LN-nota/bodyCards/components/LinkedSummaryCardSmall';
import { DEFAULT_CARD_COLOR } from 'features/LN-nota/bodyCards/_utils/linkedSummaryCardsHelper';

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
            />
        );

        const card = document.querySelector('.linked-summary-card-small');
        expect(card.style.getPropertyValue('--card-accent')).toBe(color);
    });

    it('falls back to the default color when cardColor is missing', () => {
        render(<LinkedSummaryCardSmall data={createCardData()} />);

        const card = document.querySelector('.linked-summary-card-small');
        expect(card.style.getPropertyValue('--card-accent')).toBe(
            DEFAULT_CARD_COLOR
        );
    });

    it('renders the provided content', () => {
        render(
            <LinkedSummaryCardSmall
                data={createCardData({ cardColor: '#008561' })}
            />
        );

        expect(screen.getByText('Título de prueba')).toBeInTheDocument();
        expect(screen.getByText('Descripción de la card')).toBeInTheDocument();
        expect(screen.getByText('Ver más')).toBeInTheDocument();
    });
});
