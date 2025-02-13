import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IaTools from '../../../../../../components/features/LN-10/IA/common/iaTools';
import useIaVisibility from '../../../../../../components/features/LN-10/IA/hooks/useIaVisibility';
import { useAppContext } from 'fusion:context';

const observe = jest.fn();
const unobserve = jest.fn();
jest.mock(
    '../../../../../../components/features/LN-10/IA/hooks/useIaVisibility',
    () => ({
        __esModule: true,
        default: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/features/LN-10/IA/common/iaTab',
    () => 'mock-ia-tab'
);

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve
}));
Element.prototype.scrollIntoView = jest.fn();

const handleClose = jest.fn();
const callback = jest.fn();

describe('IaTools component', () => {
    useIaVisibility.mockReturnValue({
        isOpen: true,
        handleClose
    });
    useAppContext.mockReturnValue({ layout: 'LN-nota-noticia' });

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
    it('should return empty element when isOpen is false', () => {
        useIaVisibility.mockReturnValueOnce({
            isOpen: false,
            handleClose
        });
        const { container } = render(<IaTools iaData={iaDataMock} />);
        expect(container.firstChild).toBeNull();
    });

    it('should render null when iaData is empty', () => {
        const { container } = render(<IaTools iaData={[]} />);
        expect(container.firstChild).toBeNull();
    });

    it('should execute handleClose correctly', () => {
        const { container } = render(<IaTools iaData={iaDataMock} />);
        const buttonClose = container.querySelector('#closeButtonIA');
        fireEvent.click(buttonClose);
        expect(handleClose).toHaveBeenCalledTimes(1);
    });
    it('should render data glossary correctly', () => {
        const iaDataMockGlossary = [iaDataMock[1]];
        render(<IaTools iaData={iaDataMockGlossary} />);

        iaDataMockGlossary[0].data.forEach(({ key, value }) => {
            expect(screen.getByText('BBC')).toBeTruthy();
            expect(screen.getByText('EBay')).toBeTruthy();
            expect(screen.getByText('Museo Británico')).toBeTruthy();
            expect(screen.getByText('PayPal')).toBeTruthy();
            expect(screen.getByText('Test Sa')).toBeTruthy();
            expect(screen.getByText(value)).toBeTruthy();
        });
    });
    it('should render data summary correctly', () => {
        const iaDataMockSummary = [iaDataMock[0]];
        render(<IaTools iaData={iaDataMockSummary} />);

        iaDataMockSummary[0].data.forEach(item => {
            expect(screen.getByText(item)).toBeInTheDocument();
        });
    });
    it('should render wrapper container with classname .container-center-100 when layout is "LN-nota-foto-al-100"', () => {
        useAppContext.mockReturnValueOnce({ layout: 'LN-nota-foto-al-100' });
        const iaDataMockSummary = [iaDataMock[0]];
        const { container } = render(<IaTools iaData={iaDataMockSummary} />);
        const containerCenter100 = container.querySelector(
            '.container-center-100'
        );
        expect(containerCenter100).toBeTruthy();
    });
    it('should match snapshot', () => {
        const { container } = render(<IaTools iaData={iaDataMock} />);

        expect(container).toMatchSnapshot();
    });
});
