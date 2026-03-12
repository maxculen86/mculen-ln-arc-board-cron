import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import EjesHomePageView from '../../../../../../components/features/foodit-global/common/dataLayer/ejesHomePageView';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('fusion:environment', () => ({
    SITE_FOODIT: 'https://foodit.com'
}));

describe('Components - Features - Foodit-global - Common - DataLayer - EjesHomePageView', () => {
    afterEach(() => {
        cleanup();
        document
            .querySelectorAll('script#scriptDataLayerPageView')
            .forEach(el => el.remove());
    });

    it('should render script for "Aprendé en la cocina" page with correct data attributes', () => {
        useAppContext.mockReturnValue({
            contextPath: '/test-path-1',
            deployment: jest.fn(path => path),
            requestUri: '/aprende-en-la-cocina/'
        });

        render(<EjesHomePageView />);

        const script = document.querySelector('script#scriptDataLayerPageView');

        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute(
            'data-url',
            'https://foodit.com/aprende-en-la-cocina/'
        );
        expect(script).toHaveAttribute('data-section', 'N/A');
        expect(script).toHaveAttribute(
            'data-content-type',
            'aprende_en_la_cocina'
        );
        expect(script).toHaveAttribute('data-title', 'Aprendé en la cocina');
        expect(script).toHaveAttribute(
            'src',
            '/test-path-1/resources/js/LN/dataLayerPageView.min.js'
        );
    });

    it('should render script for "Cociná fácil y rápido" page with correct data attributes', () => {
        useAppContext.mockReturnValue({
            contextPath: '/test-path-2',
            deployment: jest.fn(path => path),
            requestUri: '/cocina-facil-y-rapido/'
        });

        render(<EjesHomePageView />);

        const script = document.querySelector('script#scriptDataLayerPageView');

        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute(
            'data-url',
            'https://foodit.com/cocina-facil-y-rapido/'
        );
        expect(script).toHaveAttribute('data-section', 'N/A');
        expect(script).toHaveAttribute(
            'data-content-type',
            'cocina_facil_y_rapido'
        );
        expect(script).toHaveAttribute('data-title', 'Cociná fácil y rápido');
        expect(script).toHaveAttribute(
            'src',
            '/test-path-2/resources/js/LN/dataLayerPageView.min.js'
        );
    });

    it('should render script for "Cociná a tu medida" page with correct data attributes', () => {
        useAppContext.mockReturnValue({
            contextPath: '/test-path-3',
            deployment: jest.fn(path => path),
            requestUri: '/cocina-a-tu-medida/'
        });

        render(<EjesHomePageView />);

        const script = document.querySelector('script#scriptDataLayerPageView');

        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute(
            'data-url',
            'https://foodit.com/cocina-a-tu-medida/'
        );
        expect(script).toHaveAttribute('data-section', 'N/A');
        expect(script).toHaveAttribute(
            'data-content-type',
            'cocina_a_tu_medida'
        );
        expect(script).toHaveAttribute('data-title', 'Cociná a tu medida');
        expect(script).toHaveAttribute(
            'src',
            '/test-path-3/resources/js/LN/dataLayerPageView.min.js'
        );
    });

    it('should render script for "Todas las recetas" page with correct data attributes', () => {
        useAppContext.mockReturnValue({
            contextPath: '/test-path-4',
            deployment: jest.fn(path => path),
            requestUri: '/recetas/'
        });

        render(<EjesHomePageView />);

        const script = document.querySelector('script#scriptDataLayerPageView');

        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute(
            'data-url',
            'https://foodit.com/recetas/'
        );
        expect(script).toHaveAttribute('data-section', 'N/A');
        expect(script).toHaveAttribute('data-content-type', 'recetas');
        expect(script).toHaveAttribute('data-title', 'Todas las recetas');
        expect(script).toHaveAttribute(
            'src',
            '/test-path-4/resources/js/LN/dataLayerPageView.min.js'
        );
    });

    it('should not render script for non-ejes pages', () => {
        useAppContext.mockReturnValue({
            contextPath: '/test-path-5',
            deployment: jest.fn(path => path),
            requestUri: '/some-other-page/'
        });

        render(<EjesHomePageView />);

        const script = document.querySelector('script#scriptDataLayerPageView');

        expect(script).not.toBeInTheDocument();
    });

    it('should handle URLs with query parameters', () => {
        useAppContext.mockReturnValue({
            contextPath: '/test-path-6',
            deployment: jest.fn(path => path),
            requestUri: '/aprende-en-la-cocina/?query=test'
        });

        render(<EjesHomePageView />);

        const script = document.querySelector('script#scriptDataLayerPageView');

        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute(
            'data-url',
            'https://foodit.com/aprende-en-la-cocina/'
        );
        expect(script).toHaveAttribute(
            'data-content-type',
            'aprende_en_la_cocina'
        );
    });

    it('should not render when requestUri is empty', () => {
        useAppContext.mockReturnValue({
            contextPath: '/test-path-7',
            deployment: jest.fn(path => path),
            requestUri: ''
        });

        render(<EjesHomePageView />);

        const script = document.querySelector('script#scriptDataLayerPageView');

        expect(script).not.toBeInTheDocument();
    });
});
