export const handleIaToggle = (isIaVisible, setIsIaVisible) => {
    const shouldShowIa = !isIaVisible;
    setIsIaVisible(shouldShowIa);
    window.LN.observable.publish('showIa', { show: shouldShowIa });
};
