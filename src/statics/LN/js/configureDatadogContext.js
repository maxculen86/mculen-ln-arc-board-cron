const obj = JSON.parse(
    document
        .getElementById('script-configure-datadog-context')
        .getAttribute('data-obj')
);

const attName = 'fusion_info';

window.DD_LOGS.onReady(() => {
    window.DD_LOGS.logger.setContextProperty(attName, obj);
});

window.DD_RUM.onReady(() => {
    window.DD_RUM.setGlobalContextProperty(attName, obj);
});
