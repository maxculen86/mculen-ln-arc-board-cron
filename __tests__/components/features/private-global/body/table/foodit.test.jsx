import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableComponent from '../../../../../../components/features/private-global/body/table/foodit';

describe('Components - Features - Private-global - Body - TableComponent', () => {
    const mockData = {
        _id: 'test-table-id',
        header: [
            {
                _id: 'header-1',
                content: 'Dia',
                type: 'text'
            },
            {
                _id: 'header-2',
                content: 'Almuerzo',
                type: 'text'
            }
        ],
        rows: [
            [
                {
                    _id: 'row-1-col-1',
                    content: 'Lunes',
                    type: 'text'
                },
                {
                    _id: 'row-1-col-2',
                    content: 'Receta de almuerzo lunes',
                    type: 'text'
                }
            ],
            [
                {
                    _id: 'row-2-col-1',
                    content: 'Martes',
                    type: 'text'
                },
                {
                    _id: 'row-2-col-2',
                    content: 'Receta de almuerzo martes',
                    type: 'text'
                }
            ]
        ],
        type: 'table'
    };

    it('renders table with correct headers', () => {
        render(<TableComponent data={mockData} />);

        mockData.header.forEach(header => {
            const headerElement = screen.getByText(header.content);
            expect(headerElement).toBeInTheDocument();
        });
    });

    it('renders correct number of rows and columns', () => {
        render(<TableComponent data={mockData} />);

        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(mockData.rows.length + 1); // Header row + data rows

        mockData.rows.forEach((row, rowIndex) => {
            row.forEach(cell => {
                const cellContent = screen.getByText(cell.content);
                expect(cellContent).toBeInTheDocument();
            });
        });
    });
});
