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

describe('AcusPageView - Query Parameters', () => {
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

        render(<AcusPageView />);

        const script = document.getElementById('scriptDataLayerPageView');

        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute(
            'data-url',
            'https://foodit.com/section/subsection'
        );
        expect(script).toHaveAttribute('data-section', 'section');
        expect(script).toHaveAttribute('data-sub-section', 'subsection');
    });
});
