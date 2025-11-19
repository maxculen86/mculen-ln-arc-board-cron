import React from 'react';
import { render } from '@testing-library/react';
import Context from 'fusion:context';

import '@testing-library/jest-dom';
import { AcuChefSchema } from '../../../../../components/features/foodit-global/schemas/AcuChef';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('fusion:environment', () => {
    return {
        SITE_FOODIT: 'https://foodit.lanacion.com.ar'
    };
});

describe('components - features- foodit-global - schemas - AcuChefSchema', () => {
    Context.useAppContext = jest.fn(() => ({
        deployment: arg => arg,
        contextPath: '/pf'
    }));

    it('renders the correct number of schema script tags', () => {
        const { container } = render(<AcuChefSchema />);
        const scripts = container.querySelectorAll(
            'script[type="application/ld+json"]'
        );
        const scriptSnippetRender = JSON.parse(scripts[0].textContent);
        const scriptBreadcrumb = JSON.parse(scripts[1].textContent);
        expect(scriptBreadcrumb.itemListElement).toEqual([
            {
                '@type': 'ListItem',
                position: 0,
                item: {
                    '@id': 'https://foodit.lanacion.com.ar/',
                    name: 'Foodit'
                }
            },
            {
                '@type': 'ListItem',
                position: 1,
                item: {
                    '@id': 'https://foodit.lanacion.com.ar/recetas/',
                    name: 'Recetas'
                }
            }
        ]);
        const { name, url } = scriptSnippetRender;
        expect(name).toEqual('Acumulado - Chefs Protagonistas');
        expect(url).toEqual(
            'https://foodit.lanacion.com.ar/chefs-protagonistas/'
        );
        expect(scripts.length).toBe(2);
        expect(container).toMatchSnapshot();
    });
});
