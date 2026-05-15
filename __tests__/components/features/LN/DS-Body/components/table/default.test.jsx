import React from 'react';
import { render } from '@testing-library/react';
import Table from '../../../../../../../components/features/LN/DS-Body/components/table/default';

jest.mock(
    '../../../../../../../components/features/LN/common/table/default',
    () =>
        ({ data, striped }) => (
            <div
                data-testid="ln-table"
                data-received-data={JSON.stringify(data)}
                data-striped={striped ? 'true' : undefined}
            />
        )
);

jest.mock(
    '../../../../../../../components/features/LN/common/wrapperBody/default',
    () => ({
        WrapperBody: ({ children, className }) => (
            <div data-testid="wrapper-body" className={className}>
                {children}
            </div>
        )
    })
);

describe('Components - features - LN - DS-Body - components - table - default', () => {
    it('should have arcType "table"', () => {
        expect(Table.arcType).toBe('table');
    });

    it('should render WrapperBody with className "mb-32"', () => {
        const { getByTestId } = render(<Table />);
        expect(getByTestId('wrapper-body')).toHaveClass('mb-32');
    });

    it('should pass data prop to LNTable', () => {
        const mockData = {
            header: [{ content: 'Col' }],
            rows: [[{ content: 'Val' }]]
        };
        const { getByTestId } = render(<Table data={mockData} />);
        expect(getByTestId('ln-table')).toHaveAttribute(
            'data-received-data',
            JSON.stringify(mockData)
        );
    });

    it('should pass striped to LNTable', () => {
        const { getByTestId } = render(<Table />);
        expect(getByTestId('ln-table')).toHaveAttribute('data-striped', 'true');
    });

    it('should render LNTable inside WrapperBody', () => {
        const { getByTestId } = render(<Table />);
        expect(getByTestId('wrapper-body')).toContainElement(
            getByTestId('ln-table')
        );
    });
});
