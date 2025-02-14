import React from 'react';
import { render } from '@testing-library/react';
import { PowerupsRecipePaywall } from '../../../../../../components/features/foodit-global/Body/PowerupsRecipePaywall/foodit';
import mockArticle from '../../../../../../__mocks__/data/articlesFoodit/SubtypeReceta/fichaReceta2.json';

jest.mock(
    '../../../../../../components/features/foodit-global/Body/PowerupsReceta/ingredientsBox/ingredients',
    () => ({
        Ingredients: jest.fn(
            ({ articleId, ingredientsLists, portions, showButton }) => (
                <div
                    data-testid="ingredients-component"
                    data-articleid={articleId}
                    data-ingredientslists={JSON.stringify(ingredientsLists)}
                    data-portions={portions}
                    data-showbutton={showButton}
                ></div>
            )
        )
    })
);

describe('Components - Features - Foodit-global - Body - PowerupsRecipePaywall', () => {
    it('Should render Ingredients component with correct props', () => {
        const { getByTestId } = render(
            <PowerupsRecipePaywall article={mockArticle} />
        );

        const ingredientsComponent = getByTestId('ingredients-component');
        expect(ingredientsComponent).toBeInTheDocument();

        expect(ingredientsComponent.getAttribute('data-articleid')).toBe(
            mockArticle._id
        );
        expect(
            JSON.parse(
                ingredientsComponent.getAttribute('data-ingredientslists')
            )
        ).toBeDefined();
        expect(ingredientsComponent.getAttribute('data-portions')).toBe('1');
        expect(ingredientsComponent.getAttribute('data-showbutton')).toBe(
            'false'
        );
    });

    it('Should render correctly with no article prop', () => {
        const { container } = render(<PowerupsRecipePaywall />);

        expect(container).toBeTruthy();
    });
});
