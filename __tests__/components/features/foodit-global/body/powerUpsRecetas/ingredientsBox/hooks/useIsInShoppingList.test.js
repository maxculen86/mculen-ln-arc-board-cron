import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import getBookmarkByArticleId from '../../../../../../../../components/features/foodit-global/common/bookmark/api/getBookmarkByArticleId';
import useAuthManager from '../../../../../../../../components/private/common/auth/hooks/useAuthManager';
import { useIsInShoppingList } from '../../../../../../../../components/features/foodit-global/Body/PowerupsReceta/ingredientsBox/hooks/useIsInShoppingList';
import { BookmarkCache } from '../../../../../../../../components/features/foodit-global/common/shoppingList/shoppingListEvents';

jest.mock(
    '../../../../../../../../components/features/foodit-global/common/bookmark/api/getBookmarkByArticleId',
    () => jest.fn()
);
jest.mock(
    '../../../../../../../../components/private/common/auth/hooks/useAuthManager',
    () => jest.fn()
);
jest.mock(
    '../../../../../../../../components/features/foodit-global/common/shoppingList/shoppingListEvents',
    () => ({
        BookmarkCache: {
            get: jest.fn(),
            set: jest.fn(),
            has: jest.fn(),
            remove: jest.fn()
        },
        emitBookmarkAdded: jest.fn(),
        emitBookmarkRemoved: jest.fn(),
        SHOPPING_LIST_EVENTS: {
            BOOKMARK_ADDED: 'BOOKMARK_ADDED',
            BOOKMARK_REMOVED: 'BOOKMARK_REMOVED',
            BOOKMARK_UPDATED: 'BOOKMARK_UPDATED'
        }
    })
);

const TestComponent = ({ isSuscriptor, articleId }) => {
    const { bookmarkId } = useIsInShoppingList(isSuscriptor, articleId);
    return <div data-testid="bookmark-id">{bookmarkId || ''}</div>;
};

describe('useIsInShoppingList', () => {
    const mockToken = 'mockToken';
    const mockAccessToken = 'mockAccessToken';
    const mockArticleId = 'mockArticleId';

    beforeEach(() => {
        jest.clearAllMocks();
        useAuthManager.mockReturnValue({
            token: mockToken,
            accessToken: mockAccessToken
        });
        BookmarkCache.get.mockReturnValue(null);
        BookmarkCache.has.mockReturnValue(false);
    });

    it('should set bookmarkId when user is a subscriber and API returns a bookmarkId', async () => {
        const mockBookmarkId = 'mockBookmarkId';
        getBookmarkByArticleId.mockResolvedValue({
            bookmarkId: mockBookmarkId
        });

        render(<TestComponent isSuscriptor={true} articleId={mockArticleId} />);

        await waitFor(() => {
            expect(screen.getByTestId('bookmark-id')).toHaveTextContent(
                mockBookmarkId
            );
        });

        expect(getBookmarkByArticleId).toHaveBeenCalledWith({
            bookmarkType: 'ingredientList',
            articleId: mockArticleId,
            accessToken: mockAccessToken,
            token: mockToken
        });
    });

    it('should not set bookmarkId when user is not a subscriber', () => {
        render(
            <TestComponent isSuscriptor={false} articleId={mockArticleId} />
        );

        expect(screen.getByTestId('bookmark-id')).toHaveTextContent('');
        expect(getBookmarkByArticleId).not.toHaveBeenCalled();
    });

    it('should not set bookmarkId when API does not return a bookmarkId', async () => {
        getBookmarkByArticleId.mockResolvedValue({});

        render(<TestComponent isSuscriptor={true} articleId={mockArticleId} />);

        await waitFor(() => {
            expect(getBookmarkByArticleId).toHaveBeenCalled();
        });

        expect(screen.getByTestId('bookmark-id')).toHaveTextContent('');
    });

    it('should use cached bookmarkId when available', async () => {
        const cachedBookmarkId = 'cachedBookmarkId';
        BookmarkCache.has.mockReturnValue(true);
        BookmarkCache.get.mockReturnValue(cachedBookmarkId);

        render(<TestComponent isSuscriptor={true} articleId={mockArticleId} />);

        await waitFor(() => {
            expect(screen.getByTestId('bookmark-id')).toHaveTextContent(
                cachedBookmarkId
            );
        });

        expect(getBookmarkByArticleId).not.toHaveBeenCalled();
    });

    it('should handle API errors gracefully', async () => {
        getBookmarkByArticleId.mockRejectedValue(new Error('API error'));
        console.error = jest.fn();

        render(<TestComponent isSuscriptor={true} articleId={mockArticleId} />);

        await waitFor(() => {
            expect(getBookmarkByArticleId).toHaveBeenCalled();
        });

        expect(screen.getByTestId('bookmark-id')).toHaveTextContent('');
        expect(console.error).toHaveBeenCalled();
    });
});
