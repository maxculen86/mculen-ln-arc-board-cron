import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Toasts from '../../../../../../components/features/foodit-global/common/toasts/foodit';

jest.mock('@ln/common-ui-toast', () => ({
    ToastContainer: ({
        newToast,
        transitionIn,
        hPosition,
        vPosition,
        className,
        style
    }) => (
        <div
            data-testid="toast-container"
            data-h-position={hPosition}
            data-v-position={vPosition}
            data-transition-in={JSON.stringify(transitionIn)}
            className={className}
            style={style}
        >
            {newToast}
        </div>
    ),
    Toast: ({ message, icon, button, pauseOnHover }) => (
        <div data-testid="toast" data-pause-on-hover={pauseOnHover}>
            {message && <div data-testid="toast-message">{message}</div>}
            {icon && <div data-testid="toast-icon">{icon}</div>}
            {button && <div data-testid="toast-button">{button}</div>}
        </div>
    )
}));

jest.mock('@ln/foodit-ui-button', () => ({
    Button: ({ children, ...props }) => (
        <button data-testid="button" {...props}>
            {children}
        </button>
    )
}));

jest.mock('@ln/common-ui-icon', () => ({
    Icon: ({ children, size, hasWrapper }) => (
        <div data-testid="icon" data-size={size} data-has-wrapper={hasWrapper}>
            {children}
        </div>
    )
}));

jest.mock(
    '../../../../../../components/features/LN-10-global/common/toasts/helpers',
    () => ({
        getIconProps: jest
            .fn()
            .mockReturnValue({ fill: 'test-fill', icon: 'test-icon' })
    })
);

describe('Toasts Component', () => {
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
    it('should render the toast container with correct props', () => {
        render(<Toasts />);

        const toastContainer = screen.getByTestId('toast-container');
        expect(toastContainer).toBeInTheDocument();
        expect(toastContainer).toHaveAttribute('data-h-position', 'end');
        expect(toastContainer).toHaveClass('z-15 roboto');
    });

    it('should subscribe and unsubscribe to addToast event', () => {
        const { unmount } = render(<Toasts />);

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

    it('should render a toast when addToast is called', () => {
        render(<Toasts />);

        const addToastCallback =
            window.LN.observable.subscribe.mock.calls[0][1];

        act(() => {
            addToastCallback({
                message: 'Test message',
                type: 'success',
                buttonProps: { children: 'Click me' }
            });
        });

        const toast = screen.getByTestId('toast');
        expect(toast).toBeInTheDocument();
        expect(screen.getByTestId('toast-message')).toHaveTextContent(
            'Test message'
        );
        expect(screen.getByTestId('toast-icon')).toBeInTheDocument();
        expect(screen.getByTestId('button')).toBeInTheDocument();
        expect(screen.getByTestId('toast')).toHaveAttribute(
            'data-pause-on-hover',
            'true'
        );
    });

    it('should render a toast without button when buttonProps is not provided', () => {
        render(<Toasts />);

        const addToastCallback =
            window.LN.observable.subscribe.mock.calls[0][1];

        act(() => {
            addToastCallback({
                message: 'Test message',
                type: 'success'
            });
        });
        const toast = screen.getByTestId('toast');
        expect(toast).toBeInTheDocument();
        expect(screen.getByTestId('toast-message')).toHaveTextContent(
            'Test message'
        );
        expect(screen.getByTestId('toast-icon')).toBeInTheDocument();
        expect(screen.queryByTestId('button')).not.toBeInTheDocument();
        expect(screen.getByTestId('toast')).toHaveAttribute(
            'data-pause-on-hover',
            'true'
        );
    });
    it('should match snapshot', () => {
        const { container } = render(<Toasts />);
        expect(container).toMatchSnapshot();
    });
});
