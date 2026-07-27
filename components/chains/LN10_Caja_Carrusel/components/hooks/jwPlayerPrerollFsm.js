// Leaf module — pure Preroll FSM transition function, no module-level state.

const INVALID_TRANSITION = 'invalid-transition';

const createIdlePrerollState = ({
    controllerId = 0,
    aborted = false
} = {}) => ({
    status: 'idle',
    contentItem: null,
    targetIndex: null,
    controllerId,
    aborted
});

export const nextPreroll = (state, event) => {
    const current = state || createIdlePrerollState();
    const reject = reason => ({ state: current, accepted: false, reason });
    const hasControllerId = typeof event.controllerId === 'number';
    const isStaleCallback =
        hasControllerId &&
        (current.aborted || event.controllerId !== current.controllerId);

    switch (event.type) {
        case 'QUEUE':
            if (current.status !== 'idle') return reject(INVALID_TRANSITION);

            return {
                state: {
                    status: 'queued',
                    contentItem: event.contentItem,
                    targetIndex: event.targetIndex,
                    controllerId: event.controllerId,
                    aborted: false
                },
                accepted: true,
                reason: null
            };

        case 'START':
            if (isStaleCallback) return reject('stale-callback');
            if (current.status !== 'queued') return reject(INVALID_TRANSITION);

            return {
                state: { ...current, status: 'loading' },
                accepted: true,
                reason: null
            };

        case 'IMPRESSION':
            if (isStaleCallback) return reject('stale-callback');
            if (current.status !== 'loading') return reject(INVALID_TRANSITION);

            return {
                state: { ...current, status: 'playing' },
                accepted: true,
                reason: null
            };

        case 'REQUEST_HANDOFF':
            if (isStaleCallback) return reject('stale-callback');
            if (current.status === 'handing-off') {
                return reject('already-handing-off');
            }
            if (
                current.status !== 'queued' &&
                current.status !== 'loading' &&
                current.status !== 'playing'
            ) {
                return reject(INVALID_TRANSITION);
            }

            return {
                state: { ...current, status: 'handing-off' },
                accepted: true,
                reason: null
            };

        case 'FINISH_HANDOFF':
            if (isStaleCallback) return reject('stale-callback');
            if (current.status !== 'handing-off') {
                return reject(INVALID_TRANSITION);
            }

            return {
                state: createIdlePrerollState({
                    controllerId: current.controllerId,
                    aborted: true
                }),
                accepted: true,
                reason: null
            };

        case 'CANCEL':
            if (current.status === 'idle') return reject('idempotent-cancel');
            if (isStaleCallback) return reject('stale-callback');

            return {
                state: createIdlePrerollState({
                    controllerId: current.controllerId,
                    aborted: true
                }),
                accepted: true,
                reason: null
            };

        default:
            return reject(INVALID_TRANSITION);
    }
};

export { createIdlePrerollState };
