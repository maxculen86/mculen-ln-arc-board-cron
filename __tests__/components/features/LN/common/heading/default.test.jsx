import React from 'react';
import { render } from '@testing-library/react';
import Heading from '../../../../../../components/features/LN/common/heading/default.jsx';

describe('components - ui - ln - Heading', () => {
    const defaultData = {
        level: 2,
        content: 'Test Heading Content'
    };

    it('renders header without link', () => {
        const { container, getByText } = render(<Heading data={defaultData} />);
        expect(getByText('Test Heading Content')).toBeInTheDocument();
        expect(container.querySelector('h3')).toBeInTheDocument();
    });

    it('renders header with link', () => {
        const dataWithLink = {
            ...defaultData,
            link: 'https://example.com'
        };
        const { getByRole } = render(<Heading data={dataWithLink} />);
        const link = getByRole('link');
        expect(link).toHaveAttribute('href', 'https://example.com');
        expect(link).toHaveTextContent('Test Heading Content');
    });

    it('applies correct class condition from config', () => {
        const dataLevel4 = { level: 4, content: 'Underline' };
        const { container } = render(<Heading data={dataLevel4} />);
        const element = container.querySelector('h4');
        expect(element).toHaveClass('underline');
    });

    it('renders HTML content correctly using the safe parser', () => {
        const dataWithHtml = {
            ...defaultData,
            content: 'Hello <strong>World</strong>'
        };
        const { container, getByText } = render(
            <Heading data={dataWithHtml} />
        );
        expect(getByText('Hello')).toBeInTheDocument();
        expect(container.querySelector('strong')).toHaveTextContent('World');
    });
});
