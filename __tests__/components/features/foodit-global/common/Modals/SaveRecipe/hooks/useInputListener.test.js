import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import useInputListener from '../../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/hooks/useInputListener';

const HookWrapper = ({ initialValue }) => {
    const { value, onChange, error } = useInputListener(initialValue);
    return (
        <div>
            <input data-testid="input" value={value} onChange={onChange} />
            <span data-testid="error">
                {error.hasError ? error.message : ''}
            </span>
        </div>
    );
};

describe('useInputListener', () => {
    it('should initialize with the given initial value', () => {
        const initialValue = 'initial';
        const { getByTestId } = render(
            <HookWrapper initialValue={initialValue} />
        );

        expect(getByTestId('input').value).toBe(initialValue);
        expect(getByTestId('error').textContent).toBe('');
    });

    it('should update value on handleInputChange within valid length', () => {
        const initialValue = '';
        const { getByTestId } = render(
            <HookWrapper initialValue={initialValue} />
        );

        const input = getByTestId('input');
        fireEvent.change(input, { target: { value: 'new value' } });

        expect(input.value).toBe('new value');
        expect(getByTestId('error').textContent).toBe('');
    });

    it('should set error if input value exceeds 45 characters', () => {
        const initialValue = '';
        const { getByTestId } = render(
            <HookWrapper initialValue={initialValue} />
        );

        const input = getByTestId('input');
        const longValue = 'a'.repeat(46);
        fireEvent.change(input, { target: { value: longValue } });

        expect(input.value).toBe('');
        expect(getByTestId('error').textContent).toBe('Máximo 45 caracteres');
    });

    it('should reset value to initial value on unmount', () => {
        const initialValue = 'initial';
        const { getByTestId, unmount } = render(
            <HookWrapper initialValue={initialValue} />
        );

        const input = getByTestId('input');
        fireEvent.change(input, { target: { value: 'new value' } });

        expect(input.value).toBe('new value');

        unmount();

        // Verificar que al desmontar, el valor se restablece correctamente
        const { getByTestId: getByTestIdAfterUnmount } = render(
            <HookWrapper initialValue={initialValue} />
        );
        expect(getByTestIdAfterUnmount('input').value).toBe(initialValue);
    });

    it('should restore input value to initial value', () => {
        const initialValue = 'initial';
        const { getByTestId } = render(
            <HookWrapper initialValue={initialValue} />
        );

        const input = getByTestId('input');
        fireEvent.change(input, { target: { value: 'new value' } });

        expect(input.value).toBe('new value');

        fireEvent.change(input, { target: { value: initialValue } });

        expect(input.value).toBe(initialValue);
    });

    it('should set error message when input is empty', () => {
        const initialValue = 'some initial value';
        const { getByTestId } = render(
            <HookWrapper initialValue={initialValue} />
        );

        const input = getByTestId('input');
        fireEvent.change(input, { target: { value: '' } });

        expect(input.value).toBe(initialValue);
        expect(getByTestId('error').textContent).not.toBe('');
        expect(getByTestId('error').textContent).toBe(
            'Completa el nombre de la colección para continuar'
        );
    });
});
