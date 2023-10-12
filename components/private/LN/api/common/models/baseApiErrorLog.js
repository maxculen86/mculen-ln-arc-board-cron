export class BaseApiErrorLogs extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.customErrorType = BackEndErrorApiLogs.name;
    }
}

export class BackEndErrorApiLogs extends BaseApiErrorLogs {}

export default BackEndErrorApiLogs;

