export const getMicPermissionState = async () => {
    try {
        if (typeof navigator === 'undefined') return null;
        if (!navigator.permissions?.query) return null;

        const status = await navigator.permissions.query({
            name: 'microphone'
        });
        return status?.state || null;
    } catch {
        return null;
    }
};
