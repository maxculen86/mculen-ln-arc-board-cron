export class LnBackendError extends Error {
    constructor(message, type) {
        super(message, type);
        this.name = LnBackendError.name;
        this.customErrorType = type;
    }
}

export default LnBackendError;
