import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { NewsletterSelectionButton } from '../../../../../../components/features/foodit-global/common/Newsletter/components/NewsletterSelectionButton';

let mockIsOpen = true;

jest.mock('@ln/ds-common-drawer', () => ({
    useDrawerVisibility: () => ({ isOpen: mockIsOpen })
}));

jest.mock(
    '../../../../../../components/features/foodit-global/common/DrawerSections/helpers',
    () => ({
        DRAWERS_ID: { SECTIONS: 'drawer-newsletter' }
    })
);

jest.mock(
    '../../../../../../components/features/foodit-global/common/Newsletter/components/NewsletterActionButtons',
    () => ({
        NewsletterActionButton: ({ selected, onClick, labelOn, labelOff }) => (
            <button data-testid="action-button" onClick={onClick}>
                {selected ? labelOn : labelOff}
            </button>
        )
    })
);

describe('NewsletterSelectionButton', () => {
    beforeEach(() => {
        mockIsOpen = true;
    });

    it('renders in unselected state by default', () => {
        render(
            <NewsletterSelectionButton id={243} title="Planifica tu semana" />
        );
        expect(screen.getByText('Seleccionar')).toBeInTheDocument();
    });

    it('toggles to selected state on click', () => {
        render(
            <NewsletterSelectionButton id={243} title="Planifica tu semana" />
        );

        fireEvent.click(screen.getByTestId('action-button'));
        expect(screen.getByText('Seleccionado')).toBeInTheDocument();
    });

    it('toggles back to unselected on second click', () => {
        render(
            <NewsletterSelectionButton id={243} title="Planifica tu semana" />
        );

        fireEvent.click(screen.getByTestId('action-button'));
        fireEvent.click(screen.getByTestId('action-button'));
        expect(screen.getByText('Seleccionar')).toBeInTheDocument();
    });

    it('dispatches newsletterSelected event with correct detail when selecting', () => {
        const listener = jest.fn();
        window.addEventListener('newsletterSelected', listener);

        render(
            <NewsletterSelectionButton id={243} title="Planifica tu semana" />
        );
        fireEvent.click(screen.getByTestId('action-button'));

        expect(listener).toHaveBeenCalledTimes(1);
        expect(listener.mock.calls[0][0].detail).toEqual({
            id: 243,
            title: 'Planifica tu semana',
            selected: true
        });

        window.removeEventListener('newsletterSelected', listener);
    });

    it('dispatches newsletterSelected event with selected: false when deselecting', () => {
        const listener = jest.fn();
        window.addEventListener('newsletterSelected', listener);

        render(
            <NewsletterSelectionButton id={243} title="Planifica tu semana" />
        );
        fireEvent.click(screen.getByTestId('action-button'));
        fireEvent.click(screen.getByTestId('action-button'));

        expect(listener.mock.calls[1][0].detail.selected).toBe(false);

        window.removeEventListener('newsletterSelected', listener);
    });

    it('resets to unselected when drawer closes', () => {
        const { rerender } = render(
            <NewsletterSelectionButton id={243} title="Planifica tu semana" />
        );

        fireEvent.click(screen.getByTestId('action-button'));
        expect(screen.getByText('Seleccionado')).toBeInTheDocument();

        mockIsOpen = false;
        rerender(
            <NewsletterSelectionButton id={243} title="Planifica tu semana" />
        );

        expect(screen.getByText('Seleccionar')).toBeInTheDocument();
    });
});
