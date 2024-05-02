import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InstagramButton from '../../../../components/private/common/instagramButton'; // Asegúrate de ajustar la ruta de importación

describe('private - common - instagramButton', () => {
    const onClick = jest.fn(); // Usamos jest.fn() para crear una función mock

    it('se renderiza correctamente', () => {
        const { getByRole } = render(<InstagramButton onClick={onClick} />);
        const button = getByRole('button');
        expect(button).toBeInTheDocument();
    });

    it('testeo que el evento onClick se dispare correctamente', () => {
        const { getByRole } = render(<InstagramButton onClick={onClick} />);
        const button = getByRole('button');
        fireEvent.click(button);
        expect(onClick).toHaveBeenCalled();
    });
});
