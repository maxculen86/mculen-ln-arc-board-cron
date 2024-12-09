import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PowerUpPreparacion from '../../../../../../components/features/private-global/body/powerUpPreparacion/foodit';

describe('PowerUpPreparacion', () => {
    it('Should render with valid data', () => {
        const data = {
            embed: {
                config: {
                    items: ['Item 1', 'Item 2'],
                    titleList: 'Título de Prueba'
                }
            }
        };

        render(<PowerUpPreparacion data={data} />);
        const headings = screen.getAllByRole('heading');
        expect(headings[0].textContent).toEqual('Preparación');
        expect(headings[1].textContent).toEqual('Título de Prueba');
        expect(
            screen.getByText('Item 1', { selector: 'li' })
        ).toBeInTheDocument();
        expect(
            screen.getByText('Item 2', { selector: 'li' })
        ).toBeInTheDocument();
    });

    it('Should return fragment without items', () => {
        const data = {
            embed: {
                config: {
                    items: [],
                    titleList: 'Título de Prueba'
                }
            }
        };

        const { container } = render(<PowerUpPreparacion data={data} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('Should return fragment without data', () => {
        const { container } = render(<PowerUpPreparacion />);
        expect(container).toBeEmptyDOMElement();
    });
    it('Should show title Preparacion', () => {
        const data = {
            embed: {
                config: {
                    items: ['Item 1', 'Item 2'],
                    titleList: 'Título de Prueba 2'
                }
            }
        };

        const { container } = render(<PowerUpPreparacion data={data} />);
        const headings = screen.getAllByRole('heading');
        expect(headings[0].textContent).toEqual('Preparación');
        expect(headings[1].textContent).toEqual('Título de Prueba 2');
        expect(
            screen.getByText('Item 1', { selector: 'li' })
        ).toBeInTheDocument();
        expect(
            screen.getByText('Item 2', { selector: 'li' })
        ).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});
