import React from 'react';
import { render } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import ChefsPageView from '../../../../../../../components/features/foodit-global/common/dataLayer/chefsPageView';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('fusion:environment', () => ({
    SITE_FOODIT: 'https://foodit.com'
}));

describe('ChefsPageView - No Match', () => {
    it('should render script without contentType if no match is found in URL', () => {
        useAppContext.mockReturnValue({
            contextPath: '/test-path',
            deployment: jest.fn(path => path),
            requestUri: '/no-match-url'
        });

        render(<ChefsPageView />);

        const script = document.getElementById('scriptDataLayerPageView');

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
});
