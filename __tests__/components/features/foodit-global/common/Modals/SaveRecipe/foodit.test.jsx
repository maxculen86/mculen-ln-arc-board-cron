import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import useIsomorphicPopupHandling from '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/hooks/useIsomorphicPopupHandling';
import useGetUserConfig from '../../../../../../../components/features/foodit-global/hooks/useGetUserConfig';
import Modal from '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/foodit';
import { toggleBookmarks } from '../../../../../../../components/features/foodit-global/common/bookmark/iconHelper';
import fetchDeleteBookmark from '../../../../../../../components/features/foodit-global/common/bookmark/api/deleteBookmark';

jest.mock(
    '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/hooks/useIsomorphicPopupHandling',
    () => jest.fn()
);
jest.mock(
    '../../../../../../../components/features/foodit-global/hooks/useGetUserConfig',
    () => jest.fn()
);
jest.mock(
    '../../../../../../../components/features/foodit-global/common/bookmark/iconHelper',
    () => ({ toggleBookmarks: jest.fn() })
);
jest.mock(
    '../../../../../../../components/features/foodit-global/common/bookmark/api/deleteBookmark',
    () => jest.fn()
);
jest.mock('@ln/common-ui-animate', () => ({
    Animate: jest.fn(({ children }) => <div>{children}</div>)
}));
jest.mock('@ln/foodit-ui-modal', () => ({
    Modal: jest.fn(({ children }) => <div>{children}</div>)
}));

jest.mock(
    '../../../../../../../components/features/foodit-global/common/emptyState/foodit',
    () => jest.fn(() => <div>EmptyState Component</div>)
);
jest.mock(
    '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/saveRecipe',
    () => jest.fn(() => <div>SaveRecipe Component</div>)
);

describe('Components - Features - Foodit-global - Common - Modals - SaveRecipe', () => {
    beforeEach(() => {
        useIsomorphicPopupHandling.mockReturnValue({
            close: jest.fn(),
            modalData: {
                isVisible: true,
                data: {
                    bookmarkedArticles: [{ bookmarkTypeId: '1' }],
                    noBookmarkedArticles: ['2'],
                    collectionArticles: ['3'],
                    carouselTitle: 'Test Carousel',
                    fatherType: 'Test Type'
                }
            }
        });

        useGetUserConfig.mockReturnValue({ userType: 'subscribed' });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders SaveRecipe when userType is "subscribed"', () => {
        render(<Modal />);

        expect(screen.getByText('SaveRecipe Component')).toBeInTheDocument();
    });

    it('renders EmptyState when userType is not "subscribed"', () => {
        useGetUserConfig.mockReturnValue({ userType: 'guest' });

        render(<Modal />);
        expect(screen.getByText('EmptyState Component')).toBeInTheDocument();
    });

    it('calls toggleBookmarks and fetchDeleteBookmark on bookmarkedArticles update', async () => {
        render(<Modal />);

        expect(toggleBookmarks).toHaveBeenCalledWith(['1'], false);
        expect(fetchDeleteBookmark).toHaveBeenCalledWith([
            { bookmarkTypeId: '1' }
        ]);
    });
});
