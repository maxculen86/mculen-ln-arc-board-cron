import { act, renderHook } from '@testing-library/react';
import {
    useShowFuentesAfterMutation,
    useViewportDirection
} from '../../../../../../components/layouts/Foodit-chat-ia/_children/hooks/helpers';

const IO = { instances: [] };

class MockMutationObserver {
    static instances = [];
    constructor(cb) {
        this.cb = cb;
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        MockMutationObserver.instances.push(this);
    }
    trigger() {
        this.cb([], this);
    }
}

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

describe('useShowFuentesAfterMutation', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        global.MutationObserver = MockMutationObserver;
        MockMutationObserver.instances = [];
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
        jest.clearAllMocks();
    });

    it('if not isLastOutput => true', () => {
        const ref = { current: document.createElement('div') };

        const { result } = renderHook(() =>
            useShowFuentesAfterMutation({
                ref,
                isGenerating: false,
                descripcion: 'x',
                isLastOutput: false
            })
        );

        expect(result.current).toBe(true);
    });

    it('if isLastOutput and isGenerating=true => false', () => {
        const ref = { current: document.createElement('div') };

        const { result } = renderHook(() =>
            useShowFuentesAfterMutation({
                ref,
                isGenerating: true,
                descripcion: 'x',
                isLastOutput: true
            })
        );

        expect(result.current).toBe(false);
    });

    it('if isLastOutput and not generating: with mutation => true after delayMs', () => {
        const ref = { current: document.createElement('div') };

        const { result } = renderHook(() =>
            useShowFuentesAfterMutation({
                ref,
                isGenerating: false,
                descripcion: 'x',
                isLastOutput: true,
                delayMs: 150
            })
        );

        expect(result.current).toBe(false);
        expect(MockMutationObserver.instances).toHaveLength(1);

        act(() => {
            MockMutationObserver.instances[0].trigger();
        });

        act(() => {
            jest.advanceTimersByTime(149);
        });
        expect(result.current).toBe(false);

        act(() => {
            jest.advanceTimersByTime(1);
        });
        expect(result.current).toBe(true);
    });

    it('multiply mutation respects the last one', () => {
        const ref = { current: document.createElement('div') };

        const { result } = renderHook(() =>
            useShowFuentesAfterMutation({
                ref,
                isGenerating: false,
                descripcion: 'x',
                isLastOutput: true,
                delayMs: 100
            })
        );

        act(() => {
            const obs = MockMutationObserver.instances[0];
            obs.trigger();
            jest.advanceTimersByTime(50);
            obs.trigger();
            jest.advanceTimersByTime(50);
        });

        expect(result.current).toBe(false);

        act(() => {
            jest.advanceTimersByTime(50);
        });
        expect(result.current).toBe(true);
    });
});
