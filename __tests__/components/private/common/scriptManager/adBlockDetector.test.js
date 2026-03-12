import React from 'react';
import { render } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import AdblockDetector from '../../../../../components/private/common/scriptManager/adblockDetector';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));
describe('components - private - common - scriptManager - adBlockDetector', () => {
    beforeEach(() => {
        useAppContext.mockReturnValue({
            contextPath: '/path',
            deployment: jest.fn(path => `https://lanacion.com.ar${path}`)
        });
    });

    it('renders a script tag with the correct src attribute', () => {
        const { container } = render(<AdblockDetector />);

        const scriptTag = container.querySelector(
            'script[src*="scriptAdblockDetector"]'
        );

        expect(scriptTag).toBeInTheDocument();
        expect(scriptTag).toHaveAttribute(
            'src',
            'https://lanacion.com.ar/path/resources/js/LN/scriptAdblockDetector.min.js'
        );
    });
});
