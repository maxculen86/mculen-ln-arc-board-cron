import React from 'react';
import { render } from '@testing-library/react';
import BreadcrumbSchema from '../../../../../../components/features/LN/common/breadcrumb/BreadcrumbSchema';

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar'
}));

describe('BreadcrumbSchema', () => {
    it('should render valid JSON-LD breadcrumb schema', () => {
        const sections = [
            { name: 'LA NACION', path: '/' },
            { name: 'Opinion', path: '/opinion' },
            { name: 'Columnistas', path: '/opinion/columnistas' }
        ];

        const { container } = render(
            <BreadcrumbSchema sections={[...sections]} />
        );

        const script = container.querySelector(
            'script[type="application/ld+json"]'
        );

        expect(script).not.toBeNull();

        const json = JSON.parse(script.innerHTML);

        expect(json['@type']).toBe('BreadcrumbList');
        expect(json.itemListElement).toHaveLength(3);

        expect(json.itemListElement[0]).toEqual({
            '@type': 'ListItem',
            position: 1,
            name: 'LA NACION',
            item: 'https://www.lanacion.com.ar'
        });

        expect(json.itemListElement[1].position).toBe(2);
        expect(json.itemListElement[1].item).toBe(
            'https://www.lanacion.com.ar/opinion/'
        );
    });

    it('should escape invalid characters in section names', () => {
        const sections = [
            { name: 'LA NACION', path: '/' },
            { name: 'Opinión "Especial"', path: '/opinion' }
        ];

        const { container } = render(
            <BreadcrumbSchema sections={[...sections]} />
        );

        const script = container.querySelector(
            'script[type="application/ld+json"]'
        );

        expect(script.innerHTML).toContain('Opinión \\"Especial\\"');
    });

    it('should not include items with empty names in schema', () => {
        const sections = [
            { name: 'LA NACION', path: '/' },
            { name: '', path: '/estados-unidos' },
            { name: 'Subsección', path: '/estados-unidos/sub' }
        ];

        const { container } = render(
            <BreadcrumbSchema sections={[...sections]} />
        );

        const script = container.querySelector(
            'script[type="application/ld+json"]'
        );
        const json = JSON.parse(script.innerHTML);

        expect(json.itemListElement).toHaveLength(2);
        expect(json.itemListElement[0].name).toBe('LA NACION');
        expect(json.itemListElement[1].name).toBe('Subsección');
        expect(json.itemListElement[1].position).toBe(2);
    });

    it('should return null when all sections have empty names', () => {
        const sections = [
            { name: '', path: '/' },
            { name: '   ', path: '/section' }
        ];

        const { container } = render(
            <BreadcrumbSchema sections={[...sections]} />
        );

        const script = container.querySelector(
            'script[type="application/ld+json"]'
        );

        expect(script).toBeNull();
    });

    it('should handle undefined name properties gracefully', () => {
        const sections = [
            { name: 'LA NACION', path: '/' },
            { path: '/estados-unidos' },
            { name: undefined, path: '/section' }
        ];

        const { container } = render(
            <BreadcrumbSchema sections={[...sections]} />
        );

        const script = container.querySelector(
            'script[type="application/ld+json"]'
        );
        const json = JSON.parse(script.innerHTML);

        expect(json.itemListElement).toHaveLength(1);
        expect(json.itemListElement[0].name).toBe('LA NACION');
    });
});
