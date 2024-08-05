import { getConfig } from '../common/utils/promotions';
import getUserInitials from '../../../private/common/utils/getUserInitials';
import useGetUserData from '../../../../auth/hooks/useGetUserData';
import { SUBSCRIBED_HELPER } from '../../../../auth/helper/loginHelper';

const useGetUserConfig = () => {
    const {
        userType = 'loading',
        isSubscribed = false,
        userEmail = '',
        userName = '',
        userLastName = ''
    } = useGetUserData(SUBSCRIBED_HELPER.FOODIT);

    return {
        userType,
        initials: getUserInitials(userName, userLastName, userEmail),
        initialsClassName: isSubscribed
            ? 'bg-primary-positive'
            : 'bg-light-600',
        email: userEmail,
        suscription: isSubscribed ? 'Suscriptor digital' : 'Sin suscripción',
        isSubscribed,
        promotions: getConfig(userType)
    };
};

export default useGetUserConfig;
