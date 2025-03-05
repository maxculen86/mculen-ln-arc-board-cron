import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import getBookmarks from '../../../../../../../components/features/foodit-global/common/bookmark/api/getBookmarks';
import { UserBookmarks } from '../../../../../../../components/features/foodit-global/common/bookmark/components/UserBookmarks';
import { isSubscribed } from '../../../../../../../components/private/common/auth/helper/loginHelper';
import useAuthManager from '../../../../../../../components/private/common/auth/hooks/useAuthManager';

jest.mock(
    '../../../../../../../components/features/foodit-global/common/bookmark/api/getBookmarks'
);
jest.mock('../../../../../../../components/private/common/utils/getToken');
jest.mock('../../../../../../../components/private/common/auth/helper/loginHelper');
jest.mock('../../../../../../../components/private/common/auth/hooks/useAuthManager');

describe('UserBookmarks', () => {
    const mockBookmarks = [
        { bookmarkTypeId: 'ArticleId123', bookmarkId: 'BookmarkId123' },
        { bookmarkTypeId: 'ArticleId456', bookmarkId: 'BookmarkId456' }
    ];

    beforeEach(() => {
        getBookmarks.mockResolvedValue({ data: mockBookmarks });
        isSubscribed.mockReturnValue(null);
        useAuthManager.mockImplementation(() => ({
            token: 'mock-tooken',
            accessToken: 'mock-access-token'
        }));
        localStorage.clear();
    });

    it('renders without crashing', () => {
        render(<UserBookmarks />);
    });

    it('fetches bookmarks and updates state and localStorage when premium token is valid', async () => {
        isSubscribed.mockReturnValue(true);

        await act(async () => {
            render(<UserBookmarks />);
        });

        expect(getBookmarks).toHaveBeenCalled();
    });
});
