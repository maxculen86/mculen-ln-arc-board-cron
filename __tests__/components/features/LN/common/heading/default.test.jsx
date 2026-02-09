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

    it('renders link that comes embedded in HTML content', () => {
        const dataWithEmbeddedLink = {
            level: 1,
            content:
                '<a href="https://lanacion.com.ar/" target="_self">Encabezado con enlace</a>'
        };
        const { getByRole } = render(<Heading data={dataWithEmbeddedLink} />);
        const link = getByRole('link');
        expect(link).toHaveAttribute('href', 'https://lanacion.com.ar/');
        expect(link).toHaveTextContent('Encabezado con enlace');
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

    it('should have arcType header', () => {
        expect(Heading.arcType).toBe('header');
    });

    it('should be static component', () => {
        expect(Heading.isStatic).toBe(true);
    });

    it('returns null if content is missing', () => {
        const { container } = render(<Heading data={{ level: 1 }} />);
        expect(container.firstChild).toBeNull();
    });

    it('returns null if content is not a string', () => {
        const { container } = render(
            <Heading data={{ level: 1, content: 123 }} />
        );
        expect(container.firstChild).toBeNull();
    });
});
