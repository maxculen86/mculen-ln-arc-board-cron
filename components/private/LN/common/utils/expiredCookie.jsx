const expiredCookie = () => {
    function setCookie(timeExpiration = 2) {
        const now = new Date();
        const exp = new Date(now.getTime() + timeExpiration * 1000);
        document.cookie = `Token=1; expires=${exp.toUTCString()}`;
        return !!(document.cookie && document.cookie.indexOf('Token=1') !== -1);
    }

    function getCookie() {
        return !!(document.cookie && document.cookie.indexOf('Token=1') !== -1);
    }

    return {
        setCookie,
        getCookie
    };
};

export default expiredCookie;
