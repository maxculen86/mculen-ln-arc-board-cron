import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ActionsButtons from '../../../../../../components/features/foodit-global/common/ActionsButtons/foodit';

describe('ActionsButtons component', () => {
    it('should renders share button when enabled', () => {
        render(<ActionsButtons article={{}} />);
        expect(screen.getAllByRole('button')).toHaveLength(8);
        expect(screen.getByTitle('Comentarios')).toBeInTheDocument();
        expect(screen.getByTitle('Imprimir')).toBeInTheDocument();
        expect(screen.getByTitle('Copiar')).toBeInTheDocument();
    });
});
