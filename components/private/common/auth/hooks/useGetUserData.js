import { useState, useEffect } from 'react';
import getUserInitials from '../../utils/getUserInitials';
import getUserData from './_helper';

const useGetUserData = (productPremiumToValidate = '') => {
    const [userData, setUserData] = useState({
        userType: 'loading',
        isSubscribed: false,
        userEmail: '',
        userName: '',
        userId: '',
        userLastName: ''
    });

    useEffect(() => {
        let isMounted = true;

        const loadUserData = async () => {
            const data = await getUserData(productPremiumToValidate);

            if (isMounted) {
                setUserData(data);
            }
        };

        loadUserData();
        window.addEventListener('ucl-ready', loadUserData);

        return () => {
            isMounted = false;
            window.removeEventListener('ucl-ready', loadUserData);
        };
    }, [productPremiumToValidate]);

    const {
        userType = 'loading',
        isSubscribed = false,
        userEmail = '',
        userName = '',
        userLastName = '',
        userId = ''
    } = userData;

    return {
        userType,
        initials: getUserInitials(userName, userLastName, userEmail),
        userEmail,
        isSubscribed,
        userName,
        userId,
        userLastName
    };
};

export default useGetUserData;
