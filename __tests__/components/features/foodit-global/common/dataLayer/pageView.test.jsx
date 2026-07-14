import React from 'react';
import { render } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import { getAuthorsInfo } from '../../../../../../components/private/common/utils/getAuthorsInfo';
import PageViewDataLayer from '../../../../../../components/features/foodit-global/common/dataLayer/pageView';
import mockGlobalContent from '../../../../../../__mocks__/data/articlesFoodit/SubtypeReceta/fichaReceta.json';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('fusion:environment', () => ({
    SITE_FOODIT: 'https://foodit.com'
}));

jest.mock(
    '../../../../../../components/private/common/utils/getAuthorsInfo',
    () => ({ getAuthorsInfo: jest.fn() })
);

describe('Components - Features - Foodit-global - Common - DataLayer - PageViewDataLayer', () => {
    beforeEach(() => {
        getAuthorsInfo.mockReturnValue({
            authorsName: 'Elisabetta Piqué',
            authorsIds: 'elisabetta-pique'
        });

        useAppContext.mockReturnValue({
            contextPath: '/test-path',
            deployment: jest.fn(path => path),
            layout: 'Foodit-ficha-receta',
            requestUri:
                '/recetas/receta-para-comer-mas-rico-con-milanesas-nid18092023/'
        });
    });

    it('should render the script with correct data attributes', () => {
        render(<PageViewDataLayer globalContent={mockGlobalContent} />);

        const script = document.head.querySelector(
            'script#scriptDataLayerPageView'
        );
        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute('data-id', '6YTYZNJHLBCKRK3U62UGQCJXFY');
        expect(script).toHaveAttribute(
            'data-url',
            'https://foodit.com/recetas/receta-para-comer-mas-rico-con-milanesas-nid18092023/'
        );
        expect(script).toHaveAttribute('data-section', 'saladas');
        expect(script).toHaveAttribute('data-sub-section', 'pollo');
        expect(script).toHaveAttribute('data-content-type', 'recetas');
        expect(script).toHaveAttribute('data-published-day', '2023-11-02');
        expect(script).toHaveAttribute('data-published-time', '15:25:48.436Z');
        expect(script).toHaveAttribute(
            'data-title',
            'Receta para comer mas rico con ...MILANESAS '
        );
        expect(script).toHaveAttribute('data-author-name', 'Elisabetta Piqué');
        expect(script).toHaveAttribute('data-valor', 'comun');
        expect(script).toHaveAttribute('data-author-url', 'elisabetta-pique');
        expect(script).toHaveAttribute(
            'src',
            '/test-path/resources/js/LN/dataLayerPageView.min.js'
        );
    });
});
