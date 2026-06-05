import React from 'react';
import { render, screen } from '@testing-library/react';
import Chip from '../../../../../../components/features/ui/ln/chips/default';

describe('Chip', () => {
    it('render content correctly', () => {
        render(<Chip>Chip de prueba</Chip>);

        expect(screen.getByText('Chip de prueba')).toBeInTheDocument();
    });

    it('render component', () => {
        const { container } = render(<Chip>Chip de prueba</Chip>);

        expect(container).toBeTruthy();
    });

    it('receive props correctly', () => {
        render(<Chip data-testid="custom-chip">Chip de prueba</Chip>);

        expect(screen.getByTestId('custom-chip')).toBeInTheDocument();
    });
});
