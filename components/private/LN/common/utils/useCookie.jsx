const useCookie = () => {
    // Metodo para setear Cookie
    /* function setCookie(timeExpiration = 2) {
        const now = new Date();
        const exp = new Date(now.getTime() + timeExpiration * 1000);
        document.cookie = `Token=1; expires=${exp.toUTCString()}`;
        return !!(document.cookie && document.cookie.indexOf('Token=1') !== -1);
    } */

    // Metodo para mostrar Cookie
    function getCookie(nameCookie) {
        if (!nameCookie) return undefined;

        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${nameCookie}=`);
        return parts.length === 2
            ? parts
                  .pop()
                  .split(';')
                  .shift()
            : undefined;
    }

    return {
        getCookie
    };
};

export default useCookie;
