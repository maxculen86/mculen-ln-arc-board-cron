import get from '../../../../private/common/utils/get';

const COMSCORE_PUBLISHER_ID = '6906398';
const COMSCORE_PUBLISHER_LABELS =
    'c3="lanacion.com.ar", c4="*null", c6="*null", ns_st_pu="La Nación"';
const MAX_COMSCORE_RETRY_ATTEMPTS = 100;

// Comscore breaks if its plugin is attached more than once per page.
let comscoreAttached = false;

export const resetComscoreGuard = () => {
    comscoreAttached = false;
};

export const attachComscorePlugin = player => {
    if (typeof window === 'undefined') return false;

    const comscorePlugin = get(window, 'ns_.ComscoreJWPlayerPlugin');
    if (typeof comscorePlugin !== 'function') return false;
    if (comscoreAttached) return true;

    comscoreAttached = true;
    comscorePlugin(player, {
        publisherId: COMSCORE_PUBLISHER_ID,
        labelmapping: `${COMSCORE_PUBLISHER_LABELS}, ns_st_ct=comscoreContentType, ns_st_cl=comscoreClipLength`
    });

    return true;
};

let comscoreRetryTimeout = null;
let comscoreReadyHandled = false;
let comscoreRetryCount = 0;

export const clearComscoreRetry = () => {
    if (!comscoreRetryTimeout) return;

    clearTimeout(comscoreRetryTimeout);
    comscoreRetryTimeout = null;
};

export const resetComscoreAttachmentState = () => {
    comscoreReadyHandled = false;
    comscoreRetryCount = 0;
    clearComscoreRetry();
};

const retryAttachComscorePlugin = (getPlayer, attach, onGiveUp) => {
    const player = getPlayer();
    if (!player) {
        clearComscoreRetry();
        comscoreRetryCount = 0;
        return;
    }

    if (attach(player)) {
        clearComscoreRetry();
        comscoreRetryCount = 0;
        return;
    }

    comscoreRetryCount += 1;
    if (comscoreRetryCount >= MAX_COMSCORE_RETRY_ATTEMPTS) {
        const attempts = comscoreRetryCount;
        clearComscoreRetry();
        comscoreRetryCount = 0;
        if (typeof onGiveUp === 'function') onGiveUp({ attempts });
        return;
    }

    clearComscoreRetry();
    const delay = Math.min(100 * 2 ** (comscoreRetryCount - 1), 1000);
    comscoreRetryTimeout = setTimeout(
        () => retryAttachComscorePlugin(getPlayer, attach, onGiveUp),
        delay
    );
};

export const tryAttachComscorePlugin = (getPlayer, attach, onGiveUp) => {
    if (comscoreReadyHandled) return;

    comscoreReadyHandled = true;
    retryAttachComscorePlugin(getPlayer, attach, onGiveUp);
};
