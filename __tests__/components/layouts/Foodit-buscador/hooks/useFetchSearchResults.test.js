import { renderHook } from '@testing-library/react';
import { act, waitFor } from '@testing-library/react';
import useFetchSearchResults from '../../../../../components/layouts/Foodit-buscador/hooks/useFetchSearchResults';

global.fetch = jest.fn();
jest.spyOn(console, 'error').mockImplementation(() => {});

describe('Tests - hooks - foodit-buscador - useFetchSearchResults', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        fetch.mockClear();
    });

    fetch.mockResolvedValue({
        ok: true,
        json: async () => ({
            faceted: [],
            items: [{ id: 1, title: 'Article 1' }],
            metadata: { total: 1 }
        })
    });

    it('should get data correctly', async () => {
        const { result } = renderHook(() =>
            useFetchSearchResults({
                queryUrl: 'testQuery',
                filters: 'filters=test',
                page: 0
            })
        );

        // Comprueba que el estado inicial sea de carga
        expect(result.current.data.loading).toBe(true);

        // Espera que se actualicen los datos después de la consulta
        await waitFor(() => expect(result.current.data.loading).toBe(false));

        // Comprueba los datos obtenidos
        expect(result.current.data.articlesGrid).toEqual([
            { id: 1, title: 'Article 1' }
        ]);
        expect(result.current.data.listFilters).toEqual([
            { childrens: [], group: 'subtype', name: 'Tipo de contenido' },
            { childrens: [], group: 'diet', name: 'Dieta' },
            { childrens: [], group: 'salty', name: 'Saladas' },
            { childrens: [], group: 'sweets', name: 'Dulces' },
            { childrens: [], group: 'others', name: 'Otros' },
            {
                childrens: [],
                group: 'main_ingredients',
                name: 'Ingrediente principal'
            },
            { childrens: [], group: 'cookingtypes', name: 'Tipo de cocción' },
            { childrens: [], group: 'regions', name: 'Región' },
            { childrens: [], group: 'occasions', name: 'Ocasión' }
        ]);
        expect(result.current.data.total).toBe(1);
    });

    it('should handle errors in the request', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));

        const { result } = renderHook(() =>
            useFetchSearchResults({
                queryUrl: 'testQuery',
                filters: 'filters=test',
                page: 0
            })
        );

        expect(result.current.data.loading).toBe(true);

        await waitFor(() => expect(result.current.data.loading).toBe(false));

        expect(console.error).toHaveBeenCalledWith(
            'Error queryly: tracking keyword search:',
            expect.any(Error)
        );
    });
});
