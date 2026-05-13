/*
 * Private-mode heuristics adapted from detectIncognito v1.6.2:
 * https://github.com/Joe12387/detectIncognito (MIT).
 */
const CACHE_KEY = '__LNIncognitoModePromise';
const DETECTION_TIMEOUT_MS = 500;
const CHROMIUM_DEFAULT_QUOTA_LIMIT = 1073741824;
const BYTES_PER_MEBIBYTE = 1024 * 1024;

const getErrorMessage = error =>
    error && typeof error.message === 'string' ? error.message : String(error);

const withTimeout = promise =>
    new Promise(resolve => {
        let settled = false;
        let timeoutId;

        const finish = value => {
            if (settled) return;
            settled = true;
            clearTimeout(timeoutId);
            resolve(Boolean(value));
        };

        timeoutId = setTimeout(() => finish(false), DETECTION_TIMEOUT_MS);

        Promise.resolve(promise)
            .then(finish)
            .catch(() => finish(false));
    });

const getUserAgent = () =>
    typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';

const isIOS = () => {
    if (typeof navigator === 'undefined') return false;

    return (
        /iPad|iPhone|iPod/.test(getUserAgent()) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    );
};

const getToFixedEngineId = () => {
    let engineId = 0;
    const negative = parseInt('-1', 10);

    try {
        negative.toFixed(negative);
    } catch (error) {
        engineId = getErrorMessage(error).length;
    }

    return engineId;
};

const isSafari = () => {
    const userAgent = getUserAgent();
    const engineId = getToFixedEngineId();
    const hasSafariUserAgent =
        /Safari/i.test(userAgent) &&
        !/Chrome|Chromium|CriOS|FxiOS|Edg|OPR|Opera/i.test(userAgent);

    return isIOS() || hasSafariUserAgent || engineId === 44 || engineId === 43;
};

const isFirefox = () =>
    /Firefox|FxiOS/i.test(getUserAgent()) || getToFixedEngineId() === 25;

const isMSIE = () =>
    typeof navigator !== 'undefined' && navigator.msSaveBlob !== undefined;

const isChromium = () => {
    if (typeof navigator === 'undefined' || typeof window === 'undefined') {
        return false;
    }

    return (
        /Chrome|Chromium|CriOS|Edg|OPR|Opera/i.test(getUserAgent()) ||
        navigator.brave !== undefined ||
        navigator.webkitTemporaryStorage !== undefined ||
        window.webkitRequestFileSystem !== undefined ||
        getToFixedEngineId() === 51
    );
};

const hasStorageDirectory = () =>
    typeof navigator !== 'undefined' &&
    navigator.storage &&
    typeof navigator.storage.getDirectory === 'function';

const detectStorageDirectoryError = expectedError =>
    navigator.storage
        .getDirectory()
        .then(() => false)
        .catch(error => getErrorMessage(error).includes(expectedError));

const detectOldSafariPrivateMode = () => {
    const openDB = window.openDatabase;
    const storage = window.localStorage;

    if (typeof openDB !== 'function') return false;

    try {
        openDB(null, null, null, null);
    } catch (error) {
        return true;
    }

    try {
        storage.setItem('test', '1');
        storage.removeItem('test');
    } catch (error) {
        return true;
    }

    return false;
};

const detectSafari13to18PrivateMode = () =>
    new Promise(resolve => {
        if (!window.indexedDB) {
            resolve(false);
            return;
        }

        const dbName = String(Math.random());

        try {
            const request = window.indexedDB.open(dbName, 1);

            request.onupgradeneeded = event => {
                const db = event.target.result;

                try {
                    db.createObjectStore('t', { autoIncrement: true }).put(
                        new Blob()
                    );
                    resolve(false);
                } catch (error) {
                    resolve(
                        getErrorMessage(error).includes('are not yet supported')
                    );
                } finally {
                    db.close();
                    window.indexedDB.deleteDatabase(dbName);
                }
            };

            request.onerror = () => resolve(false);
        } catch (error) {
            resolve(false);
        }
    });

const detectSafariPrivateMode = () => {
    if (hasStorageDirectory()) {
        return detectStorageDirectoryError('unknown transient reason');
    }

    if (navigator.maxTouchPoints !== undefined) {
        return detectSafari13to18PrivateMode();
    }

    return Promise.resolve(detectOldSafariPrivateMode());
};

const getQuotaLimit = () => {
    const memory =
        window.performance &&
        window.performance.memory &&
        window.performance.memory.jsHeapSizeLimit;

    return memory || CHROMIUM_DEFAULT_QUOTA_LIMIT;
};

const detectChromiumByQuota = () =>
    new Promise(resolve => {
        navigator.webkitTemporaryStorage.queryUsageAndQuota(
            (_, quota) => {
                const quotaInMib = Math.round(quota / BYTES_PER_MEBIBYTE);
                const quotaLimitInMib =
                    Math.round(getQuotaLimit() / BYTES_PER_MEBIBYTE) * 2;

                resolve(quotaInMib < quotaLimitInMib);
            },
            () => resolve(false)
        );
    });

const detectOldChromiumPrivateMode = () =>
    new Promise(resolve => {
        const requestFileSystem = window.webkitRequestFileSystem;

        if (typeof requestFileSystem !== 'function') {
            resolve(false);
            return;
        }

        requestFileSystem(
            0,
            1,
            () => resolve(false),
            () => resolve(true)
        );
    });

const detectChromiumPrivateMode = () => {
    if (
        navigator.webkitTemporaryStorage &&
        typeof navigator.webkitTemporaryStorage.queryUsageAndQuota ===
            'function'
    ) {
        return detectChromiumByQuota();
    }

    return detectOldChromiumPrivateMode();
};

const detectFirefoxPrivateMode = () => {
    if (hasStorageDirectory()) {
        return detectStorageDirectoryError('Security error');
    }

    return new Promise(resolve => {
        if (!window.indexedDB) {
            resolve(false);
            return;
        }

        let request;

        try {
            request = window.indexedDB.open('inPrivate');
        } catch (error) {
            resolve(false);
            return;
        }

        request.onerror = event => {
            if (request.error && request.error.name === 'InvalidStateError') {
                event.preventDefault();
            }

            resolve(true);
        };

        request.onsuccess = () => {
            window.indexedDB.deleteDatabase('inPrivate');
            resolve(false);
        };
    });
};

const detectMSIEPrivateMode = () =>
    Promise.resolve(window.indexedDB === undefined);

const detectPrivateMode = () => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return Promise.resolve(false);
    }

    if (isMSIE()) return detectMSIEPrivateMode();
    if (isSafari()) return detectSafariPrivateMode();
    if (isFirefox()) return detectFirefoxPrivateMode();
    if (isChromium()) return detectChromiumPrivateMode();

    return Promise.resolve(false);
};

export const detectIncognitoMode = () => {
    if (typeof window === 'undefined') {
        return Promise.resolve(false);
    }

    if (!window[CACHE_KEY]) {
        window[CACHE_KEY] = withTimeout(detectPrivateMode());
    }

    return window[CACHE_KEY];
};
