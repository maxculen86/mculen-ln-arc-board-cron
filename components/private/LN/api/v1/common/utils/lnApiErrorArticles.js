export default class LNApiErrorArticles extends Error {
    constructor(message = '', name = 'lnApiErrorArticles') {
        super(message);
        this.name = name;
        this.statusCode = 404;
    }
}
