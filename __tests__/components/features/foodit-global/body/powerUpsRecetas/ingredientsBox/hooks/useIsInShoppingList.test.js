import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import getBookmarkByArticleId from '../../../../../../../../components/features/foodit-global/common/bookmark/api/getBookmarkByArticleId';
import useAuthManager from '../../../../../../../../components/private/common/auth/hooks/useAuthManager';
import { useIsInShoppingList } from '../../../../../../../../components/features/foodit-global/Body/PowerupsReceta/ingredientsBox/hooks/useIsInShoppingList';

jest.mock(
    '../../../../../../../../components/features/foodit-global/common/bookmark/api/getBookmarkByArticleId',
    () => jest.fn()
);
jest.mock(
    '../../../../../../../../components/private/common/auth/hooks/useAuthManager',
    () => jest.fn()
);

const TestComponent = ({ isSuscriptor, articleId }) => {
    const { bookmarkId } = useIsInShoppingList(isSuscriptor, articleId);
    return <div data-testid="bookmark-id">{bookmarkId}</div>;
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
    });

    it('should not set bookmarkId when user is not a subscriber', () => {
        render(
            <TestComponent isSuscriptor={false} articleId={mockArticleId} />
        );

        expect(screen.getByTestId('bookmark-id')).toBeEmptyDOMElement();
        expect(getBookmarkByArticleId).not.toHaveBeenCalled();
    });

    it('should not set bookmarkId when API does not return a bookmarkId', async () => {
        getBookmarkByArticleId.mockResolvedValue({});

        render(<TestComponent isSuscriptor={true} articleId={mockArticleId} />);

        await waitFor(() => {
            expect(screen.getByTestId('bookmark-id')).toBeEmptyDOMElement();
        });
    });
});
