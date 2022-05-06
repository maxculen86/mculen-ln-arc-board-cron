import handleCookie from '../../LN/common/utils/handleCookie';

const getToken = () => {
    const { getCookie } = handleCookie();
    return getCookie('token');
};

export default getToken;
