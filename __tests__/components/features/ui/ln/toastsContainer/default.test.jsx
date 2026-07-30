import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToastsContainer from '../../../../../../components/features/ui/ln/toastsContainer/default';
import renderToasts from '../../../../../../components/features/ui/ln/toastsContainer/renderToast';

jest.mock('@ln/ds-common-toasts', () => {
    const Container = ({ className }) => (
        <div data-testid="ds-toast-container" className={className} />
    );
    Container.Portal = ({ children }) => (
        <div data-testid="ds-toast-portal">{children}</div>
    );
    return { ToastContainer: Container };
});

jest.mock(
    '../../../../../../components/features/ui/ln/toastsContainer/renderToast',
    () => jest.fn()
);

describe('ToastsContainer (DS) - puente al bus global', () => {
    beforeEach(() => {
        window.LN = {
            observable: {
                subscribe: jest.fn(),
                unsubscribe: jest.fn()
            }
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the DS toast container inside the portal', () => {
        render(<ToastsContainer />);

        expect(screen.getByTestId('ds-toast-portal')).toBeInTheDocument();
        expect(screen.getByTestId('ds-toast-container')).toHaveClass(
            'z-1550 max-md:mb-61'
        );
    });

    it('subscribes and unsubscribes to the global addToast event', () => {
        const { unmount } = render(<ToastsContainer />);

        expect(window.LN.observable.subscribe).toHaveBeenCalledWith(
            'addToast',
            expect.any(Function)
        );

        unmount();

        expect(window.LN.observable.unsubscribe).toHaveBeenCalledWith(
            'addToast',
            expect.any(Function)
        );
    });

    it('forwards addToast to the DS renderToasts as a passthrough', () => {
        render(<ToastsContainer />);

        const handleAddToast = window.LN.observable.subscribe.mock.calls[0][1];

        act(() => {
            handleAddToast({
                color: 'error',
                title: 'Ups',
                description: 'Algo salió mal',
                duration: 5000,
                buttonProps: { children: 'Reintentar' }
            });
        });

        expect(renderToasts).toHaveBeenCalledWith({
            color: 'error',
            title: 'Ups',
            description: 'Algo salió mal',
            duration: 5000,
            buttonProps: { children: 'Reintentar' }
        });
    });
});
