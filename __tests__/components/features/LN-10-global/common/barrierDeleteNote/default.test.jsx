import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BarrierDeleteNote from '../../../../../../components/features/LN-10-global/common/barrierDeleteNote/default';
import renderToasts from '../../../../../../components/features/ui/ln/toastsContainer/renderToast';
import * as bookmarkHelper from '../../../../../../components/private/common/utils/bookmarkHelper';
import { addEventToDataLayerV2 } from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../../components/private/common/utils/bookmarkHelper',
    () => ({
        __esModule: true,
        default: jest.fn(() =>
            Promise.resolve({ status: 200, bookmarkContent: null })
        ),
        getStatusMessage: jest.fn(() => ({
            color: 'success',
            title: '¡Listo!',
            description: 'Nota eliminada'
        }))
    })
);

jest.mock(
    '../../../../../../components/features/ui/ln/toastsContainer/renderToast',
    () => jest.fn()
);

jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        __esModule: true,
        addEventToDataLayerV2: jest.fn()
    })
);

describe('Features - LN-10-Global - Common - BarrierDeleteNote - default', () => {
    const mockProps = {
        closeBarrier: jest.fn(),
        bookmarkId: '2d67ad69-1f2d-4123-bf91-7c69efe2f895',
        deleteArticle: jest.fn(),
        substractOne: jest.fn()
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
            expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                event: 'e_linkclick',
                action: 'toolbard',
                category: 'nota_ln9',
                label: 'eliminar_nota_guardada'
            });
            expect(mockProps.substractOne).toHaveBeenCalledTimes(1);

            expect(mockProps.closeBarrier).toHaveBeenCalledTimes(1);
            expect(renderToasts).toHaveBeenCalledWith({
                title: '¡Listo!',
                description: 'Nota eliminada',
                color: 'success',
                buttonProps: undefined
            });
        });
    });

    it('does not call deleteArticle and substractOne when toggleBookmark fails', async () => {
        bookmarkHelper.default.mockImplementationOnce(() =>
            Promise.resolve({ status: 500, bookmarkContent: null })
        );
        bookmarkHelper.getStatusMessage.mockImplementationOnce(() => ({
            title: '¡Ups!',
            color: 'error',
            description: 'Hubo un problema de conexión. Reintenta más tarde.'
        }));

        render(<BarrierDeleteNote {...mockProps} />);
        fireEvent.click(screen.getByTitle('Confirmar'));

        await waitFor(() => {
            expect(mockProps.deleteArticle).not.toHaveBeenCalled();
            expect(mockProps.substractOne).not.toHaveBeenCalled();
            expect(mockProps.closeBarrier).toHaveBeenCalledTimes(1);
            expect(renderToasts).toHaveBeenCalledWith({
                title: '¡Ups!',
                description:
                    'Hubo un problema de conexión. Reintenta más tarde.',
                color: 'error',
                buttonProps: undefined
            });
        });
    });
});
