import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ModalRemoveIngredient } from '../../../../../../../components/features/foodit-global/common/Modals/RemoveIngredients/foodit';

const mockClose = jest.fn();

jest.mock(
    '../../../../../../../components/features/foodit-global/common/Modals/RemoveIngredients/hooks/usePopupHandling',
    () => ({
        usePopupHandling: () => ({
            close: mockClose,
            modalData: { show: true, data: {} }
        })
    })
);
jest.mock(
    '../../../../../../../components/features/foodit-global/common/shoppingList/hooks/useShoppingList',
    () => ({
        useShoppingList: () => ({
            shoppingList: []
        })
    })
);

describe('ModalRemoveIngredient Component', () => {
    HTMLDialogElement.prototype.showModal = jest.fn();

    it('should call close method when close button is clicked', () => {
        const { getByLabelText } = render(<ModalRemoveIngredient />);
        const closeButton = getByLabelText('Cerrar');
        fireEvent.click(closeButton);
        expect(mockClose).toHaveBeenCalled();
    });

    it('should call close method when cancel button is clicked', () => {
        const { getByText } = render(<ModalRemoveIngredient />);
        const cancelButton = getByText(/cancelar/i);
        fireEvent.click(cancelButton);
        expect(mockClose).toHaveBeenCalled();
    });
});
