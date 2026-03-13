import getUserInitials from '../../../private/common/utils/getUserInitials';
import useGetUserData from '../../../private/common/auth/hooks/useGetUserData';
import { SUBSCRIBED_HELPER } from '../../../private/common/auth/helper/loginHelper';
import { useUserConfig } from './useUserConfig';

const useGetUserConfig = () => {
    const {
        userType = 'loading',
        isSubscribed = false,
        userEmail = '',
        userName = '',
        userLastName = '',
        userId = ''
    } = useGetUserData(SUBSCRIBED_HELPER.FOODIT);

    const { config: promotions } = useUserConfig(userType);

    return {
        userType,
        initials: getUserInitials(userName, userLastName, userEmail),
        initialsClassName: isSubscribed
            ? 'bg-primary-positive'
            : 'bg-light-600',
        email: userEmail,
        suscription: isSubscribed ? 'Suscriptor digital' : 'Sin suscripción',
        isSubscribed,
        promotions,
        id: userId
    };
};

export default useGetUserConfig;
