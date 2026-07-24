import get from '../../../../private/common/utils/get';
import { armUserIntent } from './userIntentRegistry';

const VERTICAL_PAN_THRESHOLD_PX = 10;
// The scroll-snap container re-snaps any per-touchmove scrollTop write back
// to the current item, so the gesture is accumulated and applied as one
// paged scroll on touchend instead.
const SWIPE_INTENT_THRESHOLD_PX = 50;
const touchBridgeState = {
    startX: null,
    startY: null,
    totalDeltaY: 0,
    isVerticalPan: false,
    scrollerRef: null,
    touchStartHandler: null,
    touchMoveHandler: null,
    touchEndHandler: null,
    touchCancelHandler: null
};
let adHostBridgeElement = null;

const bindTouchEvents = el => {
    el.addEventListener('touchstart', touchBridgeState.touchStartHandler, {
        capture: true,
        passive: false
    });
    el.addEventListener('touchmove', touchBridgeState.touchMoveHandler, {
        capture: true,
        passive: false
    });
    el.addEventListener('touchend', touchBridgeState.touchEndHandler, {
        capture: true
    });
    el.addEventListener('touchcancel', touchBridgeState.touchCancelHandler, {
        capture: true
    });
};

const unbindTouchEvents = el => {
    el.removeEventListener('touchstart', touchBridgeState.touchStartHandler, {
        capture: true
    });
    el.removeEventListener('touchmove', touchBridgeState.touchMoveHandler, {
        capture: true
    });
    el.removeEventListener('touchend', touchBridgeState.touchEndHandler, {
        capture: true
    });
    el.removeEventListener('touchcancel', touchBridgeState.touchCancelHandler, {
        capture: true
    });
};

export const attachTouchBridgeToAdHost = getAdHostElement => {
    if (!touchBridgeState.touchStartHandler) return;

    const adHostElement = getAdHostElement();
    if (!adHostElement || adHostElement === adHostBridgeElement) return;

    bindTouchEvents(adHostElement);
    adHostBridgeElement = adHostElement;
};

export const detachTouchBridgeFromAdHost = () => {
    if (!adHostBridgeElement || !touchBridgeState.touchStartHandler) {
        adHostBridgeElement = null;
        return;
    }

    unbindTouchEvents(adHostBridgeElement);
    adHostBridgeElement = null;
};

export const detachVerticalTouchBridge = hostElement => {
    if (!hostElement || !touchBridgeState.touchStartHandler) return;

    detachTouchBridgeFromAdHost();

    unbindTouchEvents(hostElement);

    touchBridgeState.startX = null;
    touchBridgeState.startY = null;
    touchBridgeState.totalDeltaY = 0;
    touchBridgeState.isVerticalPan = false;
    touchBridgeState.scrollerRef = null;
    touchBridgeState.touchStartHandler = null;
    touchBridgeState.touchMoveHandler = null;
    touchBridgeState.touchEndHandler = null;
    touchBridgeState.touchCancelHandler = null;
};

// Bound to hostElement, not playerElement: JW's setup() replaces the player
// div wholesale once its internal init resolves, silently detaching any
// listeners bound to the original playerElement reference. hostElement is
// never touched by JW, so it stays the live listener target for the session.
const resetTouchBridgeGesture = () => {
    touchBridgeState.startX = null;
    touchBridgeState.startY = null;
    touchBridgeState.totalDeltaY = 0;
    touchBridgeState.isVerticalPan = false;
};

export const attachVerticalTouchBridge = (hostElement, scrollerRef) => {
    if (!hostElement || touchBridgeState.touchStartHandler) return;

    touchBridgeState.scrollerRef = scrollerRef;

    touchBridgeState.touchStartHandler = e => {
        const touch = get(e, 'touches.0');
        if (!touch) return;

        touchBridgeState.startX = get(touch, 'clientX');
        touchBridgeState.startY = get(touch, 'clientY');
        touchBridgeState.totalDeltaY = 0;
        touchBridgeState.isVerticalPan = false;
    };

    touchBridgeState.touchMoveHandler = e => {
        const touch = get(e, 'touches.0');
        if (!touch || touchBridgeState.startY === null) return;

        const deltaX = get(touch, 'clientX') - touchBridgeState.startX;
        const deltaY = get(touch, 'clientY') - touchBridgeState.startY;
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);

        if (absY > absX && absY > VERTICAL_PAN_THRESHOLD_PX) {
            e.preventDefault();
            e.stopPropagation();

            touchBridgeState.isVerticalPan = true;
            touchBridgeState.totalDeltaY += deltaY;

            touchBridgeState.startX = get(touch, 'clientX');
            touchBridgeState.startY = get(touch, 'clientY');
        }
    };

    touchBridgeState.touchEndHandler = () => {
        const scroller = get(touchBridgeState.scrollerRef, 'current');
        const { isVerticalPan, totalDeltaY } = touchBridgeState;

        if (
            scroller &&
            isVerticalPan &&
            Math.abs(totalDeltaY) >= SWIPE_INTENT_THRESHOLD_PX
        ) {
            const step = scroller.offsetHeight;
            armUserIntent(scroller);
            scroller.scrollBy({
                top: totalDeltaY < 0 ? step : -step,
                behavior: 'smooth'
            });
        }

        resetTouchBridgeGesture();
    };

    touchBridgeState.touchCancelHandler = () => {
        resetTouchBridgeGesture();
    };

    bindTouchEvents(hostElement);
};
