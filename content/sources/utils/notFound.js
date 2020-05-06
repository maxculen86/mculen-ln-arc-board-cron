export default class NotFound extends Error {
    constructor(statusCode) {
        super();
        this.statusCode = statusCode || 404;
    }
}
