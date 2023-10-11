export class BaseApiErrorLogs extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.customErrorType = BackEndErrorApiLogs.name;//Object.getPrototypeOf(this.__proto__);
    }
}

export class BackEndErrorApiLogs extends BaseApiErrorLogs {}

export default BackEndErrorApiLogs;

