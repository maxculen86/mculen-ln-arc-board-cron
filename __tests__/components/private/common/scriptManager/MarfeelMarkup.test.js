import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import MarfeelMarkup from '../../../../../components/private/common/scriptManager/MarfeelMarkup';

jest.mock('fusion:context', () => ({
    useAppContext: () => ({
        contextPath: '/pf',
        deployment: jest.fn(),
        globalContent: {
            content_restrictions: {
                content_code: 'abierta'
            }
        }
    })
}));

describe('MarfeelMarkup Renders script', () => {
    it('should return a script tag with type "application/ld+json"', () => {
        const { container } = render(<MarfeelMarkup />);
        const scriptElement = container.querySelector(
            'script[type="application/ld+json"]'
        );

        expect(scriptElement).toBeInTheDocument();
    });

    it('renders script with isAccessibleForFree', () => {
        const { container } = render(<MarfeelMarkup />);

        const scriptElement = container.querySelector(
            'script[type="application/ld+json"]'
        );
        expect(scriptElement).toBeInTheDocument();
    });
});
