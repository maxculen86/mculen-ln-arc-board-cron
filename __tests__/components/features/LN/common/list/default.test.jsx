import React from 'react';
import { render, screen } from '@testing-library/react';
import List from '../../../../../../components/features/LN/common/list/default';
import {
    createTextItem,
    createNonTextItem,
    createListItem
} from '../../../../../../__mocks__/data/LN/common/listMocks';

describe('List component', () => {
    describe('Basic rendering', () => {
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
    });

    describe('Ordered list numbers', () => {
        it('renders numbered items for ordered lists with correct structure', () => {
            const data = createListItem(
                [
                    createTextItem({ content: 'First item' }),
                    createTextItem({ content: 'Second item' }),
                    createTextItem({ content: 'Third item' })
                ],
                { list_type: 'ordered' }
            );

            const { container } = render(<List data={data} />);

            expect(container.firstChild).toMatchSnapshot();
        });

        it('applies aria-hidden to number divs in ordered lists', () => {
            const data = createListItem(
                [
                    createTextItem({ content: 'First item' }),
                    createTextItem({ content: 'Second item' })
                ],
                { list_type: 'ordered' }
            );

            const { container } = render(<List data={data} />);

            const numberDivs = container.querySelectorAll(
                'div[aria-hidden="true"]'
            );
            expect(numberDivs.length).toBe(2);

            expect(container.querySelector('li')).toMatchSnapshot();
        });
    });

    describe('Unordered list bullets', () => {
        it('renders bullet icons for unordered lists with correct structure', () => {
            const data = createListItem(
                [
                    createTextItem({ content: 'Item with bullet' }),
                    createTextItem({ content: 'Another item' })
                ],
                { list_type: 'unordered' }
            );

            const { container } = render(<List data={data} />);

            const numberDivs = container.querySelectorAll(
                'div[aria-hidden="true"]'
            );
            expect(numberDivs.length).toBe(0);

            expect(container.firstChild).toMatchSnapshot();
        });
    });

    describe('Nested lists', () => {
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

        it('applies correct padding to nested lists', () => {
            const data = createListItem([
                createTextItem({ content: 'Parent item' }),
                createListItem([createTextItem({ content: 'Child item' })])
            ]);

            render(<List data={data} />);

            const nestedLists = screen.getAllByRole('list');
            expect(nestedLists.length).toBeGreaterThan(1);
        });
    });

    describe('HTML content', () => {
        it('renders HTML content safely with correct structure', () => {
            const data = createListItem([
                createTextItem({
                    content: '<strong>Bold text</strong> and normal text'
                })
            ]);

            const { container } = render(<List data={data} />);

            const strong = container.querySelector('strong');
            expect(strong).toHaveTextContent('Bold text');

            expect(container.querySelector('li')).toMatchSnapshot();
        });
    });

    describe('Component properties', () => {
        it('should have arcType list', () => {
            expect(List.arcType).toBe('list');
        });

        it('should be static component', () => {
            expect(List.isStatic).toBe(true);
        });
    });

    describe('Edge cases', () => {
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

        it('handles empty items array', () => {
            const data = { items: [] };
            const { container } = render(<List data={data} />);
            expect(container.firstChild).toBeNull();
        });

        it('handles undefined data', () => {
            const { container } = render(<List />);
            expect(container.firstChild).toBeNull();
        });

        it('applies custom className', () => {
            const data = createListItem([createTextItem({ content: 'Item' })]);

            render(<List data={data} className="custom-class" />);

            const list = screen.getByRole('list');
            expect(list.className).toContain('custom-class');
        });
    });
});
