// Pure-function unit test for the Startup FSM (SDD change
// carrusel-session-reducer, Slice 1 — Startup FSM, design v3 §2/§4, spec
// §3/§4). `nextStartup` is exported specifically for this direct,
// deterministic, no-mock unit test — it takes no module globals, only
// `{ startup, desired }` state and an `event` (the `prerollActive` guard is
// part of the event, computed live by the impure dispatchStartup() wrapper
// in jwPlayerManager.js, never read here). Covers every row of the full
// transition table (design v3 §2).

import {
    nextStartup,
    STARTUP_WATCHDOG_MS,
    PREROLL_DEFERRAL_CEILING_MS
} from '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/jwPlayerManager';

describe('nextStartup (Startup FSM pure transition function)', () => {
    it('closed + OPEN{target} -> opening (desired=target), COMMAND_ITEM(target) (gate-2 amendment: synchronous optimistic command, required by the WARM path; play stays gated)', () => {
        const result = nextStartup(
            { startup: 'closed', desired: null },
            { type: 'OPEN', target: 5, prerollActive: false }
        );

        expect(result).toEqual({
            startup: 'opening',
            desired: 5,
            effects: [{ type: 'COMMAND_ITEM', index: 5 }]
        });
    });

    it('closed + OPEN{target}, prerollActive -> opening (desired=target), NONE (preroll owns selection; its own handoff re-issues the real command, H4 unchanged)', () => {
        const result = nextStartup(
            { startup: 'closed', desired: null },
            { type: 'OPEN', target: 5, prerollActive: true }
        );

        expect(result).toEqual({ startup: 'opening', desired: 5, effects: [] });
    });

    it('opening + SETTLE{landed}, prerollActive -> opening, NONE', () => {
        const result = nextStartup(
            { startup: 'opening', desired: 5 },
            { type: 'SETTLE', landed: 0, prerollActive: true }
        );

        expect(result).toEqual({ startup: 'opening', desired: 5, effects: [] });
    });

    it('opening + SETTLE{landed===desired}, !prerollActive -> started, PLAY_AND_REVEAL', () => {
        const result = nextStartup(
            { startup: 'opening', desired: 5 },
            { type: 'SETTLE', landed: 5, prerollActive: false }
        );

        expect(result).toEqual({
            startup: 'started',
            desired: 5,
            effects: [{ type: 'PLAY_AND_REVEAL' }]
        });
    });

    it('opening + SETTLE{landed!==desired}, !prerollActive -> settling, COMMAND_ITEM(desired)', () => {
        const result = nextStartup(
            { startup: 'opening', desired: 5 },
            { type: 'SETTLE', landed: 0, prerollActive: false }
        );

        expect(result).toEqual({
            startup: 'settling',
            desired: 5,
            effects: [{ type: 'COMMAND_ITEM', index: 5 }]
        });
    });

    it('settling + SETTLE{landed}, prerollActive -> settling, NONE', () => {
        const result = nextStartup(
            { startup: 'settling', desired: 5 },
            { type: 'SETTLE', landed: 0, prerollActive: true }
        );

        expect(result).toEqual({
            startup: 'settling',
            desired: 5,
            effects: []
        });
    });

    it('settling + SETTLE{landed===desired}, !prerollActive -> started, PLAY_AND_REVEAL', () => {
        const result = nextStartup(
            { startup: 'settling', desired: 5 },
            { type: 'SETTLE', landed: 5, prerollActive: false }
        );

        expect(result).toEqual({
            startup: 'started',
            desired: 5,
            effects: [{ type: 'PLAY_AND_REVEAL' }]
        });
    });

    it('settling + SETTLE{landed!==desired}, !prerollActive -> settling, COMMAND_ITEM(desired)', () => {
        const result = nextStartup(
            { startup: 'settling', desired: 5 },
            { type: 'SETTLE', landed: 1, prerollActive: false }
        );

        expect(result).toEqual({
            startup: 'settling',
            desired: 5,
            effects: [{ type: 'COMMAND_ITEM', index: 5 }]
        });
    });

    it('opening + NAVIGATE{i} -> opening (desired=i), NONE (no settle yet; command dropped)', () => {
        const result = nextStartup(
            { startup: 'opening', desired: 0 },
            { type: 'NAVIGATE', index: 3 }
        );

        expect(result).toEqual({ startup: 'opening', desired: 3, effects: [] });
    });

    it('settling + NAVIGATE{i===desired} -> settling, NONE', () => {
        const result = nextStartup(
            { startup: 'settling', desired: 3 },
            { type: 'NAVIGATE', index: 3 }
        );

        expect(result).toEqual({
            startup: 'settling',
            desired: 3,
            effects: []
        });
    });

    it('settling + NAVIGATE{i!==desired} -> settling (desired=i), COMMAND_ITEM(i) (idle -> deterministic)', () => {
        const result = nextStartup(
            { startup: 'settling', desired: 3 },
            { type: 'NAVIGATE', index: 4 }
        );

        expect(result).toEqual({
            startup: 'settling',
            desired: 4,
            effects: [{ type: 'COMMAND_ITEM', index: 4 }]
        });
    });

    it('closed + NAVIGATE{i} -> closed, NONE (gate-driven fix: no live session to navigate; upcoming OPEN carries the real target)', () => {
        // Regression coverage for the measured warm-reopen race: a caller
        // (usePersistentJwPlayer.js's separate currentIndex-driven effect)
        // can invoke goToIndex() BEFORE open() re-runs for a new session,
        // while the FSM is still `closed` from the PREVIOUS session's
        // close(). This row makes that structurally inert, mirroring
        // closed+SETTLE->NONE, instead of falling through to the legacy
        // unconditional playlistItem()+play() pair against the still-loaded
        // player from the previous session.
        const result = nextStartup(
            { startup: 'closed', desired: null },
            { type: 'NAVIGATE', index: 7 }
        );

        expect(result).toEqual({
            startup: 'closed',
            desired: null,
            effects: []
        });
    });

    it('opening + HANDOFF -> started, NONE (onHandoff already played content)', () => {
        const result = nextStartup(
            { startup: 'opening', desired: 5 },
            { type: 'HANDOFF' }
        );

        expect(result).toEqual({ startup: 'started', desired: 5, effects: [] });
    });

    it('settling + HANDOFF -> started, NONE (onHandoff already played content)', () => {
        const result = nextStartup(
            { startup: 'settling', desired: 5 },
            { type: 'HANDOFF' }
        );

        expect(result).toEqual({ startup: 'started', desired: 5, effects: [] });
    });

    it('started + SETTLE / NAVIGATE -> started, NONE (steady-state nav delegated to existing goToIndex path)', () => {
        const settleResult = nextStartup(
            { startup: 'started', desired: 5 },
            { type: 'SETTLE', landed: 5, prerollActive: false }
        );
        const navigateResult = nextStartup(
            { startup: 'started', desired: 5 },
            { type: 'NAVIGATE', index: 7 }
        );

        expect(settleResult).toEqual({
            startup: 'started',
            desired: 5,
            effects: []
        });
        expect(navigateResult).toEqual({
            startup: 'started',
            desired: 5,
            effects: []
        });
    });

    it('any + CLOSE -> closed (desired=null), NONE (teardown by close())', () => {
        const fromOpening = nextStartup(
            { startup: 'opening', desired: 5 },
            { type: 'CLOSE' }
        );
        const fromStarted = nextStartup(
            { startup: 'started', desired: 5 },
            { type: 'CLOSE' }
        );

        expect(fromOpening).toEqual({
            startup: 'closed',
            desired: null,
            effects: []
        });
        expect(fromStarted).toEqual({
            startup: 'closed',
            desired: null,
            effects: []
        });
    });

    it('closed + SETTLE -> closed, NONE (stale settle STRUCTURALLY inert)', () => {
        const result = nextStartup(
            { startup: 'closed', desired: null },
            { type: 'SETTLE', landed: 3, prerollActive: false }
        );

        expect(result).toEqual({
            startup: 'closed',
            desired: null,
            effects: []
        });
    });

    // Startup watchdog (WI 175632, SDD change carrusel-session-reducer):
    // STARTUP_TIMEOUT gives the FSM an escape hatch when JW never emits
    // 'playlistItem' (stuck provider, malformed source, buggy JW build) or
    // the settle-correction loop keeps re-issuing COMMAND_ITEM without ever
    // landing. `opening`/`settling` are the ONLY states this event can move
    // out of; everywhere else it is structurally inert, exactly like SETTLE
    // in `closed`.
    describe('STARTUP_TIMEOUT (watchdog escape hatch)', () => {
        it('closed + STARTUP_TIMEOUT -> closed, NONE (inert; no live session to fail)', () => {
            const result = nextStartup(
                { startup: 'closed', desired: null },
                { type: 'STARTUP_TIMEOUT' }
            );

            expect(result).toEqual({
                startup: 'closed',
                desired: null,
                effects: []
            });
        });

        it('started + STARTUP_TIMEOUT -> started, NONE (inert; startup already completed)', () => {
            const result = nextStartup(
                { startup: 'started', desired: 5 },
                { type: 'STARTUP_TIMEOUT' }
            );

            expect(result).toEqual({
                startup: 'started',
                desired: 5,
                effects: []
            });
        });

        // WI 175632 Blocker 3 fix (fresh adversarial review): PLAY_AND_REVEAL
        // was removed from the non-preroll timeout path. This FSM's whole
        // invariant (design v3 §2 comment above nextStartup) is that play()
        // is NEVER issued after this session already failed to settle — a
        // blind PLAY_AND_REVEAL here would (a) put a play() in flight that a
        // later `failed`+NAVIGATE recovery's COMMAND_ITEM would then race
        // against (playlistItem() after play() does not re-bind the
        // provider), and (b) play whatever index JW happens to have loaded
        // (NOT `desired`, since reaching `failed` means the provider was
        // never confirmed on target) — a wrong-video Comscore/dataLayer hit,
        // unacceptable for a measurement-correctness ticket. Degrading to
        // `failed` with ONLY the diagnostic effect keeps the player exactly
        // as broken as today's black-player bug (no worse), while making the
        // failure OBSERVABLE and the FSM state genuinely idle for recovery.
        it('opening + STARTUP_TIMEOUT -> failed, REPORT_STARTUP_TIMEOUT only (NO PLAY_AND_REVEAL: JW never settled; report the failure but never issue a blind/wrong-video play)', () => {
            const result = nextStartup(
                { startup: 'opening', desired: 5 },
                { type: 'STARTUP_TIMEOUT' }
            );

            expect(result).toEqual({
                startup: 'failed',
                desired: 5,
                effects: [
                    {
                        type: 'REPORT_STARTUP_TIMEOUT',
                        reason: 'startup-timeout',
                        startupState: 'opening',
                        desired: 5
                    }
                ]
            });
        });

        it('settling + STARTUP_TIMEOUT -> failed, REPORT_STARTUP_TIMEOUT only (NO PLAY_AND_REVEAL: repeated self-correction never landed; report and stay idle for recovery)', () => {
            const result = nextStartup(
                { startup: 'settling', desired: 2 },
                { type: 'STARTUP_TIMEOUT' }
            );

            expect(result).toEqual({
                startup: 'failed',
                desired: 2,
                effects: [
                    {
                        type: 'REPORT_STARTUP_TIMEOUT',
                        reason: 'startup-timeout',
                        startupState: 'settling',
                        desired: 2
                    }
                ]
            });
        });

        it('failed + STARTUP_TIMEOUT -> failed, NONE (inert; already terminal)', () => {
            const result = nextStartup(
                { startup: 'failed', desired: 5 },
                { type: 'STARTUP_TIMEOUT' }
            );

            expect(result).toEqual({
                startup: 'failed',
                desired: 5,
                effects: []
            });
        });

        it('failed + CLOSE -> closed, NONE (a failed session can still be torn down cleanly)', () => {
            const result = nextStartup(
                { startup: 'failed', desired: 5 },
                { type: 'CLOSE' }
            );

            expect(result).toEqual({
                startup: 'closed',
                desired: null,
                effects: []
            });
        });

        // Blocker 1 fix (fresh adversarial review, post-implementation):
        // preroll owns content selection until HANDOFF, exactly like OPEN
        // and SETTLE already guard on `event.prerollActive`. A STARTUP_TIMEOUT
        // firing WHILE an ad break legitimately owns the session must NOT
        // fail startup (that would falsely kill a healthy ad, mis-attribute
        // Comscore/dataLayer, and race a content play() against a still-
        // playing ad) — it must DEFER the budget by re-arming instead. This
        // stays bounded because preroll has its own watchdogs
        // (HANDOFF_WATCHDOG_MS/POST_IMPRESSION_WATCHDOG_MS) that always
        // force a HANDOFF eventually.
        it('opening + STARTUP_TIMEOUT, prerollActive -> opening (UNCHANGED), REARM_STARTUP_WATCHDOG (an ad break legitimately owns the session; defer the budget instead of failing)', () => {
            const result = nextStartup(
                { startup: 'opening', desired: 5 },
                { type: 'STARTUP_TIMEOUT', prerollActive: true }
            );

            expect(result).toEqual({
                startup: 'opening',
                desired: 5,
                effects: [{ type: 'REARM_STARTUP_WATCHDOG' }]
            });
        });

        it('settling + STARTUP_TIMEOUT, prerollActive -> settling (UNCHANGED), REARM_STARTUP_WATCHDOG (same deferral, mid self-correction)', () => {
            const result = nextStartup(
                { startup: 'settling', desired: 2 },
                { type: 'STARTUP_TIMEOUT', prerollActive: true }
            );

            expect(result).toEqual({
                startup: 'settling',
                desired: 2,
                effects: [{ type: 'REARM_STARTUP_WATCHDOG' }]
            });
        });

        // CRITICAL fix (fresh adversarial review): the deferral above is
        // bounded ONLY because preroll's own watchdogs
        // (HANDOFF_WATCHDOG_MS/POST_IMPRESSION_WATCHDOG_MS) always force a
        // HANDOFF eventually — FALSE for a preroll stuck at `queued` and
        // never reaching `loading` (HANDOFF_WATCHDOG_MS is armed only INSIDE
        // maybeStartPreroll() AFTER a successful START). `deferredElapsedMs`
        // is imperative-side accounting (owned by dispatchStartup/
        // applyStartupEffects, NEVER a timer/DOM read inside this pure
        // function) representing how long this session has already been
        // deferring, so nextStartup can enforce an absolute ceiling as pure
        // data-in/data-out, exactly like the `prerollActive` guard itself.
        describe('preroll deferral ceiling (WI 175632 CRITICAL fix: bounded, not infinite)', () => {
            it('opening + STARTUP_TIMEOUT, prerollActive, deferredElapsedMs below PREROLL_DEFERRAL_CEILING_MS -> opening (UNCHANGED), REARM_STARTUP_WATCHDOG (still safely inside the legitimate ad budget)', () => {
                const result = nextStartup(
                    { startup: 'opening', desired: 5 },
                    {
                        type: 'STARTUP_TIMEOUT',
                        prerollActive: true,
                        deferredElapsedMs:
                            PREROLL_DEFERRAL_CEILING_MS - STARTUP_WATCHDOG_MS
                    }
                );

                expect(result).toEqual({
                    startup: 'opening',
                    desired: 5,
                    effects: [{ type: 'REARM_STARTUP_WATCHDOG' }]
                });
            });

            it('opening + STARTUP_TIMEOUT, prerollActive, deferredElapsedMs AT PREROLL_DEFERRAL_CEILING_MS -> failed, REPORT_STARTUP_TIMEOUT{reason: startup-timeout-preroll-stuck} only (NO REARM, NO PLAY_AND_REVEAL: stop deferring and fail instead of hanging forever)', () => {
                const result = nextStartup(
                    { startup: 'opening', desired: 5 },
                    {
                        type: 'STARTUP_TIMEOUT',
                        prerollActive: true,
                        deferredElapsedMs: PREROLL_DEFERRAL_CEILING_MS
                    }
                );

                expect(result).toEqual({
                    startup: 'failed',
                    desired: 5,
                    effects: [
                        {
                            type: 'REPORT_STARTUP_TIMEOUT',
                            reason: 'startup-timeout-preroll-stuck',
                            startupState: 'opening',
                            desired: 5
                        }
                    ]
                });
            });

            it('settling + STARTUP_TIMEOUT, prerollActive, deferredElapsedMs past PREROLL_DEFERRAL_CEILING_MS -> failed, REPORT_STARTUP_TIMEOUT{reason: startup-timeout-preroll-stuck} only (distinct reason from a plain startup timeout, so Datadog can separate a stuck-preroll failure from a stuck-provider one)', () => {
                const result = nextStartup(
                    { startup: 'settling', desired: 2 },
                    {
                        type: 'STARTUP_TIMEOUT',
                        prerollActive: true,
                        deferredElapsedMs:
                            PREROLL_DEFERRAL_CEILING_MS +
                            STARTUP_WATCHDOG_MS * 5
                    }
                );

                expect(result).toEqual({
                    startup: 'failed',
                    desired: 2,
                    effects: [
                        {
                            type: 'REPORT_STARTUP_TIMEOUT',
                            reason: 'startup-timeout-preroll-stuck',
                            startupState: 'settling',
                            desired: 2
                        }
                    ]
                });
            });
        });

        it('failed + OPEN{target} -> opening (desired=target), COMMAND_ITEM(target) (a fresh session recovers normally from a failed one)', () => {
            const result = nextStartup(
                { startup: 'failed', desired: 5 },
                { type: 'OPEN', target: 2, prerollActive: false }
            );

            expect(result).toEqual({
                startup: 'opening',
                desired: 2,
                effects: [{ type: 'COMMAND_ITEM', index: 2 }]
            });
        });

        // Blocker 2 fix (fresh adversarial review): NAVIGATE's switch only
        // audited opening/settling/closed and fell through to the no-op
        // branch (originally dead code, meant only for `started`) for every
        // OTHER state — which silently swallowed `failed` too. Since
        // goToIndex() dispatches NAVIGATE whenever `startup !== 'started'`
        // (which includes `failed`) and STILL returns `true`, an unaudited
        // `failed` row meant every subsequent user swipe after a startup
        // failure did NOTHING while reporting success — an invisibly dead
        // carousel, strictly worse than the black-player bug being fixed.
        // A user-initiated NAVIGATE out of `failed` is therefore treated as
        // an explicit RECOVERY attempt: command the provider to the new
        // target WHILE IDLE (same idle-command guarantee as every other
        // COMMAND_ITEM row) and re-enter `settling` so a subsequent real
        // SETTLE can complete startup normally.
        it('failed + NAVIGATE{i} -> settling (desired=i), COMMAND_ITEM(i) (user-initiated recovery attempt out of a failed session)', () => {
            const result = nextStartup(
                { startup: 'failed', desired: 5 },
                { type: 'NAVIGATE', index: 2 }
            );

            expect(result).toEqual({
                startup: 'settling',
                desired: 2,
                effects: [{ type: 'COMMAND_ITEM', index: 2 }]
            });
        });

        // HANDOFF's switch had the identical unaudited gap: guarded only on
        // opening/settling, falling through to inert for `failed`. A preroll
        // handoff completing AFTER a startup failure (e.g. the user
        // navigated into the ad video post-failure) has ALREADY played
        // content imperatively (finalizePrerollHandoff's own
        // playlistItem()+revealContent() calls, independent of this FSM) —
        // the FSM must reflect that reality by reaching `started`, not stay
        // stuck reporting `failed` forever.
        it('failed + HANDOFF -> started, NONE (a preroll handoff after a startup failure still reaches started; content is genuinely playing)', () => {
            const result = nextStartup(
                { startup: 'failed', desired: 5 },
                { type: 'HANDOFF' }
            );

            expect(result).toEqual({
                startup: 'started',
                desired: 5,
                effects: []
            });
        });
    });
});
