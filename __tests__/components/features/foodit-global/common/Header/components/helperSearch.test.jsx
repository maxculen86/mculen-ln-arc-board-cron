import { renderHook, act } from '@testing-library/react';
import { useListeningTimer } from '../../../../../../../components/features/foodit-global/common/Header/hooks/helperSearch'; // <-- ajustá la ruta

const flushPromises = () => act(() => Promise.resolve());

describe('useListeningTimer', () => {
    beforeEach(() => {
        jest.useFakeTimers();

        Object.defineProperty(global.navigator, 'permissions', {
            value: {
                query: jest.fn().mockResolvedValue({ state: 'granted' })
            },
            configurable: true
        });
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
        jest.resetAllMocks();
    });

    it('returns "00:00" when isListening is false', async () => {
        const { result } = renderHook(
            ({ listening }) => useListeningTimer(listening),
            {
                initialProps: { listening: false }
            }
        );

        expect(result.current).toBe('00:00');

        act(() => {
            jest.advanceTimersByTime(3000);
        });

        expect(result.current).toBe('00:00');
    });

    it('starts counting when isListening is true and permission is granted', async () => {
        const { result, rerender } = renderHook(
            ({ listening }) => useListeningTimer(listening),
            { initialProps: { listening: false } }
        );

        expect(result.current).toBe('00:00');

        rerender({ listening: true });

        await flushPromises();

        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(result.current).toBe('00:01');

        act(() => {
            jest.advanceTimersByTime(2000);
        });
        expect(result.current).toBe('00:03');
    });

    it('does NOT count when permission state is "prompt"', async () => {
        navigator.permissions.query.mockResolvedValueOnce({ state: 'prompt' });

        const { result, rerender } = renderHook(
            ({ listening }) => useListeningTimer(listening),
            { initialProps: { listening: false } }
        );

        rerender({ listening: true });

        await flushPromises();

        act(() => {
            jest.advanceTimersByTime(5000);
        });

        expect(result.current).toBe('00:00');
    });

    it('resets to "00:00" when listening turns false after counting', async () => {
        const { result, rerender } = renderHook(
            ({ listening }) => useListeningTimer(listening),
            { initialProps: { listening: true } }
        );

        await flushPromises();

        act(() => {
            jest.advanceTimersByTime(3000);
        });
        expect(result.current).toBe('00:03');

        rerender({ listening: false });

        expect(result.current).toBe('00:00');

        act(() => {
            jest.advanceTimersByTime(3000);
        });

        expect(result.current).toBe('00:00');
    });
});
