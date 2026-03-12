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

describe('AcusPageView - Normal Sections', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        const script = document.getElementById('scriptDataLayerPageView');
        if (script) {
            script.remove();
        }
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

        render(<AcusPageView />);

        const script = document.getElementById('scriptDataLayerPageView');

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
});
