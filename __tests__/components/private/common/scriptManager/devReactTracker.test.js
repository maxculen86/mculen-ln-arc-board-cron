import React from 'react';
import { render } from '@testing-library/react';
import DevReactTracker from '../../../../../components/private/common/scriptManager/DevReactTracker';

jest.mock('fusion:environment', () => ({
    IS_DEV: 'true'
}));

describe('components - private - common - scriptManager - devReactTracker', () => {
    afterEach(() => {
        jest.resetModules();
    });

    it('renders the script tag when IS_DEV is "true"', () => {
        const { container } = render(<DevReactTracker />);

        const scriptTag = container.querySelector(
            'script[src*="react-render-tracker"]'
        );
        expect(scriptTag).toBeInTheDocument();
        expect(scriptTag.src).toBe(
            'https://cdn.jsdelivr.net/npm/react-render-tracker'
        );
    });
});
