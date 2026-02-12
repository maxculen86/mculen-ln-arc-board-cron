import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Link from '../../../../../../components/features/ui/ln/link/default';

describe('components - features - ui - ln - link - default', () => {
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

    it('passes through strictly passed props', () => {
        const props = {
            ...defaultProps,
            className: 'custom-class',
            target: '_blank'
        };

        render(<Link {...props} />);
        const link = screen.getByTestId('common-link');

        expect(link).toHaveClass('custom-class');
        expect(link).toHaveAttribute('target', '_blank');
        // Should NOT have 'com-text' or auto-generated classes
        expect(link).not.toHaveClass('com-text');
    });

    it('renders children as passed without parsing', () => {
        const { getByText } = render(
            <Link href="/test">
                <span>Nested content</span>
            </Link>
        );
        expect(getByText('Nested content')).toBeInTheDocument();
    });

    it('should match snapshot (pure render)', () => {
        const { asFragment } = render(<Link {...defaultProps} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
