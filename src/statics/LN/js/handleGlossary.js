function handleGlossary(event, key = '') {
    window.LN.observable.publish('handleGlossary', {
        show: true,
        key,
        event
    });
}

window.addEventListener('DOMContentLoaded', () => {
    window.LN = {
        ...window.LN,
        handleGlossary
    };
});
