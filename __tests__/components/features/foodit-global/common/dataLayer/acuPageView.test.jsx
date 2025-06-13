import React from 'react';
import { render } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import AcusPageView from '../../../../../../components/features/foodit-global/common/dataLayer/acusPageVIew';
import { processUriParams } from '../../../../../../components/features/foodit-global/common/dataLayer/_helpers';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('fusion:environment', () => ({
    SITE_FOODIT: 'https://foodit.com'
}));

jest.mock(
    '../../../../../../components/features/foodit-global/common/dataLayer/_helpers',
    () => ({
        DESCUBRIR_SECTIONS: ['nutrition'],
        processUriParams: jest.fn()
    })
);

describe('Components - Features - Foodit-global - Common - DataLayer - acusPageView', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the script with correct data attributes for normal sections', () => {
        useAppContext.mockReturnValue({
            contextPath: '/test-path',
            deployment: jest.fn(path => path),
            requestUri: '/primera-seccion/segunda-seccion/tercera-seccion'
        });

        processUriParams.mockReturnValue({
            firstSection: 'primera-seccion',
            secondSection: 'segunda-seccion',
            thirdSection: 'tercera-seccion',
            cleanedUrl:
                'https://foodit.com/primera-seccion/segunda-seccion/tercera-seccion'
        });

        const { container } = render(<AcusPageView />);

        const script = container.querySelector(
            'script#scriptDataLayerPageView'
        );

        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute(
            'data-url',
            'https://foodit.com/primera-seccion/segunda-seccion/tercera-seccion'
        );
        expect(script).toHaveAttribute('data-section', 'primera-seccion');
        expect(script).toHaveAttribute('data-sub-section', 'segunda-seccion');
        expect(script).toHaveAttribute('data-category', 'tercera-seccion');
        expect(script).toHaveAttribute('data-content-type', 'primera-seccion');
    });

    it('should render the script with descubrir section', () => {
        useAppContext.mockReturnValue({
            contextPath: '/test-path',
            deployment: jest.fn(path => path),
            requestUri: '/nutrition/algo/otro'
        });

        processUriParams.mockReturnValue({
            firstSection: 'nutrition',
            secondSection: 'algo',
            thirdSection: 'otro',
            cleanedUrl: 'https://foodit.com/nutrition/algo/otro'
        });

        const { container } = render(<AcusPageView />);

        const script = container.querySelector(
            'script#scriptDataLayerPageView'
        );

        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute(
            'data-url',
            'https://foodit.com/nutrition/algo/otro'
        );
        expect(script).toHaveAttribute('data-section', 'descubrir');
        expect(script).toHaveAttribute('data-sub-section', 'nutrition');
        expect(script).toHaveAttribute('data-category', 'otro');
        expect(script).toHaveAttribute('data-content-type', 'nutrition');
    });

    it('should not render the script if no section is present', () => {
        useAppContext.mockReturnValue({
            contextPath: '/test-path',
            deployment: jest.fn(path => path),
            requestUri: '/'
        });

        processUriParams.mockReturnValue({
            firstSection: '',
            secondSection: '',
            thirdSection: '',
            cleanedUrl: 'https://foodit.com/'
        });

        const { container } = render(<AcusPageView />);

        const script = container.querySelector(
            'script#scriptDataLayerPageView'
        );
        expect(script).not.toBeInTheDocument();
    });

    it('should clean second section by removing random tracking IDs', () => {
        useAppContext.mockReturnValue({
            contextPath: '/test-path',
            deployment: jest.fn(path => path),
            requestUri: '/recetas/recetas-gratiss-f0f8eyutsoli4br/ingredientes'
        });

        processUriParams.mockReturnValue({
            firstSection: 'recetas',
            secondSection: 'recetas-gratiss',
            thirdSection: 'ingredientes',
            cleanedUrl:
                'https://foodit.com/recetas/recetas-gratiss/ingredientes'
        });

        const { container } = render(<AcusPageView />);

        const script = container.querySelector(
            'script#scriptDataLayerPageView'
        );

        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute(
            'data-url',
            'https://foodit.com/recetas/recetas-gratiss/ingredientes'
        );
        expect(script).toHaveAttribute('data-section', 'recetas');
        expect(script).toHaveAttribute('data-sub-section', 'recetas-gratiss');
        expect(script).toHaveAttribute('data-category', 'ingredientes');
        expect(script).toHaveAttribute('data-content-type', 'recetas');
    });

    it('should handle URLs with tracking IDs by cleaning them', () => {
        useAppContext.mockReturnValue({
            contextPath: '/test-path',
            deployment: jest.fn(path => path),
            requestUri: '/tema/dulces-receta-f0f6fxiphf6s374/subsection'
        });

        processUriParams.mockReturnValue({
            firstSection: 'tema',
            secondSection: 'dulces-receta',
            thirdSection: 'subsection',
            cleanedUrl: 'https://foodit.com/tema/dulces-receta/subsection'
        });

        const { container } = render(<AcusPageView />);

        const script = container.querySelector(
            'script#scriptDataLayerPageView'
        );

        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute(
            'data-url',
            'https://foodit.com/tema/dulces-receta/subsection'
        );
        expect(script).toHaveAttribute('data-section', 'tema');
        expect(script).toHaveAttribute('data-sub-section', 'dulces-receta');
        expect(script).toHaveAttribute('data-category', 'subsection');
    });

    it('should handle empty subsections with N/A fallback', () => {
        useAppContext.mockReturnValue({
            contextPath: '/test-path',
            deployment: jest.fn(path => path),
            requestUri: '/single-section'
        });

        processUriParams.mockReturnValue({
            firstSection: 'single-section',
            secondSection: '',
            thirdSection: '',
            cleanedUrl: 'https://foodit.com/single-section'
        });

        const { container } = render(<AcusPageView />);

        const script = container.querySelector(
            'script#scriptDataLayerPageView'
        );

        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute('data-section', 'single-section');
        expect(script).toHaveAttribute('data-sub-section', 'N/A');
        expect(script).toHaveAttribute('data-category', 'N/A');
    });

    it('should handle URLs with query parameters', () => {
        useAppContext.mockReturnValue({
            contextPath: '/test-path',
            deployment: jest.fn(path => path),
            requestUri: '/section/subsection?param=value&other=test'
        });

        processUriParams.mockReturnValue({
            firstSection: 'section',
            secondSection: 'subsection',
            thirdSection: '',
            cleanedUrl: 'https://foodit.com/section/subsection'
        });

        const { container } = render(<AcusPageView />);

        const script = container.querySelector(
            'script#scriptDataLayerPageView'
        );

        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute(
            'data-url',
            'https://foodit.com/section/subsection'
        );
        expect(script).toHaveAttribute('data-section', 'section');
        expect(script).toHaveAttribute('data-sub-section', 'subsection');
    });

    it('should clean second section with various tracking ID formats', () => {
        useAppContext.mockReturnValue({
            contextPath: '/test-path',
            deployment: jest.fn(path => path),
            requestUri: '/categoria/postres-deliciosos-abc123def456/detalles'
        });

        processUriParams.mockReturnValue({
            firstSection: 'categoria',
            secondSection: 'postres-deliciosos',
            thirdSection: 'detalles',
            cleanedUrl:
                'https://foodit.com/categoria/postres-deliciosos/detalles'
        });

        const { container } = render(<AcusPageView />);

        const script = container.querySelector(
            'script#scriptDataLayerPageView'
        );

        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute('data-section', 'categoria');
        expect(script).toHaveAttribute(
            'data-sub-section',
            'postres-deliciosos'
        );
        expect(script).toHaveAttribute('data-category', 'detalles');
    });
});
