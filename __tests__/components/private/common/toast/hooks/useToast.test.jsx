import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useToast } from '../../../../../../components/private/common/toast/hooks/useToast';

jest.mock('@ln/hooks', () => ({
    useDisclosure: jest.fn(() => ({
        isOpen: false,
        onOpen: jest.fn(),
        onClose: jest.fn()
    }))
}));

jest.mock(
    '../../../../../../components/private/common/utils/bookmarkHelper',
    () => ({
        getStatusMessage: jest.fn()
    })
);

describe('components - private - common - toast - hooks - useToast', () => {
    let getStatusMessageMock;

    beforeEach(() => {
        getStatusMessageMock =
            require('../../../../../../components/private/common/utils/bookmarkHelper').getStatusMessage;
        getStatusMessageMock.mockClear();
    });

    const TestComponent = () => {
        const {
            isToastOpen,
            openToast,
            closeToast,
            toastData,
            handleOperationComplete
        } = useToast();

        return (
            <div>
                <div data-testid="isToastOpen">{isToastOpen.toString()}</div>
                <button onClick={() => openToast()} data-testid="openToast">
                    Open Toast
                </button>
                <button onClick={() => closeToast()} data-testid="closeToast">
                    Close Toast
                </button>
                <button
                    onClick={() => handleOperationComplete(200, true)}
                    data-testid="handleOperationComplete"
                >
                    Handle Operation Complete
                </button>
                <div data-testid="toastData">{JSON.stringify(toastData)}</div>
            </div>
        );
    };

    it('should initialize with default values', () => {
        const { getByTestId } = render(<TestComponent />);

        expect(getByTestId('isToastOpen').textContent).toBe('false');
        expect(getByTestId('toastData').textContent).toBe(
            JSON.stringify({
                title: '',
                description: '',
                status: '',
                timeout: 2750,
                buttonLabel: '',
                href: '',
                closable: true,
                pauseOnHover: true
            })
        );
    });

    it('should update toastData when handleOperationComplete is called', () => {
        getStatusMessageMock.mockImplementation((status, bookmarkContent) => ({
            title: '¡Listo!',
            description: bookmarkContent
                ? 'Podés acceder desde "Menú de usuario"'
                : 'Se borró de "Mis notas"',
            status: 'success',
            timeout: 2750,
            buttonLabel: 'Mis Notas',
            href: 'https://mock-site/mis-notas/',
            closable: true,
            pauseOnHover: true
        }));

        const { getByTestId } = render(<TestComponent />);
        const handleOperationButton = getByTestId('handleOperationComplete');

        fireEvent.click(handleOperationButton);

        expect(getStatusMessageMock).toHaveBeenCalledWith(200, true);
        expect(getByTestId('toastData').textContent).toBe(
            JSON.stringify({
                title: '¡Listo!',
                description: 'Podés acceder desde "Menú de usuario"',
                status: 'success',
                timeout: 2750,
                buttonLabel: 'Mis Notas',
                href: 'https://mock-site/mis-notas/',
                closable: true,
                pauseOnHover: true
            })
        );
    });

    it('should handle unknown status codes gracefully', () => {
        getStatusMessageMock.mockImplementation(() => ({
            title: '¡Ups!',
            description: 'Hubo un problema de conexión. Reintenta más tarde.',
            status: 'danger',
            timeout: 2750,
            buttonLabel: 'Mis Notas',
            href: 'https://mock-site/mis-notas/',
            closable: true,
            pauseOnHover: true
        }));

        const { getByTestId } = render(<TestComponent />);
        const handleOperationButton = getByTestId('handleOperationComplete');

        fireEvent.click(handleOperationButton);

        expect(getStatusMessageMock).toHaveBeenCalledWith(200, true);
        expect(getByTestId('toastData').textContent).toBe(
            JSON.stringify({
                title: '¡Ups!',
                description:
                    'Hubo un problema de conexión. Reintenta más tarde.',
                status: 'danger',
                timeout: 2750,
                buttonLabel: 'Mis Notas',
                href: 'https://mock-site/mis-notas/',
                closable: true,
                pauseOnHover: true
            })
        );
    });
});
