import React from 'react';
import Context from 'fusion:context';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import JewishHolidaysTable from '../../../../../components/features/LN-services/jewishHolidaysTables/default';
import outputTransformHome from '../../../../../__mocks__/data/holidays/outputTransformHome.json';

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};
        return props.children(mockAvailableProps);
    },
    useAppContext: jest.fn(() => ({}))
}));

describe('Components - Features - JewishHolidaysTable - default.jsx', () => {
    beforeEach(() => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: outputTransformHome
        }));
    });

    it('renders the jewish holidays table', () => {
        render(<JewishHolidaysTable />);
        expect(screen.getAllByRole('table')).toHaveLength(1);
    });

    it('renders the section heading', () => {
        render(<JewishHolidaysTable />);
        expect(screen.getByText('Feriados judíos')).toBeInTheDocument();
    });

    it('renders 2 column headers', () => {
        render(<JewishHolidaysTable />);
        expect(screen.getAllByRole('columnheader')).toHaveLength(2);
    });

    it('does not apply explicit column widths', () => {
        render(<JewishHolidaysTable />);
        const headers = screen.getAllByRole('columnheader');
        expect(headers[0].style.width).toBe('');
        expect(headers[1].style.width).toBe('');
    });

    it('renders table with striped rows', () => {
        render(<JewishHolidaysTable />);
        const rows = screen.getAllByRole('row');
        const dataRows = rows.filter(r => r.querySelectorAll('td').length > 0);
        dataRows.forEach(row => {
            expect(row).toHaveClass('even:bg-neutral-50');
        });
    });

    it('renders nothing when data is empty', () => {
        Context.useAppContext = jest.fn(() => ({ globalContent: {} }));
        const { container } = render(<JewishHolidaysTable />);
        expect(container.firstChild).toBeNull();
    });
});
