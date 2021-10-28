class LnError extends Error {
    constructor(message, { customErrorType }) {
        super(message);
        this.customErrorType = customErrorType;
    }
}

export default LnError;
