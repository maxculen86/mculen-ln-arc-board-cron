import React from 'react';
import { render, screen } from '@testing-library/react';
import Interstitial from '../../../../../../components/features/LN/common/interstitial/default';

// Mocks de componentes UI
jest.mock(
    '../../../../../../components/features/ui/ln/link/default.jsx',
    () => ({
        __esModule: true,
        default: ({ children, ...props }) => (
            <a data-testid="link" {...props}>
                {children}
            </a>
        )
    })
);

jest.mock('../../../../../../components/features/ui/ln/icon/default', () => ({
    __esModule: true,
    default: ({ name, size, ...props }) => (
        <span data-testid="icon" data-name={name} data-size={size} {...props} />
    )
}));

jest.mock('../../../../../../components/features/ui/ln/button/default', () => {
    const React = require('react');
    return {
        __esModule: true,
        default: ({
            children,
            asChild,
            variant,
            size,
            color,
            className,
            ...props
        }) => {
            if (asChild && children) {
                // When asChild is true, render children with button props
                return React.cloneElement(children, {
                    ...props,
                    className:
                        `${className || ''} ${children.props.className || ''}`.trim(),
                    'data-variant': variant,
                    'data-size': size,
                    'data-color': color
                });
            }
            return (
                <button
                    data-variant={variant}
                    data-size={size}
                    data-color={color}
                    className={className}
                    {...props}
                >
                    {children}
                </button>
            );
        }
    };
});

jest.mock(
    '../../../../../../components/features/private-global/common/iconSprite/IconSprite.jsx',
    () => ({
        __esModule: true,
        default: ({ name }) => <span data-testid="icon-sprite">{name}</span>
    })
);

describe('Interstitial Container', () => {
    describe('Conditional rendering', () => {
        it('does not render when data is not provided', () => {
            const { container } = render(<Interstitial />);
            expect(container.firstChild).toBeNull();
        });

        it('does not render when url is missing', () => {
            const { container } = render(
                <Interstitial data={{ content: 'Text' }} />
            );
            expect(container.firstChild).toBeNull();
        });

        it('does not render when content is missing', () => {
            const { container } = render(
                <Interstitial data={{ url: 'https://example.com' }} />
            );
            expect(container.firstChild).toBeNull();
        });

        it('does not render when url is empty string', () => {
            const { container } = render(
                <Interstitial data={{ url: '', content: 'Text' }} />
            );
            expect(container.firstChild).toBeNull();
        });

        it('does not render when content is empty string', () => {
            const { container } = render(
                <Interstitial
                    data={{ url: 'https://example.com', content: '' }}
                />
            );
            expect(container.firstChild).toBeNull();
        });
    });

    describe('Component composition', () => {
        it('renders Button > Link > Content + Icon structure', () => {
            render(
                <Interstitial
                    data={{
                        url: 'https://example.com',
                        content: 'Go to article'
                    }}
                />
            );

            const link = screen.getByTestId('link');
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute('data-variant', 'outline');
            expect(link).toHaveAttribute('data-size', 'custom');
            expect(link).toHaveAttribute('data-color', 'secondary');
        });

        it('passes correct props to Link component', () => {
            render(
                <Interstitial
                    data={{
                        url: 'https://example.com',
                        content: 'Go to article'
                    }}
                />
            );

            const link = screen.getByTestId('link');
            expect(link).toHaveAttribute('href', 'https://example.com');
            expect(link).toHaveAttribute('target', '_blank');
            expect(link).toHaveAttribute('title', 'Go to article');
            expect(link).toHaveAttribute(
                'data-mrf-recirculation',
                'n_interstitial'
            );
        });

        it('renders content text inside Link', () => {
            render(
                <Interstitial
                    data={{
                        url: 'https://example.com',
                        content: 'Go to article'
                    }}
                />
            );

            expect(screen.getByText('Go to article')).toBeInTheDocument();
        });

        it('renders Icon with correct props', () => {
            render(
                <Interstitial
                    data={{
                        url: 'https://example.com',
                        content: 'Go to article'
                    }}
                />
            );

            const icon = screen.getByTestId('icon');
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveAttribute('data-name', 'arrow-right');
            expect(icon).toHaveAttribute('data-size', '20');
        });
    });

    describe('CSS classes', () => {
        it('applies correct classes to Button wrapper', () => {
            render(
                <Interstitial
                    data={{
                        url: 'https://example.com',
                        content: 'Go to article'
                    }}
                />
            );

            const link = screen.getByTestId('link');
            expect(link.className).toContain('py-12');
            expect(link.className).toContain('px-16');
            expect(link.className).toContain('ds-custom-interstitial');
        });

        it('applies flex jc-center items-center to outer wrapper', () => {
            const { container } = render(
                <Interstitial
                    data={{
                        url: 'https://example.com',
                        content: 'Go to article'
                    }}
                />
            );

            const wrapper = container.firstChild;
            const inner = wrapper?.firstChild;
            expect(inner).toHaveClass('flex jc-center items-center');
        });
    });

    describe('Static properties', () => {
        it('exposes static component properties', () => {
            expect(Interstitial.arcType).toBe('interstitial_link');
            expect(Interstitial.isStatic).toBe(true);
        });
    });
});
