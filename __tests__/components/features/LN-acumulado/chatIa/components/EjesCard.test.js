import React from 'react';
import { render, screen } from '@testing-library/react';
import { EjesCard } from '../../../../../../components/features/LN-acumulado/chatIa/components/EjesCard';

jest.mock('../../../../../../components/features/ui/ln/icon/default', () => ({
    __esModule: true,
    default: ({ name }) => <span data-testid={`icon-${name}`} />
}));

describe('EjesCard', () => {
    it('matches snapshot', () => {
        const { container } = render(<EjesCard />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('renders correct hrefs', () => {
        render(<EjesCard />);

        const links = screen.getAllByRole('link');
        expect(links[0]).toHaveAttribute(
            'href',
            'https://canchallena.lanacion.com.ar/especiales/deportes/futbol/simulador-del-mundial-2026-nid05122025/'
        );
        expect(links[1]).toHaveAttribute(
            'href',
            'https://canchallena.lanacion.com.ar/futbol/mundial/fixture/'
        );
    });

    it('renders descriptions', () => {
        render(<EjesCard />);

        expect(
            screen.getByText('Cómo quedarían los cruces')
        ).toBeInTheDocument();
        expect(screen.getByText('Calendario completo')).toBeInTheDocument();
    });
});
