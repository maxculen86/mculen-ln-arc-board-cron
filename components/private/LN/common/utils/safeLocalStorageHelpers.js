import safeJSONParse from '../../../../features/private-global/common/utils/safeJSONParse';

export const safeGetJSON = (key, defaultValue = null) => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        return defaultValue;
    }
    try {
        const item = localStorage.getItem(key);
        return item ? safeJSONParse(item) || defaultValue : defaultValue;
    } catch {
        return defaultValue;
    }
};

export const safeSetJSON = (key, object) => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        return false;
    }
    try {
        localStorage.setItem(key, JSON.stringify(object));
        return true;
    } catch {
        return false;
    }
};
