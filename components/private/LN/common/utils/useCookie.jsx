const useCookie = () => {
    // Metodo para setear Cookie
    function setCookie(timeExpiration = 2) {
        const now = new Date();
        const exp = new Date(now.getTime() + timeExpiration * 1000);
        document.cookie = `Token=1; expires=${exp.toUTCString()}`;
        return !!(document.cookie && document.cookie.indexOf('Token=1') !== -1);
    }

    // Metodo para mostrar Cookie
    function getCookie() {
        const name = `token=`;
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return true;
            }
        }
        return false;
    }

    return {
        setCookie,
        getCookie
    };
};

export default useCookie;
