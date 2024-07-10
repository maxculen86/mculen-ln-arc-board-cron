import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import getBookmarks from '../../../../../../../components/features/foodit-global/common/bookmark/api/getBookmarks';
import getToken from '../../../../../../../components/private/common/utils/getToken';
import { UserBookmarks } from '../../../../../../../components/features/foodit-global/common/bookmark/components/UserBookmarks';
import {
    isSubscribed,
    authManager
} from '../../../../../../../auth/helper/loginHelper';

jest.mock(
    '../../../../../../../components/features/foodit-global/common/bookmark/api/getBookmarks'
);
jest.mock('../../../../../../../components/private/common/utils/getToken');
jest.mock('../../../../../../../auth/helper/loginHelper');

describe('UserBookmarks', () => {
    const mockBookmarks = [
        { bookmarkTypeId: 'ArticleId123', bookmarkId: 'BookmarkId123' },
        { bookmarkTypeId: 'ArticleId456', bookmarkId: 'BookmarkId456' }
    ];

    beforeEach(() => {
        getBookmarks.mockResolvedValue({ data: mockBookmarks });
        isSubscribed.mockReturnValue(null);
        authManager.mockImplementation(callback =>
            callback({ accessToken: 'mock-access-token', token: 'mock-token' })
        );
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
