import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IaTools from '../../../../../../components/features/LN-10/IA/common/iaTools';

const observe = jest.fn();
const unobserve = jest.fn();

window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve
}));
Element.prototype.scrollIntoView = jest.fn();

const handleClose = jest.fn();
const callback = jest.fn();

describe('IaTools component', () => {
    const iaDataMock = [
        {
            id: 'summary',
            title: 'Resumen de lectura',
            callback: callback,
            data: [
                'Counter',
                'strike 2, Dota 2 y Black myth wukong son los títulos más populares en Steam esta semana.',
                'Steam es la plataforma de distribución digital más grande del mundo para videojuegos, con millones de usuarios y una amplia variedad de títulos disponibles.',
                'La plataforma ofrece características como actualizaciones automáticas, comunidades de jugadores y soporte para mods, además de ventas y descuentos que permiten acceder a títulos populares a precios reducidos.'
            ]
        },
        {
            id: 'glossary',
            title: 'Glosario',
            callback: callback,
            data: [
                {
                    key: 'BBC',
                    value: 'British Broadcasting Corporation. Medio de comunicación público británico.'
                },
                {
                    key: 'eBay',
                    value: 'Compañía de subastas y comercio electrónico en línea.'
                },
                {
                    key: 'Museo Británico',
                    value: 'Institución cultural en Londres que alberga una amplia colección de arte y objetos históricos.'
                },
                {
                    key: 'PayPal',
                    value: 'Plataforma de pagos en línea.'
                },
                {
                    key: 'Test Sa',
                    value: 'Organización dedicada a la prevención y atención de la violencia doméstica.'
                }
            ]
        }
    ];

    it('should render null when iaData is empty', () => {
        const { container } = render(<IaTools iaData={[]} />);
        expect(container).toBeEmptyDOMElement();
    });
    it('should render titles correctly', () => {
        render(<IaTools iaData={iaDataMock} />);
        const summaryTitle = screen.getByText('Resumen de lectura');
        const glossaryTytle = screen.getByText('Glosario');

        expect(summaryTitle).toBeTruthy();
        expect(glossaryTytle).toBeTruthy();
    });
    it('should execute handleClose correctly', () => {
        const { container } = render(
            <IaTools iaData={iaDataMock} handleClose={handleClose} />
        );
        const buttonClose = container.querySelector('#closeButtonIA');
        fireEvent.click(buttonClose);
        expect(handleClose).toHaveBeenCalledTimes(1);
    });
    it('should render data glossary correctly', () => {
        const iaDataMockGlossary = [iaDataMock[1]];
        render(
            <IaTools iaData={iaDataMockGlossary} handleClose={handleClose} />
        );

        iaDataMockGlossary[0].data.forEach(({ key, value }) => {
            expect(screen.getByText(key)).toBeTruthy();
            expect(screen.getByText(value)).toBeTruthy();
        });
    });
    it('should render data summary correctly', () => {
        const iaDataMockSummary = [iaDataMock[0]];
        render(
            <IaTools iaData={iaDataMockSummary} handleClose={handleClose} />
        );

        iaDataMockSummary[0].data.forEach(item => {
            expect(screen.getByText(item)).toBeInTheDocument();
        });
    });
    it('should match snapshot', () => {
        const { container } = render(
            <IaTools iaData={iaDataMock} handleClose={handleClose} />
        );

        expect(container).toMatchSnapshot();
    });
});
