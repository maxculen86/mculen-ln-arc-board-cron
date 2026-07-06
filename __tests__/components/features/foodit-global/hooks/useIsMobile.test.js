import { renderHook, act } from '@testing-library/react';
import useIsMobile from '../../../../../components/features/foodit-global/hooks/useIsMobile';
import isSSR from '../../../../../components/private/LN/common/utils/isSSR';

jest.mock('../../../../../components/private/LN/common/utils/isSSR', () =>
    jest.fn(() => false)
);

function mockMatchMedia(matches) {
    const listeners = new Set();
    const mql = {
        matches,
        addEventListener: jest.fn((_, cb) => listeners.add(cb)),
        removeEventListener: jest.fn((_, cb) => listeners.delete(cb)),
        _emit: next => {
            mql.matches = next;
            listeners.forEach(cb => cb({ matches: next }));
        }
    };
    window.matchMedia = jest.fn().mockReturnValue(mql);
    return mql;
}

describe('useIsMobile', () => {
    afterEach(() => {
        jest.clearAllMocks();
        isSSR.mockReturnValue(false);
    });

    it('returns false when matchMedia does not match (desktop)', () => {
        mockMatchMedia(false);
        const { result } = renderHook(() => useIsMobile());
        expect(result.current).toBe(false);
    });

    it('returns true when matchMedia matches (mobile)', () => {
        mockMatchMedia(true);
        const { result } = renderHook(() => useIsMobile());
        expect(result.current).toBe(true);
    });

    it('updates from desktop to mobile on resize', () => {
        const mql = mockMatchMedia(false);
        const { result } = renderHook(() => useIsMobile());
        expect(result.current).toBe(false);

        act(() => {
            mql._emit(true);
        });

        expect(result.current).toBe(true);
    });

    it('updates from mobile to desktop on resize', () => {
        const mql = mockMatchMedia(true);
        const { result } = renderHook(() => useIsMobile());
        expect(result.current).toBe(true);

        act(() => {
            mql._emit(false);
        });

        expect(result.current).toBe(false);
    });

    it('does not attach event listener in SSR', () => {
        isSSR.mockReturnValue(true);
        const mql = mockMatchMedia(false);

        renderHook(() => useIsMobile());

        expect(mql.addEventListener).not.toHaveBeenCalled();
    });

    it('removes event listener on unmount', () => {
        const mql = mockMatchMedia(false);
        const { unmount } = renderHook(() => useIsMobile());

        unmount();

        expect(mql.removeEventListener).toHaveBeenCalled();
    });

    it('passes custom query to matchMedia', () => {
        mockMatchMedia(true);
        const customQuery = '(max-width: 1023px)';
        renderHook(() => useIsMobile(customQuery));

        expect(window.matchMedia).toHaveBeenCalledWith(customQuery);
    });
});
