import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import useIsomorphicPopupHandling from '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/hooks/useIsomorphicPopupHandling';
import Modal from '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/foodit';
import { toggleBookmarks } from '../../../../../../../components/features/foodit-global/common/bookmark/iconHelper';
import fetchDeleteBookmark from '../../../../../../../components/features/foodit-global/common/bookmark/api/deleteBookmark';

jest.mock(
    '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/hooks/useIsomorphicPopupHandling',
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
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('calls toggleBookmarks and fetchDeleteBookmark on bookmarkedArticles update', async () => {
        render(<Modal />);

        expect(toggleBookmarks).toHaveBeenCalledWith(['1'], false);
        expect(fetchDeleteBookmark).toHaveBeenCalledWith([
            { bookmarkTypeId: '1' }
        ]);
    });
});
