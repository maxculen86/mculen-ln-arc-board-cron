import {
    attachTouchBridgeToAdHost,
    attachVerticalTouchBridge,
    detachTouchBridgeFromAdHost,
    detachVerticalTouchBridge
} from '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/verticalTouchBridge';
import { isWithinUserIntentWindow } from '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/userIntentRegistry';

// Mobile-swipe intent gap (sdd/carrusel-session-reducer/
// apply-progress-mobile-intent, closing the CRITICAL gap flagged in #1898):
// the real mobile swipe is handled here, NOT by useHandleNext/useHandleBack.
// touchstart/touchmove/touchend are captured on hostElement (the JW player
// host, reparented outside containerRef's DOM subtree), so the observer's
// own gesture listeners on containerRef never fire for a genuine mobile
// swipe. Without arming the shared user-intent registry HERE, at the actual
// navigation trigger, the observer would ignore the post-swipe settle and
// mobile vertical-swipe navigation would silently break.
describe('components - chains - ln10_caja_carrusel - components - hooks - verticalTouchBridge (mobile swipe arms shared user-intent)', () => {
    let hostElement;
    let scroller;
    let scrollerRef;

    const dispatchTouch = (target, type, coords) => {
        const event = new Event(type, { bubbles: true, cancelable: true });
        event.touches = [coords];
        event.preventDefault = jest.fn();
        event.stopPropagation = jest.fn();
        target.dispatchEvent(event);
        return event;
    };

    beforeEach(() => {
        hostElement = document.createElement('div');
        document.body.appendChild(hostElement);

        scroller = document.createElement('ul');
        scroller.scrollBy = jest.fn();
        Object.defineProperty(scroller, 'offsetHeight', {
            value: 800,
            configurable: true
        });
        document.body.appendChild(scroller);

        scrollerRef = { current: scroller };
    });

    afterEach(() => {
        detachVerticalTouchBridge(hostElement);
        hostElement.remove();
        scroller.remove();
        jest.restoreAllMocks();
    });

    it('arms the shared user-intent window for the scroller BEFORE issuing the paged scrollBy, on a confirmed upward swipe', () => {
        attachVerticalTouchBridge(hostElement, scrollerRef);

        expect(isWithinUserIntentWindow(scroller)).toBe(false);

        dispatchTouch(hostElement, 'touchstart', {
            clientX: 100,
            clientY: 400
        });
        dispatchTouch(hostElement, 'touchmove', { clientX: 100, clientY: 280 });
        dispatchTouch(hostElement, 'touchend', { clientX: 100, clientY: 280 });

        expect(scroller.scrollBy).toHaveBeenCalledTimes(1);
        expect(isWithinUserIntentWindow(scroller)).toBe(true);
    });

    it('arms the shared user-intent window on a confirmed downward swipe too', () => {
        attachVerticalTouchBridge(hostElement, scrollerRef);

        dispatchTouch(hostElement, 'touchstart', {
            clientX: 100,
            clientY: 280
        });
        dispatchTouch(hostElement, 'touchmove', { clientX: 100, clientY: 400 });
        dispatchTouch(hostElement, 'touchend', { clientX: 100, clientY: 400 });

        expect(scroller.scrollBy).toHaveBeenCalledTimes(1);
        expect(isWithinUserIntentWindow(scroller)).toBe(true);
    });

    it('does NOT arm the intent window for a sub-threshold pan (no navigation issued)', () => {
        attachVerticalTouchBridge(hostElement, scrollerRef);

        dispatchTouch(hostElement, 'touchstart', {
            clientX: 100,
            clientY: 400
        });
        // 15px vertical move: crosses the 10px pan-detection threshold but
        // stays under the 50px swipe-intent threshold — a real pan gesture
        // that must NOT trigger navigation nor arm intent.
        dispatchTouch(hostElement, 'touchmove', { clientX: 100, clientY: 385 });
        dispatchTouch(hostElement, 'touchend', { clientX: 100, clientY: 385 });

        expect(scroller.scrollBy).not.toHaveBeenCalled();
        expect(isWithinUserIntentWindow(scroller)).toBe(false);
    });

    it('does NOT arm the intent window for a horizontal pan (no navigation issued)', () => {
        attachVerticalTouchBridge(hostElement, scrollerRef);

        dispatchTouch(hostElement, 'touchstart', {
            clientX: 100,
            clientY: 400
        });
        dispatchTouch(hostElement, 'touchmove', { clientX: 220, clientY: 405 });
        dispatchTouch(hostElement, 'touchend', { clientX: 220, clientY: 405 });

        expect(scroller.scrollBy).not.toHaveBeenCalled();
        expect(isWithinUserIntentWindow(scroller)).toBe(false);
    });

    // The preroll ad plays in a SEPARATE ad host overlaying the content. A
    // vertical swipe over that ad host must be intercepted the same way (so it
    // cancels the ad and navigates), or the ad wedges permanently on a real
    // device (runbook invariant PA). These cover the ad-host bridge lifecycle.
    describe('ad-host touch bridge (swipe-during-ad interception)', () => {
        let adHost;

        beforeEach(() => {
            adHost = document.createElement('div');
            adHost.id = 'jw-ad-player-host';
            document.body.appendChild(adHost);
        });

        afterEach(() => {
            detachTouchBridgeFromAdHost();
            adHost.remove();
        });

        const swipeUp = target => {
            dispatchTouch(target, 'touchstart', { clientX: 100, clientY: 400 });
            dispatchTouch(target, 'touchmove', { clientX: 100, clientY: 280 });
            dispatchTouch(target, 'touchend', { clientX: 100, clientY: 280 });
        };

        it('does NOT bind to the ad host when the vertical bridge is not attached', () => {
            // No attachVerticalTouchBridge() first → no handlers exist → no-op.
            attachTouchBridgeToAdHost(() => adHost);

            swipeUp(adHost);

            expect(scroller.scrollBy).not.toHaveBeenCalled();
        });

        it('intercepts a swipe over the ad host and issues the same paged scrollBy', () => {
            attachVerticalTouchBridge(hostElement, scrollerRef);
            attachTouchBridgeToAdHost(() => adHost);

            swipeUp(adHost);

            expect(scroller.scrollBy).toHaveBeenCalledTimes(1);
        });

        it('stops intercepting ad-host swipes after detachTouchBridgeFromAdHost', () => {
            attachVerticalTouchBridge(hostElement, scrollerRef);
            attachTouchBridgeToAdHost(() => adHost);
            detachTouchBridgeFromAdHost();

            swipeUp(adHost);

            expect(scroller.scrollBy).not.toHaveBeenCalled();
        });

        it('detachVerticalTouchBridge also detaches the ad-host bridge', () => {
            attachVerticalTouchBridge(hostElement, scrollerRef);
            attachTouchBridgeToAdHost(() => adHost);
            detachVerticalTouchBridge(hostElement);

            swipeUp(adHost);

            expect(scroller.scrollBy).not.toHaveBeenCalled();
        });
    });
});
