import React from 'react';
import { render } from '@testing-library/react';

import BreadcrumbSchema from '../../../../../components/private/LN/common/breadcrumbSchema';

describe('components - private - LN - acumulado - breadcrumbs - breadcrumbSection', () => {
    const sections = [
        { path: 'https://www.lanacion.com.ar', name: 'LA NACION' },
        {
            path: '/opinion/columnistas?_website=la-nacion-ar',
            name: '"Columnistas"'
        },
        { path: '/opinion/columnistas/', name: 'Columnistas' }
    ];

    const { container } = render(
        <BreadcrumbSchema
            sections={sections}
            host="https://www.lanacion.com.ar"
        />
    );

    it('Testeo que se modifiquien correctamente los strings del path y name', () => {
        const scriptElement = container.querySelector(
            'script[type="application/ld+json"]'
        );
        const scriptContent = scriptElement && scriptElement.innerHTML;

        expect(scriptContent).toEqual(
            expect.stringContaining(
                'https://www.lanacion.com.ar/opinion/columnistas/'
            ),
            expect.stringContaining('"Columnistas"'),
            expect.not.stringContaining('?_website=la-nacion-ar'),
            expect.not.stringContaining('/opinion/columnistas//')
        );
    });
});
