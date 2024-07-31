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

beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
        if (key === 'bookmarkedItems') {
            return JSON.stringify([
                {
                    boookmarkId: '1',
                    bookmarkTypeId: 'FJ5UOR2HONA5RGOM226UQF24MI'
                }
            ]);
        }
        return null;
    });
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Components - features - helpers - gridFooditClient', () => {
    it('should render gridFooditClient', () => {
        useGridArticlesFoodit.mockImplementation(() => {
            return { articles: articlesFoodit, hasMoreArticle: false };
        });

        const { container } = render(
            <GridFooditClient id="/recetas/saladas" />
        );
        const hiddenDiv = container.querySelector('.hidden');
        const gridDiv = container.querySelector('.grid');

        expect(hiddenDiv).not.toBeInTheDocument();
        expect(gridDiv).toBeInTheDocument();
        const loading = container.querySelector('.text-center');
        expect(loading).toBeFalsy();
        expect(screen.getAllByRole('article').length).toStrictEqual(24);
    });

    it('should render gridFooditClient with ver mas', async () => {
        Object.defineProperty(document, 'getElementsByTagName', {
            value: () => ({ length: 24 })
        });

        useGridArticlesFoodit.mockImplementation(() => {
            return { articles: articlesFoodit, hasMoreArticle: false };
        });

        const { container } = render(
            <GridFooditClient id="/recetas/saladas" />
        );
        const hiddenDiv = container.querySelector('.hidden');
        const gridDiv = container.querySelector('.grid');

        expect(hiddenDiv).not.toBeInTheDocument();
        expect(gridDiv).toBeInTheDocument();
        expect(screen.getAllByRole('article').length).toStrictEqual(24);
        const loading = container.querySelector('.text-center');
        expect(loading).toBeTruthy();
        expect(screen.getByText('Ver más')).toBeInTheDocument();
    });

    it('Icon should be bookmark-filled for bookmarked article', async () => {
        useGridArticlesFoodit.mockImplementation(() => {
            return { articles: articlesFoodit, hasMoreArticle: false };
        });

        //mocked localStorage has id "FJ5UOR2HONA5RGOM226UQF24MI" as a saved bookmark
        const BOOKMARKED_ITEM_ID = 'FJ5UOR2HONA5RGOM226UQF24MI';
        const NOT_BOOKMARKED_ITEM_ID = '3ZASMLA63JEJZETICXDMLDL6HU';

        const { container } = render(
            <GridFooditClient id="/recetas/saladas" />
        );

        //saved bookmark
        const bookmarkedItemButton = container.querySelector(
            `[data-id=${BOOKMARKED_ITEM_ID}]`
        );
        expect(bookmarkedItemButton).toBeInTheDocument();

        const mockIcon = bookmarkedItemButton.querySelector('mock-icon');
        expect(mockIcon).toBeInTheDocument();
        expect(mockIcon).toHaveAttribute('name', 'bookmark-filled');

        //not saved bookmark
        const notBookmarkedItemButton = container.querySelector(
            `[data-id='${NOT_BOOKMARKED_ITEM_ID}']`
        );
        expect(notBookmarkedItemButton).toBeInTheDocument();

        const mockIcon2 = notBookmarkedItemButton.querySelector('mock-icon');
        expect(mockIcon2).toBeInTheDocument();
        expect(mockIcon2).toHaveAttribute('name', 'bookmark');
    });
});
