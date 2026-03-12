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

describe('AcusPageView - Descubrir Section', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        const script = document.getElementById('scriptDataLayerPageView');
        if (script) {
            script.remove();
        }
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

        render(<AcusPageView />);

        const script = document.getElementById('scriptDataLayerPageView');

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
});
