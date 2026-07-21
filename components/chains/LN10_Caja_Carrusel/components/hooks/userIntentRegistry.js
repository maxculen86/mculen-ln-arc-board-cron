const userIntentUntilByContainer = new WeakMap();

export const INTENT_WINDOW_MS = 1500;

export function armUserIntent(container) {
    if (!container) return;
    userIntentUntilByContainer.set(
        container,
        performance.now() + INTENT_WINDOW_MS
    );
}

export function isWithinUserIntentWindow(container) {
    if (!container) return false;
    const until = userIntentUntilByContainer.get(container);
    return typeof until === 'number' && performance.now() <= until;
}
