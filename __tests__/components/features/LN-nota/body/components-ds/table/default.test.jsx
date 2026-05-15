import React from 'react';
import { render } from '@testing-library/react';
import Table from '../../../../../../../components/features/LN-nota/body/components-ds/table/default';

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

describe('Components - features - LN-nota - body - components-ds - table - default', () => {
    it('should have arcType "table"', () => {
        expect(Table.arcType).toBe('table');
    });

    it('should render a wrapper div with data-tw attribute', () => {
        const { container } = render(<Table />);
        const wrapper = container.firstChild;
        expect(wrapper.tagName).toBe('DIV');
        expect(wrapper.hasAttribute('data-tw')).toBe(true);
    });

    it('should apply display:contents to the wrapper div', () => {
        const { container } = render(<Table />);
        expect(container.firstChild).toHaveStyle({ display: 'contents' });
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

    it('should render LNTable inside the wrapper div', () => {
        const { container, getByTestId } = render(<Table />);
        expect(container.firstChild).toContainElement(getByTestId('ln-table'));
    });
});
