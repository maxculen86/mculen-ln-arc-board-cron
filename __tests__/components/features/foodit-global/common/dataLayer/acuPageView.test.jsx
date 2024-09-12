import React from 'react';
import { render } from '@testing-library/react';
import { useAppContext } from 'fusion:context';

import AcusPageView from '../../../../../../components/features/foodit-global/common/dataLayer/acusPageVIew';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('fusion:environment', () => ({
    SITE_FOODIT: 'https://foodit.com'
}));

jest.mock(
    '../../../../../../components/features/foodit-global/common/dataLayer/_helpers',
    () => ({
        DESCUBRIR_SECTIONS: ['nutrition']
    })
);

describe('Components - Features - Foodit-global - Common - DataLayer - acusPageView', () => {
    it('should render the script with correct data attributes for normal sections', () => {
        useAppContext.mockReturnValue({
            contextPath: '/test-path',
            deployment: jest.fn(path => path),
            requestUri: '/primera-seccion/segunda-seccion/tercera-seccion'
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
        expect(script).toHaveAttribute('data-section', 'primera_seccion');
        expect(script).toHaveAttribute('data-sub-section', 'segunda_seccion');
        expect(script).toHaveAttribute('data-category', 'tercera_seccion');
        expect(script).toHaveAttribute('data-content-type', 'primera_seccion');
    });

    it('should render the script with descubrir section', () => {
        useAppContext.mockReturnValue({
            contextPath: '/test-path',
            deployment: jest.fn(path => path),
            requestUri: '/nutrition/algo/otro'
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

        const { container } = render(<AcusPageView />);

        const script = container.querySelector(
            'script#scriptDataLayerPageView'
        );
        expect(script).not.toBeInTheDocument();
    });
});
