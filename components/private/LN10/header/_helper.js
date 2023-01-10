export const setUserType = (isUserLoggedIn, isUserSubscribed) => {
    if (isUserSubscribed) return 'suscribed';
    if (isUserLoggedIn) return 'logged';
    return 'unlogged';
};
