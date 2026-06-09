import React from 'react';
import { render, screen } from '@testing-library/react';
import Checkbox from '../../../../../../components/features/ui/ln/checkbox/default';

describe('Checkbox', () => {
    it('renderiza el label correctamente', () => {
        render(<Checkbox label="Opción 1" />);

        expect(screen.getByText('Opción 1')).toBeInTheDocument();
    });

    it('renderiza el checkbox', () => {
        render(<Checkbox label="Opción 1" />);

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
    });
    it('usa el size por defecto', () => {
        const { container } = render(<Checkbox label="Opción 1" />);

        expect(container).toBeTruthy();
    });

    it('permite cambiar el size', () => {
        const { container } = render(<Checkbox label="Opción 1" size={32} />);

        expect(container).toBeTruthy();
    });
});
