import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CollectionBox from '../../../../../../components/features/foodit-global/common/collectionBox/foodit';

describe('CollectionBox', () => {
    const mockOnItemSelected = jest.fn();
    const title = 'Test Collection';
    const list = [
        { id: '1', text: 'Item 1 (2)', quantity: 2 },
        { id: '2', text: 'Item 2 (3)', quantity: 3 }
    ];

    beforeEach(() => {
        render(
            <CollectionBox
                title={title}
                list={list}
                onItemSelected={mockOnItemSelected}
            />
        );
    });

    test('renders the title and list items correctly', () => {
        expect(screen.getByText(title)).toBeInTheDocument();
        list.forEach(item => {
            expect(screen.getByText(`${item.text}`)).toBeInTheDocument();
        });
    });

    test('selects an item and calls onItemSelected with correct parameters', () => {
        const firstItem = screen.getByText(`${list[0].text}`);
        fireEvent.click(firstItem);

        expect(mockOnItemSelected).toHaveBeenCalledWith({
            id: '1',
            quantity: 2
        });
    });
});
