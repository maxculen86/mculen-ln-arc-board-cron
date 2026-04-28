import React from 'react';
import { render } from '@testing-library/react';
import LinkedCardContainer from 'features/LN-nota/bodyCards/components/linkedCard/LinkedCardContainer';
import LinkedCardProvider from 'features/LN-nota/bodyCards/context/LinkedCardContext';

const renderWithContext = (children, contextValue = {}) => {
    const defaultContext = {
        variant: 'collapsed',
        gridColumns: 5,
        ...contextValue
    };

    return render(
        <LinkedCardProvider {...defaultContext}>{children}</LinkedCardProvider>
    );
};

describe('LinkedCardContainer', () => {
    it('renders children correctly', () => {
        const { container } = renderWithContext(
            <LinkedCardContainer>
                <div>Test content</div>
            </LinkedCardContainer>
        );

        expect(container.textContent).toContain('Test content');
    });

    it('applies w-100 class when gridColumns is 5', () => {
        const { container } = renderWithContext(
            <LinkedCardContainer>
                <div>Content</div>
            </LinkedCardContainer>,
            { gridColumns: 5 }
        );

        const wrapperDiv = container.querySelector('div > div');
        expect(wrapperDiv).toHaveClass('w-100');
        expect(wrapperDiv).not.toHaveClass('w-300_min1366');
    });

    it('applies w-300_min1366 class when gridColumns is 4', () => {
        const { container } = renderWithContext(
            <LinkedCardContainer>
                <div>Content</div>
            </LinkedCardContainer>,
            { gridColumns: 4 }
        );

        const wrapperDiv = container.querySelector('div > div');
        expect(wrapperDiv).toHaveClass('w-300_min1366');
        expect(wrapperDiv).not.toHaveClass('w-100');
    });

    it('applies additional className prop', () => {
        const { container } = renderWithContext(
            <LinkedCardContainer className="custom-class">
                <div>Content</div>
            </LinkedCardContainer>,
            { gridColumns: 5 }
        );

        const wrapperDiv = container.querySelector('div > div');
        expect(wrapperDiv).toHaveClass('custom-class');
    });
});
