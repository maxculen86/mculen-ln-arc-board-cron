import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AndroidButton from '../../../../components/private/common/androidButton'; // Asegúrate de ajustar la ruta de importación

describe('AndroidButton', () => {
    it('se renderiza correctamente', () => {
        const { getByRole } = render(<AndroidButton />);
        const button = getByRole('button');
        expect(button).toBeInTheDocument();
    });

    it('dispara evento onClick cuando se hace clic', () => {
        const onClickMock = jest.fn();
        const { getByRole } = render(<AndroidButton onClick={onClickMock} />);
        const button = getByRole('button');
        fireEvent.click(button);
        expect(onClickMock).toHaveBeenCalled();
    });
});
