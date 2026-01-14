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
});
