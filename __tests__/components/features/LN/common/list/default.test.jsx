import React from 'react';
import { render, screen } from '@testing-library/react';
import List from '../../../../../../components/features/LN/common/list/default';
import {
    createTextItem,
    createNonTextItem,
    createListItem
} from '../../../../../../__mocks__/data/LN/common/listMocks';

describe('List component', () => {
    it('renders nothing when there are no renderable items', () => {
        const data = createListItem([]);

        const { container } = render(<List data={data} />);
        expect(container.firstChild).toBeNull();
    });

    it('renders an unordered list by default', () => {
        const data = createListItem(
            [createTextItem({ content: '<strong>Item text</strong>' })],
            { list_type: 'unordered' }
        );

        render(<List data={data} />);

        const ul = screen.getByRole('list');
        expect(ul.tagName).toBe('UL');
    });

    it('renders an ordered list when list_type is ordered', () => {
        const data = createListItem([createTextItem()], {
            list_type: 'ordered'
        });

        render(<List data={data} />);

        const ol = screen.getByRole('list');
        expect(ol.tagName).toBe('OL');
    });

    it('renders list items with text content', () => {
        const data = createListItem([
            createTextItem({ content: '<strong>Item text</strong>' })
        ]);

        render(<List data={data} />);
        expect(screen.getByText('Item text')).toBeInTheDocument();
    });

    it('renders nested lists recursively', () => {
        const data = createListItem([
            createTextItem({ content: 'Item text' }),
            createListItem([createTextItem({ content: 'Another item' })])
        ]);

        render(<List data={data} />);

        expect(screen.getByText('Item text')).toBeInTheDocument();
        expect(screen.getByText('Another item')).toBeInTheDocument();

        const lists = screen.getAllByRole('list');
        expect(lists.length).toBeGreaterThan(1);
    });

    it('does not throw when data is partially defined', () => {
        expect(() => render(<List data={{}} />)).not.toThrow();
    });

    it('ignores non-text and non-list items', () => {
        const data = {
            items: [
                createNonTextItem(),
                createTextItem({ content: 'Item text' })
            ]
        };

        render(<List data={data} />);
        expect(screen.getByText('Item text')).toBeInTheDocument();
    });
});
