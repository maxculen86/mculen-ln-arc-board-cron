import { APIingresar } from 'fusion:environment';

// TODO: hacer esto generico, la url debe llegar por parametro
const baseURL = `${APIingresar}`;

class Httpclient {
    constructor() {}

    /**
     * Makes the http request
     * @param {string} relativeUrl
     * @param {object} options 
     *  { 
     *      method: 'POST',
     *      body: {}
            headers: Headers(),
            mode: 'cors',
            cache: 'default' 
        }
     */
    exec(relativeUrl, options) {
        return fetch(`${baseURL}${relativeUrl}`, options);
    }
}

export default Httpclient;
