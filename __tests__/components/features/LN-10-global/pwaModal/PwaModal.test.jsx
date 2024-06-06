import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import PwaModal from '../../../../../components/features/LN-10-global/pwaModal/default';
import usePwaModal from '../../../../../components/features/LN-10-global/pwaModal/usePwaModal';

jest.mock(
    '../../../../../components/features/LN-10-global/pwaModal/usePwaModal'
);

describe('PwaModal', () => {
    const mockHandleNoClick = jest.fn();
    const mockHandleYesClick = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        usePwaModal.mockReturnValue({
            handleNoClick: mockHandleNoClick,
            handleYesClick: mockHandleYesClick
        });
    });

    it('should render the modal when isShowModal is true', () => {
        usePwaModal.mockReturnValueOnce({
            isShowModal: true,
            handleNoClick: mockHandleNoClick,
            handleYesClick: mockHandleYesClick
        });

        const { container } = render(
            <PwaModal
                className="class"
                contextPath="pf/"
                deployment={path => path}
            />
        );

        expect(
            screen.getByText('¿Querés recibir notificaciones de alertas?')
        ).toBeInTheDocument();
        expect(screen.getByAltText('LA NACION')).toBeInTheDocument();
        expect(screen.getByText('No, gracias')).toBeInTheDocument();
        expect(screen.getByText('Aceptar')).toBeInTheDocument();

        expect(container).toMatchSnapshot();
    });

    it('should not render the modal when isShowModal is false', () => {
        usePwaModal.mockReturnValueOnce({
            isShowModal: false,
            handleNoClick: mockHandleNoClick,
            handleYesClick: mockHandleYesClick
        });

        const { container } = render(
            <PwaModal
                className="class"
                contextPath="pf/"
                deployment={path => path}
            />
        );

        expect(
            screen.queryByText('¿Querés recibir notificaciones de alertas?')
        ).not.toBeInTheDocument();

        expect(container).toMatchSnapshot();
    });

    it('should handle No click', () => {
        usePwaModal.mockReturnValueOnce({
            isShowModal: true,
            handleNoClick: mockHandleNoClick,
            handleYesClick: mockHandleYesClick
        });

        render(
            <PwaModal
                className="class"
                contextPath="pf/"
                deployment={path => path}
            />
        );

        fireEvent.click(screen.getByText('No, gracias'));

        expect(mockHandleNoClick).toHaveBeenCalled();
    });

    it('should handle Yes click', () => {
        usePwaModal.mockReturnValueOnce({
            isShowModal: true,
            handleNoClick: mockHandleNoClick,
            handleYesClick: mockHandleYesClick
        });

        render(
            <PwaModal
                className="class"
                contextPath="pf/"
                deployment={path => path}
            />
        );

        fireEvent.click(screen.getByText('Aceptar'));

        expect(mockHandleYesClick).toHaveBeenCalled();
    });
});
