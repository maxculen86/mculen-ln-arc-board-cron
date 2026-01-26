import React from 'react';
import { render, screen } from '@testing-library/react';
import PreBody from '../../../../../../components/layouts/LN-Nota-Opinion/components/preBody/PreBody';

describe('PreBody', () => {
    it('should render children correctly', () => {
        render(
            <PreBody>
                <div data-testid="child">Child content</div>
            </PreBody>
        );

        expect(screen.getByTestId('child')).toBeInTheDocument();
        expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('should expose Breadcrumb as a static property', () => {
        expect(PreBody.Breadcrumb).toBeDefined();
        expect(typeof PreBody.Breadcrumb).toBe('function');
    });
});
