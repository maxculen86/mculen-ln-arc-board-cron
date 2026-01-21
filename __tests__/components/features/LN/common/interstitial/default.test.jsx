import React from 'react';
import { render, screen } from '@testing-library/react';
import Interstitial from '../../../../../../components/features/LN/common/interstitial/default';

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
    default: ({ children }) => <span data-testid="icon">{children}</span>
}));

jest.mock(
    '../../../../../../components/features/private-global/common/iconSprite/IconSprite.jsx',
    () => ({
        __esModule: true,
        default: ({ name }) => <span data-testid="icon-sprite">{name}</span>
    })
);

describe('Interstitial', () => {
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

    it('renders link with text and icon when valid data is provided', () => {
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
        expect(link).toHaveAttribute('href', 'https://example.com');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute(
            'data-mrf-recirculation',
            'n_interstitial'
        );

        expect(screen.getByText('Go to article')).toBeInTheDocument();
        expect(screen.getByTestId('icon')).toBeInTheDocument();
        expect(screen.getByTestId('icon-sprite')).toHaveTextContent(
            'arrowRight'
        );
    });

    it('forwards additional props to the wrapper element', () => {
        render(
            <Interstitial
                data={{
                    url: 'https://example.com',
                    content: 'Text'
                }}
                className="custom-class"
                data-testid="wrapper"
            />
        );

        const wrapper = screen.getByTestId('wrapper');
        expect(wrapper).toHaveClass('custom-class');
    });

    it('exposes static component properties', () => {
        expect(Interstitial.arcType).toBe('interstitial_link');
        expect(Interstitial.isStatic).toBe(true);
    });
});
