import React from 'react';
import { render, screen } from '@testing-library/react';
import PullQuote from '../../../../../../components/features/LN/common/pullquote/default';

jest.mock('../../../../../../components/features/ui/ln/icon/default', () => ({
    __esModule: true,
    default: ({ children, ...props }) => (
        <span data-testid="icon" {...props}>
            {children}
        </span>
    )
}));

jest.mock(
    '../../../../../../components/features/private-global/common/iconSprite/IconSprite.jsx',
    () => ({
        __esModule: true,
        default: ({ name }) => <span data-testid="icon-sprite">{name}</span>
    })
);

describe('PullQuote', () => {
    it('does not render when data is not provided', () => {
        const { container } = render(<PullQuote />);
        expect(container.firstChild).toBeNull();
    });

    it('does not render when content_elements is empty', () => {
        const { container } = render(
            <PullQuote data={{ content_elements: [] }} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('does not render when first content element has no content', () => {
        const { container } = render(
            <PullQuote data={{ content_elements: [{}] }} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('renders quote content with closing quote entity', () => {
        render(
            <PullQuote
                data={{
                    content_elements: [{ content: 'This is a pull quote' }]
                }}
            />
        );

        expect(screen.getByText(/This is a pull quote”/)).toBeInTheDocument();

        expect(screen.getByTestId('icon')).toBeInTheDocument();
        expect(screen.getByTestId('icon-sprite')).toHaveTextContent('quote');
    });

    it('renders author when citation content is provided', () => {
        render(
            <PullQuote
                data={{
                    citation: { content: 'Author Name' },
                    content_elements: [{ content: 'Quote text' }]
                }}
            />
        );

        expect(screen.getByText('— Author Name')).toBeInTheDocument();
    });

    it('does not render author when citation content is empty', () => {
        render(
            <PullQuote
                data={{
                    citation: {},
                    content_elements: [{ content: 'Quote text' }]
                }}
            />
        );

        expect(screen.queryByText(/^—/)).not.toBeInTheDocument();
    });

    it('forwards additional props to the section element', () => {
        render(
            <PullQuote
                data={{
                    content_elements: [{ content: 'Quote text' }]
                }}
                data-testid="wrapper"
                className="custom-class"
            />
        );

        const wrapper = screen.getByTestId('wrapper');
        expect(wrapper).toHaveClass('custom-class');
    });

    it('exposes static component properties', () => {
        expect(PullQuote.arcType).toBe('pullquote');
        expect(PullQuote.isStatic).toBe(true);
    });
});
