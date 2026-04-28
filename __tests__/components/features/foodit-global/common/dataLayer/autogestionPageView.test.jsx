import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import AutogestionPageView from '../../../../../../components/features/foodit-global/common/dataLayer/autogestionPageView';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('fusion:environment', () => ({
    SITE_FOODIT: 'https://foodit.lanacion.com.ar'
}));

describe('Components - Features - Foodit-global - Common - DataLayer - AutogestionPageView', () => {
    afterEach(() => {
        cleanup();
        document
            .querySelectorAll('script#scriptDataLayerPageView')
            .forEach(el => el.remove());
    });

    it('should render script with correct data attributes for Foodit-menu-semanal layout', () => {
        useAppContext.mockReturnValue({
            contextPath: '/test-path',
            deployment: jest.fn(path => path),
            layout: 'Foodit-menu-semanal',
            requestUri: '/mi-menu-semanal/'
        });

        render(<AutogestionPageView globalContent={{}} />);

        const script = document.getElementById('scriptDataLayerPageView');

        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute('data-id', 'N/A');
        expect(script).toHaveAttribute(
            'data-url',
            'https://foodit.lanacion.com.ar/mi-menu-semanal/'
        );
        expect(script).toHaveAttribute('data-section', 'Mi_menu_semanal');
        expect(script).toHaveAttribute('data-content-type', 'autogestion');
        expect(script).toHaveAttribute('data-title', 'N/A');
        expect(script).toHaveAttribute(
            'src',
            '/test-path/resources/js/LN/dataLayerPageView.min.js'
        );
    });

    it('should render script with correct data attributes for Foodit-compras layout', () => {
        useAppContext.mockReturnValue({
            contextPath: '/test-path-2',
            deployment: jest.fn(path => path),
            layout: 'Foodit-compras',
            requestUri: '/lista-de-compras/'
        });

        render(<AutogestionPageView globalContent={{}} />);

        const script = document.getElementById('scriptDataLayerPageView');

        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute('data-id', 'N/A');
        expect(script).toHaveAttribute(
            'data-url',
            'https://foodit.lanacion.com.ar/lista-de-compras/'
        );
        expect(script).toHaveAttribute('data-section', 'lista_de_compras');
        expect(script).toHaveAttribute('data-content-type', 'autogestion');
        expect(script).toHaveAttribute('data-title', 'N/A');
    });

    it('should strip query parameters from data-url', () => {
        useAppContext.mockReturnValue({
            contextPath: '/test-path-3',
            deployment: jest.fn(path => path),
            layout: 'Foodit-menu-semanal',
            requestUri: '/mi-menu-semanal/?utm_source=test'
        });

        render(<AutogestionPageView globalContent={{}} />);

        const script = document.getElementById('scriptDataLayerPageView');

        expect(script).toHaveAttribute(
            'data-url',
            'https://foodit.lanacion.com.ar/mi-menu-semanal/'
        );
    });

    it('should use globalContent._id when available', () => {
        useAppContext.mockReturnValue({
            contextPath: '/test-path-4',
            deployment: jest.fn(path => path),
            layout: 'Foodit-recetario',
            requestUri: '/recetario/'
        });

        render(<AutogestionPageView globalContent={{ _id: 'SOME_ID_123' }} />);

        const script = document.getElementById('scriptDataLayerPageView');

        expect(script).toHaveAttribute('data-id', 'SOME_ID_123');
    });
});
