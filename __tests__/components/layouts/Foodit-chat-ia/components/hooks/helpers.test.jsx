import { act, renderHook } from '@testing-library/react';
import { useViewportDirection } from '../../../../../../components/layouts/Foodit-chat-ia/_children/hooks/helpers';

const IO = { instances: [] };

describe('useViewportDirection)', () => {
    beforeEach(() => {
        IO.instances = [];

        global.IntersectionObserver = jest.fn(cb => {
            const inst = {
                cb,
                observe: jest.fn(),
                disconnect: jest.fn()
            };
            IO.instances.push(inst);
            return inst;
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('default "in"', () => {
        const ref = { current: document.createElement('div') };
        const { result } = renderHook(() => useViewportDirection(ref, {}));
        expect(result.current).toBe('in');
    });

    it('if isIntersecting => "in"', () => {
        const ref = { current: document.createElement('div') };
        const { result } = renderHook(() => useViewportDirection(ref, {}));

        act(() => {
            IO.instances[0].cb([{ isIntersecting: true }]);
        });

        expect(result.current).toBe('in');
    });

    it('if not intersecting and above', () => {
        const ref = { current: document.createElement('div') };
        const { result } = renderHook(() => useViewportDirection(ref, {}));

        act(() => {
            IO.instances[0].cb([
                {
                    isIntersecting: false,
                    rootBounds: { top: 100, bottom: 500 },
                    boundingClientRect: { bottom: 50, top: 0 }
                }
            ]);
        });

        expect(result.current).toBe('above');
    });

    it('if not intersecting and below', () => {
        const ref = { current: document.createElement('div') };
        const { result } = renderHook(() => useViewportDirection(ref, {}));

        act(() => {
            IO.instances[0].cb([
                {
                    isIntersecting: false,
                    rootBounds: { top: 0, bottom: 500 },
                    boundingClientRect: { top: 600, bottom: 650 }
                }
            ]);
        });

        expect(result.current).toBe('below');
    });

    it('cleanup: disconnect on unmount', () => {
        const ref = { current: document.createElement('div') };
        const { unmount } = renderHook(() => useViewportDirection(ref, {}));

        const inst = IO.instances[0];
        unmount();

        expect(inst.disconnect).toHaveBeenCalledTimes(1);
    });

    it('if IntersectionObserver does not exist return "in"', () => {
        global.IntersectionObserver = undefined;

        const ref = { current: document.createElement('div') };
        const { result } = renderHook(() => useViewportDirection(ref, {}));

        expect(result.current).toBe('in');
    });
});
