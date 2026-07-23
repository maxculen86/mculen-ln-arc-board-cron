// Leaf module — pure Startup FSM transition function + watchdog budget
// constants, no module-level mutable state.
import { POST_IMPRESSION_WATCHDOG_MS } from './jwAdPlayerManager';

export const STARTUP_WATCHDOG_MS = 10000;

export const PREROLL_DEFERRAL_CEILING_MS =
    POST_IMPRESSION_WATCHDOG_MS + STARTUP_WATCHDOG_MS;

// The startup FSM issues a playlistItem command only while idle. Once play()
// is in flight for the session, re-targeting the provider does not re-bind it
// (wrong-video-playing/stuck-idle) — so play() is always the FSM's last
// effect, never followed by another command.
export const nextStartup = ({ startup, desired }, event) => {
    switch (event.type) {
        case 'OPEN':
            return {
                startup: 'opening',
                desired: event.target,
                effects: event.prerollActive
                    ? []
                    : [{ type: 'COMMAND_ITEM', index: event.target }]
            };

        case 'NAVIGATE':
            if (startup === 'opening') {
                return {
                    startup: 'opening',
                    desired: event.index,
                    effects: []
                };
            }
            if (startup === 'settling') {
                if (event.index === desired) {
                    return { startup: 'settling', desired, effects: [] };
                }
                return {
                    startup: 'settling',
                    desired: event.index,
                    effects: [{ type: 'COMMAND_ITEM', index: event.index }]
                };
            }
            if (startup === 'closed') {
                return { startup: 'closed', desired, effects: [] };
            }
            if (startup === 'failed') {
                return {
                    startup: 'settling',
                    desired: event.index,
                    effects: [{ type: 'COMMAND_ITEM', index: event.index }]
                };
            }
            return { startup, desired, effects: [] };

        case 'SETTLE':
            if (startup !== 'opening' && startup !== 'settling') {
                return { startup, desired, effects: [] };
            }
            if (event.prerollActive) {
                return { startup, desired, effects: [] };
            }
            if (event.landed === desired) {
                return {
                    startup: 'started',
                    desired,
                    effects: [{ type: 'PLAY_AND_REVEAL' }]
                };
            }
            return {
                startup: 'settling',
                desired,
                effects: [{ type: 'COMMAND_ITEM', index: desired }]
            };

        case 'HANDOFF':
            if (
                startup === 'opening' ||
                startup === 'settling' ||
                startup === 'failed'
            ) {
                return { startup: 'started', desired, effects: [] };
            }
            return { startup, desired, effects: [] };

        case 'CLOSE':
            return { startup: 'closed', desired: null, effects: [] };

        case 'STARTUP_TIMEOUT':
            if (startup !== 'opening' && startup !== 'settling') {
                return { startup, desired, effects: [] };
            }
            if (event.prerollActive) {
                if (event.deferredElapsedMs >= PREROLL_DEFERRAL_CEILING_MS) {
                    return {
                        startup: 'failed',
                        desired,
                        effects: [
                            {
                                type: 'REPORT_STARTUP_TIMEOUT',
                                reason: 'startup-timeout-preroll-stuck',
                                startupState: startup,
                                desired
                            }
                        ]
                    };
                }
                return {
                    startup,
                    desired,
                    effects: [{ type: 'REARM_STARTUP_WATCHDOG' }]
                };
            }
            return {
                startup: 'failed',
                desired,
                effects: [
                    {
                        type: 'REPORT_STARTUP_TIMEOUT',
                        reason: 'startup-timeout',
                        startupState: startup,
                        desired
                    }
                ]
            };

        default:
            return { startup, desired, effects: [] };
    }
};
