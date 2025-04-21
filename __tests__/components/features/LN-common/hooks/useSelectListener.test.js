import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import useSelectListener from '../../../../../components/features/LN-common/hooks/useSelectListener';

const HookWrapper = ({ initialValue }) => {
    const { selectValue, onSelectChange } = useSelectListener(initialValue);
    return (
        <div>
            <span data-testid="select-value">
                {JSON.stringify(selectValue)}
            </span>
            <button onClick={() => onSelectChange({ value: 'new' })}>
                Change Value
            </button>
            <button onClick={() => onSelectChange({})}>
                Change to Undefined
            </button>
        </div>
    );
};

describe('useSelectListener', () => {
    it('should initialize with the given initial value', () => {
        const initialValue = { value: 'initial' };
        const { getByTestId } = render(
            <HookWrapper initialValue={initialValue} />
        );
        expect(getByTestId('select-value').textContent).toBe(
            JSON.stringify(initialValue)
        );
    });

    it('should update selectValue on handleSelectChange', () => {
        const initialValue = { value: 'initial' };
        const { getByTestId, getByText } = render(
            <HookWrapper initialValue={initialValue} />
        );

        fireEvent.click(getByText('Change Value'));

        expect(getByTestId('select-value').textContent).toBe(
            JSON.stringify({ value: 'new' })
        );
    });

    it('should not update selectValue if event value is undefined', () => {
        const initialValue = { value: 'initial' };
        const { getByTestId, getByText } = render(
            <HookWrapper initialValue={initialValue} />
        );

        fireEvent.click(getByText('Change to Undefined'));

        expect(getByTestId('select-value').textContent).toBe(
            JSON.stringify(initialValue)
        );
    });

    it('should reset selectValue to initial value on unmount', () => {
        const initialValue = { value: 'initial' };
        const { getByTestId, getByText, unmount } = render(
            <HookWrapper initialValue={initialValue} />
        );

        fireEvent.click(getByText('Change Value'));

        expect(getByTestId('select-value').textContent).toBe(
            JSON.stringify({ value: 'new' })
        );

        unmount();

        const { getByTestId: getByTestIdAfterUnmount } = render(
            <HookWrapper initialValue={initialValue} />
        );
        expect(getByTestIdAfterUnmount('select-value').textContent).toBe(
            JSON.stringify(initialValue)
        );
    });
});
