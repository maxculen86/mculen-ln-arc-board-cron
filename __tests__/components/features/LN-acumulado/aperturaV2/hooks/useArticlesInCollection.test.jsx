import React from 'react';
import { render, screen } from '@testing-library/react';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import useArticlesInCollection from '../../../../../../components/features/LN-acumulado/aperturaV2/hooks/useArticlesInCollection';

jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

const TestComponent = () => {
    const articles = useArticlesInCollection();

    return (
        <ul data-testid="articles-list">
            {articles.map(art => (
                <li key={art._id}>{art.headlines.basic}</li>
            ))}
        </ul>
    );
};

describe('Components - features - LN-acumulado - aperturaV2 - hooks - useArticlesInCollection', () => {
    const mockArticles = [
        {
            _id: '1',
            headlines: {
                basic: 'Jeffrey Dahmer: Netflix tomó una tajante decisión tras las críticas por un detalle de la exitosa serie'
            }
        },
        {
            _id: '2',
            headlines: {
                basic: 'Clima en ciudad de Buenos Aires hoy: cuál es el pronóstico del tiempo para el 24 de agosto'
            }
        }
    ];

    it('should render items when there is a collection Id', () => {
        useAppContext.mockReturnValue({
            globalContent: {
                acumuladoGeneral: {
                    id_collection_promo_items: 'FPKJS5YHQVFGVD46GOLY7A265U'
                }
            }
        });

        useContent.mockReturnValue(mockArticles);

        render(<TestComponent />);

        expect(
            screen.getByText(
                'Jeffrey Dahmer: Netflix tomó una tajante decisión tras las críticas por un detalle de la exitosa serie'
            )
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'Clima en ciudad de Buenos Aires hoy: cuál es el pronóstico del tiempo para el 24 de agosto'
            )
        ).toBeInTheDocument();
        expect(useContent).toHaveBeenCalledWith(
            expect.objectContaining({
                source: 'collectionsSource',
                query: expect.objectContaining({
                    id: 'FPKJS5YHQVFGVD46GOLY7A265U'
                })
            })
        );
    });

    it('should return empty array if there is no collection ID', () => {
        useAppContext.mockReturnValue({ globalContent: {} });
        useContent.mockReturnValue([]);

        render(<TestComponent />);

        expect(useContent).toHaveBeenCalledWith(
            expect.objectContaining({
                source: null,
                query: expect.objectContaining({ id: '' })
            })
        );
    });
});
