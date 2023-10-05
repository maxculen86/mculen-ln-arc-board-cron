export default class UnAuthorization extends Error {
    constructor(message = '') {
        const newMessaje = message.includes('403')
            ? message
            : `403 - ${message}`;
        super(newMessaje);
        this.lnIgnore = true;
        this.statusCode = 403;
    }
}
