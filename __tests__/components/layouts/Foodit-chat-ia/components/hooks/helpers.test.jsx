import { act, renderHook } from '@testing-library/react';
import { useViewportDirection } from '../../../../../../components/layouts/Foodit-chat-ia/_children/hooks/helpers';

const IO = { instances: [] };

const renderViewportDirection = () => {
    const ref = { current: document.createElement('div') };
    return renderHook(() => useViewportDirection(ref, {}));
};

const emitEntry = entry => {
    act(() => {
        IO.instances[0].cb([entry]);
    });
};

describe('useViewportDirection', () => {
    beforeEach(() => {
        jest.clearAllMocks();
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

    describe('initial state', () => {
        it('should return "in" when no entry was observed yet', () => {
            const { result } = renderViewportDirection();

            expect(result.current).toBe('in');
        });
    });

    describe('when the element intersects the viewport', () => {
        it('should return "in"', () => {
            const { result } = renderViewportDirection();

            emitEntry({ isIntersecting: true });

            expect(result.current).toBe('in');
        });
    });

    describe('when the element is outside the viewport', () => {
        it('should return "above" when the element is past the top edge', () => {
            const { result } = renderViewportDirection();

            emitEntry({
                isIntersecting: false,
                rootBounds: { top: 100, bottom: 500 },
                boundingClientRect: { bottom: 50, top: 0 }
            });

            expect(result.current).toBe('above');
        });

        it('should return "below" when the element is past the bottom edge', () => {
            const { result } = renderViewportDirection();

            emitEntry({
                isIntersecting: false,
                rootBounds: { top: 0, bottom: 500 },
                boundingClientRect: { top: 600, bottom: 650 }
            });

            expect(result.current).toBe('below');
        });
    });

    describe('cleanup', () => {
        it('should disconnect the observer when the hook unmounts', () => {
            const { unmount } = renderViewportDirection();
            const inst = IO.instances[0];

            unmount();

            expect(inst.disconnect).toHaveBeenCalledTimes(1);
        });
    });

    describe('when IntersectionObserver is unavailable', () => {
        it('should fall back to "in" instead of throwing', () => {
            global.IntersectionObserver = undefined;

            const { result } = renderViewportDirection();

            expect(result.current).toBe('in');
        });
    });
});
