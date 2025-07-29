import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import useGridArticlesFoodit from '../../../../../components/features/foodit/GrillaNotasAcu/hooks/useGridArticles';
import GridFooditClient from '../../../../../components/features/foodit/GrillaNotasAcu/helpers/gridFooditClient';
import articlesFoodit from '../../../../../__mocks__/data/fooditGridArticles/articlesFoodit.json';

jest.mock(
    '../../../../../components/features/foodit/GrillaNotasAcu/hooks/useGridArticles',
    () => jest.fn()
);

jest.mock(
    '../../../../../components/features/foodit-global/common/CommonCardFoodit/foodit',
    () => {
        return function MockCommonCardFoodit({
            articleId,
            fill,
            title,
            linksProps,
            contentCode = 'test',
            author = '',
            time = '',
            ...props
        }) {
            return (
                <article
                    className="card relative w-100 mx-auto overflow-hidden h-100 bg-light-1 max-w-1366 border border-all border-thin border-light-100 col-span-8 col-span-4_md"
                    data-variant="recipe"
                    data-container="grid"
                    data-test-id={`card-recipe-${contentCode}-${articleId}`}
                    role="article"
                >
                    <a href={linksProps?.href} title={linksProps?.title}>
                        <div>
                            <h2>{title}</h2>
                            <span>Por {author}</span>
                            {time && <span>{time} min</span>}
                        </div>
                        <button
                            data-id={articleId}
                            data-modal="open-modal"
                            data-test-id={`button-bookmark-${articleId}`}
                            title="Guardar"
                            className="button foodit-button"
                        >
                            <mock-icon
                                name={fill ? 'bookmark-filled' : 'bookmark'}
                            />
                        </button>
                    </a>
                </article>
            );
        };
    }
);

beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
        if (key === 'bookmarkedItems') {
            return JSON.stringify([
                {
                    bookmarkId: '1',
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
            return {
                articles: articlesFoodit,
                count: 24,
                idArticleList: 'test-id'
            };
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
            return {
                articles: articlesFoodit,
                hasMoreArticle: false,
                idArticleList: 'test-id'
            };
        });

        const { container } = render(
            <GridFooditClient id="/recetas/saladas" />
        );
        const hiddenDiv = container.querySelector('.hidden');
        const gridDiv = container.querySelector('.grid');

        expect(hiddenDiv).not.toBeInTheDocument();
        expect(gridDiv).toBeInTheDocument();
        expect(container.querySelectorAll('article.card').length).toStrictEqual(
            24
        );
        expect(screen.getByText('Ver más')).toBeInTheDocument();
        const loading = container.querySelector('.text-center');
        expect(loading).toBeTruthy();
        expect(screen.getByText('Ver más')).toBeInTheDocument();
    });

    it('Icon should be bookmark-filled for bookmarked article', async () => {
        useGridArticlesFoodit.mockImplementation(() => {
            return {
                articles: articlesFoodit,
                hasMoreArticle: false,
                count: articlesFoodit.length,
                idArticleList: 'test-list-id'
            };
        });

        const BOOKMARKED_ITEM_ID = 'FJ5UOR2HONA5RGOM226UQF24MI';
        const NOT_BOOKMARKED_ITEM_ID = '3ZASMLA63JEJZETICXDMLDL6HU';

        const { container } = render(
            <GridFooditClient id="/recetas/saladas" />
        );

        await waitFor(() => {
            const bookmarkedButton = container.querySelector(
                `[data-id="${BOOKMARKED_ITEM_ID}"]`
            );
            expect(bookmarkedButton).toBeInTheDocument();
        });

        const bookmarkedButton = container.querySelector(
            `[data-id="${BOOKMARKED_ITEM_ID}"]`
        );
        expect(bookmarkedButton).toBeInTheDocument();

        const filledIcon = bookmarkedButton.querySelector('mock-icon');
        expect(filledIcon).toBeInTheDocument();
        expect(filledIcon).toHaveAttribute('name', 'bookmark-filled');

        const notBookmarkedButton = container.querySelector(
            `[data-id="${NOT_BOOKMARKED_ITEM_ID}"]`
        );
        expect(notBookmarkedButton).toBeInTheDocument();

        const emptyIcon = notBookmarkedButton.querySelector('mock-icon');
        expect(emptyIcon).toBeInTheDocument();
        expect(emptyIcon).toHaveAttribute('name', 'bookmark');
    });
});
