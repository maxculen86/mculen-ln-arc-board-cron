import { renderHook, act } from '@testing-library/react';
import useHeader from 'features/LN/common/header/hooks/useHeader';
import { getHeaderValidations } from 'features/LN/common/header/helpers';
import { HEADER_VARIANTS } from 'features/LN/common/header/constants';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('features/LN/common/header/helpers', () => ({
    getHeaderValidations: jest.fn()
}));

import { useAppContext } from 'fusion:context';

describe('Components - features - LN - common - header - hooks - useHeader', () => {
    let observeMock;
    let disconnectMock;
    let intersectionCallback;

    const defaultAppContext = {
        layout: 'HomeLN10',
        section: '',
        siteProperties: {
            layoutsName: {
                HomeLN10: 'HomeLN10',
                Video: 'Video',
                StoryTellingV2: 'StoryTellingV2'
            }
        }
    };

    beforeEach(() => {
        jest.clearAllMocks();

        observeMock = jest.fn();
        disconnectMock = jest.fn();

        global.IntersectionObserver = jest.fn((callback, options) => {
            intersectionCallback = callback;
            return {
                observe: observeMock,
                disconnect: disconnectMock
            };
        });

        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1440
        });

        useAppContext.mockReturnValue(defaultAppContext);

        getHeaderValidations.mockReturnValue({
            shouldBePositionDefault: false,
            shouldBeDarkTheme: false
        });
    });

    describe('initial state', () => {
        it('returns position, theme and animation', () => {
            const { result } = renderHook(() => useHeader());

            expect(result.current).toHaveProperty('position');
            expect(result.current).toHaveProperty('theme');
            expect(result.current).toHaveProperty('animation');
        });

        it('returns STICKY position when shouldBePositionDefault is false', () => {
            getHeaderValidations.mockReturnValue({
                shouldBePositionDefault: false,
                shouldBeDarkTheme: false
            });

            const { result } = renderHook(() => useHeader());

            expect(result.current.position).toBe(
                HEADER_VARIANTS.POSITION.STICKY
            );
        });

        it('returns DEFAULT position when shouldBePositionDefault is true', () => {
            getHeaderValidations.mockReturnValue({
                shouldBePositionDefault: true,
                shouldBeDarkTheme: false
            });

            const { result } = renderHook(() => useHeader());

            expect(result.current.position).toBe(
                HEADER_VARIANTS.POSITION.DEFAULT
            );
        });

        it('returns LIGHT theme when shouldBeDarkTheme is false', () => {
            getHeaderValidations.mockReturnValue({
                shouldBePositionDefault: false,
                shouldBeDarkTheme: false
            });

            const { result } = renderHook(() => useHeader());

            expect(result.current.theme).toBe(HEADER_VARIANTS.THEME.LIGHT);
        });

        it('returns DARK theme when shouldBeDarkTheme is true', () => {
            getHeaderValidations.mockReturnValue({
                shouldBePositionDefault: false,
                shouldBeDarkTheme: true
            });

            const { result } = renderHook(() => useHeader());

            expect(result.current.theme).toBe(HEADER_VARIANTS.THEME.DARK);
        });

        it('animation is undefined when position is not sticky after default', () => {
            getHeaderValidations.mockReturnValue({
                shouldBePositionDefault: false,
                shouldBeDarkTheme: false
            });

            const { result } = renderHook(() => useHeader());

            expect(result.current.animation).toBeUndefined();
        });
    });

    describe('getHeaderValidations call', () => {
        it('calls getHeaderValidations with layout, section and layoutsName', () => {
            useAppContext.mockReturnValue({
                layout: 'HomeLN10',
                section: 'sports',
                siteProperties: {
                    layoutsName: { HomeLN10: 'HomeLN10' }
                }
            });

            renderHook(() => useHeader());

            expect(getHeaderValidations).toHaveBeenCalledWith({
                layout: 'HomeLN10',
                section: 'sports',
                layoutsName: { HomeLN10: 'HomeLN10' }
            });
        });

        it('uses empty object as layoutsName fallback when siteProperties is undefined', () => {
            useAppContext.mockReturnValue({
                layout: 'HomeLN10',
                section: '',
                siteProperties: undefined
            });

            renderHook(() => useHeader());

            expect(getHeaderValidations).toHaveBeenCalledWith({
                layout: 'HomeLN10',
                section: '',
                layoutsName: {}
            });
        });
    });

    describe('IntersectionObserver', () => {
        it('does not create observer when both flags are false', () => {
            getHeaderValidations.mockReturnValue({
                shouldBePositionDefault: false,
                shouldBeDarkTheme: false
            });

            renderHook(() => useHeader());

            expect(global.IntersectionObserver).not.toHaveBeenCalled();
        });

        it('does not create observer on mobile (innerWidth < 1279)', () => {
            window.innerWidth = 768;

            getHeaderValidations.mockReturnValue({
                shouldBePositionDefault: true,
                shouldBeDarkTheme: false
            });

            const sentinelEl = document.createElement('div');
            jest.spyOn(document, 'querySelector').mockReturnValue(sentinelEl);

            renderHook(() => useHeader());

            expect(global.IntersectionObserver).not.toHaveBeenCalled();
        });

        it('does not create observer when sentinel element is not found', () => {
            getHeaderValidations.mockReturnValue({
                shouldBePositionDefault: true,
                shouldBeDarkTheme: false
            });

            jest.spyOn(document, 'querySelector').mockReturnValue(null);

            renderHook(() => useHeader());

            expect(global.IntersectionObserver).not.toHaveBeenCalled();
        });

        it('creates observer and observes sentinel when conditions are met', () => {
            getHeaderValidations.mockReturnValue({
                shouldBePositionDefault: true,
                shouldBeDarkTheme: false
            });

            const sentinelEl = document.createElement('div');
            jest.spyOn(document, 'querySelector').mockReturnValue(sentinelEl);

            renderHook(() => useHeader());

            expect(document.querySelector).toHaveBeenCalledWith(
                '.header-sentinel'
            );
            expect(global.IntersectionObserver).toHaveBeenCalledWith(
                expect.any(Function),
                { threshold: 0, rootMargin: '0px' }
            );
            expect(observeMock).toHaveBeenCalledWith(sentinelEl);
        });

        it('disconnects observer on cleanup', () => {
            getHeaderValidations.mockReturnValue({
                shouldBePositionDefault: true,
                shouldBeDarkTheme: false
            });

            const sentinelEl = document.createElement('div');
            jest.spyOn(document, 'querySelector').mockReturnValue(sentinelEl);

            const { unmount } = renderHook(() => useHeader());

            unmount();

            expect(disconnectMock).toHaveBeenCalled();
        });
    });

    describe('handleSentinelIntersection', () => {
        beforeEach(() => {
            const sentinelEl = document.createElement('div');
            jest.spyOn(document, 'querySelector').mockReturnValue(sentinelEl);
        });

        it('sets position to STICKY when sentinel leaves viewport (positionDefault)', () => {
            getHeaderValidations.mockReturnValue({
                shouldBePositionDefault: true,
                shouldBeDarkTheme: false
            });

            const { result } = renderHook(() => useHeader());

            act(() => {
                intersectionCallback([{ isIntersecting: false }]);
            });

            expect(result.current.position).toBe(
                HEADER_VARIANTS.POSITION.STICKY
            );
        });

        it('sets position to DEFAULT when sentinel enters viewport (positionDefault)', () => {
            getHeaderValidations.mockReturnValue({
                shouldBePositionDefault: true,
                shouldBeDarkTheme: false
            });

            const { result } = renderHook(() => useHeader());

            act(() => {
                intersectionCallback([{ isIntersecting: true }]);
            });

            expect(result.current.position).toBe(
                HEADER_VARIANTS.POSITION.DEFAULT
            );
        });

        it('sets theme to DARK when sentinel is intersecting and darkTheme is enabled', () => {
            getHeaderValidations.mockReturnValue({
                shouldBePositionDefault: false,
                shouldBeDarkTheme: true
            });

            const { result } = renderHook(() => useHeader());

            act(() => {
                intersectionCallback([{ isIntersecting: true }]);
            });

            expect(result.current.theme).toBe(HEADER_VARIANTS.THEME.DARK);
        });

        it('sets theme to LIGHT when sentinel leaves viewport and darkTheme is enabled', () => {
            getHeaderValidations.mockReturnValue({
                shouldBePositionDefault: false,
                shouldBeDarkTheme: true
            });

            const { result } = renderHook(() => useHeader());

            act(() => {
                intersectionCallback([{ isIntersecting: false }]);
            });

            expect(result.current.theme).toBe(HEADER_VARIANTS.THEME.LIGHT);
        });

        it('does not update position when positionDefault is false', () => {
            getHeaderValidations.mockReturnValue({
                shouldBePositionDefault: false,
                shouldBeDarkTheme: true
            });

            const { result } = renderHook(() => useHeader());

            act(() => {
                intersectionCallback([{ isIntersecting: false }]);
            });

            // position stays STICKY (initial), only theme changes
            expect(result.current.position).toBe(
                HEADER_VARIANTS.POSITION.STICKY
            );
        });
    });

    describe('isSentinelInView', () => {
        it('is true on the initial state', () => {
            const { result } = renderHook(() => useHeader());

            expect(result.current.isSentinelInView).toBe(true);
        });

        it('becomes false when the sentinel leaves the viewport', () => {
            getHeaderValidations.mockReturnValue({
                shouldBePositionDefault: true,
                shouldBeDarkTheme: false
            });

            const sentinelEl = document.createElement('div');
            jest.spyOn(document, 'querySelector').mockReturnValue(sentinelEl);

            const { result } = renderHook(() => useHeader());

            act(() => {
                intersectionCallback([{ isIntersecting: false }]);
            });

            expect(result.current.isSentinelInView).toBe(false);
        });

        it('becomes true again when the sentinel re-enters the viewport', () => {
            getHeaderValidations.mockReturnValue({
                shouldBePositionDefault: true,
                shouldBeDarkTheme: false
            });

            const sentinelEl = document.createElement('div');
            jest.spyOn(document, 'querySelector').mockReturnValue(sentinelEl);

            const { result } = renderHook(() => useHeader());

            act(() => {
                intersectionCallback([{ isIntersecting: false }]);
            });
            act(() => {
                intersectionCallback([{ isIntersecting: true }]);
            });

            expect(result.current.isSentinelInView).toBe(true);
        });
    });

    describe('animation', () => {
        it('returns ANIMATION_IN when shouldBePositionDefault and position is STICKY', () => {
            getHeaderValidations.mockReturnValue({
                shouldBePositionDefault: true,
                shouldBeDarkTheme: false
            });

            const sentinelEl = document.createElement('div');
            jest.spyOn(document, 'querySelector').mockReturnValue(sentinelEl);

            const { result } = renderHook(() => useHeader());

            // Trigger scroll out of viewport to set position to STICKY
            act(() => {
                intersectionCallback([{ isIntersecting: false }]);
            });

            expect(result.current.animation).toBe(HEADER_VARIANTS.ANIMATION_IN);
        });

        it('returns undefined when position is DEFAULT', () => {
            getHeaderValidations.mockReturnValue({
                shouldBePositionDefault: true,
                shouldBeDarkTheme: false
            });

            const sentinelEl = document.createElement('div');
            jest.spyOn(document, 'querySelector').mockReturnValue(sentinelEl);

            const { result } = renderHook(() => useHeader());

            act(() => {
                intersectionCallback([{ isIntersecting: true }]);
            });

            expect(result.current.animation).toBeUndefined();
        });
    });
});
