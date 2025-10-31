import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Link from '../../../../../components/features/ui-ln/link/default';

describe('components - features - ui-ln - link - default', () => {
    const defaultProps = {
        href: '/test-url',
        children: 'Test Link',
        'data-testid': 'common-link'
    };

    it('renders correctly with basic props', () => {
        render(<Link {...defaultProps} />);

        const link = screen.getByTestId('common-link');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/test-url');
        expect(link).toHaveTextContent('Test Link');
    });

    it('passes through all props to CommonLink', () => {
        const props = {
            href: '/external-url',
            target: '_blank',
            rel: 'noopener noreferrer',
            className: 'custom-class',
            children: 'External Link',
            'data-testid': 'common-link'
        };

        render(<Link {...props} />);

        const link = screen.getByTestId('common-link');
        expect(link).toHaveAttribute('href', '/external-url');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        expect(link).toHaveClass('custom-class');
        expect(link).toHaveTextContent('External Link');
    });

    it('works with different content types', () => {
        const { rerender } = render(
            <Link href="/test">
                <span>Nested content</span>
            </Link>
        );

        expect(screen.getByText('Nested content')).toBeInTheDocument();

        rerender(<Link href="/test">Plain text</Link>);
        expect(screen.getByText('Plain text')).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { asFragment } = render(<Link {...defaultProps} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot with external link props', () => {
        const { asFragment } = render(
            <Link
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="external-link"
            >
                External Link
            </Link>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
