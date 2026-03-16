import { renderHook, act } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import useFilterManager from '../../../../../components/features/foodit-global/Queryly/hooks/useFilterManager';

global.fetch = jest.fn();
jest.spyOn(console, 'error').mockImplementation(() => {});
jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('fusion:environment', () => {
    return {
        SITE_FOODIT: 'https://foodit.lanacion.com.ar'
    };
});

describe('Tests - hooks - foodit-buscador - useFilterManager', () => {
    beforeEach(() => {
        useAppContext.mockReturnValue({
            requestUri: '/buscador/?query=pollo'
        });

        fetch.mockResolvedValue({
            ok: true,
            json: async () => ({
                faceted: [],
                items: [{ id: 1, title: 'Article 1' }],
                metadata: { total: 1 }
            })
        });
        fetch.mockClear();
    });

    it('should correctly initialize the state', async () => {
        const { result } = renderHook(() => useFilterManager());

        expect(result.current.data.loading).toBe(true);

        await waitFor(() => expect(result.current.data.loading).toBe(false));

        expect(result.current.data.articlesGrid).toEqual([
            { id: 1, title: 'Article 1' }
        ]);
        expect(result.current.appliedFilters).toEqual([]);
    });

    it('should apply a filter correctly', async () => {
        const { result } = renderHook(() => useFilterManager());

        act(() => {
            result.current.applyFilter({
                nameFilter: 'filter1',
                category: 'category1'
            });
        });

        expect(result.current.appliedFilters).toEqual([
            { group: 'category1', value: 'filter1' }
        ]);

        await waitFor(() => expect(result.current.data.loading).toBe(false));

        expect(result.current.data.articlesGrid).toEqual([
            { id: 1, title: 'Article 1' }
        ]);
    });

    it('should advance to the next page correctly', async () => {
        const { result } = renderHook(() => useFilterManager());

        act(() => {
            result.current.getNextPage();
        });

        await waitFor(() => expect(result.current.data.loading).toBe(false));

        expect(result.current.data.articlesGrid).toEqual([
            { id: 1, title: 'Article 1' }
        ]);
    });
});
