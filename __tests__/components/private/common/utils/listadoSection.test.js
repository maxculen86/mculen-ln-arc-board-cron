import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListSection from '../../../../../components/private/common/utils/listSection';

jest.mock('../../../../../components/private/common/com-title', () => props => (
    <div data-testid="title" data-tag={props.tag} data-size={props.size}>
        {props.content}
    </div>
));

jest.mock('../../../../../components/private/common/mod-list', () => props => (
    <div data-testid="list">
        {props.mod}
        {props.children}
    </div>
));

describe('ListSection', () => {
    test('renders with default props', () => {
        render(<ListSection />);

        const titleElement = screen.getByTestId('title');
        expect(titleElement).toHaveTextContent('');
        expect(titleElement).toHaveAttribute('data-tag', 'h2');
        expect(titleElement).toHaveAttribute('data-size', '--l');

        const listElement = screen.getByTestId('list');
        expect(listElement).toBeEmptyDOMElement();
    });

    test('renders with provided props', () => {
        const title = 'My Title';
        const listItems = 'Item 1, Item 2';

        render(
            <ListSection
                title={title}
                list={listItems}
                titleSize="--m"
                titleTag="h1"
            />
        );
        const titleElement = screen.getByTestId('title');
        expect(titleElement).toHaveTextContent(title);
        expect(titleElement).toHaveAttribute('data-tag', 'h1');
        expect(titleElement).toHaveAttribute('data-size', '--m');

        const listElement = screen.getByTestId('list');
        expect(listElement).toHaveTextContent(listItems);
    });

    test('renders with different list content', () => {
        const title = 'Another Title';
        const listItems = (
            <ul>
                <li>List Item 1</li>
                <li>List Item 2</li>
            </ul>
        );

        render(<ListSection title={title} list={listItems} />);

        const titleElement = screen.getByTestId('title');
        expect(titleElement).toHaveTextContent(title);

        const listElement = screen.getByTestId('list');
        expect(listElement).toContainHTML(
            '<ul><li>List Item 1</li><li>List Item 2</li></ul>'
        );
    });
});
