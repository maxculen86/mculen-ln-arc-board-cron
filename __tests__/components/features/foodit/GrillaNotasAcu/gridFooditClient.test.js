import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import useGridArticlesFoodit from '../../../../../components/features/foodit/GrillaNotasAcu/hooks/useGridArticles';
import GridFooditClient from '../../../../../components/features/foodit/GrillaNotasAcu/helpers/gridFooditClient';
import articlesFoodit from '../../../../../__mocks__/data/fooditGridArticles/articlesFoodit.json';

jest.mock(
    '../../../../../components/features/foodit/GrillaNotasAcu/hooks/useGridArticles',
    () => jest.fn()
);
describe('Components - features - helpers - gridFooditClient', () => {
    it('should render gridFooditClient', () => {
        useGridArticlesFoodit.mockImplementation(() => {
            return { articles: articlesFoodit, hasMoreArticle: false };
        });

        const { container } = render(
            <GridFooditClient idSection="/recetas/saladas" />
        );
        const hiddenDiv = container.querySelector('.hidden');
        const gridDiv = container.querySelector('.grid');

        expect(hiddenDiv).not.toBeInTheDocument();
        expect(gridDiv).toBeInTheDocument();
        expect(screen.getAllByRole('article').length).toStrictEqual(24);
    });
});
