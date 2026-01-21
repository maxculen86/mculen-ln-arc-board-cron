import React from 'react';
import { render, screen } from '@testing-library/react';
import { BreadcrumbBase } from '../../../../../../components/features/LN/common/breadcrumb/BreadcrumbBase';

describe('BreadcrumbBase', () => {
    const sectionsMock = [
        { name: 'Home', path: '/', id: '/' },
        { name: 'Opinion', path: '/opinion', id: '/opinion' }
    ];

    it('should render all sections', () => {
        render(
            <BreadcrumbBase
                sections={sectionsMock}
                lastLinked
                host="https://www.lanacion.com.ar"
            />
        );

        expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: /Opinion/i })
        ).toBeInTheDocument();
    });

    it('should render separators between items', () => {
        const { container } = render(
            <BreadcrumbBase
                sections={sectionsMock}
                lastLinked
                host="https://www.lanacion.com.ar"
            />
        );

        const separators = container.querySelectorAll('[aria-hidden="true"]');
        expect(separators.length).toBe(1); // One separator for two items
    });

    it('should not render separator for single section', () => {
        const singleSection = [
            { name: 'Opinion', path: '/opinion', id: '/opinion' }
        ];
        const { container } = render(
            <BreadcrumbBase
                sections={singleSection}
                lastLinked
                host="https://www.lanacion.com.ar"
            />
        );

        const separators = container.querySelectorAll('[aria-hidden="true"]');
        expect(separators.length).toBe(0);
    });

    it('should pass dataSection as extraOpts to items', () => {
        render(
            <BreadcrumbBase
                sections={sectionsMock}
                lastLinked
                dataSection="breadcrumb"
                host="https://www.lanacion.com.ar"
            />
        );

        const homeLink = screen.getByRole('link', { name: /Home/i });
        expect(homeLink).toHaveAttribute('data-section', 'breadcrumb');
        expect(homeLink).toHaveAttribute('data-event', 'LinkClick');
    });

    it('should not add data attributes when dataSection is not provided', () => {
        render(
            <BreadcrumbBase
                sections={sectionsMock}
                lastLinked
                host="https://www.lanacion.com.ar"
            />
        );

        const homeLink = screen.getByRole('link', { name: /Home/i });
        expect(homeLink).not.toHaveAttribute('data-section');
        expect(homeLink).not.toHaveAttribute('data-event');
    });

    it('should render correct number of items for multiple sections', () => {
        const threeSections = [
            { name: 'Home', path: '/', id: '/' },
            { name: 'Opinion', path: '/opinion', id: '/opinion' },
            {
                name: 'Columnistas',
                path: '/opinion/columnistas',
                id: '/opinion/columnistas'
            }
        ];

        render(
            <BreadcrumbBase
                sections={threeSections}
                lastLinked
                host="https://www.lanacion.com.ar"
            />
        );

        expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: /Opinion/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: /Columnistas/i })
        ).toBeInTheDocument();
    });
});
