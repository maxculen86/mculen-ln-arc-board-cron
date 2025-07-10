import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import useBookmarkedArticles from '../../../../../../../components/features/foodit-global/common/recetario/hooks/useBookmarkedArticles';
import fetchDeleteBookmark from '../../../../../../../components/features/foodit-global/common/bookmark/api/deleteBookmark';
import moveBookmark from '../../../../../../../components/features/foodit-global/common/bookmark/api/moveBookmark';
import { findBookmarkById } from '../../../../../../../components/features/foodit-global/common/Modals/RemoveIngredients/helpers/findByBookmarkId';

jest.mock(
    '../../../../../../../components/features/foodit-global/common/bookmark/api/moveBookmark'
);

jest.mock(
    '../../../../../../../components/features/foodit-global/common/bookmark/api/deleteBookmark'
);

jest.mock(
    '../../../../../../../components/features/foodit-global/common/Modals/RemoveIngredients/helpers/findByBookmarkId'
);

jest.mock(
    '../../../../../../../components/features/foodit-global/common/recetario/hooks/useApiGuard',
    () => ({
        __esModule: true,
        default: jest.fn(() => ({
            guardedExecute: jest.fn(fn => fn())
        }))
    })
);

jest.mock(
    '../../../../../../../components/features/foodit-global/common/recetario/components/RecetarioArticle',
    () => {
        return function MockRecetarioArticle({
            article,
            executeDeleteBookmark,
            executeMoveBookmark
        }) {
            return (
                <div data-testid={`article-${article.bookmarkId}`}>
                    <span data-testid="bookmark-id">{article.bookmarkId}</span>
                    <span data-testid="bookmark-group">
                        {article.bookmarkGroup}
                    </span>
                    <button
                        data-testid={`delete-${article.bookmarkId}`}
                        onClick={() =>
                            executeDeleteBookmark(
                                article.bookmarkId,
                                article.bookmarkTypeId
                            )
                        }
                    >
                        Delete
                    </button>
                    <button
                        data-testid={`move-${article.bookmarkId}`}
                        onClick={() =>
                            executeMoveBookmark({
                                bookmarkId: article.bookmarkId,
                                bookmarkTypeId: article.bookmarkTypeId,
                                targetCollectionId: 'NewGroup',
                                targetCollectionName: null,
                                bookmarkContent: article.bookmarkContent,
                                bookmarkParent: article.bookmarkGroup
                            })
                        }
                    >
                        Move
                    </button>
                </div>
            );
        };
    }
);

const mockBookmarks = [
    {
        bookmarkId: 'bookmark-1',
        bookmarkTypeId: 'article-1',
        bookmarkGroup: 'Group1',
        bookmarkContent: { title: 'Recipe 1' }
    },
    {
        bookmarkId: 'bookmark-2',
        bookmarkTypeId: 'article-2',
        bookmarkGroup: 'Group2',
        bookmarkContent: { title: 'Recipe 2' }
    },
    {
        bookmarkId: 'bookmark-3',
        bookmarkTypeId: 'article-3',
        bookmarkGroup: 'Group1',
        bookmarkContent: { title: 'Recipe 3' }
    }
];

const TestComponent = ({
    userBookmarks,
    selectedItemId,
    setUserBookmarks,
    setSelectedItem
}) => {
    const {
        displayArticlesNum,
        setDisplayArticlesNum,
        filteredAndSlicedBookmarks,
        executeDeleteBookmark,
        executeMoveBookmark
    } = useBookmarkedArticles(
        userBookmarks,
        selectedItemId,
        setUserBookmarks,
        setSelectedItem
    );

    return (
        <div>
            <div data-testid="articles">{filteredAndSlicedBookmarks}</div>
            <button
                data-testid="show-more-button"
                onClick={() => setDisplayArticlesNum(displayArticlesNum + 24)}
            >
                Show More
            </button>
            <button
                data-testid="delete-bookmark-button"
                onClick={() => executeDeleteBookmark('bookmark-1', 'article-1')}
            >
                Delete Bookmark
            </button>
            <button
                data-testid="move-bookmark-button"
                onClick={() =>
                    executeMoveBookmark({
                        bookmarkId: 'bookmark-1',
                        bookmarkTypeId: 'article-1',
                        targetCollectionId: 'NewGroup',
                        targetCollectionName: null,
                        bookmarkContent: mockBookmarks[0].bookmarkContent,
                        bookmarkParent: 'Group1'
                    })
                }
            >
                Move Bookmark
            </button>
            <span data-testid="displayArticlesNum">{displayArticlesNum}</span>
        </div>
    );
};

describe('useBookmarkedArticles', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        findBookmarkById.mockImplementation((bookmarks, bookmarkId) => {
            return bookmarks.find(
                bookmark => bookmark.bookmarkId === bookmarkId
            );
        });

        fetchDeleteBookmark.mockResolvedValue(true);

        moveBookmark.mockResolvedValue({
            success: true,
            bookmarkId: 'new-bookmark-id',
            destinationCollection: 'NewGroup'
        });
    });

    it('should initialize displayArticlesNum to 24', () => {
        const { getByTestId } = render(
            <TestComponent
                userBookmarks={mockBookmarks}
                selectedItemId="Todas"
                setUserBookmarks={jest.fn()}
                setSelectedItem={jest.fn()}
            />
        );
        expect(getByTestId('displayArticlesNum').textContent).toBe('24');
    });

    it('should reset displayArticlesNum to 24 when selectedItemId changes', () => {
        const { getByTestId, rerender } = render(
            <TestComponent
                userBookmarks={mockBookmarks}
                selectedItemId="Group1"
                setUserBookmarks={jest.fn()}
                setSelectedItem={jest.fn()}
            />
        );

        fireEvent.click(getByTestId('show-more-button'));
        expect(getByTestId('displayArticlesNum').textContent).toBe('48');

        rerender(
            <TestComponent
                userBookmarks={mockBookmarks}
                selectedItemId="Group2"
                setUserBookmarks={jest.fn()}
                setSelectedItem={jest.fn()}
            />
        );

        expect(getByTestId('displayArticlesNum').textContent).toBe('24');
    });

    it('should filter and slice bookmarks correctly', () => {
        const { getByTestId } = render(
            <TestComponent
                userBookmarks={mockBookmarks}
                selectedItemId="Group1"
                setUserBookmarks={jest.fn()}
                setSelectedItem={jest.fn()}
            />
        );

        expect(getByTestId('articles').children.length).toBe(2);

        expect(getByTestId('article-bookmark-1')).toBeInTheDocument();
        expect(getByTestId('article-bookmark-3')).toBeInTheDocument();
    });

    it('should render all bookmarks when selectedItemId is "Todas"', () => {
        const { getByTestId } = render(
            <TestComponent
                userBookmarks={mockBookmarks}
                selectedItemId="Todas"
                setUserBookmarks={jest.fn()}
                setSelectedItem={jest.fn()}
            />
        );

        expect(getByTestId('articles').children.length).toBe(3);
        expect(getByTestId('article-bookmark-1')).toBeInTheDocument();
        expect(getByTestId('article-bookmark-2')).toBeInTheDocument();
        expect(getByTestId('article-bookmark-3')).toBeInTheDocument();
    });

    it('should handle delete bookmark', async () => {
        const mockSetUserBookmarks = jest.fn();
        const mockSetSelectedItem = jest.fn();

        const expectedBookmarkInfo = {
            bookmarkId: 'bookmark-1',
            bookmarkTypeId: 'article-1',
            bookmarkGroup: 'Group1',
            bookmarkContent: { title: 'Recipe 1' }
        };

        const { getByTestId } = render(
            <TestComponent
                userBookmarks={mockBookmarks}
                selectedItemId="Todas"
                setUserBookmarks={mockSetUserBookmarks}
                setSelectedItem={mockSetSelectedItem}
            />
        );

        fireEvent.click(getByTestId('delete-bookmark-button'));

        await waitFor(() => {
            expect(findBookmarkById).toHaveBeenCalledWith(
                mockBookmarks,
                'bookmark-1'
            );

            expect(fetchDeleteBookmark).toHaveBeenCalledWith(
                [{ bookmarkId: 'bookmark-1', bookmarkTypeId: 'article-1' }],
                mockSetUserBookmarks,
                mockSetSelectedItem,
                mockBookmarks.length,
                expectedBookmarkInfo,
                mockBookmarks
            );
        });
    });

    it('should handle delete bookmark when bookmark is not found', async () => {
        const mockSetUserBookmarks = jest.fn();
        const mockSetSelectedItem = jest.fn();

        findBookmarkById.mockReturnValue(undefined);

        const { getByTestId } = render(
            <TestComponent
                userBookmarks={mockBookmarks}
                selectedItemId="Todas"
                setUserBookmarks={mockSetUserBookmarks}
                setSelectedItem={mockSetSelectedItem}
            />
        );

        fireEvent.click(getByTestId('delete-bookmark-button'));

        await waitFor(() => {
            expect(findBookmarkById).toHaveBeenCalledWith(
                mockBookmarks,
                'bookmark-1'
            );
            expect(fetchDeleteBookmark).toHaveBeenCalledWith(
                [{ bookmarkId: 'bookmark-1', bookmarkTypeId: 'article-1' }],
                mockSetUserBookmarks,
                mockSetSelectedItem,
                mockBookmarks.length,
                undefined,
                mockBookmarks
            );
        });
    });

    it('should handle move bookmark', async () => {
        const mockSetUserBookmarks = jest.fn();
        const mockSetSelectedItem = jest.fn();

        const { getByTestId } = render(
            <TestComponent
                userBookmarks={mockBookmarks}
                selectedItemId="Todas"
                setUserBookmarks={mockSetUserBookmarks}
                setSelectedItem={mockSetSelectedItem}
            />
        );

        fireEvent.click(getByTestId('move-bookmark-button'));

        await waitFor(() => {
            expect(moveBookmark).toHaveBeenCalledWith({
                bookmarkId: 'bookmark-1',
                bookmarkTypeId: 'article-1',
                targetCollectionId: 'NewGroup',
                targetCollectionName: null,
                bookmarkContent: mockBookmarks[0].bookmarkContent,
                bookmarkParent: 'Group1'
            });
        });
    });

    it('should pass delete and move functions to RecetarioArticle', () => {
        const { getByTestId } = render(
            <TestComponent
                userBookmarks={mockBookmarks}
                selectedItemId="Todas"
                setUserBookmarks={jest.fn()}
                setSelectedItem={jest.fn()}
            />
        );

        expect(getByTestId('delete-bookmark-1')).toBeInTheDocument();
        expect(getByTestId('move-bookmark-1')).toBeInTheDocument();
    });

    it('should handle empty bookmarks array', () => {
        const { getByTestId } = render(
            <TestComponent
                userBookmarks={[]}
                selectedItemId="Todas"
                setUserBookmarks={jest.fn()}
                setSelectedItem={jest.fn()}
            />
        );

        expect(getByTestId('articles').children.length).toBe(0);
    });
});
