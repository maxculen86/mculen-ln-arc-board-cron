import React from 'react';
import Context from 'fusion:context';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CatholicHolidaysTable from '../../../../../components/features/LN-services/catholicHolidaysTables/default';
import outputTransformHome from '../../../../../__mocks__/data/holidays/outputTransformHome.json';

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};
        return props.children(mockAvailableProps);
    },
    useAppContext: jest.fn(() => ({}))
}));

describe('Components - Features - CatholicHolidaysTable - default.jsx', () => {
    beforeEach(() => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: outputTransformHome
        }));
    });

    it('renders three table sections', () => {
        render(<CatholicHolidaysTable />);
        expect(screen.getAllByRole('table')).toHaveLength(3);
    });

    it('renders section headings for each holiday type', () => {
        render(<CatholicHolidaysTable />);
        expect(screen.getByText('Feriados inamovibles')).toBeInTheDocument();
        expect(screen.getByText('Feriados trasladables')).toBeInTheDocument();
        expect(screen.getByText('Días no laborables')).toBeInTheDocument();
    });

    it('renders 8 column headers across all tables', () => {
        render(<CatholicHolidaysTable />);
        // Inamovible: 3, Trasladable: 3, Puente: 2 = 8
        expect(screen.getAllByRole('columnheader')).toHaveLength(8);
    });

    it('applies 29%/23%/48% column widths to 3-col tables', () => {
        render(<CatholicHolidaysTable />);
        const headers = screen.getAllByRole('columnheader');
        // Inamovible: cols 0-2
        expect(headers[0]).toHaveStyle({ width: '29%' });
        expect(headers[1]).toHaveStyle({ width: '23%' });
        expect(headers[2]).toHaveStyle({ width: '48%' });
        // Trasladable: cols 3-5
        expect(headers[3]).toHaveStyle({ width: '29%' });
        expect(headers[4]).toHaveStyle({ width: '23%' });
        expect(headers[5]).toHaveStyle({ width: '48%' });
    });

    it('does not apply explicit column widths to 2-col table (Puente)', () => {
        render(<CatholicHolidaysTable />);
        const headers = screen.getAllByRole('columnheader');
        expect(headers[6].style.width).toBe('');
        expect(headers[7].style.width).toBe('');
    });

    it('renders tables with striped rows', () => {
        render(<CatholicHolidaysTable />);
        const rows = screen.getAllByRole('row');
        const dataRows = rows.filter(r => r.querySelectorAll('td').length > 0);
        dataRows.forEach(row => {
            expect(row).toHaveClass('even:bg-neutral-50');
        });
    });

    it('renders nothing when data is empty', () => {
        Context.useAppContext = jest.fn(() => ({ globalContent: {} }));
        const { container } = render(<CatholicHolidaysTable />);
        expect(container.firstChild).toBeNull();
    });
});
