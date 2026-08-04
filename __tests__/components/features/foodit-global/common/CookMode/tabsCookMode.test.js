import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TabsCookMode } from '../../../../../../components/features/foodit-global/common/OpeningRecipe/cookMode/components/tabsCookMode';

jest.mock('@ln/ds-common-tabs', () => {
    const Tabs = ({ children, defaultValue, className }) => (
        <div data-default-value={defaultValue} className={className}>
            {children}
        </div>
    );
    Tabs.List = ({ children, className }) => (
        <div role="tablist" className={className}>
            {children}
        </div>
    );
    Tabs.Trigger = ({ children, value, className }) => (
        <button role="tab" data-value={value} className={className}>
            {children}
        </button>
    );
    Tabs.Content = ({ children, value, className }) => (
        <div
            role="tabpanel"
            data-value={value}
            className={className}
            style={{ display: 'block' }}
        >
            {children}
        </div>
    );
    return { Tabs };
});

jest.mock(
    '../../../../../../components/features/foodit-global/common/OpeningRecipe/cookMode/components/steps',
    () => ({
        Steps: ({ steps }) => (
            <div data-testid="steps" data-step-count={steps?.length}>
                Steps
            </div>
        )
    })
);

jest.mock(
    '../../../../../../components/features/foodit-global/common/OpeningRecipe/cookMode/components/ingredients',
    () => ({
        Ingredients: ({ ingredients }) => (
            <div
                data-testid="ingredients"
                data-ingredients-count={ingredients?.length}
            >
                Ingredients
            </div>
        )
    })
);

describe('TabsCookMode', () => {
    it('render tabs with correctly titles', () => {
        render(<TabsCookMode />);

        expect(screen.getByText('Paso a paso')).toBeInTheDocument();
        expect(screen.getAllByText('Ingredientes').length).toBeGreaterThan(0);
    });

    it('renders the Steps component inside the tab content', () => {
        render(<TabsCookMode />);

        const stepsPanel = screen.getByRole('tabpanel', {
            name: (_, el) => el.getAttribute('data-value') === 'steps'
        });
        expect(stepsPanel).toContainElement(screen.getByTestId('steps'));
    });

    it('renders the Ingredients component inside the ingredients tab content', () => {
        render(<TabsCookMode />);

        const ingredientsPanel = screen.getByRole('tabpanel', {
            name: (_, el) => el.getAttribute('data-value') === 'ingredients'
        });
        expect(ingredientsPanel).toBeInTheDocument();
    });

    it('renders Ingredients in the desktop aside', () => {
        render(<TabsCookMode />);

        expect(screen.getAllByTestId('ingredients')).toHaveLength(2);
    });

    it('triggers have the correct values', () => {
        render(<TabsCookMode />);

        const triggers = screen.getAllByRole('tab');
        const values = triggers.map(t => t.getAttribute('data-value'));
        expect(values).toContain('steps');
        expect(values).toContain('ingredients');
    });

    it('passes steps and ingredients to the child components', () => {
        const mockSteps = [{ step: 1, description: 'Paso uno', image: null }];
        const mockIngredients = ['500g harina', '2 huevos'];

        render(
            <TabsCookMode steps={mockSteps} ingredients={mockIngredients} />
        );

        expect(screen.getByTestId('steps')).toHaveAttribute(
            'data-step-count',
            String(mockSteps.length)
        );

        const ingredientsEl = screen.getAllByTestId('ingredients')[0];
        expect(ingredientsEl).toHaveAttribute(
            'data-ingredients-count',
            String(mockIngredients.length)
        );
    });
});
