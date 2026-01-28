import React from 'react';
import { render, screen } from '@testing-library/react';
import BlockQuoteUI from '../../../../../../components/features/ui/ln/blockQuote/default';

jest.mock(
    '../../../../../../components/features/ui/ln/divider/default',
    () => ({
        __esModule: true,
        default: ({ size, color, className, ...props }) => (
            <hr
                data-testid="divider"
                data-size={size}
                data-color={color}
                className={className}
                {...props}
            />
        )
    })
);

describe('BlockQuoteUI', () => {
    it('returns null when content is not provided', () => {
        const { container } = render(<BlockQuoteUI />);
        expect(container.firstChild).toBeNull();
    });

    it('returns null when content is empty string', () => {
        const { container } = render(<BlockQuoteUI content="" />);
        expect(container.firstChild).toBeNull();
    });

    it('renders blockquote with content', () => {
        render(<BlockQuoteUI content="This is a blockquote" />);

        const blockquote = screen.getByText('This is a blockquote');
        expect(blockquote).toBeInTheDocument();
        expect(blockquote.closest('blockquote')).toBeInTheDocument();
    });

    it('renders two dividers as separators', () => {
        render(<BlockQuoteUI content="Quote text" />);

        const dividers = screen.getAllByTestId('divider');
        expect(dividers).toHaveLength(2);

        // Verify divider properties
        dividers.forEach(divider => {
            expect(divider).toHaveAttribute('data-size', '2');
            expect(divider).toHaveAttribute('data-color', 'custom');
            expect(divider).toHaveClass('bg-base-default');
        });
    });

    it('applies custom className to wrapper', () => {
        const { container } = render(
            <BlockQuoteUI
                content="Quote text"
                className="custom-class"
                data-testid="wrapper"
            />
        );

        const wrapper = container.querySelector('[data-testid="wrapper"]');
        expect(wrapper).toHaveClass('custom-class');
        expect(wrapper).toHaveClass('flex');
        expect(wrapper).toHaveClass('flex-col');
        expect(wrapper).toHaveClass('gap-16');
    });

    it('renders content as HTML', () => {
        render(<BlockQuoteUI content="Quote with <em>italic</em> text" />);

        const em = screen.getByText('italic');
        expect(em.tagName).toBe('EM');
    });

    it('has correct semantic structure', () => {
        const { container } = render(
            <BlockQuoteUI content="Quote text" data-testid="wrapper" />
        );

        const wrapper = container.querySelector('[data-testid="wrapper"]');
        const blockquote = wrapper.querySelector('blockquote');
        const paragraph = blockquote.querySelector('p');

        expect(blockquote).toBeInTheDocument();
        expect(paragraph).toBeInTheDocument();
        expect(paragraph).toHaveTextContent('Quote text');
    });

    it('applies correct width classes to divider containers', () => {
        const { container } = render(
            <BlockQuoteUI content="Quote text" data-testid="wrapper" />
        );

        const wrapper = container.querySelector('[data-testid="wrapper"]');
        const dividerContainers = wrapper.querySelectorAll(
            'div > [data-testid="divider"]'
        );

        expect(dividerContainers).toHaveLength(2);
        expect(dividerContainers[0].parentElement).toHaveClass('w-154');
        expect(dividerContainers[1].parentElement).toHaveClass('w-90');
    });
});
