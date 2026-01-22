import React from 'react';
import { render, screen } from '@testing-library/react';
import PullQuoteUI from '../../../../../../components/features/ui/ln/pullQuote/default';

jest.mock('../../../../../../components/features/ui/ln/icon/default', () => ({
    __esModule: true,
    default: ({ name, ...props }) => (
        <span data-testid="icon" data-name={name} {...props} />
    )
}));

jest.mock(
    '../../../../../../components/features/private-global/common/iconSprite/IconSprite.jsx',
    () => ({
        __esModule: true,
        default: ({ name }) => <span data-testid="icon-sprite">{name}</span>
    })
);

describe('PullQuoteUI', () => {
    it('returns null when content is not provided', () => {
        const { container } = render(<PullQuoteUI />);
        expect(container.firstChild).toBeNull();
    });

    it('returns null when content is empty string', () => {
        const { container } = render(<PullQuoteUI content="" />);
        expect(container.firstChild).toBeNull();
    });

    it('renders quote content with closing quote entity', () => {
        const { container } = render(
            <PullQuoteUI content="This is a pull quote" />
        );

        // The &rdquo; entity renders as the " character (right double quotation mark U+201D)
        const paragraph = container.querySelector('p');
        expect(paragraph).toBeInTheDocument();
        expect(paragraph.innerHTML).toContain('This is a pull quote');
        // Verify that content has more than just the original text (closing quote is added)
        expect(paragraph.innerHTML.length).toBeGreaterThan(
            'This is a pull quote'.length
        );
        expect(paragraph.innerHTML).toMatch(/^This is a pull quote/);

        expect(screen.getByTestId('icon')).toBeInTheDocument();
        expect(screen.getByTestId('icon')).toHaveAttribute(
            'data-name',
            'quote'
        );
    });

    it('renders author when provided', () => {
        render(<PullQuoteUI content="Quote text" author="Author Name" />);

        expect(screen.getByText('— Author Name')).toBeInTheDocument();
        expect(screen.getByText('— Author Name').tagName).toBe('CITE');
    });

    it('does not render author element when author is not provided', () => {
        render(<PullQuoteUI content="Quote text" />);

        expect(screen.queryByText(/^—/)).not.toBeInTheDocument();
    });

    it('does not render author element when author is empty string', () => {
        render(<PullQuoteUI content="Quote text" author="" />);

        expect(screen.queryByText(/^—/)).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(
            <PullQuoteUI
                content="Quote text"
                className="custom-class"
                data-testid="wrapper"
            />
        );

        const wrapper = container.querySelector('[data-testid="wrapper"]');
        expect(wrapper).toHaveClass('custom-class');
        expect(wrapper).toHaveClass('flex');
        expect(wrapper).toHaveClass('gap-8');
    });

    it('renders content as HTML', () => {
        render(<PullQuoteUI content="Quote with <strong>bold</strong> text" />);

        const strong = screen.getByText('bold');
        expect(strong.tagName).toBe('STRONG');
    });

    it('has correct semantic structure', () => {
        const { container } = render(
            <PullQuoteUI
                content="Quote text"
                author="Author Name"
                data-testid="wrapper"
            />
        );

        const section = container.querySelector('[data-testid="wrapper"]');
        expect(section.tagName).toBe('SECTION');

        const cite = screen.getByText(content =>
            content.includes('Author Name')
        );
        expect(cite.tagName).toBe('CITE');
    });
});
