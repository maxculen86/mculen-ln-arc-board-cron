export default class NotFoundError extends Error {
    constructor(message = '') {
        const newMessaje = message.includes('404')
            ? message
            : `404 - ${message}`;
        super(newMessaje);
        this.lnIgnore = true;
        this.statusCode = 404;
    }
}
