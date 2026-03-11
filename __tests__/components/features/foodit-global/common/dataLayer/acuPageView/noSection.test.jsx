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

describe('AcusPageView - No Section', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        const script = document.getElementById('scriptDataLayerPageView');
        if (script) {
            script.remove();
        }
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

        render(<AcusPageView />);

        const script = document.getElementById('scriptDataLayerPageView');
        expect(script).not.toBeInTheDocument();
    });
});
