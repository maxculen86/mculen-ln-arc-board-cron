import {
    ANONYMOUS_VOTE_ATTEMPT_RESULTS,
    BOX_LOCATIONS,
    CAJA_1_VIEWPORT_THRESHOLD,
    ENCUESTA_HOME_STATE_STORAGE_KEY,
    ENCUESTA_POST_ID,
    ENCUESTA_VOTE_STORAGE_KEY,
    USER_STATE_CODES
} from '../../../../components/chains/LN10_Caja_Encuesta/constants';
import {
    getAnonymousVoteAttemptState,
    getDeferredVoteKey,
    getEncuestaRenderStateFromStorage,
    getEncuestaTargetBoxLocation,
    getEncuestaUserStateCode,
    getViewportCountByBoxLocation,
    incrementEncuestaViewportCount,
    isValidBoxLocation,
    parseEncuestaHomeState,
    parseEncuestaVote,
    shouldApplyDeferredVoteRender,
    shouldRenderEncuesta,
    writeEncuestaHomeState
} from '../../../../components/chains/LN10_Caja_Encuesta/helpers';

describe('LN10_Caja_Encuesta helpers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        window.localStorage.clear();
    });

    describe('isValidBoxLocation', () => {
        it('returns true for supported locations', () => {
            expect(isValidBoxLocation(BOX_LOCATIONS.CAJA_1)).toBe(true);
            expect(isValidBoxLocation(BOX_LOCATIONS.CAJA_2)).toBe(true);
        });

        it('returns false for unsupported locations', () => {
            expect(isValidBoxLocation('otra_caja')).toBe(false);
            expect(isValidBoxLocation()).toBe(false);
        });
    });

    describe('parseEncuestaVote', () => {
        it('detects posted votes from nd_encuesta_vote', () => {
            expect(
                parseEncuestaVote(
                    JSON.stringify({
                        pollId: ENCUESTA_POST_ID,
                        hasPosted: true,
                        deferredVote: true,
                        timestamp: '2026-05-22T12:05:00.000Z'
                    })
                )
            ).toMatchObject({
                hasPosted: true,
                deferredVote: true,
                timestamp: '2026-05-22T12:05:00.000Z',
                data: {
                    pollId: ENCUESTA_POST_ID,
                    hasPosted: true,
                    deferredVote: true,
                    timestamp: '2026-05-22T12:05:00.000Z'
                }
            });
        });

        it('reads the Web Component deferredVote flag', () => {
            expect(
                parseEncuestaVote(
                    JSON.stringify({
                        pollId: ENCUESTA_POST_ID,
                        hasPosted: false,
                        deferredVote: true,
                        timestamp: '2026-05-22T12:05:00.000Z'
                    })
                )
            ).toMatchObject({
                hasPosted: false,
                deferredVote: true,
                timestamp: '2026-05-22T12:05:00.000Z'
            });
        });

        it('treats missing, false, and corrupt vote storage as not posted', () => {
            expect(parseEncuestaVote(null).hasPosted).toBe(false);
            expect(parseEncuestaVote('{bad-json').hasPosted).toBe(false);
            expect(
                parseEncuestaVote(JSON.stringify({ hasPosted: false }))
                    .hasPosted
            ).toBe(false);
            expect(
                parseEncuestaVote(JSON.stringify({ hasPosted: 'true' }))
                    .hasPosted
            ).toBe(false);
        });

        it('ignores vote data from another poll', () => {
            expect(
                parseEncuestaVote(
                    JSON.stringify({
                        pollId: '99',
                        hasPosted: true,
                        deferredVote: true,
                        timestamp: '2026-05-22T12:05:00.000Z'
                    })
                )
            ).toEqual({
                hasPosted: false,
                deferredVote: false,
                timestamp: null,
                data: null
            });
        });
    });

    describe('parseEncuestaHomeState', () => {
        it('normalizes viewport counters', () => {
            expect(
                parseEncuestaHomeState({
                    box1ViewportEntryCount: '2',
                    box2ViewportEntryCount: 1.8,
                    interacted: true
                })
            ).toEqual({
                box1ViewportEntryCount: 2,
                box2ViewportEntryCount: 1,
                interacted: true
            });
        });

        it('defaults invalid, missing, negative, and corrupt state counters to zero', () => {
            expect(parseEncuestaHomeState(null)).toEqual({
                box1ViewportEntryCount: 0,
                box2ViewportEntryCount: 0
            });
            expect(parseEncuestaHomeState('{bad-json')).toEqual({
                box1ViewportEntryCount: 0,
                box2ViewportEntryCount: 0
            });
            expect(
                parseEncuestaHomeState({
                    box1ViewportEntryCount: -1,
                    box2ViewportEntryCount: 'not-a-number'
                })
            ).toEqual({
                box1ViewportEntryCount: 0,
                box2ViewportEntryCount: 0
            });
        });
    });

    describe('writeEncuestaHomeState', () => {
        it('writes normalized state and returns null when storage fails', () => {
            const savedState = writeEncuestaHomeState({
                box1ViewportEntryCount: '2',
                box2ViewportEntryCount: 0
            });

            expect(savedState).toEqual({
                box1ViewportEntryCount: 2,
                box2ViewportEntryCount: 0
            });
            expect(
                window.localStorage.getItem(ENCUESTA_HOME_STATE_STORAGE_KEY)
            ).toBe(JSON.stringify(savedState));

            const localStorageDescriptor = Object.getOwnPropertyDescriptor(
                window,
                'localStorage'
            );

            Object.defineProperty(window, 'localStorage', {
                configurable: true,
                value: {
                    setItem: () => {
                        throw new Error('storage unavailable');
                    }
                }
            });

            try {
                expect(
                    writeEncuestaHomeState({
                        box1ViewportEntryCount: 1
                    })
                ).toBeNull();
            } finally {
                Object.defineProperty(
                    window,
                    'localStorage',
                    localStorageDescriptor
                );
            }
        });
    });

    describe('incrementEncuestaViewportCount and getViewportCountByBoxLocation', () => {
        it('increments caja_1 views by default without losing extra state', () => {
            const nextState = incrementEncuestaViewportCount({
                boxLocation: BOX_LOCATIONS.CAJA_1,
                encuestaHomeState: {
                    box1ViewportEntryCount: 2,
                    box2ViewportEntryCount: 1,
                    customFlag: true
                }
            });

            expect(nextState).toEqual({
                box1ViewportEntryCount: 3,
                box2ViewportEntryCount: 1,
                customFlag: true
            });
            expect(
                getViewportCountByBoxLocation({
                    boxLocation: BOX_LOCATIONS.CAJA_1,
                    encuestaHomeState: nextState
                })
            ).toBe(3);
        });

        it('increments caja_2 views when the rendered slot is caja_2', () => {
            const nextState = incrementEncuestaViewportCount({
                boxLocation: BOX_LOCATIONS.CAJA_2,
                encuestaHomeState: {
                    box1ViewportEntryCount: 3,
                    box2ViewportEntryCount: 4
                }
            });

            expect(nextState).toEqual({
                box1ViewportEntryCount: 3,
                box2ViewportEntryCount: 5
            });
            expect(
                getViewportCountByBoxLocation({
                    boxLocation: BOX_LOCATIONS.CAJA_2,
                    encuestaHomeState: nextState
                })
            ).toBe(5);
        });
    });

    describe('anonymous vote attempt helpers', () => {
        const activeTimestamp = '2026-05-22T12:05:00.000Z';
        const postedKey = `${activeTimestamp}|${ANONYMOUS_VOTE_ATTEMPT_RESULTS.POSTED}`;
        const notPostedKey = `${activeTimestamp}|${ANONYMOUS_VOTE_ATTEMPT_RESULTS.NOT_POSTED}`;

        it('builds a stable deferred vote key from current vote data', () => {
            expect(
                getDeferredVoteKey({
                    deferredVote: true,
                    timestamp: activeTimestamp
                })
            ).toBe(notPostedKey);

            expect(getDeferredVoteKey({ deferredVote: false })).toBeNull();
            expect(getDeferredVoteKey({ deferredVote: true })).toBeNull();
        });

        it('keeps cancelled and posted deferred attempts as different keys', () => {
            const baseVoteState = {
                deferredVote: true,
                timestamp: activeTimestamp
            };

            expect(
                getDeferredVoteKey({
                    ...baseVoteState,
                    hasPosted: false
                })
            ).not.toBe(
                getDeferredVoteKey({
                    ...baseVoteState,
                    hasPosted: true
                })
            );
        });

        it('classifies unconsumed anonymous vote attempts by posted state', () => {
            expect(
                getAnonymousVoteAttemptState({
                    webComponentVoteState: {
                        hasPosted: true,
                        deferredVote: true,
                        timestamp: activeTimestamp
                    }
                })
            ).toEqual({
                hasAttempt: true,
                hasConsumedDeferredVoteRender: false,
                result: ANONYMOUS_VOTE_ATTEMPT_RESULTS.POSTED,
                key: postedKey
            });

            expect(
                getAnonymousVoteAttemptState({
                    webComponentVoteState: {
                        hasPosted: false,
                        deferredVote: true,
                        timestamp: activeTimestamp
                    }
                })
            ).toEqual({
                hasAttempt: true,
                hasConsumedDeferredVoteRender: false,
                result: ANONYMOUS_VOTE_ATTEMPT_RESULTS.NOT_POSTED,
                key: notPostedKey
            });
        });

        it('ignores already consumed anonymous vote attempts', () => {
            expect(
                getAnonymousVoteAttemptState({
                    webComponentVoteState: {
                        hasPosted: true,
                        deferredVote: true,
                        timestamp: activeTimestamp
                    },
                    encuestaHomeState: {
                        consumedDeferredVoteKey: postedKey
                    }
                })
            ).toEqual({
                hasAttempt: true,
                hasConsumedDeferredVoteRender: true,
                result: null,
                key: postedKey
            });
        });

        it('identifies when deferred vote should force the special render', () => {
            expect(
                shouldApplyDeferredVoteRender({
                    hasAttempt: true,
                    key: postedKey,
                    hasConsumedDeferredVoteRender: false
                })
            ).toBe(true);

            expect(
                shouldApplyDeferredVoteRender({
                    hasAttempt: true,
                    key: postedKey,
                    hasConsumedDeferredVoteRender: true
                })
            ).toBe(false);

            expect(shouldApplyDeferredVoteRender({ hasAttempt: true })).toBe(
                false
            );
        });
    });

    describe('getEncuestaTargetBoxLocation', () => {
        it('keeps caja_1 when there is no vote, regardless of views', () => {
            expect(
                getEncuestaTargetBoxLocation({
                    webComponentVoteState: { hasPosted: false },
                    encuestaHomeState: { box1ViewportEntryCount: 1 }
                })
            ).toBe(BOX_LOCATIONS.CAJA_1);
            expect(
                getEncuestaTargetBoxLocation({
                    webComponentVoteState: { hasPosted: false },
                    encuestaHomeState: { box1ViewportEntryCount: 2 }
                })
            ).toBe(BOX_LOCATIONS.CAJA_1);
        });

        it('keeps caja_1 when the user voted and caja_1 has fewer than 3 views', () => {
            expect(
                getEncuestaTargetBoxLocation({
                    webComponentVoteState: { hasPosted: true },
                    encuestaHomeState: {
                        box1ViewportEntryCount: CAJA_1_VIEWPORT_THRESHOLD - 1
                    }
                })
            ).toBe(BOX_LOCATIONS.CAJA_1);
        });

        it('uses caja_2 when the user voted and caja_1 had 3 or more views at evaluation start', () => {
            expect(
                getEncuestaTargetBoxLocation({
                    webComponentVoteState: { hasPosted: true },
                    encuestaHomeState: {
                        box1ViewportEntryCount: CAJA_1_VIEWPORT_THRESHOLD
                    }
                })
            ).toBe(BOX_LOCATIONS.CAJA_2);
        });

        it('keeps caja_1 for an unconsumed anonymous vote attempt even if the user voted and had 3 views', () => {
            expect(
                getEncuestaTargetBoxLocation({
                    webComponentVoteState: {
                        hasPosted: true,
                        deferredVote: true,
                        timestamp: '2026-05-22T12:05:00.000Z'
                    },
                    encuestaHomeState: {
                        box1ViewportEntryCount: CAJA_1_VIEWPORT_THRESHOLD
                    },
                    now: Date.parse('2026-05-22T12:15:00.000Z')
                })
            ).toBe(BOX_LOCATIONS.CAJA_1);
        });

        it('uses caja_2 when the anonymous vote attempt was already consumed and views require it', () => {
            const timestamp = '2026-05-22T12:05:00.000Z';

            expect(
                getEncuestaTargetBoxLocation({
                    webComponentVoteState: {
                        hasPosted: true,
                        deferredVote: true,
                        timestamp
                    },
                    encuestaHomeState: {
                        box1ViewportEntryCount: CAJA_1_VIEWPORT_THRESHOLD,
                        consumedDeferredVoteKey: `${timestamp}|${ANONYMOUS_VOTE_ATTEMPT_RESULTS.POSTED}`
                    }
                })
            ).toBe(BOX_LOCATIONS.CAJA_2);
        });
    });

    describe('getEncuestaRenderStateFromStorage', () => {
        it('resolves the target location from storage', () => {
            window.localStorage.setItem(
                ENCUESTA_VOTE_STORAGE_KEY,
                JSON.stringify({
                    pollId: ENCUESTA_POST_ID,
                    hasPosted: true
                })
            );
            window.localStorage.setItem(
                ENCUESTA_HOME_STATE_STORAGE_KEY,
                JSON.stringify({
                    box1ViewportEntryCount: 3
                })
            );

            expect(getEncuestaRenderStateFromStorage().targetBoxLocation).toBe(
                BOX_LOCATIONS.CAJA_2
            );
        });

        it('degrades to caja_1 when storage is missing or corrupt', () => {
            window.localStorage.setItem(ENCUESTA_VOTE_STORAGE_KEY, '{bad-json');
            window.localStorage.setItem(
                ENCUESTA_HOME_STATE_STORAGE_KEY,
                '{bad-json'
            );

            expect(getEncuestaRenderStateFromStorage().targetBoxLocation).toBe(
                BOX_LOCATIONS.CAJA_1
            );
        });

        it('returns render state with anonymous vote attempt classification', () => {
            window.localStorage.setItem(
                ENCUESTA_VOTE_STORAGE_KEY,
                JSON.stringify({
                    pollId: ENCUESTA_POST_ID,
                    hasPosted: true,
                    deferredVote: true,
                    timestamp: '2026-05-22T12:05:00.000Z'
                })
            );
            window.localStorage.setItem(
                ENCUESTA_HOME_STATE_STORAGE_KEY,
                JSON.stringify({
                    box1ViewportEntryCount: 3
                })
            );

            expect(
                getEncuestaRenderStateFromStorage({
                    now: Date.parse('2026-05-22T12:15:00.000Z')
                })
            ).toEqual({
                targetBoxLocation: BOX_LOCATIONS.CAJA_1,
                anonymousVoteAttemptState: {
                    hasAttempt: true,
                    hasConsumedDeferredVoteRender: false,
                    result: ANONYMOUS_VOTE_ATTEMPT_RESULTS.POSTED,
                    key: `2026-05-22T12:05:00.000Z|${ANONYMOUS_VOTE_ATTEMPT_RESULTS.POSTED}`
                }
            });
        });
    });

    describe('getEncuestaUserStateCode', () => {
        it('maps not posted first view and two-or-more view states', () => {
            expect(
                getEncuestaUserStateCode({
                    webComponentVoteState: { hasPosted: false },
                    encuestaHomeState: { box1ViewportEntryCount: 1 }
                })
            ).toBe(USER_STATE_CODES.NOT_POSTED_FIRST_VIEW);

            expect(
                getEncuestaUserStateCode({
                    webComponentVoteState: { hasPosted: false },
                    encuestaHomeState: { box1ViewportEntryCount: 2 }
                })
            ).toBe(USER_STATE_CODES.NOT_POSTED_TWO_OR_MORE_VIEWS);
        });

        it('maps posted less-than-three and three-or-more view states', () => {
            expect(
                getEncuestaUserStateCode({
                    webComponentVoteState: { hasPosted: true },
                    encuestaHomeState: { box1ViewportEntryCount: 2 }
                })
            ).toBe(USER_STATE_CODES.POSTED_LESS_THAN_THREE_VIEWS);

            expect(
                getEncuestaUserStateCode({
                    webComponentVoteState: { hasPosted: true },
                    encuestaHomeState: { box1ViewportEntryCount: 3 }
                })
            ).toBe(USER_STATE_CODES.POSTED_THREE_OR_MORE_VIEWS);
        });

        it('maps anonymous vote attempt states', () => {
            expect(
                getEncuestaUserStateCode({
                    webComponentVoteState: { hasPosted: true },
                    encuestaHomeState: { box1ViewportEntryCount: 3 },
                    anonymousVoteAttemptState: {
                        hasAttempt: true,
                        hasConsumedDeferredVoteRender: false,
                        key: 'anonymous-vote-attempt',
                        result: ANONYMOUS_VOTE_ATTEMPT_RESULTS.POSTED
                    }
                })
            ).toBe(USER_STATE_CODES.POSTED_LOGIN_RETURN);

            expect(
                getEncuestaUserStateCode({
                    webComponentVoteState: { hasPosted: false },
                    encuestaHomeState: { box1ViewportEntryCount: 1 },
                    anonymousVoteAttemptState: {
                        hasAttempt: true,
                        hasConsumedDeferredVoteRender: false,
                        key: 'anonymous-vote-attempt',
                        result: ANONYMOUS_VOTE_ATTEMPT_RESULTS.NOT_POSTED
                    }
                })
            ).toBe(USER_STATE_CODES.NOT_POSTED_LOGIN_CANCELLED);
        });
    });

    describe('shouldRenderEncuesta', () => {
        it('renders only test segment in the selected target location', () => {
            expect(
                shouldRenderEncuesta({
                    ready: true,
                    segment: 'test',
                    boxLocation: BOX_LOCATIONS.CAJA_1,
                    targetBoxLocation: BOX_LOCATIONS.CAJA_1
                })
            ).toBe(true);
            expect(
                shouldRenderEncuesta({
                    ready: true,
                    segment: 'test',
                    boxLocation: BOX_LOCATIONS.CAJA_2,
                    targetBoxLocation: BOX_LOCATIONS.CAJA_1
                })
            ).toBe(false);
        });

        it('renders caja_2 when the target decision selects it', () => {
            expect(
                shouldRenderEncuesta({
                    ready: true,
                    segment: 'test',
                    boxLocation: BOX_LOCATIONS.CAJA_2,
                    targetBoxLocation: BOX_LOCATIONS.CAJA_2
                })
            ).toBe(true);
        });

        it('does not render control, null, unready, or invalid locations', () => {
            expect(
                shouldRenderEncuesta({
                    ready: true,
                    segment: 'control',
                    boxLocation: BOX_LOCATIONS.CAJA_1
                })
            ).toBe(false);
            expect(
                shouldRenderEncuesta({
                    ready: true,
                    segment: null,
                    boxLocation: BOX_LOCATIONS.CAJA_1
                })
            ).toBe(false);
            expect(
                shouldRenderEncuesta({
                    ready: false,
                    segment: 'test',
                    boxLocation: BOX_LOCATIONS.CAJA_1
                })
            ).toBe(false);
            expect(
                shouldRenderEncuesta({
                    ready: true,
                    segment: 'test',
                    boxLocation: 'otra_caja'
                })
            ).toBe(false);
        });
    });
});
