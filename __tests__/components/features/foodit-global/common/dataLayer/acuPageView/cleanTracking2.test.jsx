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

describe('AcusPageView - Clean Tracking IDs (Hex Format)', () => {
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

        render(<AcusPageView />);

        const script = document.getElementById('scriptDataLayerPageView');

        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute(
            'data-url',
            'https://foodit.com/tema/dulces-receta/subsection'
        );
        expect(script).toHaveAttribute('data-section', 'tema');
        expect(script).toHaveAttribute('data-sub-section', 'dulces-receta');
        expect(script).toHaveAttribute('data-category', 'subsection');
    });
});
