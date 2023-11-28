export default class Redirect extends Error {
    constructor(location, statusCode) {
        super();
        this.location = location;
        this.statusCode = statusCode || 302;

        console.log(
            `Redirecting to: ${this.location}, Status Code: ${this.statusCode}`
        );
    }
}
