const LnCLientWarning = ({ message = '', customsProps = {} } = {}) => {
    if (typeof window !== 'undefined' && Object.keys(customsProps).length) {
        const { type, source, template, layout } = customsProps;
        window.DD_LOGS.onReady(function() {
            window.DD_LOGS.logger.warn(message, {
                ...customsProps,
                customErrorType: 'controlado',
                type,
                source,
                template,
                layout
            });
        });
        return {
            message,
            customsProps: {
                ...customsProps,
                customErrorType: 'controlado',
                type,
                source,
                template,
                layout
            }
        };
    }
};

export default LnCLientWarning;
