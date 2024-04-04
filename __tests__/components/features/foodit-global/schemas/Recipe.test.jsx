import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RecipeSchema } from '../../../../../components/features/foodit-global/schemas/Recipe';

import mockArticle from '../../../../../__mocks__/data/articlesFoodit/SubtypeReceta/fichaReceta.json';

describe('components - features- foodit-global - schemas - RecipeSchema', () => {
    it('renders the correct number of schema script tags', () => {
        const { container } = render(<RecipeSchema article={mockArticle} />);
        const scripts = container.querySelectorAll(
            'script[type="application/ld+json"]'
        );
        expect(scripts.length).toBe(3);
    });

    it('outputs correct suitableForDiet URLs', () => {
        const { container } = render(<RecipeSchema article={mockArticle} />);
        const scriptTags = Array.from(
            container.querySelectorAll('script[type="application/ld+json"]')
        );
        const dietScriptTag = scriptTags.find(tag =>
            tag.textContent.includes('"suitableForDiet"')
        );

        expect(dietScriptTag).toBeTruthy();
        expect(dietScriptTag.textContent).toContain(
            'https://schema.org/GlutenFreeDiet'
        );
    });

    it('matches the snapshot', () => {
        const { container } = render(<RecipeSchema article={mockArticle} />);

        expect(container).toMatchSnapshot();
    });
});
