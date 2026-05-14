import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../../../../components/private/LN/acumulado/botonVerMasNotas';

describe('Components - private - LN - acumulado - botonVerMasNotas', () => {
    const name = 'acumulado';
    const onClickHandler = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    it('renders a button with the correct text and title', () => {
        render(<Button name={name} onClickHandler={onClickHandler} />);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute(
            'title',
            `Ver más notas de ${name.toUpperCase()}`
        );
        expect(button).toHaveTextContent(
            `VER MÁS NOTAS DE ${name.toUpperCase()}`
        );
    });

    it('does not render children passed as prop', () => {
        render(
            <Button name={name} onClickHandler={onClickHandler}>
                <div>Soy un child</div>
            </Button>
        );
        expect(screen.queryByText('Soy un child')).not.toBeInTheDocument();
    });

    it('calls onClickHandler when the button is clicked', () => {
        render(<Button name={name} onClickHandler={onClickHandler} />);
        fireEvent.click(screen.getByRole('button'));
        expect(onClickHandler).toHaveBeenCalledTimes(1);
    });

    it('disables the button when loading is true', () => {
        render(
            <Button
                name={name}
                onClickHandler={onClickHandler}
                loading={true}
            />
        );
        expect(screen.getByRole('button')).toBeDisabled();
    });
});
