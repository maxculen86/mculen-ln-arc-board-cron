import { renderHook, act } from '@testing-library/react';
import useSearchPagination from '../../../../../components/layouts/LN-Buscador/hooks/useSearchPagination';

jest.mock('fusion:environment', () => ({}));
jest.mock('fusion:context', () => ({}));

describe('useSearchPagination', () => {
    describe('initial state', () => {
        it('initializes page to 0 by default', () => {
            const { result } = renderHook(() => useSearchPagination());
            expect(result.current.page).toBe(0);
        });

        it('initializes page to custom initialPage value', () => {
            const { result } = renderHook(() => useSearchPagination(48));
            expect(result.current.page).toBe(48);
        });
    });

    describe('getNextPage', () => {
        it('increments page by 24 (default batchSize)', () => {
            const { result } = renderHook(() => useSearchPagination());
            act(() => {
                result.current.getNextPage();
            });
            expect(result.current.page).toBe(24);
        });

        it('increments page by custom batchSize', () => {
            const { result } = renderHook(() => useSearchPagination(0, 10));
            act(() => {
                result.current.getNextPage();
            });
            expect(result.current.page).toBe(10);
        });

        it('accumulates page correctly across multiple calls', () => {
            const { result } = renderHook(() => useSearchPagination());
            act(() => {
                result.current.getNextPage();
            });
            act(() => {
                result.current.getNextPage();
            });
            expect(result.current.page).toBe(48);
        });
    });

    describe('resetPage', () => {
        it('resets page to 0', () => {
            const { result } = renderHook(() => useSearchPagination());
            act(() => {
                result.current.getNextPage();
            });
            expect(result.current.page).toBe(24);

            act(() => {
                result.current.resetPage();
            });
            expect(result.current.page).toBe(0);
        });

        it('can reset after multiple increments', () => {
            const { result } = renderHook(() => useSearchPagination());
            act(() => {
                result.current.getNextPage();
                result.current.getNextPage();
                result.current.getNextPage();
            });
            act(() => {
                result.current.resetPage();
            });
            expect(result.current.page).toBe(0);
        });
    });

    describe('returned API', () => {
        it('exposes page, getNextPage, and resetPage', () => {
            const { result } = renderHook(() => useSearchPagination());
            expect(typeof result.current.page).toBe('number');
            expect(typeof result.current.getNextPage).toBe('function');
            expect(typeof result.current.resetPage).toBe('function');
        });
    });
});
