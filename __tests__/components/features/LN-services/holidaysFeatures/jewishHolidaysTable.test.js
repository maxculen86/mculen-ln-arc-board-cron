import React from 'react';
import Context from 'fusion:context';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import JewishHolidaysTable from '../../../../../components/features/LN-services/jewishHolidaysTables/default';
import outputTransformHome from '../../../../../__mocks__/data/holidays/outputTransformHome.json';

jest.mock(
    '../../../../../components/private/common/staticValidation',
    () => 'mock-static-validation'
);

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};
        return props.children(mockAvailableProps);
    },
    useAppContext: jest.fn(() => ({}))
}));

describe('Components- Features - JewishHolidaysTable - default.jsx - test', () => {
    Context.useAppContext = jest.fn(() => ({
        globalContent: outputTransformHome
    }));
    it('Should show all the jewish holidays tables', () => {
        const { container } = render(<JewishHolidaysTable />);
        expect(container).toMatchSnapshot();
    });

    it('Should render the jewish table', () => {
        const { container } = render(<JewishHolidaysTable />);
        const table = container.getElementsByClassName(
            'table-wrapper --two-columns --holidays'
        );
        expect(table.length).toBe(1);
    });

    it('Should render two columns for the jewish table', () => {
        const { container } = render(<JewishHolidaysTable />);
        const tableColumns = container.getElementsByTagName('th');
        expect(tableColumns.length).toBe(2);
    });
});
