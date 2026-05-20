import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from '../../../../../../components/features/LN/common/table/default';

const mockData = {
    header: [
        { content: 'Column 1' },
        { content: 'Column 2' },
        { content: 'Column 3' }
    ],
    rows: [
        [
            { _id: 'r1c1', content: 'Row 1 Col 1' },
            { _id: 'r1c2', content: 'Row 1 Col 2' },
            { _id: 'r1c3', content: 'Row 1 Col 3' }
        ],
        [
            { _id: 'r2c1', content: 'Row 2 Col 1' },
            { _id: 'r2c2', content: 'Row 2 Col 2' },
            { _id: 'r2c3', content: 'Row 2 Col 3' }
        ]
    ]
};

describe('Table - LN/common/table', () => {
    describe('Conditional render', () => {
        it('returns null when rows is empty and no emptyMessage', () => {
            const { container } = render(
                <Table data={{ header: [], rows: [] }} />
            );
            expect(container.firstChild).toBeNull();
        });

        it('returns null with default props and no data', () => {
            const { container } = render(<Table />);
            expect(container.firstChild).toBeNull();
        });

        it('renders the table when rows are present', () => {
            render(<Table data={mockData} />);
            expect(screen.getByRole('table')).toBeInTheDocument();
        });
    });

    describe('Table structure', () => {
        it('renders the correct number of header cells', () => {
            render(<Table data={mockData} />);
            expect(screen.getAllByRole('columnheader')).toHaveLength(3);
        });

        it('renders the correct number of rows (header + data)', () => {
            render(<Table data={mockData} />);
            // 1 header row + 2 data rows
            expect(screen.getAllByRole('row')).toHaveLength(3);
        });

        it('renders the content of each cell', () => {
            render(<Table data={mockData} />);
            expect(screen.getByText('Column 1')).toBeInTheDocument();
            expect(screen.getByText('Row 1 Col 1')).toBeInTheDocument();
            expect(screen.getByText('Row 2 Col 3')).toBeInTheDocument();
        });
    });

    describe('Accessibility', () => {
        it('applies aria-label to header cells', () => {
            render(<Table data={mockData} />);
            const headers = screen.getAllByRole('columnheader');
            expect(headers[0]).toHaveAttribute('aria-label', 'Column 1');
            expect(headers[1]).toHaveAttribute('aria-label', 'Column 2');
            expect(headers[2]).toHaveAttribute('aria-label', 'Column 3');
        });

        it('applies fallback aria-label "Columna" when header content is empty', () => {
            const dataWithEmptyHeader = {
                ...mockData,
                header: [{ content: '' }, { content: 'Col 2' }]
            };
            render(<Table data={dataWithEmptyHeader} />);
            const headers = screen.getAllByRole('columnheader');
            expect(headers[0]).toHaveAttribute('aria-label', 'Columna');
        });

        it('applies aria-label to data cells', () => {
            render(<Table data={mockData} />);
            expect(
                screen.getByRole('cell', { name: 'Row 1 Col 1' })
            ).toBeInTheDocument();
        });

        it('applies fallback aria-label "Fila" when cell content is empty', () => {
            const dataWithEmptyCell = {
                header: [{ content: 'Col' }],
                rows: [[{ _id: 'empty', content: '' }]]
            };
            render(<Table data={dataWithEmptyCell} />);
            expect(
                screen.getByRole('cell', { name: 'Fila' })
            ).toBeInTheDocument();
        });

        it('links table to caption via aria-describedby when captionProps has content', () => {
            render(
                <Table
                    data={mockData}
                    captionProps={{ content: 'Fuente: INDEC' }}
                />
            );
            const table = screen.getByRole('table');
            const captionId = table.getAttribute('aria-describedby');
            expect(captionId).toBeTruthy();
            expect(document.getElementById(captionId)).toHaveTextContent(
                'Fuente: INDEC'
            );
        });

        it('does not set aria-describedby when captionProps has no content', () => {
            render(<Table data={mockData} />);
            expect(screen.getByRole('table')).not.toHaveAttribute(
                'aria-describedby'
            );
        });
    });

    describe('stickyFirstCol', () => {
        it('applies sticky and left-0 to the first header column when stickyFirstCol is true', () => {
            render(<Table data={mockData} stickyFirstCol />);
            const headers = screen.getAllByRole('columnheader');
            expect(headers[0]).toHaveClass('sticky', 'left-0');
        });

        it('does not apply sticky to remaining header columns when stickyFirstCol is true', () => {
            render(<Table data={mockData} stickyFirstCol />);
            const headers = screen.getAllByRole('columnheader');
            expect(headers[1]).not.toHaveClass('sticky');
            expect(headers[2]).not.toHaveClass('sticky');
        });

        it('does not apply sticky when stickyFirstCol is false (default)', () => {
            render(<Table data={mockData} />);
            screen.getAllByRole('columnheader').forEach(header => {
                expect(header).not.toHaveClass('sticky');
            });
        });

        it('applies sticky and bg-white to the first body cell when stickyFirstCol is true', () => {
            render(<Table data={mockData} stickyFirstCol />);
            const rows = screen.getAllByRole('row');
            const firstDataRowCells = rows[1].querySelectorAll('td');
            expect(firstDataRowCells[0]).toHaveClass(
                'sticky',
                'left-0',
                'bg-white'
            );
        });

        it('applies bg-white to odd sticky rows when striped is true', () => {
            render(<Table data={mockData} stickyFirstCol striped />);
            const rows = screen.getAllByRole('row');
            // rows[1] = first data row = rowIndex 0 = odd (CSS) → bg-white
            expect(rows[1].querySelectorAll('td')[0]).toHaveClass('bg-white');
        });

        it('applies bg-neutral-50 to even sticky rows when striped is true', () => {
            render(<Table data={mockData} stickyFirstCol striped />);
            const rows = screen.getAllByRole('row');
            // rows[2] = second data row = rowIndex 1 = even (CSS) → bg-neutral-50
            expect(rows[2].querySelectorAll('td')[0]).toHaveClass(
                'bg-neutral-50'
            );
        });

        it('applies bg-white to all sticky rows when striped is false', () => {
            render(<Table data={mockData} stickyFirstCol />);
            const rows = screen.getAllByRole('row');
            rows.slice(1).forEach(row => {
                expect(row.querySelectorAll('td')[0]).toHaveClass('bg-white');
                expect(row.querySelectorAll('td')[0]).not.toHaveClass(
                    'bg-neutral-50'
                );
            });
        });

        it('does not apply sticky to remaining body cells when stickyFirstCol is true', () => {
            render(<Table data={mockData} stickyFirstCol />);
            const rows = screen.getAllByRole('row');
            const firstDataRowCells = rows[1].querySelectorAll('td');
            expect(firstDataRowCells[1]).not.toHaveClass('sticky');
            expect(firstDataRowCells[2]).not.toHaveClass('sticky');
        });
    });

    describe('Row backgrounds', () => {
        it('sets data-striped="true" on the table root when striped is true', () => {
            render(<Table data={mockData} striped />);
            expect(screen.getByRole('table')).toHaveAttribute(
                'data-striped',
                'true'
            );
        });

        it('does not set data-striped when striped is not set', () => {
            render(<Table data={mockData} />);
            expect(screen.getByRole('table')).not.toHaveAttribute(
                'data-striped'
            );
        });

        it('applies even:bg-neutral-50 to data rows when striped is true', () => {
            render(<Table data={mockData} striped />);
            const rows = screen.getAllByRole('row');
            rows.slice(1).forEach(row => {
                expect(row).toHaveClass('even:bg-neutral-50');
            });
        });

        it('does not apply even:bg-neutral-50 when striped is not set', () => {
            render(<Table data={mockData} />);
            const rows = screen.getAllByRole('row');
            rows.slice(1).forEach(row => {
                expect(row).not.toHaveClass('even:bg-neutral-50');
            });
        });
    });

    describe('Container classes', () => {
        const getScrollContainer = container => container.firstChild.firstChild;

        it('applies overflow-x-auto and pb-12 to the scroll container', () => {
            const { container } = render(<Table data={mockData} />);
            expect(getScrollContainer(container)).toHaveClass(
                'overflow-x-auto',
                'pb-12'
            );
        });

        it('applies custom container classname to the wrapper', () => {
            const { container } = render(
                <Table
                    data={mockData}
                    classnames={{ container: 'my-custom-class' }}
                />
            );
            expect(container.firstChild).toHaveClass('my-custom-class');
        });

        it('applies lg:w-800 and lg:max-w-full to the wrapper when maxWidth is true', () => {
            const { container } = render(<Table data={mockData} maxWidth />);
            expect(container.firstChild).toHaveClass(
                'lg:w-800',
                'lg:max-w-full'
            );
        });

        it('does not apply lg:w-800 to the wrapper when maxWidth is false (default)', () => {
            const { container } = render(<Table data={mockData} />);
            expect(container.firstChild).not.toHaveClass('lg:w-800');
        });
    });

    describe('Header cell classes', () => {
        it('applies bg-muted to all header cells', () => {
            render(<Table data={mockData} />);
            screen.getAllByRole('columnheader').forEach(header => {
                expect(header).toHaveClass('bg-muted');
            });
        });
    });

    describe('columnWidths', () => {
        it('applies colWidth style to each header cell when columnWidths is provided', () => {
            render(
                <Table data={mockData} columnWidths={['40%', '30%', '30%']} />
            );
            const headers = screen.getAllByRole('columnheader');
            expect(headers[0]).toHaveStyle({ width: '40%' });
            expect(headers[1]).toHaveStyle({ width: '30%' });
            expect(headers[2]).toHaveStyle({ width: '30%' });
        });

        it('applies equal widths when all columnWidths entries are the same', () => {
            render(
                <Table data={mockData} columnWidths={['33%', '33%', '33%']} />
            );
            screen.getAllByRole('columnheader').forEach(header => {
                expect(header).toHaveStyle({ width: '33%' });
            });
        });

        it('does not apply any width style when columnWidths is not provided', () => {
            render(<Table data={mockData} />);
            screen.getAllByRole('columnheader').forEach(header => {
                expect(header.style.width).toBe('');
            });
        });
    });

});

