export default class NotFoundError extends Error {
    constructor(message = '') {
        const newMessage = message.includes('404')
            ? message
            : `404 - ${message}`;
        super(newMessage);
        this.lnIgnore = true;
        this.statusCode = 404;
    }
}
