import React from 'react';
import Context from 'fusion:context';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CatholicHolidaysTable from '../../../../../components/features/LN-services/catholicHolidaysTables/default';
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

describe('Components- Features - CatholicHolidaysTable - default.jsx - test', () => {
    Context.useAppContext = jest.fn(() => ({
        globalContent: outputTransformHome
    }));
    it('Should show all the catholic holidays tables', () => {
        const { container } = render(<CatholicHolidaysTable />);
        expect(container).toMatchSnapshot();
    });

    it('Should render the three catholics tables', () => {
        const { container } = render(<CatholicHolidaysTable />);
        const tables = container.getElementsByClassName(
            'table-wrapper --holidays'
        );
        expect(tables.length).toBe(3);
    });

    it('Should render eight columns for the three catholic tables', () => {
        const { container } = render(<CatholicHolidaysTable />);
        const tableColumns = container.getElementsByTagName('th');
        expect(tableColumns.length).toBe(8);
    });
});
