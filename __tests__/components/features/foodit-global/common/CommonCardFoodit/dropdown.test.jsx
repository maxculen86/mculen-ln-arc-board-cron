import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DropdownCard } from '../../../../../../components/features/foodit-global/common/CommonCardFoodit/components/DropdownCard';

describe('DropdownCard', () => {
    it('shows dropdown items when toggle is clicked', () => {
        render(<DropdownCard />);
        fireEvent.click(screen.getByTestId('dropdown-toggle'));
        expect(screen.getByText('Mover')).toBeInTheDocument();
        expect(screen.getByText('Eliminar')).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = render(<DropdownCard />);
        expect(container).toMatchSnapshot();
    });
});
