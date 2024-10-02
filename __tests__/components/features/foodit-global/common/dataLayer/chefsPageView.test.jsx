import React from 'react';
import { render } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import ChefsPageView from '../../../../../../components/features/foodit-global/common/dataLayer/chefsPageView';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('fusion:environment', () => ({
    SITE_FOODIT: 'https://foodit.com'
}));

describe('Components - Features - Foodit-global - Common - DataLayer - ChefsPageView', () => {
    it('should render the script with correct data attributes for normal URL', () => {
        useAppContext.mockReturnValue({
            contextPath: '/test-path',
            deployment: jest.fn(path => path),
            requestUri: '/recipes/1234'
        });

        const { container } = render(<ChefsPageView />);

        const script = container.querySelector(
            'script#scriptDataLayerPageView'
        );

        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute(
            'data-url',
            'https://foodit.com/recipes/1234'
        );
        expect(script).toHaveAttribute('data-section', 'descubrir');
        expect(script).toHaveAttribute('data-content-type', 'recipes');
        expect(script).toHaveAttribute('data-title', 'N/A');
        expect(script).toHaveAttribute(
            'src',
            '/test-path/resources/js/LN/dataLayerPageView.min.js'
        );
    });

    it('should render script without contentType if no match is found in URL', () => {
        useAppContext.mockReturnValue({
            contextPath: '/test-path',
            deployment: jest.fn(path => path),
            requestUri: '/no-match-url'
        });

        const { container } = render(<ChefsPageView />);

        const script = container.querySelector(
            'script#scriptDataLayerPageView'
        );

        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute(
            'data-url',
            'https://foodit.com/no-match-url'
        );
        expect(script).toHaveAttribute('data-section', 'descubrir');
        expect(script).toHaveAttribute('data-content-type', '');
        expect(script).toHaveAttribute('data-title', 'N/A');
        expect(script).toHaveAttribute(
            'src',
            '/test-path/resources/js/LN/dataLayerPageView.min.js'
        );
    });

    it('should not break when requestUri is empty', () => {
        useAppContext.mockReturnValue({
            contextPath: '/test-path',
            deployment: jest.fn(path => path),
            requestUri: ''
        });

        const { container } = render(<ChefsPageView />);

        const script = container.querySelector(
            'script#scriptDataLayerPageView'
        );

        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute('data-url', 'https://foodit.com');
        expect(script).toHaveAttribute('data-section', 'descubrir');
        expect(script).toHaveAttribute('data-content-type', '');
        expect(script).toHaveAttribute('data-title', 'N/A');
        expect(script).toHaveAttribute(
            'src',
            '/test-path/resources/js/LN/dataLayerPageView.min.js'
        );
    });
});
