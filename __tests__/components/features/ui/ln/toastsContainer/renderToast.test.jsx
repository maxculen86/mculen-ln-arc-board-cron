import React from 'react';
import '@testing-library/jest-dom';

const mockToastManagerShow = jest.fn();

jest.mock('@ln/ds-common-toasts', () => ({
    toastManager: {
        show: mockToastManagerShow
    }
}));

jest.mock('../../../../../../components/features/ui/ln/icon/default', () => {
    return function MockIconSprite({ name }) {
        return <span data-testid={`icon-${name}`}>{name}</span>;
    };
});

// Import after mocks to ensure mocks are applied
const renderToasts =
    require('../../../../../../components/features/ui/ln/toastsContainer/renderToast').default;

describe('components - features - ui - ln - toastsContainer - renderToast', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Default behavior', () => {
        it('should call toastManager.show with default color info when no color is provided', () => {
            renderToasts({ message: 'Test message' });

            expect(mockToastManagerShow).toHaveBeenCalledTimes(1);
            const calledArgs = mockToastManagerShow.mock.calls[0][0];

            expect(calledArgs.color).toBe('info');
            expect(calledArgs.duration).toBe(3000);
            expect(calledArgs.message).toBe('Test message');
        });

        it('should use default duration of 3000ms when not provided', () => {
            renderToasts({ message: 'Test message', color: 'success' });

            expect(mockToastManagerShow).toHaveBeenCalledTimes(1);
            const calledArgs = mockToastManagerShow.mock.calls[0][0];

            expect(calledArgs.duration).toBe(3000);
        });
    });

    describe('Icon mapping', () => {
        it('should use check-circle-filled icon for success color', () => {
            renderToasts({ color: 'success', message: 'Success' });

            const calledArgs = mockToastManagerShow.mock.calls[0][0];
            expect(calledArgs.iconProps.children.props.name).toBe(
                'check-circle-filled'
            );
        });

        it('should use danger-filled icon for error color', () => {
            renderToasts({ color: 'error', message: 'Error' });

            const calledArgs = mockToastManagerShow.mock.calls[0][0];
            expect(calledArgs.iconProps.children.props.name).toBe(
                'danger-filled'
            );
        });

        it('should use info-filled icon for info color', () => {
            renderToasts({ color: 'info', message: 'Info' });

            const calledArgs = mockToastManagerShow.mock.calls[0][0];
            expect(calledArgs.iconProps.children.props.name).toBe(
                'info-filled'
            );
        });

        it('should use warning-filled icon for warning color', () => {
            renderToasts({ color: 'warning', message: 'Warning' });

            const calledArgs = mockToastManagerShow.mock.calls[0][0];
            expect(calledArgs.iconProps.children.props.name).toBe(
                'warning-filled'
            );
        });

        it('should use info-filled icon for invalid color', () => {
            renderToasts({ color: 'invalid-color', message: 'Test' });

            const calledArgs = mockToastManagerShow.mock.calls[0][0];
            expect(calledArgs.iconProps.children.props.name).toBe(
                'info-filled'
            );
        });
    });

    describe('Close icon', () => {
        it('should always include close icon', () => {
            renderToasts({ message: 'Test' });

            const calledArgs = mockToastManagerShow.mock.calls[0][0];
            expect(calledArgs.closeIconProps.children.props.name).toBe('close');
        });
    });

    describe('Custom props passthrough', () => {
        it('should pass through custom duration', () => {
            renderToasts({ message: 'Test', duration: 5000 });

            const calledArgs = mockToastManagerShow.mock.calls[0][0];
            expect(calledArgs.duration).toBe(5000);
        });

        it('should pass through additional props', () => {
            renderToasts({
                message: 'Test',
                color: 'success',
                title: 'Success Title',
                onClose: jest.fn(),
                position: 'top-right'
            });

            const calledArgs = mockToastManagerShow.mock.calls[0][0];
            expect(calledArgs.message).toBe('Test');
            expect(calledArgs.title).toBe('Success Title');
            expect(calledArgs.position).toBe('top-right');
            expect(typeof calledArgs.onClose).toBe('function');
        });
    });

    describe('Color variants', () => {
        it('should handle success variant correctly', () => {
            renderToasts({
                color: 'success',
                message: 'Operation successful',
                duration: 4000
            });

            const calledArgs = mockToastManagerShow.mock.calls[0][0];
            expect(calledArgs.color).toBe('success');
            expect(calledArgs.message).toBe('Operation successful');
            expect(calledArgs.duration).toBe(4000);
            expect(calledArgs.iconProps.children.props.name).toBe(
                'check-circle-filled'
            );
        });

        it('should handle error variant correctly', () => {
            renderToasts({
                color: 'error',
                message: 'Operation failed'
            });

            const calledArgs = mockToastManagerShow.mock.calls[0][0];
            expect(calledArgs.color).toBe('error');
            expect(calledArgs.message).toBe('Operation failed');
            expect(calledArgs.iconProps.children.props.name).toBe(
                'danger-filled'
            );
        });

        it('should handle warning variant correctly', () => {
            renderToasts({
                color: 'warning',
                message: 'Be careful'
            });

            const calledArgs = mockToastManagerShow.mock.calls[0][0];
            expect(calledArgs.color).toBe('warning');
            expect(calledArgs.message).toBe('Be careful');
            expect(calledArgs.iconProps.children.props.name).toBe(
                'warning-filled'
            );
        });
    });
});
