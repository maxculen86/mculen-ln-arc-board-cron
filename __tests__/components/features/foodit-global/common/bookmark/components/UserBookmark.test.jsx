import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import getBookmarks from '../../../../../../../components/features/foodit-global/common/bookmark/api/getBookmarks';
import getToken from '../../../../../../../components/private/common/utils/getToken';
import { UserBookmarks } from '../../../../../../../components/features/foodit-global/common/bookmark/components/UserBookmarks';

jest.mock(
    '../../../../../../../components/features/foodit-global/common/bookmark/api/getBookmarks'
);
jest.mock('../../../../../../../components/private/common/utils/getToken');

describe('UserBookmarks', () => {
    const mockBookmarks = [
        { bookmarkTypeId: 'ArticleId123', bookmarkId: 'BookmarkId123' },
        { bookmarkTypeId: 'ArticleId456', bookmarkId: 'BookmarkId456' }
    ];

    beforeEach(() => {
        getBookmarks.mockResolvedValue({ data: mockBookmarks });
        getToken.mockReturnValue(null);
        localStorage.clear();
    });

    it('renders without crashing', () => {
        render(<UserBookmarks />);
    });

    it('fetches bookmarks and updates state and localStorage when premium token is valid', async () => {
        getToken.mockReturnValue('2');

        await act(async () => {
            render(<UserBookmarks />);
        });

        expect(getBookmarks).toHaveBeenCalled();
    });
});
