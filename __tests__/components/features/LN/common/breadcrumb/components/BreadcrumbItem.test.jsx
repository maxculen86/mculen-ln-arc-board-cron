import React from 'react';
import { render, screen } from '@testing-library/react';
import { BreadcrumbItem } from '../../../../../../../components/features/LN/common/breadcrumb/components/BreadcrumbItem';

describe('BreadcrumbItem', () => {
    it('should render as link when not last item', () => {
        render(
            <BreadcrumbItem
                id="/opinion"
                path="/opinion"
                name="Opinion"
                lastLinked={false}
                isLastItem={false}
                host="https://www.lanacion.com.ar"
                extraOpts={{}}
            />
        );

        const link = screen.getByRole('link', { name: /Opinion/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/opinion');
    });

    it('should render as link when last item and lastLinked is true', () => {
        render(
            <BreadcrumbItem
                id="/opinion"
                path="/opinion"
                name="Opinion"
                lastLinked={true}
                isLastItem={true}
                host="https://www.lanacion.com.ar"
                extraOpts={{}}
            />
        );

        const link = screen.getByRole('link', { name: /Opinion/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/opinion');
    });

    it('should render as span when last item and lastLinked is false', () => {
        render(
            <BreadcrumbItem
                id="/opinion"
                path="/opinion"
                name="Opinion"
                lastLinked={false}
                isLastItem={true}
                host="https://www.lanacion.com.ar"
                extraOpts={{}}
            />
        );

        const text = screen.getByText('Opinion');
        expect(text).toBeInTheDocument();
        expect(text.tagName).toBe('SPAN');
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('should use host for LA NACION at root path', () => {
        render(
            <BreadcrumbItem
                id="/"
                path="/"
                name="LA NACION"
                lastLinked={true}
                isLastItem={false}
                host="https://www.lanacion.com.ar"
                extraOpts={{}}
            />
        );

        const link = screen.getByRole('link', { name: /LA NACION/i });
        expect(link).toHaveAttribute('href', 'https://www.lanacion.com.ar');
    });

    it('should not use host for other sections', () => {
        render(
            <BreadcrumbItem
                id="/opinion"
                path="/opinion"
                name="Opinion"
                lastLinked={true}
                isLastItem={false}
                host="https://www.lanacion.com.ar"
                extraOpts={{}}
            />
        );

        const link = screen.getByRole('link', { name: /Opinion/i });
        expect(link).toHaveAttribute('href', '/opinion');
    });

    it('should use recipe text for recipe sections', () => {
        render(
            <BreadcrumbItem
                id="/recetas/postres"
                path="/recetas/postres"
                name="Postres"
                lastLinked={true}
                isLastItem={true}
                host="https://www.lanacion.com.ar"
                extraOpts={{}}
            />
        );

        const link = screen.getByRole('link', { name: 'Recetas de postres' });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('title', 'Recetas de postres');
        expect(link).toHaveAttribute('href', '/recetas/postres');
    });

    it('should use standard title for non-recipe sections', () => {
        render(
            <BreadcrumbItem
                id="/opinion"
                path="/opinion"
                name="Opinion"
                lastLinked={true}
                isLastItem={false}
                host="https://www.lanacion.com.ar"
                extraOpts={{}}
            />
        );

        const link = screen.getByRole('link', { name: /Opinion/i });
        expect(link).toHaveAttribute('title', 'Noticias de Opinion');
    });

    it('should apply extraOpts to link', () => {
        render(
            <BreadcrumbItem
                id="/opinion"
                path="/opinion"
                name="Opinion"
                lastLinked={true}
                isLastItem={false}
                host="https://www.lanacion.com.ar"
                extraOpts={{
                    'data-section': 'breadcrumb',
                    'data-event': 'LinkClick'
                }}
            />
        );

        const link = screen.getByRole('link', { name: /Opinion/i });
        expect(link).toHaveAttribute('data-section', 'breadcrumb');
        expect(link).toHaveAttribute('data-event', 'LinkClick');
    });

    it('should not apply extraOpts to span', () => {
        render(
            <BreadcrumbItem
                id="/opinion"
                path="/opinion"
                name="Opinion"
                lastLinked={false}
                isLastItem={true}
                host="https://www.lanacion.com.ar"
                extraOpts={{
                    'data-section': 'breadcrumb',
                    'data-event': 'LinkClick'
                }}
            />
        );

        const text = screen.getByText('Opinion');
        expect(text).not.toHaveAttribute('data-section');
        expect(text).not.toHaveAttribute('data-event');
    });
});
