export class BackendLnError extends Error {
    constructor(message, type) {
        super(message, type);
        this.name = BackendLnError.name;
        this.customErrorType = type;
    }
}

export default BackendLnError;
