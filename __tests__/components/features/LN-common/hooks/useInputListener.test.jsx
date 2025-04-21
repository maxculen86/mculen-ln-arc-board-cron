import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import useInputListener from '../../../../../components/features/LN-common/hooks/useInputListener';

describe('Components - features - LN-common -  hooks - useInputListener', () => {
    const initial = { keyword: '' };

    const TestComponent = () => {
        const { values, onChange, restoreInputValues } =
            useInputListener(initial);

        return (
            <div>
                <input
                    name="keyword"
                    value={values.keyword}
                    onChange={onChange}
                    data-testid="keyword-input"
                />
                <button onClick={restoreInputValues}>Restaurar</button>
                <div data-testid="output">{values.keyword}</div>
            </div>
        );
    };

    it('should initialize with the empty keyword value', () => {
        const { getByTestId } = render(<TestComponent />);
        expect(getByTestId('keyword-input').value).toBe('');
        expect(getByTestId('output').textContent).toBe('');
    });

    it('should update the value of keyword when writing', () => {
        const { getByTestId } = render(<TestComponent />);
        const input = getByTestId('keyword-input');

        fireEvent.change(input, {
            target: { name: 'keyword', value: 'juan pérez' }
        });

        expect(getByTestId('output').textContent).toBe('juan pérez');
    });

    it('should restore the original keyword value by clicking "Restore"', () => {
        const { getByTestId, getByText } = render(<TestComponent />);
        const input = getByTestId('keyword-input');

        fireEvent.change(input, {
            target: { name: 'keyword', value: 'Maria' }
        });

        expect(getByTestId('output').textContent).toBe('Maria');

        fireEvent.click(getByText('Restaurar'));

        expect(getByTestId('output').textContent).toBe('');
    });
});
