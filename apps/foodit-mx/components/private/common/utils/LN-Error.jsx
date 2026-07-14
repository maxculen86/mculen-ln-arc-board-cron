class LnError extends Error {
    constructor(message, customsProps) {
        const { customErrorType, url, contentSource } = customsProps;
        super(message);
        this.customErrorType = customErrorType;
        this.url = url;
        this.contentSource = contentSource;
    }
}

export default LnError;
