import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import useGetRecetarioData from '../../../../../../../components/features/foodit-global/common/recetario/hooks/useGetRecetarioData';
import {
    isSubscribed,
    getAuthFromCookie,
    authManager
} from '../../../../../../../auth/helper/loginHelper';
import getBookmarks from '../../../../../../../components/features/foodit-global/common/bookmark/api/getBookmarks';

jest.mock('../../../../../../../auth/helper/loginHelper');
jest.mock(
    '../../../../../../../components/features/foodit-global/hooks/useGetUserConfig'
);
jest.mock(
    '../../../../../../../components/features/foodit-global/common/bookmark/api/getBookmarks'
);
jest.mock('../../../../../../../components/private/common/utils/getToken');

const TestComponent = () => {
    const { loading, userBookmarks } = useGetRecetarioData();
    return (
        <div>
            {loading ? 'Loading...' : 'Loaded'}
            <div data-testid="bookmarks">
                {userBookmarks.map(bookmark => (
                    <div key={bookmark.id}>{bookmark.name}</div>
                ))}
            </div>
        </div>
    );
};

describe('components - features - foodit-global - common - recetario - hooks - useGetRecetarioData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        authManager.mockImplementation(callback =>
            callback({ accessToken: 'mock-access-token', token: 'mock-token' })
        );
    });

    it('should set loading to false and userBookmarks to an empty array if not a Foodit subscriber', async () => {
        isSubscribed.mockReturnValue(false);

        const { getByText, getByTestId } = render(<TestComponent />);

        await waitFor(() => expect(getByText('Loaded')).toBeInTheDocument());
        expect(getByTestId('bookmarks').children.length).toBe(0);
    });

    it('should fetch bookmarks and set userBookmarks if a Foodit subscriber', async () => {
        isSubscribed.mockReturnValue(true);
        getAuthFromCookie.mockReturnValue('mockToken');
        getBookmarks.mockResolvedValue({
            data: [{ id: 1, name: 'Bookmark 1' }]
        });

        const { getByText, getByTestId } = render(<TestComponent />);

        await waitFor(() => expect(getByText('Loaded')).toBeInTheDocument());
        expect(getByTestId('bookmarks').children.length).toBe(1);
        expect(getByTestId('bookmarks')).toHaveTextContent('Bookmark 1');
    });

    it('should handle errors gracefully', async () => {
        isSubscribed.mockReturnValue(true);
        getAuthFromCookie.mockReturnValue('mockToken');
        getBookmarks.mockRejectedValue(new Error('Fetch error'));

        const { getByText, getByTestId } = render(<TestComponent />);

        await waitFor(() => expect(getByText('Loaded')).toBeInTheDocument());
        expect(getByTestId('bookmarks').children.length).toBe(0);
    });
});
