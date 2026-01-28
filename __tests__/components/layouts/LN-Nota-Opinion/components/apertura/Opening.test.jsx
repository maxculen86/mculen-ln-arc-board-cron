import React from 'react';
import { render, screen } from '@testing-library/react';
import Opening from '../../../../../../components/layouts/LN-Nota-Opinion/components/apertura/Opening';

describe('Opening', () => {
    it('should render children correctly', () => {
        render(
            <Opening>
                <div data-testid="child">Child content</div>
            </Opening>
        );

        expect(screen.getByTestId('child')).toBeInTheDocument();
        expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('should expose Title as a static property', () => {
        expect(Opening.Title).toBeDefined();
        expect(typeof Opening.Title).toBe('function');
    });

    it('should expose Subtitle as a static property', () => {
        expect(Opening.Subtitle).toBeDefined();
        expect(typeof Opening.Subtitle).toBe('function');
    });
});
