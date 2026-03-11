import { renderHook, act } from '@testing-library/react';
import usePagination from '../../../../../components/features/foodit-global/Queryly/hooks/useSearchPagination';
describe('Tests - hooks - foodit-buscador - usePagination', () => {
    it('should initialize pagination correctly', () => {
        const { result } = renderHook(() => usePagination(0, 24));
        expect(result.current.page).toBe(0);
    });

    it('should increment the page correctly', () => {
        const { result } = renderHook(() => usePagination(0, 24));
        act(() => {
            result.current.getNextPage();
        });
        expect(result.current.page).toBe(24);
    });

    it('it should reset the page correctly', () => {
        const { result } = renderHook(() => usePagination(24, 24));
        act(() => {
            result.current.resetPage();
        });
        expect(result.current.page).toBe(0);
    });
});
