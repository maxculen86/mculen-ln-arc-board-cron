import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
    useObserverItems,
    useScrollTo,
    useHandleBack,
    useHandleNext
} from '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/index';

// Capture the IO callback and control observe/disconnect per-instance
let ioCallback;
let mockObserve;
let mockDisconnect;

beforeEach(() => {
    ioCallback = null;
    mockObserve = jest.fn();
    mockDisconnect = jest.fn();
    global.IntersectionObserver = jest.fn().mockImplementation(cb => {
        ioCallback = cb;
        return { observe: mockObserve, disconnect: mockDisconnect };
    });
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('components - chains - ln10_caja_carrusel - components - hooks - useObserverItems', () => {
    function TestHost({ setCurrentIndex, isInitialPositioningRef }) {
        const containerRef = React.useRef(null);
        useObserverItems({
            containerRef,
            setCurrentIndex,
            isInitialPositioningRef
        });

        return (
            <ul ref={containerRef}>
                <li data-scroller-index="0">Item 0</li>
                <li data-scroller-index="1">Item 1</li>
                {/* player slot: role=presentation, NO data-scroller-index — must NOT be observed */}
                <li role="presentation">Player slot</li>
            </ul>
        );
    }

    it('observes only indexed li elements — skips the player slot (role=presentation)', () => {
        const setCurrentIndex = jest.fn();
        const isInitialPositioningRef = { current: false };
        render(
            <TestHost
                setCurrentIndex={setCurrentIndex}
                isInitialPositioningRef={isInitialPositioningRef}
            />
        );

        expect(mockObserve).toHaveBeenCalledTimes(2);

        const observedElements = mockObserve.mock.calls.map(([el]) => el);
        observedElements.forEach(el => {
            expect(el.hasAttribute('data-scroller-index')).toBe(true);
        });

        // The slot element (no data-scroller-index) must never be passed to observe
        const slotElement = observedElements.find(
            el => !el.hasAttribute('data-scroller-index')
        );
        expect(slotElement).toBeUndefined();
    });

    it('calls setCurrentIndex with the numeric index when an indexed entry intersects AFTER a user gesture on the scroller', () => {
        // Zombie root fix (sdd/carrusel-session-reducer/zombie-observer-coupling-root):
        // the observer only honors an intersection that follows a real user
        // gesture on the scroller (pointerdown/touchstart/wheel/keydown) within
        // the intent window. A bare intersection with no preceding gesture is
        // the exact spurious-idx0 signature measured live — see the dedicated
        // "ignores an intersection with no recent user gesture" test below.
        const setCurrentIndex = jest.fn();
        const isInitialPositioningRef = { current: false };
        const { container } = render(
            <TestHost
                setCurrentIndex={setCurrentIndex}
                isInitialPositioningRef={isInitialPositioningRef}
            />
        );

        const indexedEl = container.querySelector('[data-scroller-index="1"]');
        container.querySelector('ul').dispatchEvent(new Event('pointerdown'));

        act(() => {
            ioCallback([{ isIntersecting: true, target: indexedEl }]);
        });

        expect(setCurrentIndex).toHaveBeenCalledWith(1);
    });

    it('ignores an intersection with no recent user gesture on the scroller (blocks the zombie: spurious idx0 from a programmatic/layout/reflow scroll)', () => {
        const setCurrentIndex = jest.fn();
        const isInitialPositioningRef = { current: false };
        const { container } = render(
            <TestHost
                setCurrentIndex={setCurrentIndex}
                isInitialPositioningRef={isInitialPositioningRef}
            />
        );

        const indexedEl = container.querySelector('[data-scroller-index="1"]');

        // No pointerdown/touchstart/wheel/keydown was ever dispatched on the
        // scroller — this models the measured zombie: the container reports
        // scrollTop=0 (card 0 fully visible) while the player is elsewhere,
        // with no user gesture behind it.
        act(() => {
            ioCallback([{ isIntersecting: true, target: indexedEl }]);
        });

        expect(setCurrentIndex).not.toHaveBeenCalled();
    });

    it('ignores an intersection once the user-intent window has elapsed', () => {
        const setCurrentIndex = jest.fn();
        const isInitialPositioningRef = { current: false };
        const nowSpy = jest.spyOn(performance, 'now');
        nowSpy.mockReturnValue(0);

        const { container } = render(
            <TestHost
                setCurrentIndex={setCurrentIndex}
                isInitialPositioningRef={isInitialPositioningRef}
            />
        );

        const indexedEl = container.querySelector('[data-scroller-index="1"]');
        container.querySelector('ul').dispatchEvent(new Event('touchstart'));

        // Past the intent window (> 1500ms): the settle/emission arrives too
        // late to be trusted as a continuation of that gesture.
        nowSpy.mockReturnValue(1501);

        act(() => {
            ioCallback([{ isIntersecting: true, target: indexedEl }]);
        });

        expect(setCurrentIndex).not.toHaveBeenCalled();
        nowSpy.mockRestore();
    });

    it('skips setCurrentIndex while the initial positioning ref is true', () => {
        const setCurrentIndex = jest.fn();
        const isInitialPositioningRef = { current: true };
        const { container } = render(
            <TestHost
                setCurrentIndex={setCurrentIndex}
                isInitialPositioningRef={isInitialPositioningRef}
            />
        );

        const indexedEl = container.querySelector('[data-scroller-index="1"]');

        act(() => {
            ioCallback([{ isIntersecting: true, target: indexedEl }]);
        });

        expect(setCurrentIndex).not.toHaveBeenCalled();
    });

    it('calls setCurrentIndex after the initial positioning ref clears, given a preceding user gesture', () => {
        const setCurrentIndex = jest.fn();
        const isInitialPositioningRef = { current: true };
        const { container } = render(
            <TestHost
                setCurrentIndex={setCurrentIndex}
                isInitialPositioningRef={isInitialPositioningRef}
            />
        );

        const indexedEl = container.querySelector('[data-scroller-index="1"]');
        container.querySelector('ul').dispatchEvent(new Event('wheel'));

        isInitialPositioningRef.current = false;

        act(() => {
            ioCallback([{ isIntersecting: true, target: indexedEl }]);
        });

        expect(setCurrentIndex).toHaveBeenCalledWith(1);
    });

    it('never calls setCurrentIndex with NaN across any simulated IO entry', () => {
        const setCurrentIndex = jest.fn();
        const isInitialPositioningRef = { current: false };
        const { container } = render(
            <TestHost
                setCurrentIndex={setCurrentIndex}
                isInitialPositioningRef={isInitialPositioningRef}
            />
        );

        const el0 = container.querySelector('[data-scroller-index="0"]');
        const el1 = container.querySelector('[data-scroller-index="1"]');
        const slotEl = container.querySelector('[role="presentation"]');

        act(() => {
            ioCallback([
                { isIntersecting: true, target: el0 },
                { isIntersecting: false, target: el1 },
                { isIntersecting: true, target: slotEl }
            ]);
        });

        const allCalls = setCurrentIndex.mock.calls.flat();
        allCalls.forEach(val => {
            expect(Number.isNaN(val)).toBe(false);
        });
    });

    // Desktop trackpad momentum-scroll hardening (R3 fresh-context review,
    // sdd/carrusel-session-reducer): a `scroll` event fires for BOTH a real
    // user gesture's momentum settle AND a programmatic/layout/close-collapse
    // scroll — the exact scroll the gate exists to reject. So `scroll` must
    // NEVER arm the intent window from a cold state; it may only EXTEND an
    // already-armed window (a genuine gesture already happened). This
    // preserves the zombie invariant while letting desktop wheel-nav survive
    // inertial scroll settling past the original gesture's window.
    it('a bare scroll event with no prior gesture does NOT arm intent (zombie-protection invariant)', () => {
        const setCurrentIndex = jest.fn();
        const isInitialPositioningRef = { current: false };
        const { container } = render(
            <TestHost
                setCurrentIndex={setCurrentIndex}
                isInitialPositioningRef={isInitialPositioningRef}
            />
        );

        const indexedEl = container.querySelector('[data-scroller-index="1"]');

        // No pointerdown/touchstart/wheel/keydown ever fired — a cold,
        // spurious `scroll` (programmatic/layout/close-collapse) must never
        // arm the gate on its own.
        container.querySelector('ul').dispatchEvent(new Event('scroll'));

        act(() => {
            ioCallback([{ isIntersecting: true, target: indexedEl }]);
        });

        expect(setCurrentIndex).not.toHaveBeenCalled();
    });

    it('extends an already-armed intent window on scroll (trackpad momentum continuation past the original gesture window)', () => {
        const setCurrentIndex = jest.fn();
        const isInitialPositioningRef = { current: false };
        const nowSpy = jest.spyOn(performance, 'now');
        nowSpy.mockReturnValue(0);

        const { container } = render(
            <TestHost
                setCurrentIndex={setCurrentIndex}
                isInitialPositioningRef={isInitialPositioningRef}
            />
        );

        const indexedEl = container.querySelector('[data-scroller-index="1"]');
        const scroller = container.querySelector('ul');

        // A real wheel gesture arms the window (until ~1500ms).
        scroller.dispatchEvent(new Event('wheel'));

        // Still within the original window: trackpad momentum keeps firing
        // `scroll` while the mandatory scroll-snap settles, extending the
        // window to ~t+1500 from this point (~2900ms).
        nowSpy.mockReturnValue(1400);
        scroller.dispatchEvent(new Event('scroll'));

        // Past the ORIGINAL 1500ms window, but within the extended one: the
        // settle-time IntersectionObserver emission must still be honored.
        nowSpy.mockReturnValue(2500);

        act(() => {
            ioCallback([{ isIntersecting: true, target: indexedEl }]);
        });

        expect(setCurrentIndex).toHaveBeenCalledWith(1);
        nowSpy.mockRestore();
    });

    it('drops an emission once the extended window elapses with no further scroll (regression guard)', () => {
        const setCurrentIndex = jest.fn();
        const isInitialPositioningRef = { current: false };
        const nowSpy = jest.spyOn(performance, 'now');
        nowSpy.mockReturnValue(0);

        const { container } = render(
            <TestHost
                setCurrentIndex={setCurrentIndex}
                isInitialPositioningRef={isInitialPositioningRef}
            />
        );

        const indexedEl = container.querySelector('[data-scroller-index="1"]');
        const scroller = container.querySelector('ul');

        scroller.dispatchEvent(new Event('wheel'));

        nowSpy.mockReturnValue(1400);
        scroller.dispatchEvent(new Event('scroll'));

        // Past the EXTENDED window (~2900ms) with no further scroll: momentum
        // has genuinely settled, so a late emission must be dropped again.
        nowSpy.mockReturnValue(2901);

        act(() => {
            ioCallback([{ isIntersecting: true, target: indexedEl }]);
        });

        expect(setCurrentIndex).not.toHaveBeenCalled();
        nowSpy.mockRestore();
    });

    it('disconnects the observer on unmount', () => {
        const setCurrentIndex = jest.fn();
        const isInitialPositioningRef = { current: false };
        const { unmount } = render(
            <TestHost
                setCurrentIndex={setCurrentIndex}
                isInitialPositioningRef={isInitialPositioningRef}
            />
        );

        unmount();

        expect(mockDisconnect).toHaveBeenCalledTimes(1);
    });
});

describe('components - chains - ln10_caja_carrusel - components - hooks - useScrollTo', () => {
    function ScrollTestHost({
        isMobile,
        currentIndex,
        offsetHeight,
        offsetWidth,
        scrollTop,
        scrollLeft,
        scrollToSpy,
        isInitialPositioningRef
    }) {
        const containerRef = React.useRef(null);
        const setRef = node => {
            containerRef.current = node;
            if (!node) return;
            Object.defineProperty(node, 'offsetHeight', {
                value: offsetHeight,
                configurable: true
            });
            Object.defineProperty(node, 'offsetWidth', {
                value: offsetWidth,
                configurable: true
            });
            // eslint-disable-next-line no-param-reassign
            node.scrollTop = scrollTop;
            // eslint-disable-next-line no-param-reassign
            node.scrollLeft = scrollLeft;
            // eslint-disable-next-line no-param-reassign
            node.scrollTo = scrollToSpy;
        };

        useScrollTo({
            containerRef,
            isMobile,
            currentIndex,
            isInitialPositioningRef
        });

        return <ul ref={setRef} />;
    }

    it('does not call scrollTo when the container is already at the mobile target (within tolerance)', () => {
        const scrollToSpy = jest.fn();
        render(
            <ScrollTestHost
                isMobile
                currentIndex={2}
                offsetHeight={800}
                offsetWidth={0}
                scrollTop={1600}
                scrollLeft={0}
                scrollToSpy={scrollToSpy}
                isInitialPositioningRef={{ current: false }}
            />
        );

        expect(scrollToSpy).not.toHaveBeenCalled();
    });

    it('calls scrollTo with the computed top offset on the initial deep-linked open (mobile)', () => {
        const scrollToSpy = jest.fn();
        render(
            <ScrollTestHost
                isMobile
                currentIndex={2}
                offsetHeight={800}
                offsetWidth={0}
                scrollTop={0}
                scrollLeft={0}
                scrollToSpy={scrollToSpy}
                isInitialPositioningRef={{ current: false }}
            />
        );

        expect(scrollToSpy).toHaveBeenCalledWith({
            top: 1600,
            behavior: 'instant'
        });
    });

    it('does not call scrollTo when the diff is below half a step (native swipe / observer noise)', () => {
        const scrollToSpy = jest.fn();
        render(
            <ScrollTestHost
                isMobile
                currentIndex={2}
                offsetHeight={800}
                offsetWidth={0}
                scrollTop={1650}
                scrollLeft={0}
                scrollToSpy={scrollToSpy}
                isInitialPositioningRef={{ current: false }}
            />
        );

        expect(scrollToSpy).not.toHaveBeenCalled();
    });

    it('calls scrollTo with the computed left offset for the desktop back navigation', () => {
        const scrollToSpy = jest.fn();
        render(
            <ScrollTestHost
                isMobile={false}
                currentIndex={1}
                offsetHeight={0}
                offsetWidth={1200}
                scrollTop={0}
                scrollLeft={0}
                scrollToSpy={scrollToSpy}
                isInitialPositioningRef={{ current: false }}
            />
        );

        expect(scrollToSpy).toHaveBeenCalledWith({
            left: 1200,
            behavior: 'instant'
        });
    });

    it('does not call scrollTo exactly at the half-step tolerance boundary', () => {
        const scrollToSpy = jest.fn();
        render(
            <ScrollTestHost
                isMobile
                currentIndex={2}
                offsetHeight={800}
                offsetWidth={0}
                scrollTop={1200}
                scrollLeft={0}
                scrollToSpy={scrollToSpy}
                isInitialPositioningRef={{ current: false }}
            />
        );

        expect(scrollToSpy).not.toHaveBeenCalled();
    });

    it('never sets the positioning gate to true for reactive (non-origin) navigation', () => {
        const scrollToSpy = jest.fn();
        const isInitialPositioningRef = { current: false };
        render(
            <ScrollTestHost
                isMobile
                currentIndex={3}
                offsetHeight={500}
                offsetWidth={0}
                scrollTop={500}
                scrollLeft={0}
                scrollToSpy={scrollToSpy}
                isInitialPositioningRef={isInitialPositioningRef}
            />
        );

        // A real, non-origin index change scrolls smoothly and must never
        // arm the initial-positioning gate — only a jump from origin does.
        expect(scrollToSpy).toHaveBeenCalled();
        expect(isInitialPositioningRef.current).toBe(false);
    });

    describe('gate ownership (no-jump path must still clear)', () => {
        let rafQueue;
        let rafIdCounter;
        let origRAF;

        beforeEach(() => {
            rafQueue = [];
            rafIdCounter = 0;
            origRAF = global.requestAnimationFrame;
            global.requestAnimationFrame = jest.fn(cb => {
                rafQueue.push(cb);
                return ++rafIdCounter;
            });
        });

        afterEach(() => {
            global.requestAnimationFrame = origRAF;
        });

        it('clears the positioning gate after two RAFs even when the container is already at the target (no jump)', () => {
            const isInitialPositioningRef = { current: true };

            function AlreadyAtTargetHost() {
                const containerRef = React.useRef(null);
                const setRef = node => {
                    containerRef.current = node;
                    if (!node) return;
                    Object.defineProperty(node, 'offsetHeight', {
                        value: 800,
                        configurable: true
                    });
                    // Already positioned at index 0's target (scrollTop 0):
                    // isJumpFromOrigin never trips (target === 0), so this
                    // exercises the no-jump settle path.
                    // eslint-disable-next-line no-param-reassign
                    node.scrollTop = 0;
                    // eslint-disable-next-line no-param-reassign
                    node.scrollTo = jest.fn();
                };

                useScrollTo({
                    containerRef,
                    isMobile: true,
                    currentIndex: 0,
                    isInitialPositioningRef
                });

                return <ul ref={setRef} />;
            }

            render(<AlreadyAtTargetHost />);

            // useScrollTo (not a mount-level timer) owns this gate: it must
            // still queue a clear even though nothing needed to scroll.
            expect(isInitialPositioningRef.current).toBe(true);
            expect(rafQueue.length).toBe(1);

            act(() => {
                rafQueue.shift()();
            });
            expect(isInitialPositioningRef.current).toBe(true);

            act(() => {
                rafQueue.shift()();
            });
            expect(isInitialPositioningRef.current).toBe(false);
        });
    });

    describe('effect cleanup (cancels pending gate-clear across rapid re-renders)', () => {
        let queue;
        let idCounter;
        let origRAF;
        let origCancelRAF;

        beforeEach(() => {
            queue = [];
            idCounter = 0;
            origRAF = global.requestAnimationFrame;
            origCancelRAF = global.cancelAnimationFrame;
            global.requestAnimationFrame = jest.fn(cb => {
                idCounter += 1;
                queue.push({ id: idCounter, cb });
                return idCounter;
            });
            // Unlike the other describe blocks' cancelAnimationFrame mock
            // (which only records ids), this one actually removes the
            // cancelled entry from the queue so a stale RAF from a
            // cancelled effect run can never fire — required to prove the
            // second jump's gate-clear isn't corrupted by the first run's
            // stale chain.
            global.cancelAnimationFrame = jest.fn(id => {
                queue = queue.filter(item => item.id !== id);
            });
        });

        afterEach(() => {
            global.requestAnimationFrame = origRAF;
            global.cancelAnimationFrame = origCancelRAF;
        });

        it('effect re-run cancels the pending gate-clear from the previous run', () => {
            const isInitialPositioningRef = { current: false };
            // scrollTo does not mutate scrollTop, so every jump keeps
            // current===0 — each rapid currentIndex change is its own
            // jump-from-origin, mirroring rapid deep-link navigation.
            const scrollToSpy = jest.fn();

            const { rerender } = render(
                <ScrollTestHost
                    isMobile
                    currentIndex={1}
                    offsetHeight={800}
                    offsetWidth={0}
                    scrollTop={0}
                    scrollLeft={0}
                    scrollToSpy={scrollToSpy}
                    isInitialPositioningRef={isInitialPositioningRef}
                />
            );

            // First jump arms the gate and schedules its own gate-clear RAF.
            expect(isInitialPositioningRef.current).toBe(true);
            expect(queue.length).toBe(1);
            const firstRunClearId = queue[0].id;

            // A second, rapid currentIndex change re-runs the effect before
            // the first run's gate-clear RAF ever fires.
            rerender(
                <ScrollTestHost
                    isMobile
                    currentIndex={2}
                    offsetHeight={800}
                    offsetWidth={0}
                    scrollTop={0}
                    scrollLeft={0}
                    scrollToSpy={scrollToSpy}
                    isInitialPositioningRef={isInitialPositioningRef}
                />
            );

            // The stale gate-clear RAF from the first run must be cancelled
            // on re-run, replaced by exactly one new chain owned by the
            // second jump.
            expect(global.cancelAnimationFrame).toHaveBeenCalledWith(
                firstRunClearId
            );
            expect(queue.length).toBe(1);
            expect(queue[0].id).not.toBe(firstRunClearId);
            expect(isInitialPositioningRef.current).toBe(true);

            // Flush the second run's double-RAF gate-clear chain to
            // completion: the gate must still eventually clear.
            act(() => {
                queue.shift().cb();
            });
            expect(isInitialPositioningRef.current).toBe(true);

            act(() => {
                queue.shift().cb();
            });
            expect(isInitialPositioningRef.current).toBe(false);
        });
    });

    describe('closed-dialog recovery (zero size on first run via RAF)', () => {
        let rafQueue;
        let rafIdCounter;
        let cancelIds;
        let origRAF;
        let origCancelRAF;

        beforeEach(() => {
            rafQueue = [];
            rafIdCounter = 0;
            cancelIds = [];
            origRAF = global.requestAnimationFrame;
            origCancelRAF = global.cancelAnimationFrame;
            global.requestAnimationFrame = jest.fn(cb => {
                rafQueue.push(cb);
                return ++rafIdCounter;
            });
            global.cancelAnimationFrame = jest.fn(id => {
                cancelIds.push(id);
            });
        });

        afterEach(() => {
            global.requestAnimationFrame = origRAF;
            global.cancelAnimationFrame = origCancelRAF;
        });

        it('defers scrollTo and recovers via RAF once the container gains real size', () => {
            const scrollToSpy = jest.fn(function mockScrollTo({ top, left }) {
                if (top !== undefined) this.scrollTop = top;
                if (left !== undefined) this.scrollLeft = left;
            });
            let containerNode;

            function ZeroSizeHost() {
                const containerRef = React.useRef(null);
                const setRef = node => {
                    containerRef.current = node;
                    if (!node) return;
                    containerNode = node;
                    Object.defineProperty(node, 'offsetHeight', {
                        value: 0,
                        configurable: true
                    });
                    Object.defineProperty(node, 'offsetWidth', {
                        value: 0,
                        configurable: true
                    });
                    // eslint-disable-next-line no-param-reassign
                    node.scrollTop = 0;
                    // eslint-disable-next-line no-param-reassign
                    node.scrollLeft = 0;
                    // eslint-disable-next-line no-param-reassign
                    node.scrollTo = scrollToSpy;
                };

                useScrollTo({
                    containerRef,
                    isMobile: true,
                    currentIndex: 2,
                    isInitialPositioningRef: { current: false }
                });

                return <ul ref={setRef} />;
            }

            render(<ZeroSizeHost />);

            // First RAF queued because container has zero size
            expect(rafQueue.length).toBe(1);

            // Fire the first RAF: container still has zero size, should queue another
            act(() => {
                rafQueue.shift()();
            });

            expect(scrollToSpy).not.toHaveBeenCalled();
            expect(rafQueue.length).toBe(1); // re-queued for next frame

            // Container gains real size (dialog finished opening)
            Object.defineProperty(containerNode, 'offsetHeight', {
                value: 800,
                configurable: true
            });

            // Fire the second RAF: container has non-zero size, scrollTo runs
            act(() => {
                rafQueue.shift()();
            });

            expect(scrollToSpy).toHaveBeenCalledWith({
                top: 1600,
                behavior: 'instant'
            });
            // scrollToSpy updates scrollTop internally, so epsilon guard
            // will see current=1600 on the stabilization check.
            // RAFs queued: one for clearing the initial-positioning ref and one
            // stabilization check. The second clear RAF is scheduled inside the
            // first and appears as callbacks fire.
            expect(rafQueue.length).toBe(2);

            // Fire the first clear RAF; it schedules the second clear RAF
            act(() => {
                rafQueue.shift()();
            });
            expect(rafQueue.length).toBe(2);

            // Fire stabilization RAF: scrollTo already at target, epsilon guard skips
            act(() => {
                rafQueue.shift()();
            });

            // No additional scrollTo call (epsilon guard: diff=0 <= 0.5*step)
            expect(scrollToSpy).toHaveBeenCalledTimes(1);
            // One clear RAF still pending
            expect(rafQueue.length).toBe(1);

            // Fire the second clear RAF; no further scheduling
            act(() => {
                rafQueue.shift()();
            });
            expect(rafQueue.length).toBe(0);
        });

        it('does not queue a new RAF after recovery window closes (prevents swipe-fighting)', () => {
            const scrollToSpy = jest.fn(function mockScrollTo({ top, left }) {
                if (top !== undefined) this.scrollTop = top;
                if (left !== undefined) this.scrollLeft = left;
            });
            let containerNode;

            function ZeroSizeHost() {
                const containerRef = React.useRef(null);
                const setRef = node => {
                    containerRef.current = node;
                    if (!node) return;
                    containerNode = node;
                    Object.defineProperty(node, 'offsetHeight', {
                        value: 0,
                        configurable: true
                    });
                    Object.defineProperty(node, 'offsetWidth', {
                        value: 0,
                        configurable: true
                    });
                    // eslint-disable-next-line no-param-reassign
                    node.scrollTop = 0;
                    // eslint-disable-next-line no-param-reassign
                    node.scrollLeft = 0;
                    // eslint-disable-next-line no-param-reassign
                    node.scrollTo = scrollToSpy;
                };

                useScrollTo({
                    containerRef,
                    isMobile: true,
                    currentIndex: 2,
                    isInitialPositioningRef: { current: false }
                });

                return <ul ref={setRef} />;
            }

            render(<ZeroSizeHost />);

            // RAF 1: zero size → retry
            act(() => {
                rafQueue.shift()();
            });

            // Container gains real size
            Object.defineProperty(containerNode, 'offsetHeight', {
                value: 800,
                configurable: true
            });

            // RAF 2: scroll + queue one clear RAF for the initial-positioning
            // ref and one stabilization check. The second clear RAF is scheduled
            // inside the first.
            act(() => {
                rafQueue.shift()();
            });
            expect(scrollToSpy).toHaveBeenCalledTimes(1);
            expect(rafQueue.length).toBe(2);

            // RAF 3: first clear RAF schedules the second clear RAF
            act(() => {
                rafQueue.shift()();
            });
            expect(rafQueue.length).toBe(2);

            // RAF 4: stabilization done
            act(() => {
                rafQueue.shift()();
            });
            // One clear RAF still pending
            expect(rafQueue.length).toBe(1);

            // RAF 5: clear the initial-positioning ref
            act(() => {
                rafQueue.shift()();
            });
            expect(rafQueue.length).toBe(0);

            // Simulate what would be a mid-swipe dvh resize — but the recovery
            // window is closed, so no RAF should fire on its own.
            expect(rafQueue.length).toBe(0);
        });

        it('cancels pending RAF on unmount', () => {
            function ZeroSizeHost() {
                const containerRef = React.useRef(null);
                const setRef = node => {
                    containerRef.current = node;
                    if (!node) return;
                    Object.defineProperty(node, 'offsetHeight', {
                        value: 0,
                        configurable: true
                    });
                    // eslint-disable-next-line no-param-reassign
                    node.scrollTop = 0;
                    // eslint-disable-next-line no-param-reassign
                    node.scrollTo = jest.fn();
                };

                useScrollTo({
                    containerRef,
                    isMobile: true,
                    currentIndex: 1,
                    isInitialPositioningRef: { current: false }
                });

                return <ul ref={setRef} />;
            }

            const { unmount } = render(<ZeroSizeHost />);
            const pendingId = rafIdCounter; // the one RAF that was queued

            unmount();

            expect(cancelIds).toContain(pendingId);
        });
    });
});

// Step0 characterization (SDD change carrusel-session-reducer, spec #1853),
// rewritten for Slice 2 / P2-2 "single index owner" (design #1868):
// CT-10 characterizes the useHandleBack implementation — it lives here, not
// in jwPlayerManager.sessionScenarios.test.js, because useHandleBack is
// exported by THIS module (hooks/index.js), not jwPlayerManager.js (1:1
// test-to-module convention). Post-P2-2, useHandleBack mirrors useHandleNext
// (46-65 above) with a NEGATIVE step and no longer writes `currentIndex`
// directly: `useObserverItems` becomes the single writer, matching the
// scroll→IntersectionObserver→setCurrentIndex path that already autoplays
// for next (see #1867 root cause, #1868 fix). CT-11 (deep-link instant
// scroll) and CT-12 (epsilon tolerance) are ALREADY characterized, with an
// identical sequence (no lifecycle variant to add), by the existing tests
// above: "calls scrollTo with the computed top offset on the initial
// deep-linked open (mobile)" (CT-11) and "does not call scrollTo when the
// diff is below half a step" / "does not call scrollTo exactly at the
// half-step tolerance boundary" (CT-12) in the useScrollTo describe block —
// cross-referenced here rather than duplicated.
describe('components - chains - ln10_caja_carrusel - components - hooks - useHandleBack (CT-10 session-reducer characterization)', () => {
    function BackTestHost({
        showBack,
        isMobile,
        callback,
        currentIndex,
        offsetWidth,
        offsetHeight,
        scrollBySpy,
        onReady
    }) {
        const containerRef = React.useRef(null);
        const setRef = node => {
            containerRef.current = node;
            if (!node) return;
            Object.defineProperty(node, 'offsetWidth', {
                value: offsetWidth,
                configurable: true
            });
            Object.defineProperty(node, 'offsetHeight', {
                value: offsetHeight,
                configurable: true
            });
            // eslint-disable-next-line no-param-reassign
            node.scrollBy = scrollBySpy;
        };

        const handleBack = useHandleBack({
            containerRef,
            showBack,
            isMobile,
            callback,
            currentIndex
        });

        onReady(handleBack);

        return <ul ref={setRef} />;
    }

    it('CT-10: issues a negative scrollBy on desktop back navigation and never writes currentIndex directly (single index owner, P2-2)', () => {
        const callback = jest.fn();
        const scrollBySpy = jest.fn();
        const setCurrentIndex = jest.fn();
        let handleBack;

        render(
            <BackTestHost
                showBack
                isMobile={false}
                currentIndex={2}
                offsetWidth={1200}
                offsetHeight={0}
                scrollBySpy={scrollBySpy}
                callback={callback}
                onReady={fn => {
                    handleBack = fn;
                }}
            />
        );

        act(() => {
            handleBack();
        });

        expect(callback).toHaveBeenCalledTimes(1);
        expect(scrollBySpy).toHaveBeenCalledWith({
            left: -1200,
            behavior: 'smooth'
        });
        expect(setCurrentIndex).not.toHaveBeenCalled();
    });

    it('mirrors the mobile scrollBy shape (top: -offsetHeight) for hook coverage, even though back arrows are desktop-only', () => {
        const callback = jest.fn();
        const scrollBySpy = jest.fn();
        let handleBack;

        render(
            <BackTestHost
                showBack
                isMobile
                currentIndex={1}
                offsetWidth={0}
                offsetHeight={800}
                scrollBySpy={scrollBySpy}
                callback={callback}
                onReady={fn => {
                    handleBack = fn;
                }}
            />
        );

        act(() => {
            handleBack();
        });

        expect(callback).toHaveBeenCalledTimes(1);
        expect(scrollBySpy).toHaveBeenCalledWith({
            top: -800,
            behavior: 'smooth'
        });
    });
});

// Zombie root fix (sdd/carrusel-session-reducer/zombie-observer-coupling-root,
// discovery #1897): useHandleNext/useHandleBack do NOT write currentIndex
// directly (CT-10 above) — useObserverItems is the single writer, so a
// next/back-triggered scrollBy must still be honored by the observer even
// though it never dispatches a raw pointerdown/touchstart/wheel/keydown on
// the scroller itself. The fix shares one user-intent gate (keyed by the
// scroller DOM node) between useObserverItems and useHandleNext/useHandleBack
// so both real gestures AND button-triggered programmatic scrolls arm it,
// while an unarmed (spurious) emission is still ignored.
describe('components - chains - ln10_caja_carrusel - components - hooks - shared user-intent gate (useObserverItems + useHandleNext)', () => {
    function CombinedHost({
        setCurrentIndex,
        isInitialPositioningRef,
        onReady
    }) {
        const containerRef = React.useRef(null);
        const setRef = node => {
            containerRef.current = node;
            if (!node) return;
            Object.defineProperty(node, 'offsetWidth', {
                value: 1200,
                configurable: true
            });
            // eslint-disable-next-line no-param-reassign
            node.scrollBy = jest.fn();
        };

        useObserverItems({
            containerRef,
            setCurrentIndex,
            isInitialPositioningRef
        });

        const handleNext = useHandleNext({
            containerRef,
            showNext: true,
            isMobile: false,
            callback: jest.fn(),
            currentIndex: 0
        });

        onReady(handleNext);

        return (
            <ul ref={setRef}>
                <li data-scroller-index="0">Item 0</li>
                <li data-scroller-index="1">Item 1</li>
            </ul>
        );
    }

    it('honors the observer emission that follows a handleNext()-triggered scroll, with no raw gesture event on the scroller', () => {
        const setCurrentIndex = jest.fn();
        const isInitialPositioningRef = { current: false };
        let handleNext;

        const { container } = render(
            <CombinedHost
                setCurrentIndex={setCurrentIndex}
                isInitialPositioningRef={isInitialPositioningRef}
                onReady={fn => {
                    handleNext = fn;
                }}
            />
        );

        act(() => {
            handleNext();
        });

        const indexedEl = container.querySelector('[data-scroller-index="1"]');

        act(() => {
            ioCallback([{ isIntersecting: true, target: indexedEl }]);
        });

        expect(setCurrentIndex).toHaveBeenCalledWith(1);
    });

    it('still ignores an observer emission when neither a gesture NOR handleNext/handleBack armed the intent window', () => {
        const setCurrentIndex = jest.fn();
        const isInitialPositioningRef = { current: false };

        const { container } = render(
            <CombinedHost
                setCurrentIndex={setCurrentIndex}
                isInitialPositioningRef={isInitialPositioningRef}
                onReady={() => {}}
            />
        );

        const indexedEl = container.querySelector('[data-scroller-index="1"]');

        act(() => {
            ioCallback([{ isIntersecting: true, target: indexedEl }]);
        });

        expect(setCurrentIndex).not.toHaveBeenCalled();
    });
});
