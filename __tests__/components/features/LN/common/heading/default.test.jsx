import React from 'react';
import { render } from '@testing-library/react';
import Heading from '../../../../../../components/features/LN/common/heading/default.jsx';

describe('components - ui - ln - Heading', () => {
    const defaultData = {
        level: 2,
        content: 'Test Heading Content'
    };

    describe('Rendering by level', () => {
        it('renders level 1 as h2 with correct structure', () => {
            const dataLevel1 = { level: 1, content: 'Level 1 Heading' };
            const { container, getByText } = render(
                <Heading data={dataLevel1} />
            );
            const heading = container.querySelector('h2');
            expect(heading).toBeInTheDocument();
            expect(getByText('Level 1 Heading')).toBeInTheDocument();

            // Snapshot para validar estructura y clases
            expect(heading).toMatchSnapshot();
        });

        it('renders level 2 as h3 with correct structure', () => {
            const dataLevel2 = { level: 2, content: 'Level 2 Heading' };
            const { container, getByText } = render(
                <Heading data={dataLevel2} />
            );
            const heading = container.querySelector('h3');
            expect(heading).toBeInTheDocument();
            expect(getByText('Level 2 Heading')).toBeInTheDocument();

            // Snapshot para validar estructura y clases responsivas
            expect(heading).toMatchSnapshot();
        });

        it('renders level 3 (default) as h4 with correct structure', () => {
            const dataLevel3 = { level: 3, content: 'Level 3 Heading' };
            const { container, getByText } = render(
                <Heading data={dataLevel3} />
            );
            const heading = container.querySelector('h4');
            expect(heading).toBeInTheDocument();
            expect(getByText('Level 3 Heading')).toBeInTheDocument();

            // Snapshot para validar estructura y clases
            expect(heading).toMatchSnapshot();
        });

        it('renders level 4 as h4 with underline', () => {
            const dataLevel4 = { level: 4, content: 'Level 4 Underline' };
            const { container, getByText } = render(
                <Heading data={dataLevel4} />
            );
            const heading = container.querySelector('h4');
            expect(heading).toBeInTheDocument();
            expect(getByText('Level 4 Underline')).toBeInTheDocument();

            // Snapshot para validar underline y clases
            expect(heading).toMatchSnapshot();
        });

        it('renders default level (undefined) as h4 with default structure', () => {
            const dataNoLevel = { content: 'Default Heading' };
            const { container, getByText } = render(
                <Heading data={dataNoLevel} />
            );
            const heading = container.querySelector('h4');
            expect(heading).toBeInTheDocument();
            expect(getByText('Default Heading')).toBeInTheDocument();

            // Snapshot para validar estructura por defecto
            expect(heading).toMatchSnapshot();
        });
    });

    describe('HTML content parsing', () => {
        it('renders link that comes embedded in HTML content', () => {
            const dataWithEmbeddedLink = {
                level: 1,
                content:
                    '<a href="https://lanacion.com.ar/" target="_self">Encabezado con enlace</a>'
            };
            const { getByRole } = render(
                <Heading data={dataWithEmbeddedLink} />
            );
            const link = getByRole('link');
            expect(link).toHaveAttribute('href', 'https://lanacion.com.ar/');
            expect(link).toHaveTextContent('Encabezado con enlace');
        });

        it('renders HTML content correctly using the safe parser', () => {
            const dataWithHtml = {
                ...defaultData,
                content: 'Hello <strong>World</strong>'
            };
            const { container, getByText } = render(
                <Heading data={dataWithHtml} />
            );
            expect(getByText('Hello World')).toBeInTheDocument();
            expect(container.querySelector('strong')).toBeNull();
        });
    });

    describe('Component properties', () => {
        it('should be static component', () => {
            expect(Heading.isStatic).toBe(true);
        });
    });

    describe('Edge cases', () => {
        it('returns null if content is missing', () => {
            const { container } = render(<Heading data={{ level: 1 }} />);
            expect(container.firstChild).toBeNull();
        });

        it('returns null if content is empty string', () => {
            const { container } = render(
                <Heading data={{ level: 1, content: '' }} />
            );
            expect(container.firstChild).toBeNull();
        });

        it('returns null if content is not a string', () => {
            const { container } = render(
                <Heading data={{ level: 1, content: 123 }} />
            );
            expect(container.firstChild).toBeNull();
        });

        it('returns null if content is null', () => {
            const { container } = render(
                <Heading data={{ level: 1, content: null }} />
            );
            expect(container.firstChild).toBeNull();
        });
    });
});
