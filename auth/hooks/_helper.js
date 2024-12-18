import handleCookie from '../../components/private/LN/common/utils/handleCookie';
import { isSubscribed } from '../helper/loginHelper';

const { getCookie } = handleCookie();

export const getUserType = (userEmail, isSubscriber) => {
    if (isSubscriber) {
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
        const isSubscriber = isSubscribed(valueSuscription);

        return {
            userType: getUserType(userEmail, isSubscriber),
            userName,
            userEmail,
            userLastName,
            isSubscribed: isSubscriber
        };
    }

    return {
        userType: 'unlogged',
        userEmail: '',
        userName: '',
        userLastName: '',
        isSubscribed: false
    };
};

export default getUserData;
