export const getUserType = (userEmail, userIsSubscribed) => {
    if (userIsSubscribed) {
        return 'subscribed';
    }

    if (userEmail) {
        return 'logged';
    }

    return 'unlogged';
};

const getUnloggedUserData = () => ({
    userType: 'unlogged',
    userEmail: '',
    userName: '',
    userLastName: '',
    userId: '',
    isSubscribed: false
});

const getUserData = async (valueSuscription = '') => {
    const userInfo = await window?.UCL?.GetUserInfo?.();

    if (!userInfo) {
        return getUnloggedUserData();
    }

    const {
        given_name: userName,
        family_name: userLastName,
        current_login_email: userEmail,
        ln_user_id: userId,
        productos_premium: productosPremium
    } = userInfo;

    const isSubscriber =
        Array.isArray(productosPremium) &&
        productosPremium.includes(Number(valueSuscription));

    return {
        userType: getUserType(userEmail, isSubscriber),
        userName,
        userEmail,
        userId,
        userLastName,
        isSubscribed: isSubscriber
    };
};

export default getUserData;
