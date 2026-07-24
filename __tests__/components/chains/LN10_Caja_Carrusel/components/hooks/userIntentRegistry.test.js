import {
    armUserIntent,
    isWithinUserIntentWindow,
    INTENT_WINDOW_MS
} from '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/userIntentRegistry';

// Extraction of the shared user-intent gate (sdd/carrusel-session-reducer/
// apply-progress-mobile-intent): previously module-private state inside
// hooks/index.js (zombie-observer-coupling-root, #1897), now a dedicated
// leaf module so verticalTouchBridge.js (a DOM bridge, not a React hook) can
// share the SAME registry without importing from the React-hooks module.
describe('components - chains - ln10_caja_carrusel - components - hooks - userIntentRegistry', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('exposes an intent window of 1500ms', () => {
        expect(INTENT_WINDOW_MS).toBe(1500);
    });

    it('reports a container as within the user-intent window right after arming it', () => {
        const container = document.createElement('ul');

        armUserIntent(container);

        expect(isWithinUserIntentWindow(container)).toBe(true);
    });

    it('reports a container as OUTSIDE the window once INTENT_WINDOW_MS has elapsed', () => {
        const container = document.createElement('ul');
        const nowSpy = jest.spyOn(performance, 'now');
        nowSpy.mockReturnValue(0);

        armUserIntent(container);

        nowSpy.mockReturnValue(INTENT_WINDOW_MS + 1);

        expect(isWithinUserIntentWindow(container)).toBe(false);
    });

    it('keeps per-container isolation — arming one container does not arm a distinct container', () => {
        const armedContainer = document.createElement('ul');
        const untouchedContainer = document.createElement('ul');

        armUserIntent(armedContainer);

        expect(isWithinUserIntentWindow(armedContainer)).toBe(true);
        expect(isWithinUserIntentWindow(untouchedContainer)).toBe(false);
    });

    it('is null-safe for both armUserIntent and isWithinUserIntentWindow', () => {
        expect(() => armUserIntent(null)).not.toThrow();
        expect(() => armUserIntent(undefined)).not.toThrow();
        expect(isWithinUserIntentWindow(null)).toBe(false);
        expect(isWithinUserIntentWindow(undefined)).toBe(false);
    });
});
