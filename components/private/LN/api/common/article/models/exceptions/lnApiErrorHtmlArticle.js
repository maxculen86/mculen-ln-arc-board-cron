export default class LNApiErrorHtmlArticle extends Error {
    constructor(message = '', name = 'lnApiErrorHtmlArticle') {
        super(message);
        this.name = name;
        this.statusCode = 404;
    }
}
