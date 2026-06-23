import React from 'react';
import { render } from '@testing-library/react';
import IconSubscribe from '../../../../../../components/features/LN/common/iconSubscribe/default';

jest.mock('../../../../../../components/features/ui/ln/icon/default', () =>
    jest.fn(props => (
        <div
            data-testid="icon"
            data-size={props.size}
            data-name={props.name}
            data-fill={props.fill}
            data-aria-label={props['aria-label']}
        />
    ))
);

describe('Components - features - LN - common - IconSubscribe', () => {
    it('renders with default props', () => {
        const { container } = render(<IconSubscribe />);
        expect(container.querySelector('div')).toBeInTheDocument();
    });

    it('renders with border by default', () => {
        const { container } = render(<IconSubscribe />);
        const wrapper = container.firstChild;
        expect(wrapper).toHaveClass('border');
        expect(wrapper).toHaveClass('border-neutral-1');
    });

    it('renders without border when withBorder is false', () => {
        const { container } = render(
            <IconSubscribe containerProps={{ withBorder: false }} />
        );
        const wrapper = container.firstChild;
        expect(wrapper).not.toHaveClass('border');
    });

    it('applies custom className to container', () => {
        const { container } = render(
            <IconSubscribe containerProps={{ className: 'custom-class' }} />
        );
        const wrapper = container.firstChild;
        expect(wrapper).toHaveClass('custom-class');
    });

    it('applies base container styles', () => {
        const { container } = render(<IconSubscribe />);
        const wrapper = container.firstChild;
        expect(wrapper).toHaveClass('flex');
        expect(wrapper).toHaveClass('items-center');
        expect(wrapper).toHaveClass('justify-center');
        expect(wrapper).toHaveClass('h-24');
        expect(wrapper).toHaveClass('w-24');
        expect(wrapper).toHaveClass('rounded-full');
        expect(wrapper).toHaveClass('bg-warning-default');
    });

    it('renders Icon with correct props', () => {
        const { getByTestId } = render(
            <IconSubscribe iconProps={{ 'aria-label': 'Subscribe icon' }} />
        );
        const icon = getByTestId('icon');
        expect(icon).toHaveAttribute('data-size', '14');
        expect(icon).toHaveAttribute('data-name', 'logo-suscriptores');
        expect(icon).toHaveAttribute('data-fill', '--color-primary-dark');
        expect(icon).toHaveAttribute('data-aria-label', 'Subscribe icon');
    });

    it('spreads additional containerProps to wrapper div', () => {
        const { container } = render(
            <IconSubscribe
                containerProps={{
                    'data-testid': 'custom-wrapper',
                    id: 'subscribe-icon'
                }}
            />
        );
        const wrapper = container.firstChild;
        expect(wrapper).toHaveAttribute('data-testid', 'custom-wrapper');
        expect(wrapper).toHaveAttribute('id', 'subscribe-icon');
    });

    it('handles combined containerProps (withBorder, className, and spreaded props)', () => {
        const { container } = render(
            <IconSubscribe
                containerProps={{
                    withBorder: true,
                    className: 'extra-padding',
                    'aria-label': 'Subscribe button'
                }}
            />
        );
        const wrapper = container.firstChild;
        expect(wrapper).toHaveClass('border');
        expect(wrapper).toHaveClass('extra-padding');
        expect(wrapper).toHaveAttribute('aria-label', 'Subscribe button');
    });

    it('matches snapshot - default rendering', () => {
        const { container } = render(<IconSubscribe />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot - without border', () => {
        const { container } = render(
            <IconSubscribe containerProps={{ withBorder: false }} />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
