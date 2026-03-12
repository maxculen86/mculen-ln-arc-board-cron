import React from 'react';
import '@testing-library/jest-dom';
import Context from 'fusion:context';
import { render, screen, fireEvent } from '@testing-library/react';
import PwaModal from '../../../../../components/features/LN-10-global/pwaModal/default';
import usePwaModal from '../../../../../components/private/common/hooks/usePwaModal';

jest.mock('../../../../../components/private/common/hooks/usePwaModal');

jest.mock('fusion:context', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

Context.useAppContext = jest.fn(() => ({
    contextPath: '/pf',
    deployment: jest.fn(),
    isAdmin: false
}));

describe('PwaModal', () => {
    const mockHandleNoClick = jest.fn();
    const mockHandleYesClick = jest.fn();
    let mockedReadyState = 'complete';

    beforeAll(() => {
        Object.defineProperty(document, 'readyState', {
            configurable: true,
            get: () => mockedReadyState
        });
    });

    beforeEach(() => {
        jest.clearAllMocks();
        mockedReadyState = 'complete';
        usePwaModal.mockReturnValue({
            isShowModal: true,
            handleNoClick: mockHandleNoClick,
            handleYesClick: mockHandleYesClick
        });
    });

    it('should render the modal when isShowModal is true', async () => {
        usePwaModal.mockReturnValue({
            isShowModal: true,
            handleNoClick: mockHandleNoClick,
            handleYesClick: mockHandleYesClick
        });

        const { container } = render(<PwaModal />);

        expect(
            await screen.findByText(
                '¿Querés recibir notificaciones de alertas?'
            )
        ).toBeInTheDocument();
        expect(screen.getByAltText('LA NACION')).toBeInTheDocument();
        expect(screen.getByText('No, gracias')).toBeInTheDocument();
        expect(screen.getByText('Aceptar')).toBeInTheDocument();

        expect(container).toMatchSnapshot();
    });

    it('should not render the modal when isShowModal is false', () => {
        usePwaModal.mockReturnValue({
            isShowModal: false,
            handleNoClick: mockHandleNoClick,
            handleYesClick: mockHandleYesClick
        });

        const { container } = render(<PwaModal />);

        expect(
            screen.queryByText('¿Querés recibir notificaciones de alertas?')
        ).not.toBeInTheDocument();

        expect(container).toMatchSnapshot();
    });

    it('should not render the modal until page load event is fired', async () => {
        mockedReadyState = 'loading';
        usePwaModal.mockReturnValue({
            isShowModal: true,
            handleNoClick: mockHandleNoClick,
            handleYesClick: mockHandleYesClick
        });

        render(<PwaModal />);

        expect(
            screen.queryByText('¿Querés recibir notificaciones de alertas?')
        ).not.toBeInTheDocument();

        fireEvent(window, new Event('load'));

        expect(
            await screen.findByText(
                '¿Querés recibir notificaciones de alertas?'
            )
        ).toBeInTheDocument();
    });

    it('should handle No click', async () => {
        usePwaModal.mockReturnValue({
            isShowModal: true,
            handleNoClick: mockHandleNoClick,
            handleYesClick: mockHandleYesClick
        });

        render(<PwaModal />);

        await screen.findByText('No, gracias');
        fireEvent.click(screen.getByText('No, gracias'));

        expect(mockHandleNoClick).toHaveBeenCalled();
    });

    it('should handle Yes click', async () => {
        usePwaModal.mockReturnValue({
            isShowModal: true,
            handleNoClick: mockHandleNoClick,
            handleYesClick: mockHandleYesClick
        });

        render(<PwaModal />);

        await screen.findByText('Aceptar');
        fireEvent.click(screen.getByText('Aceptar'));

        expect(mockHandleYesClick).toHaveBeenCalled();
    });

    it('should not render the modal when isAdmin is true', () => {
        usePwaModal.mockReturnValue({
            isShowModal: true,
            handleNoClick: mockHandleNoClick,
            handleYesClick: mockHandleYesClick
        });

        Context.useAppContext.mockReturnValue({
            contextPath: '/pf',
            deployment: jest.fn(),
            isAdmin: true
        });

        const { container } = render(<PwaModal />);

        expect(
            screen.queryByText('¿Querés recibir notificaciones de alertas?')
        ).not.toBeInTheDocument();

        expect(container).toMatchSnapshot();
    });
});
