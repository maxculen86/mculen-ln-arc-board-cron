import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GridFooditServer from '../../../../../components/features/foodit/GrillaNotasAcu/helpers/gridFooditServer';
import useGridArticlesFoodit from '../../../../../components/features/foodit/GrillaNotasAcu/hooks/useGridArticles';
import articlesFoodit from '../../../../../__mocks__/data/fooditGridArticles/articlesFoodit.json';

jest.mock(
    '../../../../../components/features/foodit/GrillaNotasAcu/hooks/useGridArticles',
    () => jest.fn()
);
describe('Components - features - helpers - gridFooditServer', () => {
    it('should render gridFooditServer', () => {
        useGridArticlesFoodit.mockImplementation(() => {
            return { articles: articlesFoodit, hasMoreArticle: false };
        });

        const haveShowButton = jest.fn();

        const { container } = render(
            <GridFooditServer
                idSection="/recetas/saladas"
                haveShowButton={haveShowButton}
            />
        );
        const hiddenDiv = container.querySelector('.hidden');
        const gridDiv = container.querySelector('.grid');

        expect(hiddenDiv).toBeInTheDocument();
        expect(gridDiv).toBeInTheDocument();
        expect(haveShowButton).toHaveBeenCalledTimes(0);

        expect(screen.getAllByRole('article').length).toStrictEqual(24);
    });

    it('should render gridFooditServer without moreArticles', () => {
        useGridArticlesFoodit.mockImplementation(() => {
            return {
                articles: articlesFoodit.slice(0, 15),
                hasMoreArticle: false
            };
        });
        const haveShowButton = jest.fn();
        const { container } = render(
            <GridFooditServer
                id="/recetas/saladas"
                haveShowButton={haveShowButton}
            />
        );
        const hiddenDiv = container.querySelector('.hidden');
        const gridDiv = container.querySelector('.grid');

        expect(hiddenDiv).toBeInTheDocument();
        expect(gridDiv).toBeInTheDocument();
        expect(haveShowButton).toHaveBeenCalledTimes(1);

        expect(screen.getAllByRole('article').length).toStrictEqual(15);
    });
});
