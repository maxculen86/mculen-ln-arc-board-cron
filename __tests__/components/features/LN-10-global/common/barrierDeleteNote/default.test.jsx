import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BarrierDeleteNote from '../../../../../../components/features/LN-10-global/common/barrierDeleteNote/default';

jest.mock(
    '../../../../../../components/private/common/utils/bookmarkHelper',
    () => ({
        __esModule: true,
        default: jest.fn(() =>
            Promise.resolve({ status: 200, bookmarkContent: null })
        )
    })
);

describe('Features - LN-10-Global - Common - BarrierDeleteNote - default', () => {
    const mockProps = {
        closeBarrier: jest.fn(),
        bookmarkId: '2d67ad69-1f2d-4123-bf91-7c69efe2f895',
        deleteArticle: jest.fn(),
        substractOne: jest.fn(),
        onOperationComplete: jest.fn(),
        openToast: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        const { container } = render(<BarrierDeleteNote {...mockProps} />);

        expect(screen.getByTitle('Cerrar')).toBeInTheDocument();
        expect(screen.getByText('Borrar nota guardada')).toBeInTheDocument();
        expect(
            screen.getByText('La nota se eliminará del listado.')
        ).toBeInTheDocument();
        expect(screen.getByTitle('Cancelar')).toBeInTheDocument();
        expect(screen.getByTitle('Confirmar')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('calls closeBarrier when close button is clicked', () => {
        render(<BarrierDeleteNote {...mockProps} />);
        fireEvent.click(screen.getByTitle('Cerrar'));
        expect(mockProps.closeBarrier).toHaveBeenCalledTimes(1);
    });

    it('calls closeBarrier when cancel button is clicked', () => {
        render(<BarrierDeleteNote {...mockProps} />);
        fireEvent.click(screen.getByTitle('Cancelar'));
        expect(mockProps.closeBarrier).toHaveBeenCalledTimes(1);
    });

    it('calls necessary functions when confirm button is clicked', async () => {
        render(<BarrierDeleteNote {...mockProps} />);
        fireEvent.click(screen.getByTitle('Confirmar'));

        await waitFor(() => {
            expect(mockProps.deleteArticle).toHaveBeenCalledWith(
                '2d67ad69-1f2d-4123-bf91-7c69efe2f895'
            );
            expect(mockProps.substractOne).toHaveBeenCalledTimes(1);
            expect(mockProps.onOperationComplete).toHaveBeenCalledWith(
                200,
                null
            );
            expect(mockProps.closeBarrier).toHaveBeenCalledTimes(1);
            expect(mockProps.openToast).toHaveBeenCalledTimes(1);
        });
    });

    it('does not call deleteArticle and substractOne when toggleBookmark fails', async () => {
        const toggleBookmark =
            require('../../../../../../components/private/common/utils/bookmarkHelper').default;
        toggleBookmark.mockImplementationOnce(() =>
            Promise.resolve({ status: 500, bookmarkContent: null })
        );

        render(<BarrierDeleteNote {...mockProps} />);
        fireEvent.click(screen.getByTitle('Confirmar'));

        await waitFor(() => {
            expect(mockProps.deleteArticle).not.toHaveBeenCalled();
            expect(mockProps.substractOne).not.toHaveBeenCalled();
            expect(mockProps.onOperationComplete).toHaveBeenCalledWith(
                500,
                null
            );
            expect(mockProps.closeBarrier).toHaveBeenCalledTimes(1);
            expect(mockProps.openToast).toHaveBeenCalledTimes(1);
        });
    });
});
