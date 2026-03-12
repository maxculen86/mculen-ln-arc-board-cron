import { renderHook, act } from '@testing-library/react';
import useFilterState from '../../../../../components/features/foodit-global/Queryly/hooks/useFilter';

describe('Tests - hooks - foodit-buscador - useFilterState', () => {
    it('should initialize filters correctly', () => {
        const { result } = renderHook(() =>
            useFilterState({ category1: ['filter1'] })
        );
        expect(result.current.filters).toEqual({ category1: ['filter1'] });
    });

    it('should apply a filter correctly', () => {
        const { result } = renderHook(() => useFilterState());
        act(() => {
            result.current.applyFilter({
                nameFilter: 'filter1',
                category: 'category1'
            });
        });
        expect(result.current.filters).toEqual({ category1: ['filter1'] });
    });

    it('should remove a filter correctly', () => {
        const { result } = renderHook(() =>
            useFilterState({ category1: ['filter1', 'filter2'] })
        );
        act(() => {
            result.current.removeFilters({
                nameFilter: 'filter1',
                category: 'category1'
            });
        });
        expect(result.current.filters).toEqual({ category1: ['filter2'] });
    });

    it('should remove all filters if removeAll is true', () => {
        const { result } = renderHook(() =>
            useFilterState({ category1: ['filter1'], category2: ['filter2'] })
        );
        act(() => {
            result.current.removeFilters({ removeAll: true });
        });
        expect(result.current.filters).toEqual({});
    });
});
