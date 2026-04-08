import React from 'react';
import '@testing-library/jest-dom';
const mockToastManagerShow = jest.fn();

jest.mock('@ln/ds-common-toasts', () => ({
    toastManager: {
        show: mockToastManagerShow
    }
}));

jest.mock(
    '../../../../../../../components/features/ui/foodit/icon/default',
    () => {
        return function MockIconSprite({ name }) {
            return <span data-testid={`icon-${name}`}>{name}</span>;
        };
    }
);

const renderToasts =
    require('../../../../../../../components/features/ui/foodit/toastContainer/renderToast').default;

describe('components - features - ui - foodit - toastsContainer - renderToast', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Default behavior', () => {
        it('should call toastManager.show with default color success when no color is provided', () => {
            renderToasts({ message: 'Test message' });

            expect(mockToastManagerShow).toHaveBeenCalledTimes(1);
            const calledArgs = mockToastManagerShow.mock.calls[0][0];

            expect(calledArgs.color).toBe('success');
            expect(calledArgs.duration).toBe(7000);
            expect(calledArgs.message).toBe('Test message');
        });

        it('should use default duration of 7000ms when not provided', () => {
            renderToasts({ message: 'Test message', color: 'success' });

            expect(mockToastManagerShow).toHaveBeenCalledTimes(1);
            const calledArgs = mockToastManagerShow.mock.calls[0][0];

            expect(calledArgs.duration).toBe(7000);
        });
    });

    describe('Icon mapping', () => {
        it('should use check-unfilled icon for success color', () => {
            renderToasts({ color: 'success', message: 'Success' });

            const calledArgs = mockToastManagerShow.mock.calls[0][0];
            expect(calledArgs.iconProps.children.props.name).toBe(
                'check-unfilled'
            );
        });

        it('should use error-unfilled icon for error color', () => {
            renderToasts({ color: 'error', message: 'Error' });

            const calledArgs = mockToastManagerShow.mock.calls[0][0];
            expect(calledArgs.iconProps.children.props.name).toBe(
                'error-unfilled'
            );
        });

        it('should use info-unfilled icon for info color', () => {
            renderToasts({ color: 'info', message: 'Info' });

            const calledArgs = mockToastManagerShow.mock.calls[0][0];
            expect(calledArgs.iconProps.children.props.name).toBe(
                'info-unfilled'
            );
        });

        it('should use warning-unfilled icon for warning color', () => {
            renderToasts({ color: 'warning', message: 'Warning' });

            const calledArgs = mockToastManagerShow.mock.calls[0][0];
            expect(calledArgs.iconProps.children.props.name).toBe(
                'warning-unfilled'
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
                'check-unfilled'
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
                'error-unfilled'
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
                'warning-unfilled'
            );
        });
    });
});
