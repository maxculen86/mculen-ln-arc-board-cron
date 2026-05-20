import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HomeSchema } from '../../../../../components/features/foodit-global/schemas/Home';

jest.mock('fusion:environment', () => ({
    SITE_FOODIT: 'https://foodit.lanacion.com.ar'
}));

describe('components - features - foodit-global - schemas - HomeSchema', () => {
    const defaultProps = {
        metaValue: key => (key === 'description' ? 'Foodit - Recetas' : ''),
        contextPath: '/pf',
        deployment: path => path
    };

    it('renders a single script tag with application/ld+json', () => {
        render(<HomeSchema {...defaultProps} />);
        const scripts = document.querySelectorAll(
            'script[type="application/ld+json"]'
        );
        expect(scripts.length).toBe(1);
    });

    it('includes @id referencing the website entity', () => {
        render(<HomeSchema {...defaultProps} />);
        const script = document.querySelector(
            'script[type="application/ld+json"]'
        );
        const content = JSON.parse(script.textContent);
        expect(content['@id']).toBe('https://foodit.lanacion.com.ar/#website');
    });

    it('includes publisher referencing the Organization schema', () => {
        render(<HomeSchema {...defaultProps} />);
        const script = document.querySelector(
            'script[type="application/ld+json"]'
        );
        const content = JSON.parse(script.textContent);
        expect(content.publisher).toEqual({
            '@id': 'https://foodit.lanacion.com.ar/#organization'
        });
    });

    it('includes potentialAction with SearchAction', () => {
        render(<HomeSchema {...defaultProps} />);
        const script = document.querySelector(
            'script[type="application/ld+json"]'
        );
        const content = JSON.parse(script.textContent);
        expect(content.potentialAction).toEqual({
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate:
                    'https://foodit.lanacion.com.ar/chat/?query={search_term_string}'
            },
            'query-input': 'required name=search_term_string'
        });
    });

    it('includes required basic properties: name, description, url, image', () => {
        render(<HomeSchema {...defaultProps} />);
        const script = document.querySelector(
            'script[type="application/ld+json"]'
        );
        const content = JSON.parse(script.textContent);
        expect(content['@context']).toBe('https://schema.org');
        expect(content['@type']).toBe('WebSite');
        expect(content.name).toBe('Foodit');
        expect(content.description).toBe('Foodit - Recetas');
        expect(content.url).toBe('https://foodit.lanacion.com.ar/');
    });

    it('uses default description when metaValue returns falsy', () => {
        const props = {
            ...defaultProps,
            metaValue: () => ''
        };
        render(<HomeSchema {...props} />);
        const script = document.querySelector(
            'script[type="application/ld+json"]'
        );
        const content = JSON.parse(script.textContent);
        expect(content.description).toBe('Foodit');
    });

    it('matches the snapshot', () => {
        const { container } = render(<HomeSchema {...defaultProps} />);
        expect(container).toMatchSnapshot();
    });
});
