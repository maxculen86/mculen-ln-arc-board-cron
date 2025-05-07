import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PowerUpPreparacion from '../../../../../../components/features/private-global/body/powerUpPreparacion/foodit';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn().mockReturnValue({
        globalContent: {
            content_elements: [
                {
                    _id: 'FPAMHE2RCJHY7BLDF6VWOOLJNI',
                    embed: {
                        config: {
                            items: [
                                'En un tazón, mezcla el agua tibia, azúcar y levadura. Deja reposar por 5 minutos hasta que burbujee. Agrega la harina, aceite de oliva y sal. Amasa hasta obtener una masa suave y elástica. Cubre y deja reposar en un lugar cálido durante 1 hora.',
                                'En una sartén, saltea el ajo en aceite de oliva hasta que esté dorado. Agrega el tomate triturado, orégano, albahaca, sal y pimienta. Cocina a fuego lento durante 15-20 minutos.',
                                'Precalienta el horno a 220°C. Estira la masa en una bandeja para horno y unta la salsa de tomate uniformemente. Agrega el queso mozzarella y los ingredientes de tu elección.',
                                'Hornea la pizza en el horno precalentado durante 15-20 minutos o hasta que la masa esté dorada y el queso burbujee.'
                            ],
                            titleList: 'Para la masa',
                            typeList: 'preparacion'
                        }
                    },
                    subtype: 'custom-preparacion',
                    type: 'custom_embed'
                }
            ]
        }
    })
}));

describe('PowerUpPreparacion', () => {
    it('Should render with valid data', () => {
        const data = {
            _id: 'FPAMHE2RCJHY7BLDF6VWOOLJNI',
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
            _id: 'FPAMHE2RCJHY7BLDF6VWOOLJNI',
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
