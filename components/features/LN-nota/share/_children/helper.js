export const handleIaToggle = ({
    isIaVisible,
    setIsIaVisible,
    callback = () => null
}) => {
    const shouldShowIa = !isIaVisible;
    setIsIaVisible(shouldShowIa);
    window.LN.observable.publish('showIa', { show: shouldShowIa });
    localStorage.setItem('IA-feature-tracking', 'wasDisplayed');
    callback?.();
};

export const IA_FEATURE_TRACKING_STORAGE = {
    key: 'IA-feature-tracking',
    value: 'wasDisplayed'
};
