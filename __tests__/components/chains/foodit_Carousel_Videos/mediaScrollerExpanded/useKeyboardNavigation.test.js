import { renderHook } from '@testing-library/react';
import { useKeyboardNavigation } from '../../../../../components/chains/foodit_Carousel_Videos/hooks/useKeyboardNavigation';

function createWrapperWithFocus() {
    const wrapper = document.createElement('div');
    const focusable = document.createElement('button');
    wrapper.appendChild(focusable);
    document.body.appendChild(wrapper);
    focusable.focus();
    return { wrapperRef: { current: wrapper }, focusable, wrapper };
}

function createContainerRef({ scrollWidth = 1000, scrollHeight = 2000 } = {}) {
    return {
        current: {
            scrollWidth,
            scrollHeight,
            scrollTo: jest.fn()
        }
    };
}

function dispatchKey(key) {
    document.dispatchEvent(
        new KeyboardEvent('keydown', { key, cancelable: true })
    );
}

function renderNavigation(overrides = {}) {
    const handleBack = jest.fn();
    const handleNext = jest.fn();
    const { wrapperRef } = createWrapperWithFocus();
    const containerRef = createContainerRef();

    const props = {
        wrapperRef,
        containerRef,
        currentIndex: 1,
        isMobile: false,
        itemCount: 5,
        handleBack,
        handleNext,
        ...overrides
    };

    const view = renderHook(
        currentProps => useKeyboardNavigation(currentProps),
        {
            initialProps: props
        }
    );

    return { ...view, props, handleBack, handleNext, wrapperRef, containerRef };
}

describe('useKeyboardNavigation', () => {
    afterEach(() => {
        document.body.innerHTML = '';
        jest.clearAllMocks();
    });

    describe('registro del listener', () => {
        it('agrega el listener de keydown al montar y lo remueve al desmontar', () => {
            const addSpy = jest.spyOn(document, 'addEventListener');
            const removeSpy = jest.spyOn(document, 'removeEventListener');

            const { unmount } = renderNavigation();

            expect(addSpy).toHaveBeenCalledWith(
                'keydown',
                expect.any(Function)
            );

            unmount();

            expect(removeSpy).toHaveBeenCalledWith(
                'keydown',
                expect.any(Function)
            );

            addSpy.mockRestore();
            removeSpy.mockRestore();
        });
    });

    describe('guard de foco', () => {
        it('ignora la tecla si el wrapper no contiene al activeElement', () => {
            const { handleBack, handleNext, wrapperRef } = renderNavigation();

            wrapperRef.current.querySelector('button').blur();
            document.body.focus();

            dispatchKey('ArrowLeft');

            expect(handleBack).not.toHaveBeenCalled();
            expect(handleNext).not.toHaveBeenCalled();
        });

        it('no hace nada si wrapperRef.current es null', () => {
            const { handleBack } = renderNavigation({
                wrapperRef: { current: null }
            });

            dispatchKey('ArrowLeft');

            expect(handleBack).not.toHaveBeenCalled();
        });
    });

    describe('desktop', () => {
        it('ArrowLeft calls handleBack when is not the first item', () => {
            const { handleBack } = renderNavigation({ currentIndex: 1 });

            dispatchKey('ArrowLeft');

            expect(handleBack).toHaveBeenCalledTimes(1);
        });

        it('ArrowLeft does not call handleBack when it is the first item (index 0)', () => {
            const { handleBack } = renderNavigation({ currentIndex: 0 });

            dispatchKey('ArrowLeft');

            expect(handleBack).not.toHaveBeenCalled();
        });

        it('ArrowRight calls handleNext when it is not the last item', () => {
            const { handleNext } = renderNavigation({
                currentIndex: 1,
                itemCount: 5
            });

            dispatchKey('ArrowRight');

            expect(handleNext).toHaveBeenCalledTimes(1);
        });

        it('ArrowRight does not call handleNext when it is the last item', () => {
            const { handleNext } = renderNavigation({
                currentIndex: 4,
                itemCount: 5
            });

            dispatchKey('ArrowRight');

            expect(handleNext).not.toHaveBeenCalled();
        });

        it('calls preventDefault when the key is handled', () => {
            renderNavigation({ currentIndex: 1 });

            const event = new KeyboardEvent('keydown', {
                key: 'ArrowLeft',
                cancelable: true
            });
            const preventSpy = jest.spyOn(event, 'preventDefault');

            document.dispatchEvent(event);

            expect(preventSpy).toHaveBeenCalled();
        });

        it('does not call preventDefault when the action does not proceed (first item)', () => {
            renderNavigation({ currentIndex: 0 });

            const event = new KeyboardEvent('keydown', {
                key: 'ArrowLeft',
                cancelable: true
            });
            const preventSpy = jest.spyOn(event, 'preventDefault');

            document.dispatchEvent(event);

            expect(preventSpy).not.toHaveBeenCalled();
        });
    });

    describe('mobile', () => {
        it('ArrowUp calls handleBack only in mobile view', () => {
            const { handleBack } = renderNavigation({
                isMobile: true,
                currentIndex: 2
            });

            dispatchKey('ArrowUp');

            expect(handleBack).toHaveBeenCalledTimes(1);
        });

        it('ArrowUp does nothing in desktop view', () => {
            const { handleBack } = renderNavigation({
                isMobile: false,
                currentIndex: 2
            });

            dispatchKey('ArrowUp');

            expect(handleBack).not.toHaveBeenCalled();
        });

        it('ArrowDown calls handleNext only in mobile view and if it is not the last item', () => {
            const { handleNext } = renderNavigation({
                isMobile: true,
                currentIndex: 1,
                itemCount: 5
            });

            dispatchKey('ArrowDown');

            expect(handleNext).toHaveBeenCalledTimes(1);
        });

        it('ArrowDown does nothing in desktop view', () => {
            const { handleNext } = renderNavigation({
                isMobile: false,
                currentIndex: 1
            });

            dispatchKey('ArrowDown');

            expect(handleNext).not.toHaveBeenCalled();
        });
    });

    describe('scroll to extremes (Home / End)', () => {
        it('Home scrolls to the start on the horizontal axis (desktop)', () => {
            const { containerRef } = renderNavigation({ isMobile: false });

            dispatchKey('Home');

            expect(containerRef.current.scrollTo).toHaveBeenCalledWith({
                left: 0,
                behavior: 'smooth'
            });
        });

        it('End scrolls to the end using scrollWidth on desktop', () => {
            const { containerRef } = renderNavigation({ isMobile: false });

            dispatchKey('End');

            expect(containerRef.current.scrollTo).toHaveBeenCalledWith({
                left: containerRef.current.scrollWidth,
                behavior: 'smooth'
            });
        });

        it('Home scrolls to the start on the vertical axis (mobile)', () => {
            const { containerRef } = renderNavigation({ isMobile: true });

            dispatchKey('Home');

            expect(containerRef.current.scrollTo).toHaveBeenCalledWith({
                top: 0,
                behavior: 'smooth'
            });
        });

        it('End scrolls to the end using scrollHeight on mobile', () => {
            const { containerRef } = renderNavigation({ isMobile: true });

            dispatchKey('End');

            expect(containerRef.current.scrollTo).toHaveBeenCalledWith({
                top: containerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        });

        it('does not throw if containerRef.current is null', () => {
            renderNavigation({ containerRef: { current: null } });

            expect(() => dispatchKey('Home')).not.toThrow();
        });
    });

    describe('unmapped keys', () => {
        it('ignores keys that are not in the handlers map', () => {
            const { handleBack, handleNext } = renderNavigation();

            dispatchKey('Enter');
            dispatchKey('a');

            expect(handleBack).not.toHaveBeenCalled();
            expect(handleNext).not.toHaveBeenCalled();
        });
    });

    describe('state updated via rerender', () => {
        it('uses the most recent currentIndex without re-registering the listener', () => {
            const handleBack = jest.fn();
            const handleNext = jest.fn();
            const { wrapperRef } = createWrapperWithFocus();
            const containerRef = createContainerRef();

            const baseProps = {
                wrapperRef,
                containerRef,
                currentIndex: 0,
                isMobile: false,
                itemCount: 5,
                handleBack,
                handleNext
            };

            const { rerender } = renderHook(
                props => useKeyboardNavigation(props),
                {
                    initialProps: baseProps
                }
            );

            dispatchKey('ArrowLeft');
            expect(handleBack).not.toHaveBeenCalled();

            rerender({ ...baseProps, currentIndex: 2 });

            dispatchKey('ArrowLeft');
            expect(handleBack).toHaveBeenCalledTimes(1);
        });
    });
});
