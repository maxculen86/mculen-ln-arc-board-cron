// Mocks on()/off() with STACKED listeners per event, like the real JW player:
// calling on() twice for the same event keeps BOTH callbacks live, and off()
// removes only the specific callback reference passed to it. `listeners`
// is kept as a last-registered shim for existing single-registration call
// sites (e.g. `listeners.ready()`).
export const createPlayerMock = () => {
    const listeners = {};
    const listenerStacks = {};
    const onceListeners = {};

    const player = {
        on: jest.fn((eventName, callback) => {
            listeners[eventName] = callback;
            if (!listenerStacks[eventName]) listenerStacks[eventName] = [];
            listenerStacks[eventName].push(callback);
        }),
        once: jest.fn((eventName, callback) => {
            if (!onceListeners[eventName]) onceListeners[eventName] = [];
            onceListeners[eventName].push(callback);
        }),
        off: jest.fn((eventName, callback) => {
            if (onceListeners[eventName]) {
                onceListeners[eventName] = onceListeners[eventName].filter(
                    registered => registered !== callback
                );
            }
            if (listenerStacks[eventName]) {
                listenerStacks[eventName] = listenerStacks[eventName].filter(
                    registered => registered !== callback
                );
                listeners[eventName] =
                    listenerStacks[eventName][
                        listenerStacks[eventName].length - 1
                    ];
            }
        }),
        getPlaylistIndex: jest.fn(),
        playlistItem: jest.fn(),
        play: jest.fn(),
        stop: jest.fn(),
        setMute: jest.fn(),
        remove: jest.fn(),
        skipAd: jest.fn(),
        pauseAd: jest.fn(),
        pause: jest.fn(),
        resize: jest.fn()
    };

    const fireOnce = (eventName, payload) => {
        const callbacks = onceListeners[eventName] || [];
        onceListeners[eventName] = [];
        callbacks.forEach(callback => callback(payload));
    };

    const fireAll = (eventName, payload) => {
        const callbacks = (listenerStacks[eventName] || []).slice();
        callbacks.forEach(callback => callback(payload));
    };

    return {
        player,
        listeners,
        listenerStacks,
        onceListeners,
        fireOnce,
        fireAll
    };
};

// Call from INSIDE a jest.mock() factory via require() — factories may
// require() but may not close over outer-scope variables (babel-plugin-jest-hoist).
export const createAdManagerMockModule = () => ({
    AD_HOST_ID: 'jw-ad-player-host',
    playPreroll: jest.fn(),
    destroy: jest.fn(),
    positionAdHost: jest.fn(),
    getAdHostElement: jest.fn(() => null)
});
