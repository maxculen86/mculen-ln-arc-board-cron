import { nextPreroll } from '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/jwPlayerManager';

const createIdleState = () => ({
    status: 'idle',
    contentItem: null,
    targetIndex: null,
    controllerId: 0,
    aborted: false
});

describe('nextPreroll (Preroll FSM pure transition function)', () => {
    it('queues, starts, marks impression, enters handoff, and finishes back at idle', () => {
        const queued = nextPreroll(createIdleState(), {
            type: 'QUEUE',
            contentItem: { id: 'video-3' },
            targetIndex: 2,
            controllerId: 7
        });

        expect(queued).toEqual({
            state: {
                status: 'queued',
                contentItem: { id: 'video-3' },
                targetIndex: 2,
                controllerId: 7,
                aborted: false
            },
            accepted: true,
            reason: null
        });

        const loading = nextPreroll(queued.state, {
            type: 'START',
            controllerId: 7
        });
        expect(loading.state.status).toBe('loading');
        expect(loading.accepted).toBe(true);

        const playing = nextPreroll(loading.state, {
            type: 'IMPRESSION',
            controllerId: 7
        });
        expect(playing.state.status).toBe('playing');
        expect(playing.accepted).toBe(true);

        const handingOff = nextPreroll(playing.state, {
            type: 'REQUEST_HANDOFF',
            controllerId: 7
        });
        expect(handingOff.state.status).toBe('handing-off');
        expect(handingOff.accepted).toBe(true);

        const idle = nextPreroll(handingOff.state, {
            type: 'FINISH_HANDOFF',
            controllerId: 7
        });
        expect(idle).toEqual({
            state: {
                status: 'idle',
                contentItem: null,
                targetIndex: null,
                controllerId: 7,
                aborted: true
            },
            accepted: true,
            reason: null
        });
    });

    it('rejects an invalid queue transition while preroll is already playing', () => {
        const state = {
            status: 'playing',
            contentItem: { id: 'video-3' },
            targetIndex: 2,
            controllerId: 7,
            aborted: false
        };

        const result = nextPreroll(state, {
            type: 'QUEUE',
            contentItem: { id: 'video-4' },
            targetIndex: 3,
            controllerId: 8
        });

        expect(result).toEqual({
            state,
            accepted: false,
            reason: 'invalid-transition'
        });
    });

    it('cancels from queued and treats a repeated cancel as idempotent', () => {
        const queued = {
            status: 'queued',
            contentItem: { id: 'video-3' },
            targetIndex: 2,
            controllerId: 7,
            aborted: false
        };

        const cancelled = nextPreroll(queued, {
            type: 'CANCEL',
            controllerId: 7
        });

        expect(cancelled).toEqual({
            state: {
                status: 'idle',
                contentItem: null,
                targetIndex: null,
                controllerId: 7,
                aborted: true
            },
            accepted: true,
            reason: null
        });

        expect(
            nextPreroll(cancelled.state, {
                type: 'CANCEL',
                controllerId: 7
            })
        ).toEqual({
            state: cancelled.state,
            accepted: false,
            reason: 'idempotent-cancel'
        });
    });

    it('rejects stale callbacks after a controller was cancelled', () => {
        const cancelledState = {
            status: 'idle',
            contentItem: null,
            targetIndex: null,
            controllerId: 7,
            aborted: true
        };

        expect(
            nextPreroll(cancelledState, {
                type: 'IMPRESSION',
                controllerId: 7
            })
        ).toEqual({
            state: cancelledState,
            accepted: false,
            reason: 'stale-callback'
        });

        expect(
            nextPreroll(cancelledState, {
                type: 'REQUEST_HANDOFF',
                controllerId: 6
            })
        ).toEqual({
            state: cancelledState,
            accepted: false,
            reason: 'stale-callback'
        });
    });

    it('accepts handoff exactly once and rejects a repeated handoff request for the same controller', () => {
        const playing = {
            status: 'playing',
            contentItem: { id: 'video-3' },
            targetIndex: 2,
            controllerId: 7,
            aborted: false
        };

        const firstHandoff = nextPreroll(playing, {
            type: 'REQUEST_HANDOFF',
            controllerId: 7
        });

        expect(firstHandoff.state.status).toBe('handing-off');
        expect(firstHandoff.accepted).toBe(true);

        expect(
            nextPreroll(firstHandoff.state, {
                type: 'REQUEST_HANDOFF',
                controllerId: 7
            })
        ).toEqual({
            state: firstHandoff.state,
            accepted: false,
            reason: 'already-handing-off'
        });
    });
});
