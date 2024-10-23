export const scheduleTask = callback => {
    const fallback = () => setTimeout(callback, 0);

    if (typeof requestIdleCallback === 'function') {
        return window.requestIdleCallback(callback);
    }

    return fallback();
};
