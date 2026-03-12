import React from 'react';
import { render } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import AcusPageView from '../../../../../../../components/features/foodit-global/common/dataLayer/acusPageVIew';
import { processUriParams } from '../../../../../../../components/features/foodit-global/common/dataLayer/_helpers';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('fusion:environment', () => ({
    SITE_FOODIT: 'https://foodit.com'
}));

jest.mock(
    '../../../../../../../components/features/foodit-global/common/dataLayer/_helpers',
    () => ({
        DESCUBRIR_SECTIONS: ['nutrition'],
        processUriParams: jest.fn()
    })
);

describe('AcusPageView - Clean Tracking IDs (Random)', () => {
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

        render(<AcusPageView />);

        const script = document.getElementById('scriptDataLayerPageView');

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
});
