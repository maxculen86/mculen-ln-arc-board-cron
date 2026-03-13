import handleCookie from '../../../LN/common/utils/handleCookie';
import { isSubscribed } from '../helper/loginHelper';

const { getCookie } = handleCookie();

export const getUserType = (userEmail, userIsSubscribed) => {
    if (userIsSubscribed) {
        return 'subscribed';
    }

    if (userEmail) {
        return 'logged';
    }

    return 'unlogged';
};

const getUserData = (valueSuscription = '') => {
    if (getCookie('token')) {
        const userName = getCookie('usuario%5Fdetalle%5Fnombre');
        const userLastName = getCookie('usuario%5Fdetalle%5Fapellido');
        const userEmail = getCookie('usuarioemail');
        const userId = getCookie('usuario%5Fid');
        const isSubscriber = isSubscribed(valueSuscription);

        return {
            userType: getUserType(userEmail, isSubscriber),
            userName,
            userEmail,
            userId,
            userLastName,
            isSubscribed: isSubscriber
        };
    }

    return {
        userType: 'unlogged',
        userEmail: '',
        userName: '',
        userLastName: '',
        userId: '',
        isSubscribed: false
    };
};

export default getUserData;
