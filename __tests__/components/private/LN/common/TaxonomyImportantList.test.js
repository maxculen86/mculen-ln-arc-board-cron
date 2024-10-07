import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaxonomyImportantList from '../../../../../components/private/LN/common/taxonomyImportantList'; // Ajusta la ruta según la ubicación del componente

const mockList = [
    { type: 'tag', path: 'path1', text: 'Item 1' },
    { type: '', path: 'path2', text: 'Item 2' },
    { type: 'tag', path: 'path3', text: 'Item 3' },
    { type: '', path: 'path4', text: 'Item 4' },
    { type: '', path: 'path5', text: 'Item 5' }
];

describe('Components - private - LN - common - TaxonomyImportantList', () => {
    it('renders all items when collapsible is false', () => {
        render(
            <TaxonomyImportantList
                list={mockList}
                showItems={5}
                extraClass={''}
                collapsible={false}
            />
        );

        mockList.forEach(item => {
            expect(screen.getByText(item.text)).toBeInTheDocument();
        });
    });

    it('renders only 4 items initially when collapsible is true', () => {
        render(
            <TaxonomyImportantList
                list={mockList}
                showItems={mockList.length}
                collapsible={true}
            />
        );

        expect(screen.queryByText('Item 1')).toBeInTheDocument();
        expect(screen.queryByText('Item 2')).toBeInTheDocument();
        expect(screen.queryByText('Item 3')).toBeInTheDocument();
        expect(screen.queryByText('Item 4')).toBeInTheDocument();
        expect(screen.queryByText('Item 5')).not.toBeInTheDocument();
    });

    it('toggles collapse/expand on button click', () => {
        render(
            <TaxonomyImportantList
                list={mockList}
                showItems={mockList.length}
                collapsible={true}
            />
        );
        const toggleButton = screen.getByRole('button');

        expect(screen.queryByText('Item 5')).not.toBeInTheDocument();

        fireEvent.click(toggleButton);
        expect(screen.getByText('Item 5')).toBeInTheDocument();

        fireEvent.click(toggleButton);
        expect(screen.queryByText('Item 5')).not.toBeInTheDocument();
    });

    it('adds extraClass to the section when provided', () => {
        const extraClass = 'extra-class';
        const { container } = render(
            <TaxonomyImportantList
                list={mockList}
                showItems={4}
                extraClass={extraClass}
            />
        );

        expect(
            container.firstChild.className.includes(extraClass)
        ).toBeTruthy();
    });
});
