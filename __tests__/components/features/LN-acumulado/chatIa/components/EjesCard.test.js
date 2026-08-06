import React from 'react';
import { render, screen } from '@testing-library/react';
import { EjesCard } from '../../../../../../components/features/LN-acumulado/chatIa/components/EjesCard';

jest.mock('../../../../../../components/features/ui/ln/icon/default', () => ({
    __esModule: true,
    default: ({ name }) => <span data-testid={`icon-${name}`} />
}));

describe('EjesCard', () => {
    describe('links', () => {
        it('should point the first card to the tournament simulator', () => {
            render(<EjesCard />);

            expect(screen.getAllByRole('link')[0]).toHaveAttribute(
                'href',
                'https://canchallena.lanacion.com.ar/especiales/deportes/futbol/simulador-del-mundial-2026-nid05122025/'
            );
        });

        it('should point the second card to the fixture', () => {
            render(<EjesCard />);

            expect(screen.getAllByRole('link')[1]).toHaveAttribute(
                'href',
                'https://canchallena.lanacion.com.ar/futbol/mundial/fixture/'
            );
        });
    });

    describe('descriptions', () => {
        it('should describe the simulator card', () => {
            render(<EjesCard />);

            expect(
                screen.getByText('Cómo quedarían los cruces')
            ).toBeInTheDocument();
        });

        it('should describe the fixture card', () => {
            render(<EjesCard />);

            expect(screen.getByText('Calendario completo')).toBeInTheDocument();
        });
    });

    describe('snapshots', () => {
        it('should match snapshot with default props', () => {
            const { container } = render(<EjesCard />);
            expect(container.firstChild).toMatchSnapshot();
        });
    });
});
