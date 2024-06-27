import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import useBookmarkedArticles from '../../../../../../../components/features/foodit-global/common/recetario/hooks/useBookmarkedArticles';
import fetchDeleteBookmark from '../../../../../../../components/features/foodit-global/common/bookmark/api/deleteBookmark';

jest.mock(
    '../../../../../../../components/features/foodit-global/common/bookmark/api/deleteBookmark'
);

const mockBookmarks = [
    { bookmarkId: 1, bookmarkGroup: 'Group1' },
    { bookmarkId: 2, bookmarkGroup: 'Group2' },
    { bookmarkId: 3, bookmarkGroup: 'Group1' }
];

const TestComponent = ({
    userBookmarks,
    selectedItemId,
    setUserBookmarks,
    setSelectedItem
}) => {
    const {
        displayArticlesNum,
        setDisplayArticlesNum,
        filteredAndSlicedBookmarks,
        handleDeleteBookmark
    } = useBookmarkedArticles(
        userBookmarks,
        selectedItemId,
        setUserBookmarks,
        setSelectedItem
    );

    return (
        <div>
            <div data-testid="articles">{filteredAndSlicedBookmarks}</div>
            <button
                data-testid="show-more-button"
                onClick={() => setDisplayArticlesNum(displayArticlesNum + 24)}
            >
                Show More
            </button>
            <button
                data-testid="delete-bookmark-button"
                onClick={() => handleDeleteBookmark(1, 1)}
            >
                Delete Bookmark
            </button>
            <span data-testid="displayArticlesNum">{displayArticlesNum}</span>
        </div>
    );
};

describe('components - features - foodit-global - common - recetario - hooks - useBookmarkedArticles', () => {
    it('should initialize displayArticlesNum to 24', () => {
        const { getByTestId } = render(
            <TestComponent
                userBookmarks={mockBookmarks}
                selectedItemId="Todas"
                setUserBookmarks={jest.fn()}
                setSelectedItem={jest.fn()}
            />
        );
        expect(getByTestId('displayArticlesNum').textContent).toBe('24');
    });

    it('should reset displayArticlesNum to 24 when selectedItemId changes', () => {
        const { getByTestId, rerender } = render(
            <TestComponent
                userBookmarks={mockBookmarks}
                selectedItemId="Group1"
                setUserBookmarks={jest.fn()}
                setSelectedItem={jest.fn()}
            />
        );

        fireEvent.click(getByTestId('show-more-button'));
        expect(getByTestId('displayArticlesNum').textContent).toBe('48');

        rerender(
            <TestComponent
                userBookmarks={mockBookmarks}
                selectedItemId="Group2"
                setUserBookmarks={jest.fn()}
                setSelectedItem={jest.fn()}
            />
        );

        expect(getByTestId('displayArticlesNum').textContent).toBe('24');
    });

    it('should filter and slice bookmarks correctly', () => {
        const { getByTestId } = render(
            <TestComponent
                userBookmarks={mockBookmarks}
                selectedItemId="Group1"
                setUserBookmarks={jest.fn()}
                setSelectedItem={jest.fn()}
            />
        );

        expect(getByTestId('articles').children.length).toBe(2);
    });

    it('should handle delete bookmark', async () => {
        const mockSetUserBookmarks = jest.fn();
        const mockSetSelectedItem = jest.fn();

        const { getByTestId } = render(
            <TestComponent
                userBookmarks={mockBookmarks}
                selectedItemId="Todas"
                setUserBookmarks={mockSetUserBookmarks}
                setSelectedItem={mockSetSelectedItem}
            />
        );

        fireEvent.click(getByTestId('delete-bookmark-button'));

        await waitFor(() => {
            expect(fetchDeleteBookmark).toHaveBeenCalledWith(
                [{ bookmarkId: 1, bookmarkTypeId: 1 }],
                mockSetUserBookmarks,
                mockSetSelectedItem,
                mockBookmarks.length
            );
        });
    });
});
