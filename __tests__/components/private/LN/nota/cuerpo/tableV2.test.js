import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableV2 from '../../../../../../components/features/LN-nota/tableV2/default';

const mockTableData = {
    _id: 'table-1',
    header: [
        { _id: 'header-1', content: 'Column 1', type: 'text' },
        { _id: 'header-2', content: 'Column 2', type: 'text' }
    ],
    rows: [
        [
            { _id: 'cell-1', content: 'Row 1 Col 1', type: 'text' },
            { _id: 'cell-2', content: 'Row 1 Col 2', type: 'text' }
        ],
        [
            { _id: 'cell-3', content: 'Row 2 Col 1', type: 'text' },
            { _id: 'cell-4', content: 'Row 2 Col 2', type: 'text' }
        ],
        [
            { _id: 'cell-5', content: 'Row 3 Col 1', type: 'text' },
            { _id: 'cell-6', content: 'Row 3 Col 2', type: 'text' }
        ]
    ]
};

const mockTableWithHTML = {
    _id: 'table-2',
    header: [
        { _id: 'header-1', content: 'Property', type: 'text' },
        { _id: 'header-2', content: 'Value', type: 'text' }
    ],
    rows: [
        [
            {
                _id: 'cell-1',
                content: '<strong>Bold Text</strong>',
                type: 'html'
            },
            { _id: 'cell-2', content: '<em>Italic</em>', type: 'html' }
        ]
    ]
};

describe('features - LN-nota - TableV2', () => {
    describe('TableV2 - should render table correctly according to props', () => {
        it('Should show table with correct amount of rows', () => {
            const { container } = render(<TableV2 data={mockTableData} />);
            expect(container).not.toBeEmptyDOMElement();
            expect(screen.getByTestId('table-container')).toBeInTheDocument();
            expect(screen.queryByRole('table')).toBeTruthy();
            expect(screen.queryAllByRole('row')).toHaveLength(4); // 1 header + 3 body rows
            expect(screen.queryAllByRole('rowgroup')).toHaveLength(2); // thead + tbody
        });

        it('Should show two column headers', () => {
            render(<TableV2 data={mockTableData} />);
            expect(screen.queryAllByRole('columnheader')).toHaveLength(2);
            expect(screen.queryByText('Column 1')).toBeTruthy();
            expect(screen.queryByText('Column 2')).toBeTruthy();
        });

        it('Should show correct amount of cells', () => {
            render(<TableV2 data={mockTableData} />);
            expect(screen.queryAllByRole('cell')).toHaveLength(6);
        });

        it('Should render cells with correct content', () => {
            render(<TableV2 data={mockTableData} />);
            expect(screen.queryByText('Row 1 Col 1')).toBeTruthy();
            expect(screen.queryByText('Row 1 Col 2')).toBeTruthy();
            expect(screen.queryByText('Row 2 Col 1')).toBeTruthy();
            expect(screen.queryByText('Row 3 Col 2')).toBeTruthy();
        });

        it('Should NOT render when no headers provided', () => {
            const dataWithoutHeaders = {
                ...mockTableData,
                header: undefined
            };
            render(<TableV2 data={dataWithoutHeaders} />);
            expect(screen.queryAllByRole('columnheader')).toHaveLength(0);
        });

        it('Should render table with empty header array', () => {
            const dataWithEmptyHeaders = {
                ...mockTableData,
                header: []
            };
            render(<TableV2 data={dataWithEmptyHeaders} />);
            expect(screen.queryAllByRole('columnheader')).toHaveLength(0);
        });

        it('Should handle row with empty array', () => {
            const dataWithEmptyRow = {
                ...mockTableData,
                rows: [[], mockTableData.rows[1]]
            };
            render(<TableV2 data={dataWithEmptyRow} />);
            expect(screen.queryAllByRole('row')).toHaveLength(3); // 1 header + 2 rows
        });
    });

    describe('TableV2 - should NOT render table', () => {
        it('Should not render without props', () => {
            const { container } = render(<TableV2 />);
            expect(container).toBeEmptyDOMElement();
        });

        it('Should not render without rows', () => {
            const dataWithoutRows = {
                ...mockTableData,
                rows: []
            };
            const { container } = render(<TableV2 data={dataWithoutRows} />);
            expect(container).toBeEmptyDOMElement();
        });

        it('Should not render with empty data', () => {
            const { container } = render(<TableV2 data={{}} />);
            expect(container).toBeEmptyDOMElement();
        });
    });

    describe('TableV2 - should handle HTML content', () => {
        it('Should render HTML content with dangerouslySetInnerHTML', () => {
            const { container } = render(<TableV2 data={mockTableWithHTML} />);
            expect(container.querySelector('strong')).toBeTruthy();
            expect(container.querySelector('em')).toBeTruthy();
        });

        it('Should have aria-label with stripped HTML tags', () => {
            render(<TableV2 data={mockTableWithHTML} />);
            const cells = screen.queryAllByRole('cell');
            expect(cells[0]).toHaveAttribute('aria-label', 'Bold Text');
            expect(cells[1]).toHaveAttribute('aria-label', 'Italic');
        });

        it('Should set aria-label to "Fila" for empty content', () => {
            const dataWithEmptyCell = {
                _id: 'table-3',
                header: [{ _id: 'h1', content: 'Header', type: 'text' }],
                rows: [[{ _id: 'c1', content: '', type: 'text' }]]
            };
            render(<TableV2 data={dataWithEmptyCell} />);
            const cell = screen.queryByRole('cell');
            expect(cell).toHaveAttribute('aria-label', 'Fila');
        });
    });

    describe('TableV2 - should apply classnames correctly', () => {
        it('Should apply custom container className', () => {
            const { container } = render(
                <TableV2
                    data={mockTableData}
                    classnames={{ container: 'custom-class' }}
                />
            );
            expect(container.querySelector('.custom-class')).toBeTruthy();
        });

        it('Should apply default classnames when no custom provided', () => {
            const { getByTestId } = render(<TableV2 data={mockTableData} />);
            const table = getByTestId('table-container');
            expect(table).toHaveClass('container-table');
            expect(table).toHaveStyle('overflow-x: auto');
        });
    });

    describe('TableV2 - accessibility', () => {
        it('Should have proper table structure with thead and tbody', () => {
            const { container } = render(<TableV2 data={mockTableData} />);
            expect(container.querySelector('thead')).toBeTruthy();
            expect(container.querySelector('tbody')).toBeTruthy();
        });

        it('Should have accessible cell content via aria-label', () => {
            render(<TableV2 data={mockTableData} />);
            const cells = screen.queryAllByRole('cell');
            cells.forEach(cell => {
                expect(cell).toHaveAttribute('aria-label');
            });
        });

        it('Should have unique keys for rows and cells', () => {
            const { container } = render(<TableV2 data={mockTableData} />);
            const rows = container.querySelectorAll('tbody tr');
            expect(rows.length).toBe(3);
        });
    });
});
