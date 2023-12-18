import handleCookie from '../../LN/common/utils/handleCookie';

const getToken = (cookie = 'token') => {
    const { getCookie } = handleCookie();
    return getCookie(cookie);
};

export default getToken;
