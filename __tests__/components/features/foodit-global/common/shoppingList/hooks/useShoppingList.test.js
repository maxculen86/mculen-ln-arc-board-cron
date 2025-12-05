import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { getTypeOfDevicev2 } from '@ln/utils';
import useAuthManager from '../../../../../../../components/private/common/auth/hooks/useAuthManager';
import { useShoppingList } from '../../../../../../../components/features/foodit-global/common/shoppingList/hooks/useShoppingList';
import getBookmarks from '../../../../../../../components/features/foodit-global/common/bookmark/api/getBookmarks';
import { isSubscribed } from '../../../../../../../components/private/common/auth/helper/loginHelper';

jest.mock('@ln/utils', () => ({
    getTypeOfDevicev2: jest.fn()
}));

jest.mock(
    '../../../../../../../components/features/foodit-global/common/bookmark/api/getBookmarks',
    () => jest.fn()
);

jest.mock(
    '../../../../../../../components/private/common/auth/helper/loginHelper',
    () => ({
        isSubscribed: jest.fn(),
        SUBSCRIBED_HELPER: {
            FOODIT: 'foodit'
        }
    })
);

jest.mock(
    '../../../../../../../components/private/common/auth/hooks/useAuthManager',
    () => jest.fn()
);

const TestComponent = () => {
    const { loading, shoppingList, isMobile } = useShoppingList();
    return (
        <div>
            <div data-testid="loading">{loading ? 'Loading' : 'Loaded'}</div>
            <div data-testid="is-mobile">{isMobile ? 'Mobile' : 'Desktop'}</div>
            <div data-testid="shopping-list">
                {shoppingList.length > 0
                    ? shoppingList.map((item, index) => (
                          <div key={index} data-testid="shopping-item">
                              {item.bookmarkId}
                          </div>
                      ))
                    : 'No items'}
            </div>
        </div>
    );
};

describe('useShoppingList', () => {
    const mockToken = 'mockToken';
    const mockAccessToken = 'mockAccessToken';

    beforeEach(() => {
        jest.clearAllMocks();
        useAuthManager.mockReturnValue({
            token: mockToken,
            accessToken: mockAccessToken
        });
    });

    it('should set isMobile to true when device is mobile', () => {
        getTypeOfDevicev2.mockReturnValue('mobile');
        isSubscribed.mockReturnValue(false);

        render(<TestComponent />);

        expect(screen.getByTestId('is-mobile')).toHaveTextContent('Mobile');
        expect(screen.getByTestId('loading')).toHaveTextContent('Loaded');
    });

    it('should set isMobile to false when device is desktop', () => {
        getTypeOfDevicev2.mockReturnValue('desktop');
        isSubscribed.mockReturnValue(false);

        render(<TestComponent />);

        expect(screen.getByTestId('is-mobile')).toHaveTextContent('Desktop');
        expect(screen.getByTestId('loading')).toHaveTextContent('Loaded');
    });

    it('should fetch bookmarks and set shopping list when subscribed and tokens are present', async () => {
        getTypeOfDevicev2.mockReturnValue('mobile');
        isSubscribed.mockReturnValue(true);
        getBookmarks.mockResolvedValue({
            data: [
                {
                    bookmarkId: '123',
                    bookmarkContent: {
                        name: 'item1'
                    }
                },
                {
                    bookmarkId: '456',
                    bookmarkContent: {
                        name: 'item2'
                    }
                }
            ]
        });

        render(<TestComponent />);

        await waitFor(() => {
            expect(screen.getByTestId('loading')).toHaveTextContent('Loaded');
            expect(screen.getAllByTestId('shopping-item').length).toBe(2);
        });
    });

    it('should not fetch bookmarks and set loading to false when not subscribed', () => {
        getTypeOfDevicev2.mockReturnValue('mobile');
        isSubscribed.mockReturnValue(false);

        render(<TestComponent />);

        expect(screen.getByTestId('loading')).toHaveTextContent('Loaded');
        expect(screen.getByTestId('shopping-list')).toHaveTextContent(
            'No items'
        );
    });

    it('should not fetch bookmarks and set loading to false when tokens are missing', () => {
        useAuthManager.mockReturnValue({
            token: null,
            accessToken: null
        });
        getTypeOfDevicev2.mockReturnValue('mobile');
        isSubscribed.mockReturnValue(true);

        render(<TestComponent />);

        expect(screen.getByTestId('loading')).toHaveTextContent('Loading');
        expect(screen.getByTestId('shopping-list')).toHaveTextContent(
            'No items'
        );
    });
});
