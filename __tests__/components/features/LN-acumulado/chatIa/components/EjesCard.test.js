import React from 'react';
import { render, screen } from '@testing-library/react';
import { EjesCard } from '../../../../../../components/layouts/LN-acumulado/chat/components/EjesCard';

jest.mock('../../../../../features/ui/ln/icon/default', () => ({
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
            'https://canchallena.lanacion.com.ar/futbol/mundial/llaves/'
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
