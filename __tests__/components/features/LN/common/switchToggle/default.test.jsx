import React from 'react';
import { render, screen } from '@testing-library/react';
import SwitchToggle from '../../../../../../components/features/LN/common/switchToggle/default';

jest.mock('../../../../../../components/features/ui/ln/icon/default', () => ({
    __esModule: true,
    default: ({ name, size, ...props }) => (
        <span data-testid="icon" data-name={name} data-size={size} {...props} />
    )
}));

describe('SwitchToggle', () => {
    describe('rendering', () => {
        it('should render a button with switch role', () => {
            render(<SwitchToggle />);

            expect(screen.getByRole('switch')).toBeInTheDocument();
        });

        it('should render an icon inside the toggle', () => {
            render(<SwitchToggle />);

            expect(screen.getByTestId('icon')).toBeInTheDocument();
        });

        it('should render the icon with size 12', () => {
            render(<SwitchToggle />);

            expect(screen.getByTestId('icon')).toHaveAttribute(
                'data-size',
                '12'
            );
        });
    });

    describe('selected state', () => {
        it('should set aria-checked to false by default', () => {
            render(<SwitchToggle />);

            expect(screen.getByRole('switch')).toHaveAttribute(
                'aria-checked',
                'false'
            );
        });

        it('should set aria-checked to true when selected is true', () => {
            render(<SwitchToggle selected />);

            expect(screen.getByRole('switch')).toHaveAttribute(
                'aria-checked',
                'true'
            );
        });

        it('should render the close icon when not selected', () => {
            render(<SwitchToggle selected={false} />);

            expect(screen.getByTestId('icon')).toHaveAttribute(
                'data-name',
                'close'
            );
        });

        it('should render the check icon when selected', () => {
            render(<SwitchToggle selected />);

            expect(screen.getByTestId('icon')).toHaveAttribute(
                'data-name',
                'check'
            );
        });
    });

    describe('onChange', () => {
        it('should call onChange when the toggle is clicked', () => {
            const onChange = jest.fn();
            render(<SwitchToggle onChange={onChange} />);

            screen.getByRole('switch').click();

            expect(onChange).toHaveBeenCalledTimes(1);
        });

        it('should not throw when clicked without an onChange handler', () => {
            render(<SwitchToggle />);

            expect(() => screen.getByRole('switch').click()).not.toThrow();
        });
    });

    describe('disabled state', () => {
        it('should not be disabled by default', () => {
            render(<SwitchToggle />);

            expect(screen.getByRole('switch')).not.toBeDisabled();
        });

        it('should be disabled when disabled is true', () => {
            render(<SwitchToggle disabled />);

            expect(screen.getByRole('switch')).toBeDisabled();
        });

        it('should not call onChange when disabled and clicked', () => {
            const onChange = jest.fn();
            render(<SwitchToggle disabled onChange={onChange} />);

            screen.getByRole('switch').click();

            expect(onChange).not.toHaveBeenCalled();
        });
    });

    describe('props forwarding', () => {
        it('should forward extra props to the button', () => {
            render(<SwitchToggle aria-label="toggle audio" />);

            expect(screen.getByRole('switch')).toHaveAttribute(
                'aria-label',
                'toggle audio'
            );
        });

        it('should merge a custom className onto the button', () => {
            render(<SwitchToggle className="custom-class" />);

            expect(screen.getByRole('switch')).toHaveClass('custom-class');
        });
    });

    describe('snapshots', () => {
        it('matches snapshot with default props', () => {
            const { asFragment } = render(<SwitchToggle />);

            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot when selected', () => {
            const { asFragment } = render(<SwitchToggle selected />);

            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot when disabled', () => {
            const { asFragment } = render(<SwitchToggle disabled />);

            expect(asFragment()).toMatchSnapshot();
        });
    });
});
