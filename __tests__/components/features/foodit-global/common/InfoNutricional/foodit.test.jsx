import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InfoNutricional } from '../../../../../../components/features/foodit-global/common/InfoNutricional/foodit';

const observe = jest.fn();
const unobserve = jest.fn();

window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve
}));
describe('InfoNutricional', () => {
    it('shows tooltip text on click', () => {
        render(<InfoNutricional />);
        fireEvent.click(screen.getByTitle('Mostrar tooltip'));
        expect(
            screen.getByText(
                'La información mostrada es una estimación en base a los ingredientes y la preparación disponibles. No debe considerarse un sustituto del consejo de un nutricionista profesional.'
            )
        ).toBeInTheDocument();
    });
});
