const useCookie = () => {
    function eraseCookie(nameCookie) {
        console.log('TCL: eraseCookie -> nameCookie', nameCookie);
        document.cookie = `${nameCookie}=false;expires=Thu, 01-Jan-1970 00:00:01 GMT`;
    }

    function setCookie(nameCookie, valueCookie, timeExpiration = 2) {
        if (!nameCookie || typeof nameCookie !== 'string') return false;
        if (nameCookie.length === 0) return false;

        if (!valueCookie || typeof valueCookie !== 'string') return false;
        if (valueCookie.length === 0) return false;

        const now = new Date();
        const exp = new Date(now.getTime() + timeExpiration * 60 * 1000);
        document.cookie = `${nameCookie}=${valueCookie}; expires=${exp.toUTCString()}`;
        return !!(
            document.cookie &&
            document.cookie.indexOf(`${nameCookie}=${valueCookie}`) !== -1
        );
    }

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
        getCookie,
        setCookie,
        eraseCookie
    };
};

export default useCookie;
