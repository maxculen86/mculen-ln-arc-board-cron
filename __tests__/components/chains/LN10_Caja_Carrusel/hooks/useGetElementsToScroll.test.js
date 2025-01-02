import { renderHook, act } from '@testing-library/react';
import useGetElementsToScroll from '../../../../../components/chains/LN10_Caja_Carrusel/hooks/useGetElementsToScroll';

describe('useGetElementsToScroll', () => {
    let addEventListenerSpy;
    let removeEventListenerSpy;

    beforeEach(() => {
        addEventListenerSpy = jest.spyOn(window, 'addEventListener');
        removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    });

    afterEach(() => {
        addEventListenerSpy.mockRestore();
        removeEventListenerSpy.mockRestore();
    });

    test('should initialize with correct default values', () => {
        const { result } = renderHook(() => useGetElementsToScroll());
        expect(result.current.elementsToScroll).toBe(0);
        expect(result.current.itemCarouselWidth).toBe(280);
        expect(result.current.containerRef.current).toBe(null);
    });

    test('should update visible items on resize', () => {
        const { result } = renderHook(() => useGetElementsToScroll());

        act(() => {
            result.current.containerRef.current = { offsetWidth: 560 };
            window.dispatchEvent(new Event('resize'));
        });

        expect(result.current.elementsToScroll).toBe(2);
    });

    test('should add and remove event listeners on mount and unmount', () => {
        const { unmount } = renderHook(() => useGetElementsToScroll());

        expect(addEventListenerSpy).toHaveBeenCalledWith(
            'resize',
            expect.any(Function)
        );

        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'resize',
            expect.any(Function)
        );
    });
});
