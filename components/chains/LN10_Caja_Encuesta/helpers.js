import safeJSONParse from '../../features/private-global/common/utils/safeJSONParse';
import {
    safeGetJSON,
    safeSetJSON
} from '../../private/LN/common/utils/safeLocalStorageHelpers';
import {
    BOX_LOCATIONS,
    CAJA_1_VIEWPORT_THRESHOLD,
    ANONYMOUS_VOTE_ATTEMPT_RESULTS,
    ENCUESTA_HOME_STATE_STORAGE_KEY,
    ENCUESTA_POST_ID,
    ENCUESTA_VOTE_STORAGE_KEY,
    USER_STATE_CODES
} from './constants';

export const DEFAULT_ENCUESTA_HOME_STATE = {
    box1ViewportEntryCount: 0,
    box2ViewportEntryCount: 0
};

export const parseStorageJson = value => {
    if (!value) return null;
    if (typeof value === 'object') return value;

    const parsedValue = safeJSONParse(value, null);
    return parsedValue && typeof parsedValue === 'object' ? parsedValue : null;
};

const normalizeViewportEntryCount = value => {
    const numberValue = Number(value);

    if (!Number.isFinite(numberValue) || numberValue < 0) return 0;

    return Math.floor(numberValue);
};

export const parseEncuestaVote = ndEncuestaVoteStorageValue => {
    const parsedValue = parseStorageJson(ndEncuestaVoteStorageValue);
    const isCurrentPoll = Boolean(
        parsedValue?.pollId && String(parsedValue.pollId) === ENCUESTA_POST_ID
    );

    if (!isCurrentPoll) {
        return {
            hasPosted: false,
            deferredVote: false,
            timestamp: null,
            data: null
        };
    }

    return {
        hasPosted: parsedValue?.hasPosted === true,
        deferredVote: parsedValue?.deferredVote === true,
        timestamp: parsedValue?.timestamp || null,
        data: parsedValue
    };
};

export const getDeferredVoteKey = (webComponentVoteState = {}) => {
    if (webComponentVoteState.deferredVote !== true) return null;

    const { timestamp } = webComponentVoteState;
    const result =
        webComponentVoteState.hasPosted === true
            ? ANONYMOUS_VOTE_ATTEMPT_RESULTS.POSTED
            : ANONYMOUS_VOTE_ATTEMPT_RESULTS.NOT_POSTED;

    if (!timestamp) return null;

    return [timestamp, result].join('|');
};

export const parseEncuestaHomeState = value => {
    const parsedValue = parseStorageJson(value) || {};

    return {
        ...parsedValue,
        box1ViewportEntryCount: normalizeViewportEntryCount(
            parsedValue.box1ViewportEntryCount
        ),
        box2ViewportEntryCount: normalizeViewportEntryCount(
            parsedValue.box2ViewportEntryCount
        )
    };
};

export const writeEncuestaHomeState = nextState => {
    const parsedState = parseEncuestaHomeState(nextState);
    const wasSaved = safeSetJSON(ENCUESTA_HOME_STATE_STORAGE_KEY, parsedState);

    return wasSaved ? parsedState : null;
};

export const incrementEncuestaViewportCount = ({
    boxLocation,
    encuestaHomeState = DEFAULT_ENCUESTA_HOME_STATE
} = {}) => {
    const parsedState = parseEncuestaHomeState(encuestaHomeState);

    if (boxLocation === BOX_LOCATIONS.CAJA_2) {
        return {
            ...parsedState,
            box2ViewportEntryCount: parsedState.box2ViewportEntryCount + 1
        };
    }

    return {
        ...parsedState,
        box1ViewportEntryCount: parsedState.box1ViewportEntryCount + 1
    };
};

export const getViewportCountByBoxLocation = ({
    boxLocation,
    encuestaHomeState = DEFAULT_ENCUESTA_HOME_STATE
} = {}) => {
    const parsedState = parseEncuestaHomeState(encuestaHomeState);

    return boxLocation === BOX_LOCATIONS.CAJA_2
        ? parsedState.box2ViewportEntryCount
        : parsedState.box1ViewportEntryCount;
};

export const getAnonymousVoteAttemptState = ({
    webComponentVoteState = {},
    encuestaHomeState = DEFAULT_ENCUESTA_HOME_STATE
} = {}) => {
    const hasAnonymousVoteAttempt = webComponentVoteState.deferredVote === true;
    const anonymousVoteAttemptKey = getDeferredVoteKey(webComponentVoteState);
    const parsedHomeState = parseEncuestaHomeState(encuestaHomeState);
    const hasValidAnonymousVoteAttempt =
        hasAnonymousVoteAttempt && Boolean(anonymousVoteAttemptKey);
    const hasConsumedDeferredVoteRender =
        hasValidAnonymousVoteAttempt &&
        parsedHomeState.consumedDeferredVoteKey === anonymousVoteAttemptKey;
    let result = null;

    if (hasValidAnonymousVoteAttempt && !hasConsumedDeferredVoteRender) {
        result =
            webComponentVoteState.hasPosted === true
                ? ANONYMOUS_VOTE_ATTEMPT_RESULTS.POSTED
                : ANONYMOUS_VOTE_ATTEMPT_RESULTS.NOT_POSTED;
    }

    return {
        hasAttempt: hasAnonymousVoteAttempt,
        hasConsumedDeferredVoteRender,
        result,
        key: anonymousVoteAttemptKey
    };
};

export const shouldApplyDeferredVoteRender = anonymousVoteAttemptState =>
    anonymousVoteAttemptState?.hasAttempt &&
    Boolean(anonymousVoteAttemptState?.key) &&
    !anonymousVoteAttemptState?.hasConsumedDeferredVoteRender;

export const getEncuestaTargetBoxLocation = ({
    webComponentVoteState = {},
    encuestaHomeState = DEFAULT_ENCUESTA_HOME_STATE,
    now = Date.now()
} = {}) => {
    const anonymousVoteAttemptState = getAnonymousVoteAttemptState({
        webComponentVoteState,
        encuestaHomeState,
        now
    });

    if (shouldApplyDeferredVoteRender(anonymousVoteAttemptState)) {
        return BOX_LOCATIONS.CAJA_1;
    }

    if (webComponentVoteState.hasPosted !== true) return BOX_LOCATIONS.CAJA_1;

    const box1ViewportEntryCount = normalizeViewportEntryCount(
        encuestaHomeState.box1ViewportEntryCount
    );

    return box1ViewportEntryCount >= CAJA_1_VIEWPORT_THRESHOLD
        ? BOX_LOCATIONS.CAJA_2
        : BOX_LOCATIONS.CAJA_1;
};

export const getEncuestaRenderStateFromStorage = ({
    now = Date.now()
} = {}) => {
    const webComponentVoteState = parseEncuestaVote(
        safeGetJSON(ENCUESTA_VOTE_STORAGE_KEY, null)
    );
    const encuestaHomeState = parseEncuestaHomeState(
        safeGetJSON(ENCUESTA_HOME_STATE_STORAGE_KEY, null)
    );
    const anonymousVoteAttemptState = getAnonymousVoteAttemptState({
        webComponentVoteState,
        encuestaHomeState,
        now
    });

    return {
        targetBoxLocation: getEncuestaTargetBoxLocation({
            webComponentVoteState,
            encuestaHomeState,
            now
        }),
        anonymousVoteAttemptState
    };
};

export const getEncuestaUserStateCode = ({
    webComponentVoteState = {},
    encuestaHomeState = DEFAULT_ENCUESTA_HOME_STATE,
    anonymousVoteAttemptState = {}
} = {}) => {
    if (shouldApplyDeferredVoteRender(anonymousVoteAttemptState)) {
        return anonymousVoteAttemptState.result ===
            ANONYMOUS_VOTE_ATTEMPT_RESULTS.POSTED
            ? USER_STATE_CODES.POSTED_LOGIN_RETURN
            : USER_STATE_CODES.NOT_POSTED_LOGIN_CANCELLED;
    }

    const parsedState = parseEncuestaHomeState(encuestaHomeState);
    const box1ViewportEntryCount = normalizeViewportEntryCount(
        parsedState.box1ViewportEntryCount
    );
    const hasPosted = webComponentVoteState.hasPosted === true;

    if (!hasPosted) {
        return box1ViewportEntryCount >= 2
            ? USER_STATE_CODES.NOT_POSTED_TWO_OR_MORE_VIEWS
            : USER_STATE_CODES.NOT_POSTED_FIRST_VIEW;
    }

    if (box1ViewportEntryCount >= CAJA_1_VIEWPORT_THRESHOLD) {
        return USER_STATE_CODES.POSTED_THREE_OR_MORE_VIEWS;
    }

    return USER_STATE_CODES.POSTED_LESS_THAN_THREE_VIEWS;
};

export const isValidBoxLocation = boxLocation =>
    Object.values(BOX_LOCATIONS).includes(boxLocation);

export const shouldRenderEncuesta = ({
    ready,
    segment,
    boxLocation,
    targetBoxLocation = BOX_LOCATIONS.CAJA_1
}) =>
    ready &&
    segment === 'test' &&
    isValidBoxLocation(boxLocation) &&
    boxLocation === targetBoxLocation;
