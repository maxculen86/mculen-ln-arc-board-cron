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

describe('AcusPageView - Clean Tracking IDs (Various Formats)', () => {
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

        render(<AcusPageView />);

        const script = document.getElementById('scriptDataLayerPageView');

        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute('data-section', 'categoria');
        expect(script).toHaveAttribute(
            'data-sub-section',
            'postres-deliciosos'
        );
        expect(script).toHaveAttribute('data-category', 'detalles');
    });
});
