import { renderHook, act } from '@testing-library/react';
import {
    useObserverItems,
    useHandleBack,
    useHandleNext
} from '../../../../../components/chains/foodit_Carousel_Videos/hooks';

describe('foodit_Carousel_Videos hooks', () => {
    describe('useObserverItems', () => {
        let mockObserve;
        let mockDisconnect;
        let observerCallback;

        beforeEach(() => {
            mockObserve = jest.fn();
            mockDisconnect = jest.fn();

            global.IntersectionObserver = jest.fn(callback => {
                observerCallback = callback;
                return { observe: mockObserve, disconnect: mockDisconnect };
            });
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should update currentIndex when video scrolls into view', () => {
            const mockNode = document.createElement('div');
            mockNode.setAttribute('data-scroller-index', '2');
            const containerRef = { current: { childNodes: [mockNode] } };
            const setCurrentIndex = jest.fn();

            renderHook(() =>
                useObserverItems({ containerRef, setCurrentIndex })
            );

            act(() => {
                observerCallback([{ isIntersecting: true, target: mockNode }]);
            });

            expect(setCurrentIndex).toHaveBeenCalledWith(2);
        });

        it('should not update currentIndex when video scrolls out of view', () => {
            const mockNode = document.createElement('div');
            mockNode.setAttribute('data-scroller-index', '2');
            const containerRef = { current: { childNodes: [mockNode] } };
            const setCurrentIndex = jest.fn();

            renderHook(() =>
                useObserverItems({ containerRef, setCurrentIndex })
            );

            act(() => {
                observerCallback([{ isIntersecting: false, target: mockNode }]);
            });

            expect(setCurrentIndex).not.toHaveBeenCalled();
        });
    });

    describe('useHandleBack', () => {
        it('should scroll horizontally on desktop', () => {
            const mockScrollBy = jest.fn();
            const containerRef = {
                current: {
                    scrollBy: mockScrollBy,
                    offsetWidth: 800,
                    offsetHeight: 600
                }
            };

            const { result } = renderHook(() =>
                useHandleBack({ containerRef, showBack: true, isMobile: false })
            );

            result.current();

            expect(mockScrollBy).toHaveBeenCalledWith({
                left: -800,
                behavior: 'smooth'
            });
        });

        it('should scroll vertically on mobile', () => {
            const mockScrollBy = jest.fn();
            const containerRef = {
                current: {
                    scrollBy: mockScrollBy,
                    offsetWidth: 400,
                    offsetHeight: 800
                }
            };

            const { result } = renderHook(() =>
                useHandleBack({ containerRef, showBack: false, isMobile: true })
            );

            result.current();

            expect(mockScrollBy).toHaveBeenCalledWith({
                top: -800,
                behavior: 'smooth'
            });
        });
    });

    describe('useHandleNext', () => {
        it('should scroll horizontally on desktop', () => {
            const mockScrollBy = jest.fn();
            const containerRef = {
                current: {
                    scrollBy: mockScrollBy,
                    offsetWidth: 800,
                    offsetHeight: 600
                }
            };

            const { result } = renderHook(() =>
                useHandleNext({ containerRef, showNext: true, isMobile: false })
            );

            result.current();

            expect(mockScrollBy).toHaveBeenCalledWith({
                left: 800,
                behavior: 'smooth'
            });
        });

        it('should scroll vertically on mobile', () => {
            const mockScrollBy = jest.fn();
            const containerRef = {
                current: {
                    scrollBy: mockScrollBy,
                    offsetWidth: 400,
                    offsetHeight: 800
                }
            };

            const { result } = renderHook(() =>
                useHandleNext({ containerRef, showNext: false, isMobile: true })
            );

            result.current();

            expect(mockScrollBy).toHaveBeenCalledWith({
                top: 800,
                behavior: 'smooth'
            });
        });
    });
});
