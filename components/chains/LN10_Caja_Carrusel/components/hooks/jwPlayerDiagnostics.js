// Leaf module (no state, no player imports) so both jwPlayerManager and
// jwAdPlayerManager can import it without a circular dependency.

export const LEGACY_PREROLL_REASON_MAP = {
    watchdog: 'post-impression-watchdog',
    'no-fill': 'handoff-watchdog',
    error: 'ad-error',
    success: 'success',
    skip: 'skip'
};

export const ERROR_PREROLL_REASONS = [
    'error',
    'watchdog',
    'no-fill',
    'startup-exception'
];

export const emitDiagnostic = (context, { errorMessage, error } = {}) => {
    if (!errorMessage && !error) return;
    try {
        // Prefer the real error (keeps its message and stack); fall back to a
        // synthesized one when only a message is available.
        console.error(error || new Error(errorMessage), context);
    } catch (loggingError) {
        // Diagnostics must never break the surrounding player flow.
    }
};

export const reportPrerollDiagnostic = (
    reason,
    controllerId,
    disposal,
    error
) => {
    // Only real error terminals are logged. Routine outcomes (success, skip,
    // ad-requested-content-resume) were Datadog analytics actions, never
    // errors, so they produce no console output.
    if (!ERROR_PREROLL_REASONS.includes(reason)) return;

    const legacyReason = LEGACY_PREROLL_REASON_MAP[reason];
    const context = {
        reason,
        ...(legacyReason && { legacyReason }),
        controllerId,
        ...(disposal && { disposal }),
        source: 'jwPlayerManager/preroll'
    };

    emitDiagnostic(context, { errorMessage: `preroll ${reason}`, error });
};

export const reportStartupDiagnostic = (reason, startupState, desired) => {
    emitDiagnostic(
        {
            reason,
            startupState,
            desired,
            source: 'jwPlayerManager/startup'
        },
        { errorMessage: 'startup timeout' }
    );
};

export const reportComscoreDiagnostic = attempts => {
    emitDiagnostic(
        {
            reason: 'comscore-attach-giveup',
            attempts,
            source: 'jwPlayerManager/comscore'
        },
        { errorMessage: 'comscore attach giveup' }
    );
};

export const handleComscoreGiveUp = ({ attempts } = {}) =>
    reportComscoreDiagnostic(attempts);
