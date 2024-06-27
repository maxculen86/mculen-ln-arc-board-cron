import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import BookmarkedArticles from '../../../../../../../components/features/foodit-global/common/recetario/components/BookmarkedArticles';
import useBookmarkedArticles from '../../../../../../../components/features/foodit-global/common/recetario/hooks/useBookmarkedArticles';

jest.mock(
    '../../../../../../../components/features/foodit-global/common/recetario/hooks/useBookmarkedArticles'
);

const mockBookmarks = [
    { bookmarkId: 1, bookmarkGroup: 'Group1' },
    { bookmarkId: 2, bookmarkGroup: 'Group2' },
    { bookmarkId: 3, bookmarkGroup: 'Group1' }
];

describe('BookmarkedArticles', () => {
    beforeEach(() => {
        useBookmarkedArticles.mockReturnValue({
            displayArticlesNum: 24,
            setDisplayArticlesNum: jest.fn(),
            filteredAndSlicedBookmarks: mockBookmarks.map(bookmark => (
                <div key={bookmark.bookmarkId} data-testid="bookmark">
                    {bookmark.bookmarkId}
                </div>
            ))
        });
    });

    it('should render the correct number of bookmarks', () => {
        const { getAllByTestId } = render(
            <BookmarkedArticles
                userBookmarks={mockBookmarks}
                selectedItemId="Todas"
                selectedItemQuantity={3}
                setSelectedItem={jest.fn()}
                setUserBookmarks={jest.fn()}
            />
        );
        expect(getAllByTestId('bookmark').length).toBe(3);
    });

    it('should call setDisplayArticlesNum when "Ver más" button is clicked', () => {
        const setDisplayArticlesNum = jest.fn();
        useBookmarkedArticles.mockReturnValue({
            displayArticlesNum: 24,
            setDisplayArticlesNum,
            filteredAndSlicedBookmarks: mockBookmarks.map(bookmark => (
                <div key={bookmark.bookmarkId} data-testid="bookmark">
                    {bookmark.bookmarkId}
                </div>
            ))
        });

        const { getByText } = render(
            <BookmarkedArticles
                userBookmarks={mockBookmarks}
                selectedItemId="Todas"
                selectedItemQuantity={48}
                setSelectedItem={jest.fn()}
                setUserBookmarks={jest.fn()}
            />
        );

        fireEvent.click(getByText('Ver más'));
        expect(setDisplayArticlesNum).toHaveBeenCalledWith(48);
    });

    it('should not render "Ver más" button if displayArticlesNum is greater than or equal to selectedItemQuantity', () => {
        useBookmarkedArticles.mockReturnValue({
            displayArticlesNum: 24,
            setDisplayArticlesNum: jest.fn(),
            filteredAndSlicedBookmarks: mockBookmarks.map(bookmark => (
                <div key={bookmark.bookmarkId} data-testid="bookmark">
                    {bookmark.bookmarkId}
                </div>
            ))
        });

        const { queryByText } = render(
            <BookmarkedArticles
                userBookmarks={mockBookmarks}
                selectedItemId="Todas"
                selectedItemQuantity={24}
                setSelectedItem={jest.fn()}
                setUserBookmarks={jest.fn()}
            />
        );

        expect(queryByText('Ver más')).toBeNull();
    });
});
